const STATUS_LABELS = Object.freeze({
  MEETS: "Meets",
  DOES_NOT_MEET: "Does not meet",
  UNCERTAIN: "Uncertain",
  NOT_ANALYZED: "Not analyzed"
});

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNullableText(value) {
  return value === null || typeof value === "string";
}

function hasValidSource(value) {
  return (value.source_page === null ||
    (Number.isInteger(value.source_page) && value.source_page > 0)) &&
    typeof value.source_section === "string";
}

// Validate at the UI boundary too; the future backend must validate before saving.
// Missing or unknown classifications are rejected instead of becoming "Meets".
export function validateQualificationReport(report) {
  requireValue(report && report.schema_version === "1.0", "Unsupported report version.");
  requireValue(typeof report.is_demo === "boolean", "Report origin is missing.");
  requireValue(report.tender && isText(report.tender.id) &&
    isText(report.tender.title) && isText(report.tender.filename) &&
    report.tender.processing_status === "COMPLETED", "Report is not complete.");
  requireValue(report.company && isText(report.company.id) &&
    isText(report.company.name), "Company context is missing.");
  requireValue(Array.isArray(report.evaluations), "Evaluations must be an array.");

  const requirementIds = new Set();
  for (const evaluation of report.evaluations) {
    requireValue(evaluation && typeof evaluation === "object", "Invalid evaluation.");
    const requirement = evaluation.requirement;
    requireValue(requirement && isText(requirement.requirement_id) &&
      isText(requirement.category) && isText(requirement.original_text) &&
      typeof requirement.mandatory === "boolean" &&
      isText(requirement.required_evidence) &&
      isNullableText(requirement.translated_text) &&
      isNullableText(requirement.minimum_value) && hasValidSource(requirement),
    "Incomplete requirement or source reference.");
    requireValue(!requirementIds.has(requirement.requirement_id), "Duplicate requirement.");
    requirementIds.add(requirement.requirement_id);
    requireValue(Object.hasOwn(STATUS_LABELS, evaluation.status), "Unknown evaluation status.");
    requireValue(isText(evaluation.explanation), "Evaluation explanation is missing.");
    requireValue(Array.isArray(evaluation.missing_information) &&
      evaluation.missing_information.every(isText), "Invalid missing information.");
    requireValue(Array.isArray(evaluation.evidence), "Evidence must be an array.");
    for (const evidence of evaluation.evidence) {
      requireValue(evidence && isText(evidence.document_id) && isText(evidence.filename) &&
        isText(evidence.excerpt) && hasValidSource(evidence), "Incomplete evidence reference.");
    }
    if (["MEETS", "DOES_NOT_MEET"].includes(evaluation.status)) {
      requireValue(evaluation.evidence.length > 0, "Definitive evaluation needs evidence.");
    }
  }
  return report;
}

