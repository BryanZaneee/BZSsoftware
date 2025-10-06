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

// Dynamic cursor effect (optional enhancement)
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
            transition: transform 0.2s ease;
            display: none;
        }
        
        @media (min-width: 1024px) {
            .custom-cursor {
                display: block;
            }
            body {
                cursor: none;
            }
            a, button {
                cursor: none;
            }
        }
    `;
    document.head.appendChild(cursorStyle);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#8bc34a';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#1a1a1a';
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

const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatContainer = document.querySelector('.chat-container');

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
            
            document.querySelector('#final-message .message-bubble').textContent = 
                `Great! I'll be in touch soon, ${userName}. Talk to you later!`;
            showMessage('final-message');
            
            // Submit form data
            document.getElementById('form-name').value = userName;
            document.getElementById('form-email').value = userEmail;
            document.getElementById('form-phone').value = userPhone;
            
            // Send email via mailto as fallback
            const subject = encodeURIComponent('New Contact Form Submission from ' + userName);
            const body = encodeURIComponent(
                `Name: ${userName}\n` +
                `Email: ${userEmail}\n` +
                `Phone: ${userPhone}\n\n` +
                `This message was sent via the BZS Software website contact form.`
            );
            
            // Open mailto link
            window.location.href = `mailto:bzane09@gmail.com?subject=${subject}&body=${body}`;
            
            // Disable input after completion
            chatInput.disabled = true;
            sendButton.disabled = true;
            chatInput.placeholder = 'Chat completed';
            
            chatStep = 3;
        }
    }
    
    chatInput.value = '';
}

// Event listeners for chat
if (sendButton && chatInput) {
    sendButton.addEventListener('click', handleChatInput);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChatInput();
        }
    });
}

