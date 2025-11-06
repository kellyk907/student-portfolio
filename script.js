const CSV_URL = 'https://docs.google.com/spreadsheets/d/1H0apGdCoHkYdhYK2xQuIphS-ixp8q61iAqS5tn5BEQk/pub?gid=0&single=true&output=csv';

let students = [];
let col = {};

const select = document.getElementById('student-select');
const dashboard = document.getElementById('dashboard');
const studentName = document.getElementById('student-name');
const studentGrade = document.getElementById('student-grade');
const studentPhoto = document.querySelector('.student-photo');

function addPrintButton() {
  if (document.querySelector('.print-btn')) return;
  const btn = document.createElement('button');
  btn.textContent = 'Print PDF';
  btn.className = 'print-btn';
  btn.onclick = () => window.print();
  document.querySelector('.student-header').appendChild(btn);
}

function parseCSVLine(line) {
  const result = [];
  let field = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuote && line[i + 1] === '"') { field += '"'; i++; }
      else inQuote = !inQuote;
    } else if (c === ',' && !inQuote) {
      result.push(field.trim());
      field = '';
    } else field += c;
  }
  result.push(field.trim());
  return result.map(f => f.replace(/^"|"$/g, ''));
}

async function loadStudents() {
  try {
    const res = await fetch(CSV_URL + '&t=' + Date.now());
    if (!res.ok) throw new Error('CSV not public');
    const csv = await res.text();
    const lines = csv.trim().split('\n');
    if (lines.length < 2) throw new Error('No data');

    const headers = parseCSVLine(lines[0]);
    col = {};
    headers.forEach((h, i) => col[h.toLowerCase().replace(/\s+/g, ' ')] = i);

    if (!col['student name']) {
      select.innerHTML = '<option>Missing "Student Name"</option>';
      return;
    }

    students = lines.slice(1).map((line, i) => {
      const v = parseCSVLine(line);
      const first = v[col['student name']] || '';
      const last = col['student last name'] ? v[col['student last name']] || '' : '';
      const name = `${first} ${last}`.trim();
      if (!name) return null;

      return {
        id: i + 1,
        name,
        grade: col['grade'] ? v[col['grade']] || '' : '',
        photo: col['photo_url'] ? v[col['photo_url']] || 'https://via.placeholder.com/80?text=Photo' : 'https://via.placeholder.com/80?text=Photo',
        grades: {
          math: col['math'] ? v[col['math']] || '—' : '—',
          reading: col['reading'] ? v[col['reading']] || '—' : '—',
          spanish: col['spanish'] ? v[col['spanish']] || '—' : '—',
          science: col['science'] ? v[col['science']] || '—' : '—',
          social: col['social studies'] ? v[col['social studies']] || '—' : '—'
        },
        behavior: col['behavior_notes'] ? v[col['behavior_notes']] || 'No notes' : 'No notes',
        iep: col['iep_goals'] ? v[col['iep_goals']] || 'No IEP' : 'No IEP',
        contact: col['parent_contact'] ? v[col['parent_contact']] || 'No contact' : 'No contact'
      };
    }).filter(Boolean);

    populateDropdown();
  } catch (e) {
    select.innerHTML = `<option>Error: ${e.message}</option>`;
  }
}

function populateDropdown() {
  select.innerHTML = '<option>Select a student...</option>';
  students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} - ${s.grade}`;
    select.appendChild(opt);
  });
}

function showStudent(id) {
  const s = students.find(x => x.id == id);
  if (!s) return;

  studentName.textContent = s.name;
  studentGrade.textContent = s.grade;
  studentPhoto.src = s.photo;
  addPrintButton();

  document.getElementById('progress').innerHTML = `
    <h3>Grades</h3>
    <ul class="grades-list">
      <li>Math: <strong>${s.grades.math}</strong></li>
      <li>Reading: <strong>${s.grades.reading}</strong></li>
      <li>Spanish: <strong>${s.grades.spanish}</strong></li>
      <li>Science: <strong>${s.grades.science}</strong></li>
      <li>Social Studies: <strong>${s.grades.social}</strong></li>
    </ul>
  `;

  document.getElementById('behavior').innerHTML = `<h3>Behavior Notes</h3><p>${s.behavior.replace(/\n/g, '<br>')}</p>`;
  document.getElementById('iep').innerHTML = `<h3>IEP Goals</h3><p>${s.iep.replace(/\n/g, '<br>')}</p>`;
  document.getElementById('contact').innerHTML = `<h3>Parent Contact</h3><p>${s.contact.replace(/\n/g, '<br>')}</p>`;

  dashboard.classList.remove('hidden');
}

select.addEventListener('change', e => e.target.value && showStudent(e.target.value));
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-panel').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

loadStudents();
setInterval(loadStudents, 30000);