export function filterQualificationEvaluations(evaluations, status) {
  requireValue(status === "ALL" || Object.hasOwn(STATUS_LABELS, status), "Unknown filter.");
  return status === "ALL" ? evaluations : evaluations.filter(item => item.status === status);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function sourceLabel(source) {
  const page = source.source_page === null ? "Хуудас тодорхойгүй" : `Хуудас ${source.source_page}`;
  return `${page} · ${source.source_section || "Хэсэг тодорхойгүй"}`;
}

function appendField(parent, label, value) {
  parent.append(createElement("dt", "", label), createElement("dd", "", value));
}

function createEvaluationCard(evaluation) {
  const requirement = evaluation.requirement;
  const card = createElement("article", "qualification-card");
  const header = createElement("div", "qualification-card-header");
  const title = createElement("div");
  title.append(createElement("p", "qualification-category", requirement.category),
    createElement("h3", "", requirement.original_text));
  header.append(title, createElement("span", `qualification-badge status-${evaluation.status.toLowerCase()}`,
    STATUS_LABELS[evaluation.status]));
  card.append(header);

  const overview = createElement("dl", "qualification-overview");
  appendField(overview, "Тайлбар", evaluation.explanation);
  appendField(overview, "Нотлох баримт", evaluation.evidence.length ?
    evaluation.evidence.map(item => item.filename).join(", ") : "Нотлох баримт ашиглаагүй.");
  appendField(overview, "Тендерийн эх сурвалж", sourceLabel(requirement));
  card.append(overview);

  const details = createElement("details", "qualification-details");
  details.append(createElement("summary", "", "Нотлох баримт болон дэлгэрэнгүй мэдээлэл"));
  const fields = createElement("dl", "qualification-overview");
  appendField(fields, "Шаардлагын дугаар", requirement.requirement_id);
  appendField(fields, "Заавал биелүүлэх", requirement.mandatory ? "Тийм" : "Үгүй");
  appendField(fields, "Шаардах нотлох баримт", requirement.required_evidence);
  appendField(fields, "Доод хэмжээ", requirement.minimum_value ?? "Тодорхойлоогүй");
  appendField(fields, "Орчуулга", requirement.translated_text || "Орчуулга байхгүй");
  details.append(fields, createElement("h4", "", "Ашигласан нотлох баримт"));
  if (!evaluation.evidence.length) {
    details.append(createElement("p", "", "Нотлох баримт ашиглаагүй. Шаардлагыг биелүүлсэн гэж үзэх үндэслэлгүй."));
  }
  for (const evidence of evaluation.evidence) {
    const evidenceCard = createElement("div", "qualification-evidence");
    evidenceCard.append(createElement("strong", "", evidence.filename),
      createElement("p", "", `${evidence.document_id} · ${sourceLabel(evidence)}`),
      createElement("blockquote", "", evidence.excerpt));
    details.append(evidenceCard);
  }
  details.append(createElement("h4", "", "Дутуу мэдээлэл / хянах зүйл"));
  if (evaluation.missing_information.length) {
    const list = createElement("ul");
    evaluation.missing_information.forEach(item => list.append(createElement("li", "", item)));
    details.append(list);
  } else {
    details.append(createElement("p", "", "Дутуу мэдээлэл бүртгэгдээгүй. Эх баримтыг хүний хяналтаар баталгаажуулна уу."));
  }
  card.append(details);
  return card;
}

function initializeQualificationPage() {
  const loadButton = document.getElementById("loadQualificationDemo");
  const reportElement = document.getElementById("qualificationReport");
  const emptyElement = document.getElementById("qualificationEmpty");
  const errorElement = document.getElementById("qualificationError");
  const loadStatus = document.getElementById("qualificationLoadStatus");
  const listElement = document.getElementById("qualificationList");
  const filters = [...document.querySelectorAll("[data-qualification-status]")];
  let report = null;
  let selectedStatus = "ALL";

  function renderReport() {
    const evaluations = filterQualificationEvaluations(report.evaluations, selectedStatus);
    for (const button of filters) {
      const status = button.dataset.qualificationStatus;
      button.setAttribute("aria-pressed", String(status === selectedStatus));
      button.querySelector("span").textContent =
        `(${filterQualificationEvaluations(report.evaluations, status).length})`;
    }
    document.getElementById("qualificationResultCount").textContent =
      `${evaluations.length} / ${report.evaluations.length} шаардлага харагдаж байна.`;
    listElement.replaceChildren(...evaluations.map(createEvaluationCard));
    if (!evaluations.length) {
      const empty = createElement("div", "empty-state");
      empty.append(createElement("h3", "", "Энэ төлөвтэй шаардлага алга"),
        createElement("p", "", "Бүх шаардлагыг харахын тулд All шүүлтүүрийг сонгоно уу."));
      listElement.append(empty);
    }
  }

  filters.forEach(button => button.addEventListener("click", () => {
    selectedStatus = button.dataset.qualificationStatus;
    if (report) renderReport();
  }));

  loadButton.addEventListener("click", async () => {
    loadButton.disabled = true;
    reportElement.setAttribute("aria-busy", "true");
    errorElement.classList.add("hidden");
    loadStatus.textContent = "Жишээ тайланг ачаалж байна…";
    try {
      const response = await fetch(new URL("./data/qualification-demo.json", import.meta.url));
      if (!response.ok) throw new Error(`Report request failed (${response.status}).`);
      const nextReport = validateQualificationReport(await response.json());
      requireValue(nextReport.is_demo, "Sample loader requires a sample report.");
      report = nextReport;
      selectedStatus = "ALL";
      document.getElementById("qualificationTenderTitle").textContent = report.tender.title;
      document.getElementById("qualificationReportContext").textContent =
        `${report.company.name} · ${report.tender.filename} · Зохиомол жишээ`;
      renderReport();
      reportElement.classList.remove("hidden");
      emptyElement.classList.add("hidden");
      loadStatus.textContent = "Жишээ тайлан ачаалагдлаа. Таны баримт бичгийг шинжлээгүй.";
    } catch {
      loadStatus.textContent = "";
      errorElement.textContent = "Жишээ тайланг ачаалж чадсангүй эсвэл өгөгдлийн бүтэц буруу байна. Дахин оролдоно уу.";
      errorElement.classList.remove("hidden");
    } finally {
      loadButton.disabled = false;
      reportElement.removeAttribute("aria-busy");
    }
  });
}

if (typeof document !== "undefined") initializeQualificationPage();
