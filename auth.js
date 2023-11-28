// In-memory user database (replace with server-side authentication)
const users = [];

function showSignUpForm() {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('signUpSection').style.display = 'block';
}

function showSignInForm() {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
}

function createAccount() {
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');

    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;

    // Check if the username is already taken
    if (users.find(u => u.username === newUsername)) {
        alert('Username already exists. Please choose a different one.');
    } else {
        // Add the new user
        users.push({ username: newUsername, password: newPassword });
        alert('Account created successfully. You can now sign in.');
        // Reset the form
        newUsernameInput.value = '';
        newPasswordInput.value = '';
        // Show the sign-in form
        showSignInForm();
    }
}

function authenticateUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginSection = document.getElementById('loginSection');
    const taskListSection = document.getElementById('taskList');
    const taskFormSection = document.getElementById('taskForm');
    const pomodoroSection = document.getElementById('pomodoroSection');

    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        usernameInput.value = '';
        passwordInput.value = '';
        document.getElementById('authButtons').style.display = 'none';
        loginSection.style.display = 'none';
        taskListSection.style.display = 'block';
        taskFormSection.style.display = 'block';
        pomodoroSection.style.display = 'block';
    } else {
        // Failed login
        alert('Invalid username or password');
    }
}