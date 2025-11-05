// YOUR GOOGLE SHEET CSV URL (update this once)
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLw.../pub?output=csv';  // ← YOUR LINK

let students = [];
let headerMap = {};  // Will map header names to column index

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
  btn.onclick
