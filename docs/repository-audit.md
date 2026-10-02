# Repository inspection

Inspected on 2026-10-02 before the first qualification implementation. Existing
uncommitted profile/sidebar work was preserved.

## 1. Tech stack

Plain HTML, CSS, and JavaScript. No framework, TypeScript, package manifest,
dependencies, compiler, bundler, server, database, API client, environment files,
deployment configuration, or test suite was present. Static HTTP hosting is
sufficient. Styling uses CSS variables, reusable buttons/cards, and responsive
breakpoints at 1100, 800, and 550 pixels. Dark mode changes CSS variables.

## 2. Original structure

```text
.
├── README.md       # A single project-title line before this stage
├── index.html      # Dashboard and six other page sections in one app shell
├── login.html      # Registration/login UI with an inline script
├── script.js       # Mock tenders, rendering, events, and local storage
└── style.css       # Shared login/app styles and responsive layout
```

The seven sections were Dashboard, Tenders, AI Match, Saved, Contracts, Company
Profile, and personal Profile. Navigation toggles CSS classes, not URLs. There
were no reusable framework components; functions produce tender cards and the
tender-detail modal. New Qualification functionality is an additional section.

## 3. Existing behavior

- Dashboard derives counts and recommended/deadline lists from eight tenders.
- Tenders supports keyword, category, and budget filtering and a detail modal.
- Saved persists tender IDs in local storage.
- AI Match sorts fixed percentages; it does not call an AI service.
- Contracts accepts two files, displays their filenames, and reveals a fixed
  comparison after a 1200 ms timer. File content is never read or uploaded.
- Company Profile saves name, category, experience, employee count, description,
  and license text. These fields do not change the match scores.
- Personal Profile saves a display name and shows the locally registered email.
- Theme persists, and Logout removes a local flag and redirects to login.
- Registration stores one account; login compares its saved email/password.

## 4. Missing pieces

There is no real session, authorization, company ownership, file storage, PDF
extraction, OCR, DOCX/XLSX processing, requirement extraction, translation,
evidence comparison, database persistence, or human-review audit trail. There
are no IDs for users/companies/documents, extraction provenance, requirement
evaluation statuses, or integration credentials. No environment variables are
read. The entire repository is frontend-only.

## 5. Mock features and suspicious code

| Finding | Location | Consequence |
| --- | --- | --- |
| Eight hardcoded tenders and fixed match percentages | `script.js`, mock tender data | Rankings and counts are demonstrations, not analysis. One budget is a numeric string rather than a number. |
| Hero says 12 matches; calculated count is 4 | `index.html`, dashboard hero; `updateStats` | Inconsistent display. |
| Fixed comparison with a timer | Contract click handler and comparison markup | Any two selected files return identical output without analysis. |
| Plaintext password in local storage | `login.html`, register/login handlers | Prototype authentication; unsuitable for real accounts. |
| No dashboard session guard | `index.html` and `script.js` | The local login flag does not restrict app access. A frontend flag cannot enforce backend authorization anyway. |
| All data belongs to browser storage | Account/profile/company/saved keys | No company isolation; re-registering can leave another account's profile/saved data. |
| JSON parsing without error handling | Local storage reads | Malformed saved data can stop script initialization. |
| Save refresh loses filters | `toggleSave` calls `renderTenders()` | Search/filter selection remains visible while unfiltered cards render. AI/recommended card views may also be stale. |
| UTC date-only parsing against local midnight | `getDaysLeft` | Days remaining can be off by one and depend on browser timezone. |
| Every modal requirement uses a green check | `openTender` | A requirement list can look like evidence-backed compliance despite no evaluation. |
| Dynamic strings inserted via `innerHTML` | Tender cards, lists, modal | Currently static strings; future API/document content must be escaped or rendered with `textContent`. |
| Notification count fixed at 3 | Topbar | No notification handler or service. |
| Company fields lack required/range constraints; labels lack `for` | Company form | Empty/negative values are accepted and accessibility is incomplete. |
| Modal lacks dialog semantics/focus management | Tender modal | Keyboard/accessibility behavior needs improvement. |

These findings are recorded for incremental work. This stage does not silently
replace authentication, rewrite existing features, or claim to fix all findings.

## 6. Intended backend integration points

No existing API calls or URLs were found. The obvious future points are the
contract file inputs, company form, tender renderer/modal, and login forms. The
new requirement report is a separate UI boundary with a documented JSON shape;
its sample loader must be replaced with authenticated report retrieval when a
backend exists. Do not send the current local login flag as authentication.

## 7. Recommended architecture

Keep the static UI and existing styles for the first working version. Add a
separate backend service with authenticated company-scoped JSON APIs, durable
file storage, a document-processing worker, and a database. Keep PDF parsing,
extraction, translation, evidence comparison, and explanations separate. Validate
AI output before persistence. The UI receives validated reports with all
requirements, evidence references, and explicit uncertainty; official decisions
remain with reviewers. See `qualification-api.md` for models and endpoints.

The backend language/hosting platform is deliberately undecided until deployment
and team constraints are known. A framework migration is unnecessary for this
first stage. Make.com can use the same job/resource IDs and authenticated JSON
APIs without a separate automation-specific data model.

## 8. Implementation order

1. **This stage:** isolated sample qualification report, four statuses, filtering,
   evidence/source details, missing-information display, strict report validation,
   and architecture/API documentation. No document upload or live AI processing.
2. Real backend authentication, authorization, company/document entities, and
   database/file storage. Replace local prototype login; fix existing storage and
   input-validation issues in a separate change.
3. PDF upload/job API, page-preserving text extraction, processing/error states,
   and safe evidence-document ingestion. Report unsupported encrypted/image-only
   files until OCR support is available.
4. Backend extraction and translation services, validated structured responses,
   and source-page verification. Persist every extracted requirement.
5. Evidence comparison and explanations with explicit statuses. Absence of
   evidence yields UNCERTAIN or NOT_ANALYZED, never an automatic pass. Connect
   authenticated reports to the current review UI; add file/source viewing.
6. Human review/override history, reprocessing/versioning, Make.com integration,
   then DOCX/XLSX and OCR support. Fix remaining mock labels and dashboard bugs as
   their affected features become real.

## Stage files added

`qualification.mjs`, `data/qualification-demo.json`, the two files in `docs/`,
and `tests/qualification.test.mjs`. `index.html`, `script.js`, `style.css`, and
`README.md` are extended. No production dependencies or backend code were added.
