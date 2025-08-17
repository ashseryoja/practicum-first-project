// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initAnimations();
    initCardInteractions();
    initSmoothScrolling();
    initMouseTracking();
    initParallaxEffects();
    
    // Add scroll-triggered animations
    initScrollAnimations();
});

// Initialize main animations
function initAnimations() {
    // Animate floating orbs with random movements
    const orbs = document.querySelectorAll('.floating-orb');
    
    orbs.forEach((orb, index) => {
        // Add random movement patterns
        setInterval(() => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            orb.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + (index * 1000));
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
}

// Initialize card interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            
            // Update glow effect position
            const cardGlow = card.querySelector('.card-glow');
            if (cardGlow) {
                cardGlow.style.setProperty('--mouse-x', `${x}px`);
            }
        });
        
        // Reset card position on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
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
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // CTA button scroll
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const exploreSection = document.querySelector('#explore');
            if (exploreSection) {
                exploreSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Initialize mouse tracking effects
function initMouseTracking() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #00d4ff, #ff00ff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Add hover effects
    const interactiveElements = document.querySelectorAll('a, button, .card, .demo-circle');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .section-title, .about-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    
    // Add animation class
    document.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for background elements
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .custom-cursor {
        mix-blend-mode: difference;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
`;

document.head.appendChild(style);

// Add interactive demo functionality
document.addEventListener('DOMContentLoaded', function() {
    const demoCircle = document.getElementById('demoCircle');
    
    if (demoCircle) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        demoCircle.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(demoCircle.style.left) || 0;
            startTop = parseInt(demoCircle.style.top) || 0;
            
            demoCircle.style.cursor = 'grabbing';
            demoCircle.style.transition = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            demoCircle.style.left = (startLeft + deltaX) + 'px';
            demoCircle.style.top = (startTop + deltaY) + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            demoCircle.style.cursor = 'grab';
            demoCircle.style.transition = 'all 0.3s ease';
            
            // Add bounce effect
            demoCircle.style.transform = 'scale(1.2)';
            setTimeout(() => {
                demoCircle.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Add hover effect
        demoCircle.addEventListener('mouseenter', () => {
            demoCircle.style.transform = 'scale(1.1) rotate(45deg)';
        });
        
        demoCircle.addEventListener('mouseleave', () => {
            demoCircle.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Add some dynamic content updates
setInterval(() => {
    const randomEmojis = ['🚀', '🌟', '🌌', '✨', '💫', '🌠'];
    const cards = document.querySelectorAll('.card-icon');
    
    cards.forEach(card => {
        if (Math.random() < 0.1) { // 10% chance every interval
            card.textContent = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
            card.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                card.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }
    });
}, 3000);

// Add window resize handling
window.addEventListener('resize', () => {
    // Recalculate any position-dependent elements
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transform = 'none';
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            window.scrollBy({ top: 100, behavior: 'smooth' });
            break;
        case 'ArrowUp':
            e.preventDefault();
            window.scrollBy({ top: -100, behavior: 'smooth' });
            break;
        case 'Home':
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'End':
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00d4ff, #ff00ff);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.5s ease;
    `;
    successMessage.textContent = '✨ Website Loaded Successfully!';
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.transform = 'translateX(0)';
    }, 1000);
    
    setTimeout(() => {
        successMessage.style.transform = 'translateX(100%)';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 4000);
}); 