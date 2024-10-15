// Quote Generator

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
    `"Success is the sum of small efforts, repeated." —R. Collier`,
    `“Excellence is not a skill. It is an attitude.” —Ralph Marston`,
    `“Quality is not an act, it is a habit.” —Aristotle`,
    `“The best way to predict your future is to create it.” —Abraham Lincoln`,
    `"Do the best you can until you know better. Then when you know better, do better.” —Maya Angelou`,
    `“If you hear a voice within you say ‘you cannot paint,’ then by all means paint, and the voice will be silenced.” —Vincent Van Gogh`
];

function selectRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationQu.length);
    const selectedQuote = motivationQu [randomIndex]; 
    document.getElementById('randomQuote').innerText = selectedQuote;
}

selectRandomQuote();

setInterval(selectRandomQuote, 86400000);

// Subject Generator

let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

// Adding subject from input field
document.getElementById('addSubjectBtn').addEventListener('click', function() {
    const subjectInput = document.getElementById('modalSubjectInput').value;
    if (subjectInput) {
        subjects.push(subjectInput);
        document.getElementById('modalSubjectInput').value = '';
        $('#optionsModal').modal('hide');
        showConfirmationModal();
    } else {
        placeholderChange();
        placeholderRevert();
    }
});

function showConfirmationModal() {
    if (subjects.length >= 1) {
        document.getElementById('subjectList').innerText = subjects.join(', ');
        $('#confirmModal').modal('show');
    }
};

function placeholderChange() {
        document.getElementById('modalSubjectInput').placeholder = 'Please enter a subject';
    }

function placeholderRevert() {
    document.getElementById('confirmBtn').addEventListener('click', function() {
    document.getElementById('modalSubjectInput').placeholder = 'Enter subject';
}); 
    document.getElementById('noConfirmBtn').addEventListener('click', function() {
    document.getElementById('modalSubjectInput').placeholder = 'Enter subject';
});
    document.getElementById('optionsBtn').addEventListener('click', function() {
        document.getElementById('modalSubjectInput').placeholder = 'Enter subject';
    });
}

// Confirm and save subjects to local storage
document.getElementById('confirmBtn').addEventListener('click', function() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    $('#confirmModal').modal('hide');
    $('#confirmDataSaveModal').modal('show');
});

// Getting a random subject from saved data
function getRandomSubject() {
    if (subjects.length > 1) {
        const randomIndex = Math.floor(Math.random() * subjects.length);
        return subjects[randomIndex];
    } else {
        return 'Please enter at least 2 subjects.';
    }
}

// Displaying random subject
document.getElementById('getRandomSubjectBtn').addEventListener('click', function() {
    const randomSubject = getRandomSubject();

    document.getElementById('subject-generator').innerHTML = `<p class='random-subject'>${randomSubject}</p>`;
    $('#optionsModal').modal('hide');
    $('#randomSubjectModal').modal('show');
});

// View Saved Data
document.getElementById('viewDataBtn').onclick = function() {

    const savedData = localStorage.getItem('subjects');
    const subjects = savedData ? JSON.parse(savedData) : [];

    const savedSubjectsDiv = document.getElementById('savedSubjects');
    savedSubjectsDiv.innerHTML = subjects.length > 0 ? subjects.join('<br>') : 'No saved subjects found.';

    $('#optionsModal').modal('hide');
    $('#viewSavedDataModal').modal('show');
};

// Clear Saved Data
document.getElementById('clearDataBtn').addEventListener('click', function() {
    localStorage.removeItem('subjects');
    $('#optionsModal').modal('hide');
    $('#clearDataModal').modal('show');
});

// Refresh page
const refreshButton = document.getElementById("refreshBtn");
refreshButton.addEventListener('click', function() {
    location.reload();
});

const refreshButton2 = document.getElementById('refreshBtn2');
refreshButton2.addEventListener('click', function() {
    location.reload();
});

