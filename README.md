# To-Do-list
A simple To-Do application built with Express.js for the backend and vanilla HTML, CSS, and JavaScript for the frontend. This project is designed to help users manage tasks by adding, completing, deleting, and viewing a sorted list of tasks.

Features
Add a Task: Users can add new tasks with a title.
Complete a Task: Users can mark tasks as completed, which moves them to the bottom of the list and changes the task's appearance.
Delete a Task: Users can delete tasks from the list.
Sorting: The app sorts tasks automatically:
    Uncompleted tasks are displayed at the top (oldest first).
    Completed tasks are displayed at the bottom.
Keyboard Shortcut: Pressing the Enter key in the task input field adds the new task automatically.

Commenting
I have added comments throughout the code to make it easier to understand. (The comments are in German, as this is for my SAP application in Germany, and I want to make it as accessible as possible for the team.)

Technologies Used
Backend: Node.js with Express.js
Frontend: HTML5, CSS3, and Vanilla JavaScript
No Database: Data is stored in-memory on the server, so tasks are reset when the server restarts.

Project Structure
todo-app/
├── public/
│   ├── index.html          # Main HTML file
│   └── app.js              # Frontend JavaScript handling user interactions
├── index.js                # Backend server and API setup
├── package.json            # Project metadata and dependencies
└── node_modules/           # Project dependencies

public/index.html: Provides the structure and layout for the To-Do list UI. Includes an input field, buttons for task actions, and a styled list for tasks.

public/app.js: JavaScript for handling interactions between the user and the server, such as adding, completing, and deleting tasks.

index.js: Defines API endpoints to add, update, delete, and retrieve tasks. Uses Express.js for server setup.

package.json: Defines dependencies (express, typescript, etc.) and project information.

Setup
1. Navigate into the todo-app directory in terminal
2. Install Dependencies: Run npm install express to install the required packages.
3. Run the Server: Use node index.js to start the server.
4. Access the App: Open http://localhost:3000 in your browser to use the app.

Author
This project was created as part of an application for a position at SAP. The focus was to demonstrate fundamental skills in JavaScript, Node.js, and web application structure.
This projact was made by Leander Steffan.