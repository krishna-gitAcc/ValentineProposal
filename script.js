// ===== Valentine's Ask - Interactive Script =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global effects
    initFloatingHearts();
    initCursorSparkle();

    // Initialize specific screen interactions
    initQuiz();
    initProposalInteractions();
});

// ===== State Management =====
function nextScreen(screenNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });

    // Show target screen
    const target = document.getElementById(`screen-${getScreenName(screenNumber)}`);
    if (target) {
        target.classList.remove('hidden');
        // Small delay to allow display:flex to apply before opacity transition
        setTimeout(() => {
            target.classList.add('active');
        }, 50);
    }
}

function getScreenName(num) {
    switch (num) {
        case 1: return 'welcome';
        case 2: return 'quiz';
        case 3: return 'proposal';
        case 4: return 'date';
        default: return 'welcome';
    }
}

// ===== Interface 2: Quiz Logic =====
function initQuiz() {
    // Logic handled via inline onclicks for simplicity in HTML,
    // but helper functions defined here
}

window.wrongAnswer = function (btn) {
    // Shake animation
    btn.classList.add('feedback-wrong');
    btn.textContent = "Try Again! 😜";

    const feedback = document.getElementById('quiz-feedback');
    feedback.textContent = "Nope! Guess again! (Hint: It's the one who made this)";
    feedback.style.color = '#ff4d6d';

    setTimeout(() => {
        btn.classList.remove('feedback-wrong');
    }, 500);
}

window.correctAnswer = function () {
    const feedback = document.getElementById('quiz-feedback');
    feedback.textContent = "Correct! You know it! 🥰";
    feedback.style.color = '#4cc9f0';

    // Celebration sparkles
    for (let i = 0; i < 10; i++) {
        createSparkle(window.innerWidth / 2, window.innerHeight / 2);
    }

    setTimeout(() => {
        nextScreen(3);
    }, 1000);
}

