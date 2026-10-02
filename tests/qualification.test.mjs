import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateQualificationReport, filterQualificationEvaluations } from "../qualification.mjs";

const sample = JSON.parse(await readFile(new URL("../data/qualification-demo.json", import.meta.url), "utf8"));
const copy = () => structuredClone(sample);

test("sample preserves all statuses, negative results, evidence, and unknown source pages", () => {
  assert.equal(validateQualificationReport(sample), sample);
  assert.deepEqual(sample.evaluations.map(item => item.status),
    ["MEETS", "DOES_NOT_MEET", "UNCERTAIN", "NOT_ANALYZED"]);
  assert.equal(sample.evaluations[3].requirement.source_page, null);
  assert.ok(sample.evaluations[1].evidence[0].excerpt.includes("750,000,000"));
});

test("filters include failed and unanalyzed requirements without altering report data", () => {
  for (const status of ["MEETS", "DOES_NOT_MEET", "UNCERTAIN", "NOT_ANALYZED"]) {
    const result = filterQualificationEvaluations(sample.evaluations, status);
    assert.equal(result.length, 1);
    assert.equal(result[0].status, status);
  }
  assert.equal(filterQualificationEvaluations(sample.evaluations, "ALL").length, 4);
  assert.equal(sample.evaluations.length, 4);
  assert.throws(() => filterQualificationEvaluations(sample.evaluations, "QUALIFIED"));
});

test("unknown or missing statuses never silently pass", () => {
  for (const status of ["QUALIFIED", "meets", "toString", null, undefined]) {
    const report = copy();
    report.evaluations[0].status = status;
    assert.throws(() => validateQualificationReport(report), /status/);
  }
});

test("definitive evaluations without evidence are rejected", () => {
  for (const status of ["MEETS", "DOES_NOT_MEET"]) {
    const report = copy();
    report.evaluations[0].status = status;
    report.evaluations[0].evidence = [];
    assert.throws(() => validateQualificationReport(report), /needs evidence/);
  }
});

test("incomplete explanation, missing-information, or evidence data is rejected", () => {
  const mutations = [
    report => { report.evaluations[0].explanation = " "; },
    report => { delete report.evaluations[0].missing_information; },
    report => { report.evaluations[0].missing_information = [null]; },
    report => { report.evaluations[0].evidence[0].excerpt = ""; },
    report => { delete report.evaluations[0].evidence[0].document_id; }
  ];
  for (const mutate of mutations) {
    const report = copy();
    mutate(report);
    assert.throws(() => validateQualificationReport(report));
  }
});

test("page references are 1-based or explicitly unknown", () => {
  for (const page of [0, -1, 1.5, "4", undefined]) {
    const report = copy();
    report.evaluations[0].requirement.source_page = page;
    assert.throws(() => validateQualificationReport(report), /source reference/);
  }
  const report = copy();
  report.evaluations[0].evidence[0].source_page = 0;
  assert.throws(() => validateQualificationReport(report), /evidence reference/);
});

test("duplicate requirements and nonboolean mandatory fields are rejected", () => {
  const duplicate = copy();
  duplicate.evaluations.push(structuredClone(duplicate.evaluations[0]));
  assert.throws(() => validateQualificationReport(duplicate), /Duplicate/);
  const missingFlag = copy();
  missingFlag.evaluations[0].requirement.mandatory = "true";
  assert.throws(() => validateQualificationReport(missingFlag));
});

test("incomplete report envelopes are rejected; valid empty completed reports are allowed", () => {
  for (const invalid of [null, {}, { schema_version: "2.0" }]) {
    assert.throws(() => validateQualificationReport(invalid));
  }
  const processing = copy();
  processing.tender.processing_status = "PROCESSING";
  assert.throws(() => validateQualificationReport(processing));
  const missingOrigin = copy();
  delete missingOrigin.is_demo;
  assert.throws(() => validateQualificationReport(missingOrigin));
  const empty = copy();
  empty.evaluations = [];
  assert.equal(validateQualificationReport(empty).evaluations.length, 0);
});
