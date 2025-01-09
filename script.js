document.addEventListener('DOMContentLoaded', () => {
    // Menü toggle işlevi
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // AOS başlatma
    AOS.init({
        duration: 800,
        once: true
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Top button işlevi
    const topButton = document.querySelector('.top-button');
    if (topButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                topButton.style.opacity = '1';
            } else {
                topButton.style.opacity = '0.8';
            }
        });

        topButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Particle oluşturma
    createParticles();
});

const createBubble = () => {
    const bubble = document.createElement('div');
    const size = Math.random() * 60 + 20;

    bubble.classList.add('bubble');
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.top = '100vh';

    bubble.style.animationDuration = `${Math.random() * 5 + 3}s`;

    document.body.appendChild(bubble);

    setTimeout(() => bubble.remove(), parseFloat(bubble.style.animationDuration) * 1000);
};

const bubbleDensity = 300; 
setInterval(createBubble, bubbleDensity);


window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-gray-900', 'bg-opacity-95', 'backdrop-blur-sm', 'shadow-lg');
    } else {
        nav.classList.remove('bg-gray-900', 'bg-opacity-95', 'backdrop-blur-sm', 'shadow-lg');
    }
});

function createParticles() {
    const particleContainer = document.querySelector('.particle-container');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            animation-delay: ${delay}s;
        `;
        
        particleContainer.appendChild(particle);
    }
}


document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
});


document.querySelectorAll('.experience-card, .project-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
