// YOUR NEW CSV LINK FROM STEP 2
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCq3kShXZU02-bpw0IPdK21XlXzXIrdSOVgTl8c35d2NiYkaBr24ljVql5P6FnQK5_7IzHZds3vLOw/pub?output=csv';  

// YOUR NEW CSV LINK
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1H0apGdCoHkYdhYK2xQuIphS-ixp8q61iAqS5tn5BEQk/pub?output=csv';

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

// Parse CSV with proper quote handling
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function loadStudents() {
  try {
    const response = await fetch(`${CSV_URL}&t=${Date.now()}`);
    if (!response.ok) throw new Error('CSV failed');
    const csv = await response.text();
    const lines = csv.trim().split('\n');
    if (lines.length < 2) throw new Error('No data');

    // Parse headers
    const rawHeaders = parseCSVLine(lines[0]);
    col = {};
    rawHeaders.forEach((h, i) => {
      const key = h.toLowerCase().replace(/\s+/g, ' ');
      col[key] = i;
    });

    // Required
    if (!('student name' in col)) {
      select.innerHTML = '<option>Error: "Student Name" column missing</option>';
      return;
    }

    students = lines.slice(1).map((line, idx) => {
      const vals = parseCSVLine(line);
      const first = vals[col['student name']] || '';
      const last = col['student last name'] !== undefined ? vals[col['student last name']] || '' : '';
      const fullName = `${first} ${last}`.trim() || 'Unknown';

      return {
        id: idx + 1,
        fullName,
        grade: col['grade'] !== undefined ? vals[col['grade']] || '' : '',
        photo: col['photo_url'] !== undefined ? vals[col['photo_url']] || 'https://via.placeholder.com/80?text=Photo' : 'https://via.placeholder.com/80?text=Photo',
        grades: {
          math: col['math'] !== undefined ? vals[col['math']] || '—' : '—',
          reading: col['reading'] !== undefined ? vals[col['reading']] || '—' : '—',
          spanish: col['spanish'] !== undefined ? vals[col['spanish']] || '—' : '—',
          science: col['science'] !== undefined ? vals[col['science']] || '—' : '—',
          social: col['social studies'] !== undefined ? vals[col['social studies']] || '—' : '—'
        },
        behavior: col['behavior_notes'] !== undefined ? vals[col['behavior_notes']] || 'No notes' : 'No notes',
        iep: col['iep_goals'] !== undefined ? vals[col['iep_goals']] || 'No IEP' : 'No IEP',
        contact: col['parent_contact'] !== undefined ? vals[col['parent_contact']] || 'No contact' : 'No contact'
      };
    }).filter(s => s.fullName !== 'Unknown');

    populateDropdown();
  } catch (err) {
    console.error(err);
    select.innerHTML = '<option>Error: ' + err.message + '</option>';
  }
}

function populateDropdown() {
  select.innerHTML = '<option value="">Select a student...</option>';
  students.forEach(s => {
    const opt = document.create.TheElement('option');
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
