// Hero Carousel
function initHeroCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;
    
    if (images.length <= 1) return; // No need for carousel if only one image
    
    // Change image every 4 seconds
    setInterval(() => {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to next image
        images[currentIndex].classList.add('active');
    }, 4000);
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.app-content, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && scrolled < window.innerHeight) {
        heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Dynamic cursor effect with color detection
const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid #1a1a1a;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, border-color 0.3s ease;
            display: none;
        }
        
        @media (min-width: 1024px) {
            .custom-cursor {
                display: block;
            }
            body {
                cursor: none;
            }
            a, button, input, textarea {
                cursor: none;
            }
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Function to determine if background is very dark (needs white cursor)
    const isVeryDarkBackground = (element) => {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        
        // If background is transparent, check parent
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            if (element.parentElement) {
                return isVeryDarkBackground(element.parentElement);
            }
            return false;
        }
        
        // Extract RGB values
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
            // Calculate brightness using luminance formula
            const brightness = (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);
            // Only very dark backgrounds (brightness < 50) get white cursor
            // This keeps teal sections with black cursor, but makes white cursor for black/very dark sections
            return brightness < 50;
        }
        
        return false;
    };
    
    // Update cursor position and color on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        
        // Get element under cursor
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        
        if (elementUnderCursor) {
            // Check if hovering over very dark background
            if (isVeryDarkBackground(elementUnderCursor)) {
                cursor.style.borderColor = '#ffffff';
            } else {
                cursor.style.borderColor = '#1a1a1a';
            }
        }
    });
    
    // Handle hover effects for interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            
            // Check if the interactive element is on a dark background
            if (isVeryDarkBackground(el)) {
                cursor.style.borderColor = '#8bc34a';
            } else {
                cursor.style.borderColor = '#8bc34a';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            // Color will be updated by mousemove event
        });
    });
};

// Initialize cursor on desktop
if (window.innerWidth >= 1024) {
    createCursor();
}

// Log page load
console.log('BZS Software - Website loaded successfully');

// Chat Interface Logic
let chatStep = 0;
let userName = '';
let userEmail = '';
let userPhone = '';
let userWorkplace = '';
let userRole = '';
let chatStarted = false;

const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const skipButton = document.getElementById('skip-button');
const chatContainer = document.querySelector('.chat-container');
const contactForm = document.getElementById('contact-form');

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation regex (supports various formats)
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(phone) && cleanPhone.length >= 10;
}

function scrollToBottom() {
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
}

function showMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'flex';
        scrollToBottom();
    }
}

function hideSkipButton() {
    skipButton.style.display = 'none';
}

function showSkipButton() {
    skipButton.style.display = 'block';
}

function startChat() {
    if (!chatStarted) {
        chatStarted = true;
        showMessage('lets-do-it-message');
        setTimeout(() => {
            // Show the "What is your name?" message
            showMessage('name-question');
        }, 800);
    }
}

function handleSkip() {
    if (chatStep === 2) {
        // Skip phone number
        userPhone = 'Skipped';
        document.querySelector('#user-phone-message .message-bubble').textContent = 'I will pass on this one';
        showMessage('user-phone-message');
        hideSkipButton();
        
        setTimeout(() => {
            showMessage('work-question');
            showSkipButton();
        }, 500);
        
        chatStep = 3;
    } else if (chatStep === 3) {
        // Skip workplace
        userWorkplace = 'Skipped';
        document.querySelector('#user-work-message .message-bubble').textContent = 'I\'m opting for mystery';
        showMessage('user-work-message');
        hideSkipButton();
        
        setTimeout(() => {
            document.querySelector('#role-question .message-bubble').textContent = 'What do you do at your current workplace?';
            showMessage('role-question');
            showSkipButton();
        }, 500);
        
        chatStep = 4;
    } else if (chatStep === 4) {
        // Skip role
        userRole = 'Skipped';
        document.querySelector('#user-role-message .message-bubble').textContent = 'I\'m opting for mystery';
        showMessage('user-role-message');
        hideSkipButton();
        
        // Send email with collected info
        setTimeout(() => {
            sendContactEmail();
        }, 500);
        
        chatStep = 5;
    }
}

