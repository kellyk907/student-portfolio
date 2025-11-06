// YOUR GOOGLE SHEET CSV URL (update this once)
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCq3kShXZU02-bpw0IPdK21XlXzXIrdSOVgTl8c35d2NiYkaBr24ljVql5P6FnQK5_7IzHZds3vLOw/pub?output=csv';

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

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function loadStudents() {
  try {
    const response = await fetch(`${CSV_URL}&t=${Date.now()}`);
    if (!response.ok) throw new Error('CSV failed');
    const csv = await response.text();
    const lines = csv.trim().split('\n');
    if (lines.length < 2) throw new Error('No data');

    const rawHeaders = lines[0].split(',').map(h => h.trim());
    col = {};
    rawHeaders.forEach((h, i) => col[normalize(h)] = i);

    const required = ['student name', 'grade', 'photo_url'];
    const missing = required.filter(r => !(r in col));
    if (missing.length) {
      select.innerHTML = `<option>Error: Missing ${missing.join(', ')}</option>`;
      return;
    }

    students = lines.slice(1).map((line, idx) => {
      const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const first = vals[col['student name']] || '';
      const last = vals[col['student last name']] || '';
      const fullName = `${first} ${last}`.trim() || 'Unknown';

      return {
        id: idx + 1,
        fullName,
        grade: vals[col['grade']] || '',
        photo: vals[col['photo_url']] || 'https://via.placeholder.com/80?text=Photo',
        grades: {
          math: vals[col['math']] || '—',
          reading: vals[col['reading']] || '—',
          spanish: vals[col['spanish']] || '—',
          science: vals[col['science']] || '—',
          social: vals[col['social studies']] || '—'
        },
        behavior: vals[col['behavior_notes']] || 'No notes',
        iep: vals[col['iep_goals']] || 'No IEP',
        contact: vals[col['parent_contact']] || 'No contact'
      };
    }).filter(Boolean);

    populateDropdown();
  } catch (err) {
    console.error(err);
    select.innerHTML = '<option>Error loading data</option>';
  }
}

function populateDropdown() {
  select.innerHTML = '<option value="">Select a student...</option>';
  students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.fullName} - ${s.grade}`;
    select.appendChild(opt);
  });
}

function showStudent(id) {
  const s = students.find(stu => stu.id == id);
  if (!s) return;

  studentName.textContent = s.fullName;
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
    document.querySelectorAll('.tab-btn,.tab-panel').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

loadStudents();
setInterval(loadStudents, 30000);
