# Proposed qualification architecture and API

This is a proposed contract, not an existing backend. The frontend currently
loads only a fictional report from `data/qualification-demo.json`.

```text
Existing static frontend
    → Authenticated backend API
    → Document job worker (PDF text + page/section mapping; OCR later)
    → Separate AI services: extraction → translation → comparison → explanation
    → Response validation + provenance verification
    → Database and private file storage
    → JSON report → frontend evidence review → human decision
```

Keep route handlers responsible for authentication, authorization, request
validation, and job dispatch. Put prompts and AI response parsing in dedicated
services; do not embed prompts in route handlers or browser code. Validate both
structural fields and provenance against the actual uploaded documents. A valid
JSON response alone does not establish that AI claims are accurate.

## Service boundaries

| Operation | Input | Output |
| --- | --- | --- |
| Extract requirements | Tender text segments with page/section references | Every requirement, original text, mandatory flag, required evidence, minimum value, source |
| Translate | Requirement ID, original text, target language | Translated text preserving thresholds and identifiers; original retained |
| Compare company evidence | Requirement + company-owned document excerpts/profile | MEETS, DOES_NOT_MEET, UNCERTAIN, or NOT_ANALYZED; references and missing information |
| Explain qualification evaluation | Validated comparison and cited evidence | Explanation linked to the requirement; preserve status and uncertainty |

Never accept an unexplained global “qualified” result. Require evidence for a
definitive pass/fail. Missing evidence or unreadable data must remain explicit.
Ensure a report includes every extracted requirement, including those not yet
evaluated. Explanation generation must not silently change classifications.

## Persistent entities

| Entity | Fields and relationships |
| --- | --- |
| User | `id`, `email`, server-managed password hash/session identity; company membership |
| Company | `id`, `name`, structured `profile`, registration information |
| CompanyDocument | `id`, `company_id`, `document_type`, `filename`, private storage reference, processing status, `extracted_content` with page/section segments |
| Tender | `id`, owner/company, `title`, `uploaded_file` reference, `uploaded_at`, `processing_status`, processing error, document version |
| TenderRequirement | `id`, `tender_id`, `category`, `original_text`, nullable `translated_text`, boolean `mandatory`, `required_evidence`, nullable `minimum_value`, nullable `source_page`, `source_section` |
| RequirementEvaluation | `id`, `requirement_id`, `company_id`, exact `status`, `explanation`, `evidence[]`, `missing_information[]`, analysis version, timestamps |
| AnalysisJob | `id`, tender/company, current step, state, error, attempt count, timestamps |
| HumanReview | Evaluation/version, reviewer, decision/override, explanation, timestamp; preserve original AI evaluation |

Evidence items reference a company document ID, filename, excerpt, page, and
section. A source page is 1-based; `null` means unknown, never page zero. Unknown
sections use an empty string, displayed as unknown. Keep raw extracted text and
original tender files so a reviewer can inspect citations. Initial minimum values
are strings (for example `3 years`); add typed number/unit/operator fields when
deterministic numeric comparisons are implemented. Never compare these strings
lexicographically.

Tender processing states: `UPLOADED`, `PROCESSING`, `COMPLETED`, `FAILED`.
Job steps may report `EXTRACTING_TEXT`, `EXTRACTING_REQUIREMENTS`, `TRANSLATING`,
`COMPARING`, and `EXPLAINING`. Do not publish partial results as completed. A
completed processing job may still contain NOT_ANALYZED evaluations.

## Proposed HTTP endpoints

All company-specific endpoints require real server-side authentication and
authorization. Prefer the same origin for browser API calls; use secure HTTP-only
session cookies and CSRF protection for browser writes. Make.com should use a
separately issued, scoped server credential and verify company access. These
credentials do not go in public frontend files.