function sendContactEmail() {
    // Update form fields with collected data
    document.getElementById('form-name').value = userName;
    document.getElementById('form-email').value = userEmail;
    document.getElementById('form-email-copy').value = userEmail;
    document.getElementById('form-phone').value = userPhone;
    document.getElementById('form-workplace').value = userWorkplace;
    document.getElementById('form-role').value = userRole;
    
    // Create a message field for better email formatting
    const messageField = document.createElement('input');
    messageField.type = 'hidden';
    messageField.name = 'message';
    messageField.value = `New contact form submission:\n\nName: ${userName}\nEmail: ${userEmail}\nPhone: ${userPhone}\nWorkplace: ${userWorkplace}\nRole: ${userRole}`;
    contactForm.appendChild(messageField);
    
    // Show final message first
    document.querySelector('#final-message .message-bubble').textContent = 
        `Great! I'll be in touch soon, ${userName}. Talk to you later!`;
    showMessage('final-message');
    
    // Disable input after completion
    chatInput.disabled = true;
    sendButton.disabled = true;
    skipButton.disabled = true;
    chatInput.placeholder = 'Chat completed';
    
    // Submit form via AJAX to avoid page reload
    setTimeout(() => {
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Form submitted successfully!');
                // Optionally show a success message
            } else {
                console.error('Form submission failed');
                // Fallback: try regular form submission
                contactForm.submit();
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            // Fallback: try regular form submission
            contactForm.submit();
        });
    }, 1000);
}

function handleChatInput() {
    const input = chatInput.value.trim();
    
    if (!input) return;
    
    if (chatStep === 0) {
        // Name step
        userName = input;
        document.querySelector('#user-name-message .message-bubble').textContent = userName;
        showMessage('user-name-message');
        
        document.querySelector('#greeting-message .message-bubble').textContent = `Nice to meet you ${userName}!`;
        showMessage('greeting-message');
        
        setTimeout(() => {
            showMessage('email-question');
        }, 500);
        
        chatStep = 1;
    } else if (chatStep === 1) {
        // Email step
        if (!isValidEmail(input)) {
            document.querySelector('#user-email-message .message-bubble').textContent = input;
            showMessage('user-email-message');
            
            document.querySelector('#email-validation .message-bubble').textContent = 'Are you sure that\'s an actual email?';
            showMessage('email-validation');
            scrollToBottom();
            
            // Reset for retry
            setTimeout(() => {
                document.getElementById('user-email-message').style.display = 'none';
                document.getElementById('email-validation').style.display = 'none';
            }, 3000);
        } else {
            userEmail = input;
            document.querySelector('#user-email-message .message-bubble').textContent = userEmail;
            showMessage('user-email-message');
            
            setTimeout(() => {
                showMessage('phone-question');
                showSkipButton(); // Show skip button for phone
            }, 500);
            
            chatStep = 2;
        }
    } else if (chatStep === 2) {
        // Phone step
        if (!isValidPhone(input)) {
            document.querySelector('#user-phone-message .message-bubble').textContent = input;
            showMessage('user-phone-message');
            
            document.querySelector('#phone-validation .message-bubble').textContent = 'Are you sure that phone number works?';
            showMessage('phone-validation');
            scrollToBottom();
            
            // Reset for retry
            setTimeout(() => {
                document.getElementById('user-phone-message').style.display = 'none';
                document.getElementById('phone-validation').style.display = 'none';
            }, 3000);
        } else {
            userPhone = input;
            document.querySelector('#user-phone-message .message-bubble').textContent = userPhone;
            showMessage('user-phone-message');
            hideSkipButton();
            
            setTimeout(() => {
                showMessage('work-question');
                showSkipButton(); // Show skip button for workplace
            }, 500);
            
            chatStep = 3;
        }
    } else if (chatStep === 3) {
        // Workplace step
        userWorkplace = input;
        document.querySelector('#user-work-message .message-bubble').textContent = userWorkplace;
        showMessage('user-work-message');
        hideSkipButton();
        
        setTimeout(() => {
            document.querySelector('#role-question .message-bubble').textContent = `What do you do at ${userWorkplace}?`;
            showMessage('role-question');
            showSkipButton(); // Show skip button for role
        }, 500);
        
        chatStep = 4;
    } else if (chatStep === 4) {
        // Role step
        userRole = input;
        document.querySelector('#user-role-message .message-bubble').textContent = userRole;
        showMessage('user-role-message');
        hideSkipButton();
        
        // Send email with all collected info
        setTimeout(() => {
            sendContactEmail();
        }, 500);
        
        chatStep = 5;
    }
    
    chatInput.value = '';
}

// Event listeners for chat
if (sendButton && chatInput) {
    sendButton.addEventListener('click', handleChatInput);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            handleChatInput();
        }
    });
    
    // Start chat when user clicks in the chat input area
    chatInput.addEventListener('focus', () => {
        if (!chatStarted) {
            startChat();
        }
    });
    
    chatInput.addEventListener('click', () => {
        if (!chatStarted) {
            startChat();
        }
    });
}

// Event listener for skip button
if (skipButton) {
    skipButton.addEventListener('click', handleSkip);
}

// Prevent default form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}
