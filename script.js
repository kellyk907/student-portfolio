// YOUR GOOGLE SHEET CSV URL (update this once)
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCq3kShXZU02-bpw0IPdK21XlXzXIrdSOVgTl8c35d2NiYkaBr24ljVql5P6FnQK5_7IzHZds3vLOw/pub?output=csv';

let students = [];
let col = {};  // Will hold column indices by header name

// DOM Elements
const select = document.getElementById('student-select');
const dashboard = document.getElementById('dashboard');
const studentName = document.getElementById('student-name');
const studentGrade = document.getElementById('student-grade');
const studentPhoto = document.querySelector('.student-photo');

// Print Button
function addPrintButton() {
  if (document.querySelector('.print-btn')) return;
  const btn = document.createElement('button');
  btn.textContent = 'Print PDF';
  btn.className = 'print-btn';
  btn.onclick = () => window.print();
  document.querySelector('.student-header').appendChild(btn);
}

// Load CSV and map headers
async function loadStudents() {
  try {
    const cacheBust = Date.now();
    const response = await fetch(`${CSV_URL}&t=${cacheBust}`);
    if (!response.ok) throw new Error('Failed to load CSV');
    const csv = await response.text();
    const lines = csv.trim().split('\n');
    
    // Parse headers (first row)
    const headers = lines[0].split(',').map(h => h.trim());
    col = {};
    headers.forEach((h, i) => col[h] = i);

    // Required columns check
    const required = ['Student Name', 'Grade', 'Photo_url'];
    for (let r of required) {
      if (!(r in col)) {
        select.innerHTML = `<option>Error: Missing "${r}" column</option>`;
        return;
      }
    }

    // Parse student rows
    students = lines.slice(1).map((line, idx) => {
      const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      if (!vals[col['Student Name']]) return null;

      const first = vals[col['Student Name']] || '';
      const last = vals[col['Student Last Name']] || '';
      const fullName = `${first} ${last}`.trim() || 'Unknown Student';

      return {
        id: idx + 1,
        fullName,
        firstName: first,
        lastName: last,
        gender: vals[col['Gender']] || '',
        grade: vals[col['Grade']] || '',
        homeLang: vals[col['Home Language']] || '',
        photo: vals[col['Photo_url']] || 'https://via.placeholder.com/80?text=Photo',
        grades: {
          math: vals[col['math']] || 'N/A',
          reading: vals[col['reading']] || 'N/A',
          spanish: vals[col['spanish']] || 'N/A',
          science: vals[col['science']] || 'N/A',
          social: vals[col['social studies']] || 'N/A'
        },
        behavior: vals[col['behavior_notes']] || 'No notes',
        iep: vals[col['iep_goals']] || 'No IEP',
        contact: vals[col['parent_contact']] || 'No contact'
      };
    }).filter(Boolean);

    populateDropdown();
    console.log(`Loaded ${students.length} students`);
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
  studentGrade.textContent = `${s.grade} • ${s.homeLang}`;
  studentPhoto.src = s.photo;
  studentPhoto.alt = s.fullName;
  addPrintButton();

  // Progress Tab
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

  // Other tabs
  document.getElementById('behavior').innerHTML = `<h3>Behavior Notes</h3><p>${s.behavior.replace(/\n/g, '<br>')}</p>`;
  document.getElementById('iep').innerHTML = `<h3>IEP Goals</h3><p>${s.iep.replace(/\n/g, '<br>')}</p>`;
  document.getElementById('contact').innerHTML = `<h3>Parent Contact</h3><p>${s.contact.replace(/\n/g, '<br>')}</p>`;

  dashboard.classList.remove('hidden');
}

// Events
select.addEventListener('change', e => e.target.value && showStudent(e.target.value));
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn,.tab-panel').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Load + auto-refresh
loadStudents();
setInterval(loadStudents, 30000);