| Method/path | Purpose |
| --- | --- |
| `GET /api/v1/me` | Current user/company memberships |
| `GET /api/v1/companies/{id}` | Company profile |
| `PATCH /api/v1/companies/{id}` | Validated profile updates |
| `POST /api/v1/companies/{id}/documents` | Multipart evidence-file upload; returns document/job IDs |
| `POST /api/v1/tenders` | Multipart PDF upload plus title/company ID; returns tender ID |
| `POST /api/v1/tenders/{id}/analyses` | JSON `{ "company_id": "..." }`; returns 202 with job ID/status URL |
| `GET /api/v1/jobs/{id}` | State/step/error polling; bounded retries and no arbitrary progress percentage |
| `GET /api/v1/tenders/{id}/reports?company_id=...` | Complete report with the shape below |
| `GET /api/v1/documents/{id}/content` | Authorized source viewing; UI may navigate to cited page |
| `POST /api/v1/evaluations/{id}/reviews` | Record authenticated human review/override with reason and version |

Use an `Idempotency-Key` on uploads/job creation when integrating retrying
clients. Return stable resource IDs. For Make.com JSON-only file ingestion, add a
backend-owned preauthorized upload flow once needed; do not fetch arbitrary file
URLs supplied by a workflow. Polling is sufficient initially; authenticated,
signed completion webhooks can be added later.

Suggested error envelope:

```json
{
  "error": {
    "code": "DOCUMENT_TEXT_UNAVAILABLE",
    "message": "This PDF has no readable text. OCR is required.",
    "request_id": "request-id"
  }
}
```

Return 400 for invalid inputs, 401/403 for access failures, 413 for excessive file
size, 415 for unsupported formats, and a documented 409 while a report is not
ready. Do not expose provider keys, prompts containing private material, or raw
provider errors to the browser. Initial upload limits belong in shared API
configuration and must be enforced on the server.

## Report JSON, version 1.0

The sample file is the full working example. The API report joins stored
requirements/evaluations for display; it does not require duplicating requirement
rows in database storage.

```json
{
  "schema_version": "1.0",
  "is_demo": false,
  "tender": {
    "id": "tender-id",
    "title": "Tender title",
    "filename": "tender.pdf",
    "processing_status": "COMPLETED"
  },
  "company": { "id": "company-id", "name": "Company name" },
  "evaluations": [
    {
      "requirement": {
        "requirement_id": "requirement-id",
        "category": "License",
        "original_text": "A valid construction license is required.",
        "translated_text": null,
        "mandatory": true,
        "required_evidence": "License with readable expiration date.",
        "minimum_value": null,
        "source_page": 6,
        "source_section": "2.3"
      },
      "status": "UNCERTAIN",
      "explanation": "The expiration date is unreadable.",
      "evidence": [
        {
          "document_id": "document-id",
          "filename": "license.pdf",
          "excerpt": "Expiration date: [unreadable]",
          "source_page": 1,
          "source_section": "License details"
        }
      ],
      "missing_information": ["A readable expiration date."]
    }
  ]
}
```

The UI validator rejects unknown status values, duplicate requirement IDs,
missing explanations, malformed evidence, and invalid page references. Definitive
statuses require evidence. Empty evaluation arrays are valid and get an empty
state. The backend must additionally check report completeness, document/company
ownership, source accuracy, and all persisted entity IDs. The current sample
loader accepts only `is_demo: true`; production report loading needs a separate
authenticated adapter and must update the report-origin label.

## PDF-first file processing and secrets

Use format-specific adapters that produce the same page/section text segments.
Start with text PDFs. Validate actual file content, size, and access on the server;
a filename/HTML `accept` attribute is not validation. Report encrypted, corrupt,
or image-only files clearly. Add DOCX paragraph/section mapping, XLSX sheet/cell
mapping, and scanned-document OCR later without changing evaluation statuses.

Backend environment variables may include `ANTHROPIC_API_KEY`, `DATABASE_URL`,
private document-storage configuration, and server session secrets. None are
needed or read by the current frontend. Never put AI keys in browser scripts,
public JSON, frontend build variables, or local storage. Keep vendor requests in
backend services and validate output before storing it.
