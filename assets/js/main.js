/* ==========================================================================
   PREMIUM PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTheme();
    initMobileMenu();
    initTypingAnimation();
    initScrollEffects();
    initInteractiveCard();
    initContactForm();
    initParticleBackground();
    initCertificateModal();
});

/* --- Theme Handler (Dark / Light) --- */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
        }
    });
}

/* --- Mobile Navigation Menu --- */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navNavigation = document.getElementById('nav-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navNavigation.classList.toggle('active');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navNavigation.classList.remove('active');
        });
    });
}

/* --- Typing Animation for Subtitle --- */
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-element');
    const words = [
        "Software Solutions",
        "Secure Applications",
        "Web Platforms",
        "Data Architectures"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Erase faster
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingElement) {
        type();
    }
}

/* --- Scroll Behaviors (Scroll reveal, scroll to top, nav highlight) --- */
function initScrollEffects() {
    const header = document.getElementById('main-header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const reveals = document.querySelectorAll('.scroll-reveal');

    // Scroll listener
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // 1. Header Blur State
        if (scrollPos > 50) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }

        // 2. Scroll to Top Button Visibility
        if (scrollPos > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // 3. Navigation Links Active Highlight on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Scroll to Top Click Event
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Scroll Reveal Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

/* --- Hero Glass Card Interactive Parallax (3D Tilt) --- */
function initInteractiveCard() {
    const card = document.getElementById('interactive-card');
    const container = document.querySelector('.visual-card-wrapper');
    
    if (!card || !container) return;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside wrapper
        const y = e.clientY - rect.top;  // y coordinate inside wrapper
        
        // Calculate degree offset
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degrees tilt
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    container.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    });

    container.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
}

/* --- Contact Form Submission Handler --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const msgContainer = document.getElementById('form-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Set loading state on button
        const btnText = submitBtn.querySelector('span');
        const btnIcon = submitBtn.querySelector('i');
        
        const originalText = btnText.textContent;
        const originalIconClass = btnIcon.className;

        btnText.textContent = "Sending...";
        btnIcon.className = "fa-solid fa-circle-notch fa-spin";
        submitBtn.disabled = true;

        // Mock API submission latency
        setTimeout(() => {
            // Reset state
            btnText.textContent = originalText;
            btnIcon.className = originalIconClass;
            submitBtn.disabled = false;

            // Show success notification
            msgContainer.textContent = "Thank you! Your message has been sent successfully.";
            msgContainer.className = "form-message-container success";
            
            // Reset form
            form.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                msgContainer.textContent = "";
                msgContainer.className = "form-message-container";
            }, 5000);
        }, 1800);
    });
}

/* --- Interactive Particle Background (Canvas) --- */
function initParticleBackground() {
    const container = document.getElementById('particle-canvas-container');
    if (!container) return;

    // Create Canvas element
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const maxParticles = 60;

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce on boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }

        draw() {
            // Pick color according to theme
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.25)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    // Connect particles nearby
    function drawConnections() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const strokeColor = isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.04)';
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }
    animate();
}

/* --- Certificate Preview Modal --- */
function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const modalPdf = document.getElementById('cert-modal-pdf');
    const closeBtn = document.querySelector('.cert-modal-close');
    const cards = document.querySelectorAll('.certificate-card');

    if (!modal || !closeBtn) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            const type = card.getAttribute('data-type');

            if (!src) return;

            if (type === 'pdf') {
                // For PDFs, opening in a new tab is the most reliable experience across devices
                window.open(src, '_blank');
            } else if (type === 'image') {
                // For images, display inside the modal
                modalImg.src = src;
                modalImg.style.display = 'block';
                modalPdf.style.display = 'none';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable page scrolling
            }
        });
    });

    // Close Modal on clicking Close button
    closeBtn.addEventListener('click', closeModal);

    // Close Modal on clicking background overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close Modal on pressing Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable page scrolling
        // Reset src after animation transition
        setTimeout(() => {
            modalImg.src = '';
            modalImg.style.display = 'none';
        }, 400);
    }
}
