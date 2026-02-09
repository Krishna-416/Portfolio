// script.js - Vanilla JS for Portfolio Website Animations and Interactions

// Global Variables
let isDarkTheme = true; // Track current theme
const cursor = document.getElementById('cursor');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');
const notification = document.getElementById('notification');

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initTextReveals();
    initFadeTransitions();
    initScrollAnimations();
    initThemeToggle();
    initSkillBars();
    initProjectHovers();
    initContactForm();
    initNavbarAnimation();
});

// Custom Cursor Functionality
function initCursor() {
    if (!cursor) return; // Skip if cursor element not present
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    // Scale on hover for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-glow, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(1.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
}

// Text Reveal Animations (Split text into spans and animate)
function initTextReveals() {
    const textElements = document.querySelectorAll('.text-reveal');
    textElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
        const spans = el.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.opacity = '0';
            // span.style.transform = 'translateY(20px)';
            setTimeout(() => {
                // span.style.transition = 'opacity 0.5s, transform 0.5s';
                span.style.opacity = '1';
                // span.style.transform = 'translateY(0)';
            }, index * 50); // Stagger animation
        });
    });
}

// Fade Transitions for Sections
function initFadeTransitions() {
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'opacity 1s, transform 1s';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100); // Slight delay for page load
    });
}

// Scroll-Triggered Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.fade-in, .text-reveal');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 1s, transform 1s';
        observer.observe(el);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    if (!themeToggle) return;
    themeToggle.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('light-theme');
        themeToggle.textContent = isDarkTheme ? '🌙' : '☀️';
        // Animate toggle button
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => themeToggle.style.transform = 'scale(1)', 200);
    });
}

// Skill Bars Animation (for Skills page)
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                const percent = entry.target.dataset.percent;
                fill.style.width = `${percent}%`;
                fill.style.transition = 'width 2s ease-in-out';
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => observer.observe(bar));
}

// Project Card Hover Effects
function initProjectHovers() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = `0 0 20px var(--glow-color)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
    });
}

// Contact Form Submission
function initContactForm() {
    if (!contactForm) return;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate form submission (front-end only)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if (name && email && message) {
            showNotification();
            contactForm.reset();
        }
    });
}

// Notification Popup
function showNotification() {
    if (!notification) return;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.style.display = 'none', 500);
    }, 3000); // Hide after 3 seconds
}

// Navbar Animation (Sticky and Fade on Scroll)
function initNavbarAnimation() {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            navbar.style.transform = 'translateY(-100%)'; // Hide on scroll down
        } else {
            navbar.style.transform = 'translateY(0)'; // Show on scroll up
        }
        lastScrollY = currentScrollY;
    });
}

// Additional Floating Elements Animation (for Hero)
function animateFloatingElements() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animation = `float ${2 + index}s ease-in-out infinite`;
    });
}
animateFloatingElements(); // Call on load

// CSS Keyframes for Floating (added via JS for dynamic control)
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

function initNavbarAnimation() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0.5, 1 - scrollY / 500); // Fade to 0.5 opacity on scroll
        navbar.style.opacity = opacity;
    });
}

// Mobile Menu Toggle (New: For hamburger menu on mobile)
function initMobileMenu() {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none'; // Hidden on desktop
    document.querySelector('.nav-container').appendChild(hamburger);
    
    hamburger.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    
    // Show hamburger on mobile
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
        document.querySelector('.nav-links').style.display = 'none'; // Start hidden
    }
}

// Update init function to include mobile menu
document.addEventListener('DOMContentLoaded', () => {
    // ... (existing init calls)
    initMobileMenu();
});