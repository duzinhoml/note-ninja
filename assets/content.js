// Notes Form

const form = document.getElementById('notesForm');
function handleFormSubmission(event) {
    event.preventDefault();
    const subject = document.getElementById('subject').value.trim();
    const content = document.getElementById('content').value.trim();
    const errorElement = document.getElementById('error');
    errorElement.textContent = '';

    if (!subject || !content) {
        errorElement.textContent = "Please complete the form.";
        return;
    }
    const userNote = {
        subject: subject,
        content: content
    };
    let userNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
    userNotes.push(userNote);
    localStorage.setItem('userNotes', JSON.stringify(userNotes));
    renderNotesList();
    redirectPage();
}

function redirectPage() {
    window.location.href = '#notesList'
}

form.addEventListener('submit', handleFormSubmission);

// Notes List
const sectionElement = document.querySelector('section');
function createAndAppendElement() {
    const newArticle = document.createElement('article');
    sectionElement.appendChild(newArticle);
}
createAndAppendElement();

function noNotesFunction() {
    const messageElement = document.createElement('div');
    messageElement.textContent = "No Notes yet...";
    document.getElementById('notesList').appendChild(messageElement);
}
function renderNotesList() {
    const userNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    if (userNotes.length > 0) {
        userNotes.forEach(post => {
            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <h2>${post.subject}</h2>
                        <p>${post.content}</p>
                        `;
            notesList.appendChild(postElement);
        });
    } else {
        noNotesFunction();
    }
}
renderNotesList();

// Pomodoro Timer

let focusButton = document.getElementById('focus');
let buttons = document.querySelectorAll('.btn-break');
let shortBreakButton = document.getElementById('shortBreak');
let longBreakButton = document.getElementById('longBreak');
let startBtn = document.getElementById('btnStart');
let reset = document.getElementById('btnReset');
let pause = document.getElementById('btnPause');
let time = document.getElementById('time');
let set;
let active = 'focus';
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
};

reset.addEventListener('click', (
    resetTime = () => {
        pauseTimer();
        switch(active) {
            case 'long':
            minCount = 14;
            break;
            case 'short':
                minCount = 4;
                break;
                default:
                    minCount = 24;
                    break;
        }
        count = 59;
        time.textContent = `${minCount + 1}:00`;
    })
);

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove('btn-focus');
    });
};

focusButton .addEventListener('click', () => {
    active = 'focus';
    removeFocus();
    focusButton.classList.add('btn-focus');
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener('click', () => {
    active = 'short';
    removeFocus();
    shortBreakButton.classList.add('btn-focus');
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener('click', () => {
    active = 'long';
    removeFocus();
    longBreakButton.classList.add('btn-focus');
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener('click', (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove('hide');
    pause.classList.remove('show');
    reset.classList.remove('show');
})
);

startBtn.addEventListener('click', () => {
    reset.classList.add('show');
    pause.classList.add('show');
    startBtn.classList.add('hide');
    startBtn.classList.remove('show');
    if (paused) {
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if(count == 0) {
                if(minCount !=0) {
                    minCount--;
                    count = 60;
                }
                else {
                    clearInterval(set);
                }
            }
        }, 1000);
    }
});