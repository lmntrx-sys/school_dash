// This file is for custom JS code to enhance functionality of a site
// You can add your own code here, and it will be included in the site bundle
// It supports various features e.g 
//                              calculate grades
//                              toggle dark mode
//                              validate forms
//                              update content dynamically
//                              update a clock 

// Calculate grade

'use strict';
let students = []

// DOM elements
const form = document.getElementById('student-form');
const tableBody = document.querySelector('#results-table tbody');
const averageEl = document.getElementById('average');
const passesFailsEl = document.getElementById('passes-fails');
const clockEl = document.getElementById('clock');

function calculateGrade(total){

    if (total >= 70){
        return "A";
    } else if (total >= 60){
        return "B";
    }else if (total >= 50){
        return "C";
    }else if (total >= 40){
        return "D";
    }else if (total <= 39){
        return "Fail";
    }else {
        return "FILL the form!!";
    }
}

function validateForm(regNo, exam, cat){
    if (!regNo || exam === '' || cat === ''){
        alert('All fields are required');
        return false;
    }

    if (exam < 0 || exam > 70){
        alert('Exam marks cannot exceed 70');
        return false;
    }
     // use logical OR operator to check if cat is less than 0 or greater than 30
    if (isNaN(exam) || isNaN(cat)){
        alert('Please enter valid numbers for CAT and Exam marks');
        return false;
    }
    

    return true;

}

// Function to update the results table dynamically
function updateTable() {
    // Clear existing rows
    tableBody.innerHTML = '';

    // Loop through students and create rows
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.regNo}</td>
            <td>${student.total}</td>
            <td>${student.grade}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update dashboard statistics
function updateDashboard() {
    if (students.length === 0) {
        averageEl.textContent = 'Class Average: 0';
        passesFailsEl.textContent = 'Passes: 0 | Fails: 0';
        return;
    }

    // Calculate average
    const totalMarks = students.reduce((sum, student) => sum + student.total, 0);
    const average = (totalMarks / students.length).toFixed(2);
    averageEl.textContent = `Class Average: ${average}`;

    // Count passes and fails
    const passes = students.filter(student => student.grade !== 'Fail').length;
    const fails = students.length - passes;
    passesFailsEl.textContent = `Passes: ${passes} | Fails: ${fails}`;
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get input values
    const regNo = document.getElementById('regNo').value.trim();
    const cat = parseFloat(document.getElementById('cat').value);
    const exam = parseFloat(document.getElementById('exam').value);

    // Validate
    if (!validateForm(regNo, cat, exam)) {
        return;
    }

    // Calculate total and grade
    const total = cat + exam;
    const grade = calculateGrade(total);

    // Create student object
    const student = { regNo, cat, exam, total, grade };

    // Add to array
    students.push(student);

    // Update table and dashboard
    updateTable();
    updateDashboard();

    // Clear form
    form.reset();
});

// Function to update clock every second
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clockEl.textContent = `Current Time: ${timeString}`;
}

// Start clock using setInterval
setInterval(updateClock, 1000);

// Initial clock update
updateClock();