document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const taskList = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');
    const startPomodoroButton = document.getElementById('startPomodoro');
    const pauseResumePomodoroButton = document.getElementById('pauseResumePomodoro');
    const countdownDisplay = document.getElementById('countdown');

    let pomodoroInterval;
    let remainingTime;
    let isPaused = false;

    // Event listener for the task addition form
    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get task details from form
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        // Check if the task title is not empty
        if (taskTitle.trim() !== '') {
            // Create a new task element
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

            // Parse due date and time
            const dueDateTime = new Date(`${taskDate}T${taskTime}`);

            // Populate task element with details
            taskElement.innerHTML = `
                <span>${taskTitle}</span>
                <span class="due-date">${dueDateTime.toLocaleDateString()}</span>
                <span class="due-time">${dueDateTime.toLocaleTimeString()}</span>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            `;

            // Add the task element to the task list
            taskList.appendChild(taskElement);

            // Clear the input fields
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskTime').value = '';
        }
    });

    // Add JavaScript logic for toggling dark mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;

        darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    
    // Update the button text based on dark mode state
        const buttonText = body.classList.contains('dark-mode') ? 'Exit Batman Mode' : 'Enter Batman Mode';
        darkModeToggle.textContent = buttonText;
});


    // Event listener for the Pomodoro button
    startPomodoroButton.addEventListener('click', startPomodoro);

    // Event listener for the Pause/Resume Pomodoro button
    pauseResumePomodoroButton.addEventListener('click', pauseResumePomodoro);

    // Function to delete a task
    window.deleteTask = function (button) {
        const taskElement = button.closest('.task');
        taskElement.remove();
    };

    // Function to edit a task
    window.editTask = function (button) {
        const taskElement = button.closest('.task');

        // Extract current task details
        const currentTitle = taskElement.querySelector('span').textContent;
        const currentDueDate = taskElement.querySelector('.due-date').textContent;
        const currentDueTime = taskElement.querySelector('.due-time').textContent;

        // Create a form for editing
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <label for="editTaskTitle">Task Title:</label>
            <input type="text" id="editTaskTitle" value="${currentTitle}" required>

            <label for="editTaskDate">Due Date:</label>
            <input type="date" id="editTaskDate" value="${currentDueDate}" required>

            <label for="editTaskTime">Due Time:</label>
            <input type="time" id="editTaskTime" value="${currentDueTime}" required>

            <button type="button" onclick="saveEditedTask()">Save</button>
            <button type="button" onclick="cancelEditTask()">Cancel</button>
        `;

        // Replace the task element with the edit form
        taskElement.replaceWith(editForm);
    };

    // Function to save the edited task
    window.saveEditedTask = function () {
        const editForm = document.querySelector('form');
        const editedTitle = document.getElementById('editTaskTitle').value;
        const editedDate = document.getElementById('editTaskDate').value;
        const editedTime = document.getElementById('editTaskTime').value;

        // Validate and update the edited task details
        if (editedTitle.trim() !== '') {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

            const editedDueDateTime = new Date(`${editedDate}T${editedTime}`);

            taskElement.innerHTML = `
                <span>${editedTitle}</span>
                <span class="due-date">${editedDueDateTime.toLocaleDateString()}</span>
                <span class="due-time">${editedDueDateTime.toLocaleTimeString()}</span>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            `;

            editForm.replaceWith(taskElement);
        } else {
            // Handle validation error
            alert('Task title cannot be empty. Please enter a title.');
        }
    };

    // Function to cancel the task edit
    window.cancelEditTask = function () {
        const editForm = document.querySelector('form');
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        // Restore the original task details
        const currentTitle = editForm.querySelector('#editTaskTitle').value;
        const currentDueDate = editForm.querySelector('#editTaskDate').value;
        const currentDueTime = editForm.querySelector('#editTaskTime').value;
        const currentDueDateTime = new Date(`${currentDueDate}T${currentDueTime}`);

        taskElement.innerHTML = `
            <span>${currentTitle}</span>
            <span class="due-date">${currentDueDateTime.toLocaleDateString()}</span>
            <span class="due-time">${currentDueDateTime.toLocaleTimeString()}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        editForm.replaceWith(taskElement);
    };

    // Function to start the Pomodoro timer
    function startPomodoro() {
        // Get the Pomodoro duration from the input field
        const pomodoroDuration = document.getElementById('pomodoroDuration').value;

        // Check if the input is a valid number greater than 0
        if (!isNaN(pomodoroDuration) && pomodoroDuration > 0) {
            console.log(`Pomodoro started! Work session duration: ${pomodoroDuration} minutes`);

            remainingTime = pomodoroDuration * 60; // Convert minutes to seconds
            updateCountdownDisplay();

            pomodoroInterval = setInterval(function () {
                if (!isPaused) {
                    if (remainingTime > 0) {
                        remainingTime--;
                        updateCountdownDisplay();
                    } else {
                        clearInterval(pomodoroInterval);
                        console.log('Pomodoro session completed!');
                    }
                }
            }, 1000); // Update every second
        } else {
            console.log('Please enter a valid Pomodoro duration.');
        }
    }

    // Function to pause or resume the Pomodoro timer
    function pauseResumePomodoro() {
        isPaused = !isPaused;
        if (isPaused) {
            console.log('Pomodoro paused.');
        } else {
            console.log('Pomodoro resumed.');
        }
    }

    // Function to update the countdown display
    function updateCountdownDisplay() {
        if (countdownDisplay) {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            console.error('Countdown display element not found.');
        }
    }
});
