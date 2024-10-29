// URL der API für Aufgaben
const API_URL = 'http://localhost:3000/tasks';

// Lädt die Aufgaben beim Laden der Seite
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    // Ruft alle Aufgaben von der API ab
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            // Leert die Liste und fügt alle Aufgaben hinzu
            taskList.innerHTML = '';
            tasks.forEach(task => addTaskToDOM(task));
        });
}

// Fügt eine neue Aufgabe hinzu
function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const title = newTaskInput.value.trim();
    // Überprüft, ob der Titel nicht leer ist
    if (!title) return;

    // Sendet eine POST-Anfrage an die API, um eine neue Aufgabe hinzuzufügen
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    .then(response => response.json())
    .then(task => {
        addTaskToDOM(task);
        newTaskInput.value = '';
    });
}

// Wechselt den Status der Aufgabe (erledigt/nicht erledigt)
function toggleTaskCompletion(id) {
    // Sendet eine PUT-Anfrage an die API, um den Status der Aufgabe zu ändern
    fetch(`${API_URL}/${id}`, { method: 'PUT' })
        .then(response => response.json())
        .then(updatedTask => {
            const taskElement = document.getElementById(`task-${updatedTask.id}`);
            // Fügt den Stil "completed" hinzu oder entfernt ihn
            taskElement.classList.toggle('completed');
            loadTasks();    // Lädt Task Liste neu um es richtig zu sortieren und den Button zu switchen
        });
}

// Löscht eine Aufgabe
function deleteTask(id) {
    // Sendet eine DELETE-Anfrage an die API, um die Aufgabe zu löschen
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => {
            const taskElement = document.getElementById(`task-${id}`);
            // Entfernt das Element der Aufgabe aus der DOM
            taskElement.remove();
        });
}

// Fügt eine Aufgabe in die Benutzeroberfläche ein
function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const taskElement = document.createElement('li');
    taskElement.id = `task-${task.id}`;
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    // HTML-Inhalt der Aufgabe, einschließlich Buttons für Aktionen
    taskElement.innerHTML = `
        <span>${task.title}</span>
        <span>
            <button onclick="toggleTaskCompletion(${task.id})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </span>
    `;
    taskList.appendChild(taskElement);
}

// fügt einen "event listener" hinzu der "hört" ob man Enter drückt um eine neu Task zu erstellen.
document.getElementById('newTask').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

