const motivationQu = [
    `"The beautiful thing about learning is that no one can take it away from you." —B.B. King`,
    `"The mind is not a vessel to be filled but a fire to be ignited." —Plutarch`,
    `"A person who never made a mistake never tried anything new." —Albert Einstein`,
    `"Procrastination makes easy things hard and hard things harder." —Mason Cooley`,
    `"You don’t have to be great to start, but you have to start to be great." –Zig Ziglar`,
    `"The expert in anything was once a beginner." —Helen Hayes`,
    `"There are no shortcuts to any place worth going." —Beverly Stills`,
    `"I find that the harder I work, the more luck I seem to have." –Thomas Jefferson`,
    `"Genius is 10% inspiration, 90% perspiration." —Thomas Edison`,
    `"Motivation is what gets you started. Habit is what keeps you going." –Jim Ryun`,
    `"Success is the sum of small efforts, repeated." —R. Collier`
]

function selectRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationQu.length);
    const selectedQuote = motivationQu [randomIndex]; 
    document.getElementById('randomQuote').innerText = selectedQuote;
}

selectRandomQuote();

setInterval(selectRandomQuote, 86400000);


// Subject Generator
/*const subjects = ["HTML", "CSS", "JavaScript", "Web API", "GitHub"];

function listSubjects() {
    for (let x = 0; x < subjects.length; x++) {
        console.log(subjects[x]);
    }
}

function generateSubject() {
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

    // WILL LIKELY BE REMOVED
    if (randomSubject === "HTML") {
        document.getElementById("what-subject").innerHTML = "HTML";
    } else if (randomSubject === "CSS") {
        document.getElementById("what-subject").innerHTML = "CSS";
    } else if (randomSubject === "JavaScript") {
        document.getElementById("what-subject").innerHTML = "JavaScript";
    } else if (randomSubject === "Web API") {
        document.getElementById("what-subject").innerHTML = "Web API";
    } else if (randomSubject === "GitHub") {
        document.getElementById("what-subject").innerHTML = "GitHub";
    } else {
        document.getElementById("what-subject").innerHTML = "Please try again!";
    }
    document.getElementById("what-subject").classList.add("highlight");
}

document.getElementById("what-subject").innerHTML = `<p class='generate-subject'>${randomSubject}</p>`;

listSubjects(); */

/*let subjects = [];

function addSubject() {
    const inputField = document.getElementsByClassName('userSubject');
    const lastInputField = inputField[inputField.length - 1];
    const userSubject = inputField.value.trim();

    if (userSubject) {
        subjects.push(userSubject);
        inputField.value = '';
        console.log(`Subject added: ${userSubject}.`);
    } else {
        console.log('Please enter a subject.');
    }
}

function generateRandomSubject() {
    if (subjects.length > 1) {
        const randomIndex = Math.floor(Math.random() * subjects.length);
        const randomSubject = subjects[randomIndex];
        alert(`Randomly selected subject: ${randomSubject}.`);
    } else {
        alert('No subjects available to select from.');
    }
}

const addSubjectButtons = document.getElementsByClassName('addSubject');
for (let button of addSubjectButtons) {
    button.addEventListener('click', addSubject);
}

const submitButton = document.getElementsByClassName('submitButton')[0];
submitButton.addEventListener('click', generateRandomSubject);*/

let subjects = [];

function addSubject() {
    const inputFields = document.getElementsByClassName('userSubject');
    let allSubjectsAdded = false;

    for (let inputField of inputFields) {
        const userSubject = inputField.value.trim();

        if (userSubject) {
            subjects.push(userSubject);
            allSubjectsAdded = true;
            console.log(`Subject added: ${userSubject}.`)
        } else {
            console.log('Please enter a subject.');
        }
    }

    for (let inputField of inputFields) {
        inputField.value = '';
    }

    if (!allSubjectsAdded) {
        console.log('No subjects were added.');
    }
}

function generateRandomSubject() {
    if (subjects.length > 1) {
        const randomIndex = Math.floor(Math.random() * subjects.length);
        const randomSubject = subjects[randomIndex];
        alert(`Randomly selected subject: ${randomSubject}.`);
    } else {
        alert('Need more than one subject to select from.');
    }
}

const addSubjectButtons = document.getElementsByClassName('addSubject');
for (let button of addSubjectButtons) {
    button.addEventListener('click', addSubject);
}

const submitButton = document.getElementsByClassName('submitButton')[0];
submitButton.addEventListener('click', generateRandomSubject);

//Test

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()