const papers = [
  // Add one object per PDF. Until a real file is added, keep file: null.
  { exam: 'WASSCE', subject: 'Mathematics', year: 2024, session: 'May/June', paper: 'Paper 2', type: 'Question paper', pages: '12 pages', file: null },
  { exam: 'GABECE', subject: 'English Language', year: 2024, session: 'May/June', paper: 'Paper 1', type: 'Question paper', pages: '8 pages', file: null },
  { exam: 'WASSCE', subject: 'Biology', year: 2023, session: 'May/June', paper: 'Paper 2', type: 'Question paper', pages: '10 pages', file: null },
  { exam: 'GABECE', subject: 'Mathematics', year: 2023, session: 'May/June', paper: 'Paper 1', type: 'Question paper', pages: '9 pages', file: null },
  { exam: 'WASSCE', subject: 'English Language', year: 2022, session: 'May/June', paper: 'Paper 2', type: 'Question paper', pages: '11 pages', file: null },
  { exam: 'GABECE', subject: 'Integrated Science', year: 2022, session: 'May/June', paper: 'Paper 1', type: 'Question paper', pages: '8 pages', file: null },
];
// Icons selected from the Lucide family through 21st.dev. Inlined SVG keeps this
// static draft dependency-free and follows Lucide's consistent 24px line style.
const iconPaths = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  'search-x': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8.5 8.5l5 5m0-5-5 5"/>',
  x: '<path d="m18 6-12 12M6 6l12 12"/>',
  'arrow-right': '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
  'arrow-down': '<path d="M12 5v14m7-7-7 7-7-7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  files: '<path d="M15 2H6a2 2 0 0 0-2 2v14"/><path d="M18 8h-9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2Z"/><path d="M14 2v6h6"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  'users-round': '<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-5-7.35M16 3.13a5 5 0 0 1 0 9.75"/>',
  'file-plus-2': '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v6h6M3 15h6m-3-3v6"/>',
  'git-branch': '<circle cx="6" cy="3" r="2"/><path d="M6 5v12"/><circle cx="18" cy="6" r="2"/><path d="M18 8a6 6 0 0 1-6 6H6"/><circle cx="6" cy="21" r="2"/>',
  sparkles: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3ZM19 15l1 2.5 2.5 1-2.5 1L19 22l-1-2.5-2.5-1 2.5-1L19 15Z"/>'
};
function icon(name, extraClass = '') {
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths['file-text']}</svg>`;
}
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
const list = document.querySelector('#paper-list');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const dialog = document.querySelector('#paper-dialog');
let activeExam = 'All';

function matchingPapers() {
  const query = search.value.trim().toLowerCase();
  const result = papers.filter(p => (activeExam === 'All' || p.exam === activeExam) &&
    (!query || [p.exam, p.subject, p.year, p.session, p.paper, p.type].join(' ').toLowerCase().includes(query)));
  if (sort.value === 'recent') result.sort((a, b) => b.year - a.year || a.subject.localeCompare(b.subject));
  if (sort.value === 'oldest') result.sort((a, b) => a.year - b.year || a.subject.localeCompare(b.subject));
  if (sort.value === 'subject') result.sort((a, b) => a.subject.localeCompare(b.subject) || b.year - a.year);
  return result;
}

function actionControl(paper, action) {
  const label = action === 'preview' ? 'Preview' : 'Download';
  const glyph = action === 'preview' ? icon('search') : icon('arrow-down');
  const classes = `action-btn${action === 'download' ? ' download' : ''}`;
  const ariaLabel = `${label} ${paper.subject} ${paper.year}`;
  if (paper.file) {
    const fileAction = action === 'preview'
      ? 'target="_blank" rel="noopener noreferrer"'
      : 'download';
    return `<a class="${classes}" href="${paper.file}" ${fileAction} aria-label="${ariaLabel}">${glyph} ${label}</a>`;
  }
  return `<button class="${classes}" data-index="${papers.indexOf(paper)}" data-action="${action}" aria-label="${ariaLabel}">${glyph} ${label}</button>`;
}

function render() {
  const found = matchingPapers();
  document.querySelector('#count-number').textContent = found.length;
  document.querySelectorAll('[data-exam-count]').forEach(badge => {
    const exam = badge.dataset.examCount;
    badge.textContent = exam === 'All' ? papers.length : papers.filter(paper => paper.exam === exam).length;
  });
  document.querySelector('#results-label').textContent = activeExam === 'All' && !search.value.trim() ? 'all papers' : `${found.length} ${found.length === 1 ? 'paper' : 'papers'}`;
  document.querySelector('#empty-state').hidden = found.length > 0;
  list.innerHTML = found.map((p, index) => `
    <article class="paper-row">
      <div class="paper-icon" aria-hidden="true">${icon('file-text')}</div>
      <div class="paper-info"><h3 class="paper-name">${p.subject} <span class="paper-light">· ${p.paper}</span></h3><p class="paper-subtitle">${p.session} session <span>·</span> ${p.type}</p></div>
      <span class="paper-exam">${p.exam}</span><span class="paper-year">${p.year}</span>
      <div class="paper-actions">${actionControl(p, 'preview')}${actionControl(p, 'download')}</div>
    </article>`).join('');
  document.querySelector('#clear-search').classList.toggle('visible', !!search.value);
}

function openDetails(paper, action) {
  document.querySelector('#dialog-content').innerHTML = `
    <h3>${paper.subject}</h3><p class="dialog-sub">${paper.exam} · ${paper.year} · ${paper.session}</p>
    <div class="dialog-meta"><div><small>Paper</small><strong>${paper.paper}</strong></div><div><small>Resource</small><strong>${paper.type}</strong></div><div><small>Length</small><strong>${paper.pages}</strong></div><div><small>Collection</small><strong>Preview record</strong></div></div>
    <p class="demo-note">${action === 'download' ? 'Download is a demo in this draft.' : 'Paper preview is a demo in this draft.'} This sample record has no exam PDF attached yet. See the README for instructions to add a paper file.</p>`;
  dialog.showModal();
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  button.classList.add('active'); activeExam = button.dataset.exam; render();
}));
search.addEventListener('input', render);
sort.addEventListener('change', render);
document.querySelector('#clear-search').addEventListener('click', () => { search.value = ''; render(); search.focus(); });
document.querySelector('#reset-filters').addEventListener('click', () => {
  activeExam = 'All'; search.value = '';
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b.dataset.exam === 'All'));
  render();
});
list.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (button) openDetails(papers[Number(button.dataset.index)], button.dataset.action);
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', event => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); search.focus(); }
});
render();
