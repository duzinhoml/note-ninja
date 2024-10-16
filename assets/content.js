// Flashcards

const container = document.querySelector(".flashcards-container");
const containerBg = document.getElementById('flashcardsBg');
const addQuestionBg = document.getElementById('questionsBg');
const addQuestionCard = document.getElementById('add-question-card');
const cardButton = document.getElementById('save-btn');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const errorMessage = document.getElementById('errorFC');
const addQuestion = document.getElementById('add-flashcard');
const closeBtn = document.getElementById('close-btn');
let editBool = false;

// Local Storage
let questionStored = JSON.parse(localStorage.getItem('questionStored')) || [];
let answerStored = JSON.parse(localStorage.getItem('questionStored')) || [];

function storeValue() {
    let textareaQ = document.getElementById('question');
    let question = textareaQ.value;
    localStorage.setItem('questionKey', question);
    let textareaA = document.getElementById('answer');
    let answer = textareaA.value;
    localStorage.setItem('answerKey', answer);
}

// Add question
addQuestion.addEventListener('click', () => {
    container.classList.add('hide');
    containerBg.classList.add('hide');
    question.value = '';
    answer.value = '';
    addQuestionBg.classList.remove('hide');
    addQuestionCard.classList.remove('hide');
});

// Hide Create Flashcard Card
closeBtn.addEventListener('click', (hideQuestion = () => {
    container.classList.remove('hide');
    containerBg.classList.remove('hide');
    addQuestionBg.classList.add('hide');
    addQuestionCard.classList.add('hide');
    if (editBool) {
        editBool = false;
        submitQuestion();
    };
})
);

// Submit Question
cardButton.addEventListener('click', (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove('hide');
    } else {
        const questionInput = document.getElementById('question').value;
        const answerInput = document.getElementById('answer').value;
        questionStored.push(questionInput);
        answerStored.push(answerInput);
        containerBg.classList.remove('hide');
        container.classList.remove('hide');
        errorMessage.classList.add('hide');
        storeValue();
        viewlist();
        question.value = '';
        answer.value = '';
    };
})
);

// Save Question & Answer to Local Storage
document.getElementById('save-btn').addEventListener('click', function() {
    localStorage.setItem('questionStored', JSON.stringify(questionStored));
    localStorage.setItem('answerStored', JSON.stringify(answerStored));
    });

// NEEDS WORK ON //
// Card Generator
function viewlist() {
    let listCard = document.getElementsByClassName('card-list-con');
    let div = document.createElement('div');
    div.classList.add('card');
    // Question
    let storedQuestion = localStorage.getItem('questionKey');
    div.innerHTML += `<p class='question-div'>${storedQuestion}</p>`;
    // Answer
    let storedAnswer = localStorage.getItem('answerKey');
    div.innerHTML += `<p class='answer-div'>${storedAnswer}</p>`;

    let displayAnswer = document.createElement('p');
    displayAnswer.classList.add('answer-div', 'hide');
    displayAnswer.innerText = answer.value;

    // Link to show/hide answer
    let link = document.createElement('a');
    //link.setAttribute('href', '#');//
    link.setAttribute('class', 'show-hide-btn');
    link.innerHTML = 'Show/Hide';
    link.addEventListener('click', () => {
        displayAnswer.classList.toggle('hide');
    })

    div.appendChild(link);
    div.appendChild(displayAnswer);

    // Edit button
    let buttonsCon = document.createElement('div');
    buttonsCon.classList.add('buttons-con');
    let editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.addEventListener('click', () => {
        editBool = true;
        modifyElement(editButton, true);
        addQuestionBg.classList.remove('hide');
        addQuestionCard.classList.remove('hide');
    });
    buttonsCon.appendChild(editButton);
    disableButtons(false);

    // Delete Button
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton);
    });
    buttonsCon.appendChild(deleteButton);

    div.appendChild(buttonsCon);
    listCard[0].appendChild(div);
    hideQuestion();
}

// Modify Elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector('.question-div').innerText;
    if (edit) {
        let parentAns = parentDiv.querySelector('.answer-div').innerText;
        answer.value = parentAns;
        question.value = parentQuestion;
        disableButtons(true);
    }
    parentDiv.remove();
};

// Disable Edit & Delete Buttons
const disableButtons = (value) => {
    let editButtons = document.getElementsByClassName('edit');
    Array.from(editButtons).forEach(element => {
        element.disabled = value;
    });
};

window.onload = function() {
    viewlist();
};

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