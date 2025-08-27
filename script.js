// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initCardInteractions();
    initSmoothScrolling();
    initMouseTracking();
    initScrollAnimations();
});

// Initialize card interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 18;
            const rotateY = (centerX - x) / 18;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Initialize smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const exploreSection = document.querySelector('#explore');
            if (exploreSection) exploreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// Minimal custom cursor
function initMouseTracking() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed; width: 14px; height: 14px; background: #fff; border-radius: 50%;
        pointer-events: none; z-index: 9999; mix-blend-mode: difference; transition: transform 0.08s ease;
    `;
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 7 + 'px';
        cursor.style.top = e.clientY - 7 + 'px';
    });
    const interactive = document.querySelectorAll('a, button, .card, .demo-circle');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(1.8)'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; });
    });
}

// Minimal scroll-triggered fade up
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    const animateElements = document.querySelectorAll('.card, .section-title, .about-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'all 0.45s ease';
        observer.observe(el);
    });
}

// Add CSS for animation and toast
const style = document.createElement('style');
style.textContent = `
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);

// Minimal load toast
window.addEventListener('load', () => {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #0f0f0f; color: #e5e5e5;
        padding: 10px 14px; border: 1px solid #1f1f1f; border-radius: 10px; font-weight: 600;
        z-index: 10000; transform: translateX(120%); transition: transform 0.4s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    `;
    toast.textContent = 'Ready';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 600);
    setTimeout(() => { toast.style.transform = 'translateX(120%)'; setTimeout(() => toast.remove(), 400); }, 2500);
}); 