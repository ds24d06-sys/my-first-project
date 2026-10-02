# TenderAI frontend

A static HTML/CSS/JavaScript prototype for tender discovery and qualification review.
There is no backend, database, build tool, or package dependency in this repository.

Run from the repository root with Python 3:

```sh
rtk proxy python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. HTTP serving is required for the qualification module
and JSON sample; opening the HTML directly from disk is not supported.

The existing tender list, match scores, notifications, and contract comparison are
mock data. Registration/login use browser local storage, including a plaintext
password, and do not provide real authentication. Use fictional prototype data.

The **Qualification** page starts empty. Choose **Жишээ тайлан харах** to load a
clearly labeled fictional report. Filter all four evaluation statuses and expand
each requirement to inspect evidence excerpts, missing information, and source
references. The sample is independent of the company form. This stage does not
upload or analyze documents and makes no official qualification decision.

- [Repository inspection and implementation order](docs/repository-audit.md)
- [Proposed architecture and JSON API contract](docs/qualification-api.md)
- Sample report: `data/qualification-demo.json`
- Isolated review UI and report validation: `qualification.mjs`

Run the report contract checks with Node.js 18 or later:

```sh
rtk node --test tests/qualification.test.mjs
```

These use Node's built-in test runner and add no packages. Node is only needed for
the tests; Python or another static HTTP server is sufficient for the frontend.
