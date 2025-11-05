// YOUR GOOGLE SHEET CSV URL (replace this!)
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1H0apGdCoHkYdhYK2xQuIphS-ixp8q61iAqS5tn5BEQk/edit?gid=0#gid=0';

let students = [];

// DOM Elements
const select = document.getElementById('student-select');
const dashboard = document.getElementById('dashboard');
const studentName = document.getElementById('student-name');
const studentGrade = document.getElementById('student-grade');
const studentPhoto = document.querySelector('.student-photo');
const printBtn = document.createElement('button');

// Print Button
printBtn.textContent = 'Print PDF';
printBtn.className = 'print-btn';
printBtn.onclick = () => window.print();
document.querySelector('.student-header').appendChild(printBtn);

// Fetch and parse CSV
async function loadStudents() {
  try {
    const response = await fetch(CSV_URL + '&t=' + Date.now()); // cache bust
    const csv = await response.text();
    const rows = csv.split('\n').slice(1);

    students = rows.map((row, i) => {
      const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols[0] === '') return null;
      return {
        id: i + 1,
        name: cols[0] || 'Unknown',
        grade: cols[1] || '',
        photo: cols[2] || 'https://via.placeholder.com/80?text=Photo',
        grades: { math: cols[3], reading: cols[4], spanish: cols[5] },
        behavior: cols[6] || 'No notes',
        iep: cols[7] || 'No IEP',
        contact: cols[8] || 'No contact'
      };
    }).filter(Boolean);

    populateDropdown();
  } catch (err) {
    select.innerHTML = '<option>Error loading data</option>';
  }
}

function populateDropdown() {
  select.innerHTML = '<option value="">Select a student...</option>';
  students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} - ${s.grade}`;
    select.appendChild(opt);
  });
}

function showStudent(id) {
  const s = students.find(stu => stu.id == id);
  if (!s) return;

  studentName.textContent = s.name;
  studentGrade.textContent = s.grade;
  studentPhoto.src = s.photo;
  studentPhoto.alt = s.name;

  document.getElementById('progress').innerHTML = `
    <h3>Grades</h3>
    <ul class="grades-list">
      <li>Math: <strong>${s.grades.math}</strong></li>
      <li>Reading: <strong>${s.grades.reading}</strong></li>
      <li>Spanish: <strong>${s.grades.spanish}</strong></li>
    </ul>
  `;

  document.getElementById('behavior').innerHTML = `<h3>Behavior Notes</h3><p>${s.behavior.replace(/\n/g, '<br>')}</p>`;
  document.getElementById('iep').innerHTML = `<h3>IEP/504 Goals</h3><p>${s.iep.replace(/\n/g, '<br>')}</p>`;
  document.getElementById('contact').innerHTML = `<h3>Parent Contact Log</h3><p>${s.contact.replace(/\n/g, '<br>')}</p>`;

  dashboard.classList.remove('hidden');
}

// Events
select.addEventListener('change', (e) => e.target.value && showStudent(e.target.value));
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Load + Auto-refresh
loadStudents();
setInterval(loadStudents, 30000);