// ===== Interface 3: Proposal Interactions =====
function initProposalInteractions() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionCard = document.getElementById('questionCard');

    let noButtonClickCount = 0;
    let yesBtnScale = 1;

    const romanticPleas = [
        { text: "Really? 🥺", subtitle: "But distance is just a number..." },
        { text: "Please? 💕", subtitle: "My heart is right there with you..." },
        { text: "Pretty please? 🙏", subtitle: "I'd fly to you right now if I could..." },
        { text: "Think about it? 💭", subtitle: "Skype dates are better than no dates..." },
        { text: "One more chance? 😢", subtitle: "You're worth every mile..." },
        { text: "I'll be so sad! 😭", subtitle: "I'm sending you virtual hugs..." },
        { text: "Don't break my heart 💔", subtitle: "We're under the same sky..." },
        { text: "Last chance... 🥹", subtitle: "You're my favorite notification..." },
        { text: "Just say yes! 💖", subtitle: "I promise to FaceTime you every day!" }
    ];

    const hoverMessages = [
        "Too slow! ✈️",
        "Can't catch my heart! 💨",
        "I'm faster than a text! 😏",
        "The Yes button travels to you! 💕",
        "Wrong button! Try the love-plane! 💖",
        "Distance makes the heart grow fonder! ✨",
        "You know you want to say Yes! 🥰",
        "Come on, be my LDR Valencia! ☀️"
    ];

    // Yes Button Click - Success -> Go to Date Planner
    yesBtn.addEventListener('click', () => {
        createConfetti();
        nextScreen(4);
        startCelebrationHearts();
    });

    // No Button - Runs Away Logic (kept from previous version)
    noBtn.addEventListener('mouseenter', (e) => {
        // Show message
        showFloatingMessage(e.clientX, e.clientY, hoverMessages[Math.floor(Math.random() * hoverMessages.length)]);

        // Shake card
        questionCard.classList.add('shake');
        setTimeout(() => questionCard.classList.remove('shake'), 500);

        // Grow Yes button
        yesBtnScale = Math.min(yesBtnScale + 0.05, 1.4);
        yesBtn.style.transform = `scale(${yesBtnScale})`;

        // Move No button
        moveNoButton();
    });

    noBtn.addEventListener('click', () => {
        noButtonClickCount++;

        if (noButtonClickCount < romanticPleas.length) {
            const plea = romanticPleas[noButtonClickCount];
            noBtn.querySelector('.btn-text').textContent = plea.text;

            // Move button
            moveNoButton();

            // Grow Yes button more
            yesBtnScale = Math.min(yesBtnScale + 0.1, 1.5);
            yesBtn.style.transform = `scale(${yesBtnScale})`;
        } else {
            // Give up -> Transform to Yes
            noBtn.style.transition = 'all 0.5s ease';
            noBtn.querySelector('.btn-text').textContent = "Okay fine, Yes! 💕";
            noBtn.style.background = 'var(--gradient-romantic)';
            noBtn.style.transform = 'scale(1.1)';
            noBtn.onclick = () => yesBtn.click();
        }
    });

    // Envelope interaction
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
            createSparkle(envelope.getBoundingClientRect().left, envelope.getBoundingClientRect().top);
        });
    }
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const card = document.getElementById('questionCard');

    // Calculate safe area (screen minus button size)
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.position = 'fixed'; // Ensure it can move freely
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// ===== Interface 4: Date Planner Logic =====
window.selectDate = function (type) {
    // Remove selected class from all
    document.querySelectorAll('.date-option').forEach(opt => opt.classList.remove('selected'));

    // Find clicked element (handling bubble up)
    const eventTarget = event.currentTarget; // The div with onclick
    eventTarget.classList.add('selected');

    // Show Ticket
    const ticket = document.getElementById('final-ticket');
    const activityText = document.getElementById('ticket-activity');

    let activityName = "";
    switch (type) {
        case 'dinner': activityName = "Virtual Dinner Date 🍝"; break;
        case 'movie': activityName = "Netflix & Chill Party 🎬"; break;
        case 'sleep': activityName = "Sleep on Call Together 😴"; break;
    }

    activityText.textContent = activityName;
    ticket.classList.remove('hidden');

    // More confetti!
    createConfetti();
}


// ===== Global Effects (Preserved) =====
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');

    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💓', '✨'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

function showFloatingMessage(x, y, text) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.position = 'fixed';
    msg.style.left = x + 'px';
    msg.style.top = y + 'px';
    msg.style.color = '#fff';
    msg.style.background = 'rgba(255, 77, 109, 0.8)';
    msg.style.padding = '5px 10px';
    msg.style.borderRadius = '10px';
    msg.style.pointerEvents = 'none';
    msg.style.animation = 'floatUp 1s ease-out forwards';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1000);
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const c = document.createElement('div');
        c.textContent = ['🎉', '❤️', '✨'][Math.floor(Math.random() * 3)];
        c.style.position = 'fixed';
        c.style.left = Math.random() * 100 + '%';
        c.style.top = '-20px';
        c.style.fontSize = Math.random() * 20 + 20 + 'px';
        c.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
}

function startCelebrationHearts() {
    // Re-use logic or add specific celebration hearts if needed
}

function initCursorSparkle() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) { // Don't create on every frame
            createSparkle(e.clientX, e.clientY);
        }
    });
}

function createSparkle(x, y) {
    const s = document.createElement('div');
    s.style.position = 'fixed';
    s.style.width = '4px';
    s.style.height = '4px';
    s.style.background = '#fff';
    s.style.borderRadius = '50%';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.pointerEvents = 'none';
    s.style.animation = 'sparkleFade 1s ease-out forwards';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
}

// Add CSS for dynamic animations if needed
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    @keyframes confettiFall {
        to { transform: translateY(100vh) rotate(360deg); }
    }
    @keyframes floatUp {
        to { opacity: 0; transform: translateY(-50px); }
    }
`;
document.head.appendChild(style);
