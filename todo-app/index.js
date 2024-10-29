// Importiert das Express-Framework
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware, um JSON im Anfrage-Body zu verarbeiten
app.use(express.json());

// Speicher für Aufgaben im Arbeitsspeicher
let tasks = [];
let taskIdCounter = 1;

// Neue Aufgabe hinzufügen
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    // Überprüft, ob der Titel der Aufgabe vorhanden ist
    if (!title) return res.status(400).send("Task title is required");

    // Erstellt eine neue Aufgabe und fügt sie zur Liste hinzu
    const newTask = { id: taskIdCounter++, title, completed: false };
    tasks.push(newTask);
    res.json(newTask);
});

// Aufgabe als erledigt markieren oder Status umkehren
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    // Überprüft, ob die Aufgabe existiert
    if (!task) return res.status(404).send("Task not found");

    // Ändert den Status der Aufgabe (erledigt/nicht erledigt)
    task.completed = !task.completed;
    res.json(task);
});

// Aufgabe löschen
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    // Entfernt die Aufgabe aus der Liste
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// Aufgaben abrufen (offene oben, erledigte unten)
app.get('/tasks', (req, res) => {
    const sortedTasks = [
        ...tasks.filter(task => !task.completed),
        ...tasks.filter(task => task.completed)
    ];
    res.json(sortedTasks);
});

// Stellt statische Dateien aus dem "public"-Verzeichnis bereit
app.use(express.static('public'));

// Startet den Server auf dem angegebenen Port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
