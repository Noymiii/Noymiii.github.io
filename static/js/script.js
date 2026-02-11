document.addEventListener('DOMContentLoaded', () => {
    /* CHATBOT VARIABLES */
    const chatWidget = document.getElementById('chatbot-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const welcomeBubble = document.getElementById('welcome-bubble');
    const bubbleClose = document.querySelector('.bubble-close');
    const quickPrompts = document.getElementById('quick-prompts');

    /* TOGGLE CHAT */
    function toggleChat(show) {
        if (show) {
            chatWindow.classList.remove('hidden');
            welcomeBubble.classList.add('hidden');
            chatInput.focus();
        } else {
            chatWindow.classList.add('hidden');
        }
    }

    chatToggle.addEventListener('click', () => {
        const isHidden = chatWindow.classList.contains('hidden');
        toggleChat(isHidden);
    });

    closeChat.addEventListener('click', () => toggleChat(false));

    /* WELCOME BUBBLE */
    if (welcomeBubble) {
        welcomeBubble.addEventListener('click', (e) => {
            if (e.target.closest('.bubble-close')) return;
            toggleChat(true);
        });

        if (bubbleClose) {
            bubbleClose.addEventListener('click', (e) => {
                e.stopPropagation();
                welcomeBubble.classList.add('hidden');
            });
        }
    }

    /* SEND MESSAGE LOGIC */
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quick Prompts Global Function
    window.sendQuickMessage = function(text) {
        chatInput.value = text;
        sendMessage();
    };

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // 1. Add User Message
        addMessage(message, 'user-message');
        chatInput.value = '';
        
        // Hide quick prompts after first interaction to clean up UI
        if (quickPrompts) quickPrompts.style.display = 'none';

        // 2. Show Typing Indicator
        typingIndicator.classList.remove('hidden');
        scrollToBottom();

        // 3. Call API
        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            typingIndicator.classList.add('hidden');
            // 4. Typewriter Effect for Bot Response
            typeWriterMessage(data.response, 'bot-message');
        })
        .catch(error => {
            console.error('Error:', error);
            typingIndicator.classList.add('hidden');
            addMessage('Sorry, I seem to be having trouble. Please try again.', 'bot-message');
        });
    }

    /* TYPEWRITER EFFECT */
    function typeWriterMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', className);
        chatMessages.appendChild(msgDiv);
        
        let i = 0;
        const speed = 15; // Speed in ms (lower is faster)

        function type() {
            if (i < text.length) {
                // Handle basic markdown bolding (**text**)
                if (text.substring(i).startsWith('**')) {
                    const end = text.indexOf('**', i + 2);
                    if (end !== -1) {
                        const boldText = text.substring(i + 2, end);
                        const strong = document.createElement('strong');
                        strong.textContent = boldText;
                        msgDiv.appendChild(strong);
                        i = end + 2;
                        setTimeout(type, speed);
                        return;
                    }
                }
                
                // Handle newlines
                if (text.charAt(i) === '\n') {
                    msgDiv.appendChild(document.createElement('br'));
                } else {
                    msgDiv.appendChild(document.createTextNode(text.charAt(i)));
                }
                
                i++;
                scrollToBottom();
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', className);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /* THEME TOGGLE LOGIC */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const profileImg = document.getElementById('profile-img');

    // Function to update profile image
    const updateProfileImage = (isDark) => {
        if (profileImg) {
            profileImg.src = isDark
                ? '/static/assets/profile-night.jpg'
                : '/static/assets/profile-day.jpg';
        }
    };

    // Check local storage for preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateProfileImage(true);
    } else {
        updateProfileImage(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Update image
            updateProfileImage(isDark);

            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    /* SCROLL REVEAL ANIMATION */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* HERO TYPEWRITER EFFECT */
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ["Full Stack Web Applications", "AI Integration", "Automation", "Data Tools"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeDelay = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeDelay = 500;
        }

        setTimeout(type, typeDelay);
    }

    if (typewriterElement) type();

    /* CARD SPOTLIGHT EFFECT - Featured Projects */
    document.querySelectorAll('.project-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* MINI PROJECTS FILTERS */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const miniCards = document.querySelectorAll('.mini-project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            miniCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* 3D TILT EFFECT - Mini Projects */
    miniCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });

});


