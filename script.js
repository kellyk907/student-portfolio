// YOUR NEW CSV LINK FROM STEP 2
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

function findColumn(headers, target) {
  const normalized = target.toLowerCase().replace(/\s+/g, ' ');
  return headers.findIndex(h => normalize(h).includes(normalized));
}

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function loadStudents() {
  try {
    const response = await fetch(`${CSV_URL}&t=${Date.now()}`);
    if (!response.ok) throw new Error('CSV fetch failed');
    const csv = await response.text();
    const lines = csv.trim().split('\n');
    if (lines.length < 2) throw new Error('No data in sheet');

    const rawHeaders = lines[0].split(',').map(h => h.trim());
    console.log('Detected headers:', rawHeaders);  // Debug: Check browser console

    // Map columns with fuzzy matching
    col.studentName = findColumn(rawHeaders, 'student name') >= 0 ? findColumn(rawHeaders, 'student name') : 0;
    col.studentLastName = findColumn(rawHeaders, 'student last name');
    col.grade = findColumn(rawHeaders, 'grade');
    col.photoUrl = findColumn(rawHeaders, 'photo_url') >= 0 ? findColumn(rawHeaders, 'photo_url') : findColumn(rawHeaders, 'photo');
    col.math = findColumn(rawHeaders, 'math');
    col.reading = findColumn(rawHeaders, 'reading');
    col.spanish = findColumn(rawHeaders, 'spanish');
    col.science = findColumn(rawHeaders, 'science');
    col.socialStudies = findColumn(rawHeaders, 'social studies');
    col.behaviorNotes = findColumn(rawHeaders, 'behavior_notes');
    col.iepGoals = findColumn(rawHeaders, 'iep_goals');
    col.parentContact = findColumn(rawHeaders, 'parent_contact');

    // Check if core columns found
    if (col.studentName < 0) {
      select.innerHTML = '<option>Error: Could not find "Student Name" column. Check headers.</option>';
      return;
    }

    students = lines.slice(1).map((line, idx) => {
      const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const first = vals[col.studentName] || '';
      const last = col.studentLastName >= 0 ? vals[col.studentLastName] || '' : '';
      const fullName = `${first} ${last}`.trim() || 'Unknown';

      return {
        id: idx + 1,
        fullName,
        grade: col.grade >= 0 ? vals[col.grade] || '' : '',
        photo: col.photoUrl >= 0 ? vals[col.photoUrl] || 'https://via.placeholder.com/80?text=Photo' : 'https://via.placeholder.com/80?text=Photo',
        grades: {
          math: col.math >= 0 ? vals[col.math] || '—' : '—',
          reading: col.reading >= 0 ? vals[col.reading] || '—' : '—',
          spanish: col.spanish >= 0 ? vals[col.spanish] || '—' : '—',
          science: col.science >= 0 ? vals[col.science] || '—' : '—',
          social: col.socialStudies >= 0 ? vals[col.socialStudies] || '—' : '—'
        },
        behavior: col.behaviorNotes >= 0 ? vals[col.behaviorNotes] || 'No notes' : 'No notes',
        iep: col.iepGoals >= 0 ? vals[col.iepGoals] || 'No IEP' : 'No IEP',
        contact: col.parentContact >= 0 ? vals[col.parentContact] || 'No contact' : 'No contact'
      };
    }).filter(s => s.fullName !== 'Unknown');

    populateDropdown();
    console.log('Loaded students:', students);  // Debug
  } catch (err) {
    console.error('Load error:', err);
    select.innerHTML = '<option>Error: ' + err.message + '</option>';
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
    document.querySelectorAll('.tab-btn, .tab-panel').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

loadStudents();
setInterval(loadStudents, 30000);
