// Local Storage for data management
let internships = JSON.parse(localStorage.getItem('internships')) || [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let feedback = JSON.parse(localStorage.getItem('feedback')) || [];
let currentRole = 'student';

// Switch between Admin and Student roles
function switchRole(role) {
    currentRole = role;
    document.getElementById('admin-section').classList.toggle('hidden', role !== 'admin');
    document.getElementById('student-section').classList.toggle('hidden', role !== 'student');
    if (role === 'admin') displayAdminInternships();
    if (role === 'student') displayStudentInternships();
}

// Admin: Post Internship
document.getElementById('internship-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const internship = {
        id: Date.now(),
        title: document.getElementById('job-title').value,
        description: document.getElementById('job-description').value,
        duration: document.getElementById('duration').value,
        company: document.getElementById('company-name').value,
        postedDate: new Date().toLocaleDateString()
    };
    internships.push(internship);
    localStorage.setItem('internships', JSON.stringify(internships));
    this.reset();
    displayAdminInternships();
    alert('Internship posted successfully!');
});

// Display internships for Admin
function displayAdminInternships() {
    const container = document.getElementById('admin-internships');
    if (!container) return;
    
    container.innerHTML = internships.map(internship => `
        <div class="internship-item">
            <h3>${internship.title}</h3>
            <p><strong>Company:</strong> ${internship.company}</p>
            <p><strong>Duration:</strong> ${internship.duration} months</p>
            <p><strong>Description:</strong> ${internship.description}</p>
            <p><small>Posted: ${internship.postedDate}</small></p>
            <div class="actions">
                <button class="btn-secondary" onclick="editInternship(${internship.id})">Edit</button>
                <button class="btn-danger" onclick="deleteInternship(${internship.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Display internships for Students
function displayStudentInternships() {
    const container = document.getElementById('student-internships');
    if (!container) return;
    
    container.innerHTML = internships.map(internship => `
        <div class="internship-item">
            <h3>${internship.title}</h3>
            <p><strong>Company:</strong> ${internship.company}</p>
            <p><strong>Duration:</strong> ${internship.duration} months</p>
            <p><strong>Description:</strong> ${internship.description}</p>
            <div class="actions">
                <button class="btn-primary" onclick="applyForInternship(${internship.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

function deleteInternship(id) {
    if (confirm('Are you sure?')) {
        internships = internships.filter(i => i.id !== id);
        localStorage.setItem('internships', JSON.stringify(internships));
        displayAdminInternships();
    }
}

function editInternship(id) {
    alert('Edit functionality can be extended further');
}

function applyForInternship(id) {
    alert('Application submitted! You will be contacted soon.');
}

// Student: Add Task
document.getElementById('task-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        text: document.getElementById('task-input').value,
        completed: false,
        date: new Date().toLocaleDateString()
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.reset();
    displayTasks();
});

// Display Tasks
function displayTasks() {
    const container = document.getElementById('tasks-list');
    if (!container) return;
    
    container.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <h3>${task.text}</h3>
            <p><small>Added: ${task.date}</small></p>
            <div class="actions">
                <button class="btn-secondary" onclick="completeTask(${task.id})">Mark Complete</button>
                <button class="btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Initialize
window.addEventListener('load', function() {
    switchRole('student');
    displayTasks();
});
