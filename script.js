// NO EXTERNAL DEPENDENCIES — 25 STUDENTS HARDCODED
const students = [
  { id: 1, name: "Maria Gomez", grade: "5th", homeLang: "Spanish", photo: "https://i.pravatar.cc/80?img=1", math: "A-", reading: "B+", spanish: "A", science: "A-", social: "B+", behavior: "Great in group work, loves reading", iep: "Read 20 wpm → On track", contact: "10/30: Email - Great progress!" },
  { id: 2, name: "Jamal Carter", grade: "6th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=12", math: "B", reading: "A-", spanish: "B+", science: "B", social: "B", behavior: "Needed focus reminder", iep: "Math facts in 3 min → Needs support", contact: "10/15: Phone - Behavior plan" },
  { id: 3, name: "Sofia Chen", grade: "5th", homeLang: "Chinese", photo: "https://i.pravatar.cc/80?img=27", math: "A", reading: "A", spanish: "A-", science: "A", social: "A+", behavior: "Excellent participation", iep: "N/A", contact: "10/28: Email - Honor roll" },
  { id: 4, name: "Liam Patel", grade: "5th", homeLang: "Hindi", photo: "https://i.pravatar.cc/80?img=8", math: "B+", reading: "A-", spanish: "B", science: "A-", social: "B", behavior: "Asks great questions", iep: "N/A", contact: "10/25: Email - Strong effort" },
  { id: 5, name: "Ava Johnson", grade: "6th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=15", math: "A-", reading: "B+", spanish: "A", science: "B+", social: "A", behavior: "Leads group activities", iep: "Speech therapy → On track", contact: "10/20: Call - Positive update" },
  { id: 6, name: "Noah Garcia", grade: "4th", homeLang: "Spanish", photo: "https://i.pravatar.cc/80?img=20", math: "B+", reading: "B", spanish: "B+", science: "C+", social: "B", behavior: "Shy but improving", iep: "N/A", contact: "10/18: Email - Good week" },
  { id: 7, name: "Isabella Nguyen", grade: "5th", homeLang: "Vietnamese", photo: "https://i.pravatar.cc/80?img=22", math: "A", reading: "A-", spanish: "A+", science: "A", social: "A", behavior: "Role model student", iep: "N/A", contact: "10/22: Email - Top reader" },
  { id: 8, name: "Ethan Rodriguez", grade: "6th", homeLang: "Spanish", photo: "https://i.pravatar.cc/80?img=30", math: "B-", reading: "C+", spanish: "B", science: "B-", social: "C", behavior: "Needs focus in math", iep: "Math intervention → Improving", contact: "10/12: Call - Action plan" },
  { id: 9, name: "Olivia Lee", grade: "5th", homeLang: "Korean", photo: "https://i.pravatar.cc/80?img=33", math: "A+", reading: "A", spanish: "A+", science: "A+", social: "A+", behavior: "Gifted & talented", iep: "Advanced math → Thriving", contact: "10/26: Email - Scholarship rec" },
  { id: 10, name: "Mason Williams", grade: "6th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=38", math: "C+", reading: "B-", spanish: "C", science: "B-", social: "C", behavior: "Disruptive in transitions", iep: "Behavior plan → 80% compliance", contact: "10/10: Meeting - Weekly check-ins" },
  { id: 11, name: "Emma Davis", grade: "5th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=40", math: "B+", reading: "A-", spanish: "B+", science: "B", social: "B+", behavior: "Creative writer", iep: "N/A", contact: "10/24: Email - Story published" },
  { id: 12, name: "Lucas Martinez", grade: "4th", homeLang: "Spanish", photo: "https://i.pravatar.cc/80?img=42", math: "B", reading: "B+", spanish: "A-", science: "B+", social: "B", behavior: "Bilingual superstar", iep: "N/A", contact: "10/19: Email - Helping peers" },
  { id: 13, name: "Chloe Kim", grade: "6th", homeLang: "Korean", photo: "https://i.pravatar.cc/80?img=45", math: "A-", reading: "B+", spanish: "A", science: "B+", social: "A-", behavior: "Artistic & kind", iep: "N/A", contact: "10/27: Email - Mural project" },
  { id: 14, name: "Jacob Hernandez", grade: "5th", homeLang: "Spanish", photo: "https://i.pravatar.cc/80?img=48", math: "C+", reading: "B-", spanish: "C+", science: "C", social: "B-", behavior: "Struggles with reading", iep: "RTI Tier 2 → Progressing", contact: "10/14: Call - Extra support" },
  { id: 15, name: "Mia Thompson", grade: "5th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=50", math: "A-", reading: "B+", spanish: "A-", science: "B+", social: "B", behavior: "Loves science", iep: "N/A", contact: "10/23: Email - Volcano model" },
  { id: 16, name: "Alexander Lopez", grade: "6th", homeLang: "Spanish", photo: "https://i.pravatar.cc/80?img=52", math: "B+", reading: "A-", spanish: "B+", science: "B", social: "B+", behavior: "Soccer captain", iep: "N/A", contact: "10/21: Email - Leadership award" },
  { id: 17, name: "Abigail Walker", grade: "4th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=55", math: "B+", reading: "B+", spanish: "A-", science: "B+", social: "B", behavior: "New student, adjusting well", iep: "N/A", contact: "10/16: Email - Welcome call" },
  { id: 18, name: "Daniel Hall", grade: "5th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=58", math: "C", reading: "B-", spanish: "C+", science: "C+", social: "C-", behavior: "Off-task often", iep: "504 Plan → Seating change", contact: "10/11: Meeting - New strategies" },
  { id: 19, name: "Ella Allen", grade: "6th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=60", math: "A", reading: "A-", spanish: "A+", science: "A", social: "A", behavior: "Honor roll every term", iep: "GATE program", contact: "10/29: Email - College prep talk" },
  { id: 20, name: "James Young", grade: "5th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=62", math: "B-", reading: "C+", spanish: "B-", science: "B-", social: "C+", behavior: "Math anxiety", iep: "Tutoring → Gaining confidence", contact: "10/13: Call - Weekly wins" },
  { id: 21, name: "Harper King", grade: "4th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=65", math: "A-", reading: "B+", spanish: "A", science: "B+", social: "B+", behavior: "Loves animals", iep: "N/A", contact: "10/17: Email - Pet report" },
  { id: 22, name: "Benjamin Wright", grade: "6th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=68", math: "B+", reading: "B", spanish: "B+", science: "B+", social: "B", behavior: "Reliable helper", iep: "N/A", contact: "10/25: Email - Thank you" },
  { id: 23, name: "Evelyn Scott", grade: "5th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=70", math: "A", reading: "A-", spanish: "A+", science: "A", social: "A+", behavior: "Perfect attendance", iep: "N/A", contact: "10/28: Email - Role model" },
  { id: 24, name: "Michael Green", grade: "6th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=72", math: "C+", reading: "B-", spanish: "C+", science: "C", social: "B-", behavior: "Gaming distraction", iep: "Screen time contract", contact: "10/09: Meeting - Progress check" },
  { id: 25, name: "Lily Adams", grade: "5th", homeLang: "English", photo: "https://i.pravatar.cc/80?img=75", math: "B", reading: "A", spanish: "B+", science: "A-", social: "A", behavior: "Energetic artist", iep: "N/A", contact: "10/31: Email - Art show" }
];

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
  studentGrade.textContent = `${s.grade} (${s.homeLang})`;
  studentPhoto.src = s.photo;
  studentPhoto.alt = s.name;
  addPrintButton();

  document.getElementById('progress').innerHTML = `
    <h3>Grades</h3>
    <ul class="grades-list">
      <li>Math: <strong>${s.math}</strong></li>
      <li>Reading: <strong>${s.reading}</strong></li>
      <li>Spanish: <strong>${s.spanish}</strong></li>
      <li>Science: <strong>${s.science}</strong></li>
      <li>Social Studies: <strong>${s.social}</strong></li>
    </ul>
  `;

  document.getElementById('behavior').innerHTML = `<h3>Behavior Notes</h3><p>${s.behavior}</p>`;
  document.getElementById('iep').innerHTML = `<h3>IEP Goals</h3><p>${s.iep}</p>`;
  document.getElementById('contact').innerHTML = `<h3>Parent Contact</h3><p>${s.contact}</p>`;

  dashboard.classList.remove('hidden');
}

// Events
select.addEventListener('change', e => e.target.value && showStudent(e.target.value));
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-panel').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Load immediately
populateDropdown();
