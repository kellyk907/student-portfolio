// Sample data
const students = [
  { 
    id: 1, 
    name: "Maria Gomez", 
    grade: "5th Grade", 
    photo: "images/Maria.jpg"  
  },
  { 
    id: 2, 
    name: "Jamal Carter", 
    grade: "6th Grade", 
    photo: "images/jamal.jpg" 
  },
  { 
    id: 3, 
    name: "Sofia Chen", 
    grade: "5th Grade", 
    photo: "images/sofia.jpg" 
  }
];

// DOM Elements
const select = document.getElementById('student-select');
const dashboard = document.getElementById('dashboard');
const studentName = document.getElementById('student-name');
const studentGrade = document.getElementById('student-grade');
const studentPhoto = document.querySelector('.student-photo');

// Populate dropdown
students.forEach(s => {
  const opt = document.createElement('option');
  opt.value = s.id;
  opt.textContent = `${s.name} - ${s.grade}`;
  select.appendChild(opt);
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Student select
select.addEventListener('change', (e) => {
  const student = students.find(s => s.id == e.target.value);
  if (student) {
    studentName.textContent = student.name;
    studentGrade.textContent = student.grade;
    studentPhoto.src = student.photo;
    dashboard.classList.remove('hidden');
  }
});
