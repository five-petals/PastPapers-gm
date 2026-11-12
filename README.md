# Gambia Papers MVP

A small, responsive static website draft for an open library of Gambian national exam papers.

## Preview the site

Open `index.html` in a modern browser. The page uses `styles.css`, `app.js`, and Manrope from Google Fonts. The UI icons are inline Lucide SVGs selected through [21st.dev Community Icons](https://21st.dev/community/icons).

## Add a past paper

This draft uses a simple file-and-metadata workflow. There is no upload form or backend yet.

### 1. Check that the PDF can be shared

Only add a paper if the project has permission to distribute it. Keep a note of where it came from and what permission or license allows sharing. Do not add private student information, answer scripts, or files whose distribution is not authorized.

### 2. Prepare and name the PDF

- Make sure it opens, is readable, and has the correct exam, subject, year, session and paper number.
- For scans, keep the file legible and reasonably small; OCR is helpful for searching scanned text.
- Use lowercase letters, numbers and hyphens. Avoid spaces and personal details in filenames.
- Use this pattern: `exam-subject-year-session-paper-resource.pdf`.

For example: `wassce-mathematics-2024-may-june-paper-2-question-paper.pdf`.

### 3. Put the PDF in the papers folder

Create the exam and year folders if they do not exist, then place the PDF there:

```text
papers/
└── wassce/
    └── 2024/
        └── wassce-mathematics-2024-may-june-paper-2-question-paper.pdf
```

Use `papers/gabece/<year>/` for GABECE papers. Keep the filename in the path exactly as it appears on disk.

### 4. Add its record to `app.js`

Near the top of `app.js`, add one object inside the `papers` array. Use a path relative to `index.html`:

```js
{
  exam: 'WASSCE',
  subject: 'Mathematics',
  year: 2024,
  session: 'May/June',
  paper: 'Paper 2',
  type: 'Question paper',
  pages: '12 pages',
  file: 'papers/wassce/2024/wassce-mathematics-2024-may-june-paper-2-question-paper.pdf'
},
```

Replace the example details with the details on the paper. Keep `year` as a number. The `file` value must match the PDF path exactly. Use `type: 'Marking scheme'` for a marking scheme; add it as its own record so students can find and download it separately.

### 5. Preview the result

Save `app.js` and reload `index.html`. The WASSCE/GABECE counts update from the records. A record with a `file` path gets working **Preview** and **Download** links. Preview opens the PDF in a new tab; Download saves it. Records with `file: null` keep the demo detail message.

Before accepting a contribution, check the PDF, its metadata, its file path, and its sharing permission. In a Git-based workflow, submit the PDF and metadata together for maintainer review.

## What is included

- Search by subject, exam, year, session or paper
- WASSCE and GABECE filters and dynamic counts
- Sort by newest, oldest or subject
- PDF preview and download links for records with a file path
- Responsive layout for phones and desktop
- A community contribution call to action

The six starter records are illustrative only and have no PDFs attached. The contribution email and GitHub link in this draft are placeholders and must be replaced before launch.

## Source files

- `index.html` — page content and layout
- `styles.css` — visual design and responsive rules
- `app.js` — sample records, filters, sorting, search and PDF actions
- `papers/` — add authorized PDF files here
- `CODE_OF_CONDUCT.md` — expected community behavior and reporting process

## Design references

The layout takes cues from [Revision World](https://revisionworld.com/) for exam and subject browsing and [Project Gutenberg](https://www.gutenberg.org/) for quick search and an open library approach. The visual direction uses the supplied GitHub Brand Guidelines 2026 as inspiration: dark and neutral surfaces, green accent, restrained mono labels and clean sans-serif typography. Manrope is loaded from [Google Fonts](https://fonts.google.com/specimen/Manrope); DM Mono is used for small technical labels.
