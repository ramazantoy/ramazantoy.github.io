const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
});

AOS.init({
    duration: 800,
    once: true
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const createBubble = () => {
const bubble = document.createElement('div');
const size = Math.random() * 60 + 20;

bubble.classList.add('bubble');
bubble.style.width = `${size}px`;
bubble.style.height = `${size}px`;
bubble.style.left = `${Math.random() * 100}vw`;
bubble.style.top = `${Math.random() * 100}vh`;


const xMovement = `${(Math.random() - 0.5) * 100}vw`; 
const yMovement = `${(Math.random() - 0.5) * 100}vh`; 
bubble.style.setProperty('--move-x', xMovement);
bubble.style.setProperty('--move-y', yMovement);

bubble.style.animationDuration = `${Math.random() * 5 + 3}s`;

document.body.appendChild(bubble);


setTimeout(() => bubble.remove(), parseFloat(bubble.style.animationDuration) * 1000);
};

const bubbleDensity = 300; 
setInterval(createBubble, bubbleDensity);
