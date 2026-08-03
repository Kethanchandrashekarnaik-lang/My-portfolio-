/* ==========================================================================
   PREMIUM PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Boot Screen First
    initBootScreen();
    
    // Initialize all components
    initTheme();
    initMobileMenu();
    initDynamicIsland();
    initTypingAnimation();
    initScrollEffects();
    initInteractiveCard();
    initContactForm();
    initParticleBackground();
    initCertificateModal();
    initProgressBars();
    initVisitorCounter();
    initMobileProfileTheme();
    initMacOSContactTheme();
    initPS5ProjectConsole();
    initWin11ContactTheme();
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

/* --- Dynamic Island Navigation Backdrop Tracer --- */
function initDynamicIsland() {
    const activePill = document.getElementById('nav-active-pill');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!activePill || !navList) return;

    function movePillToElement(el) {
        if (!el || window.innerWidth < 992) {
            activePill.classList.remove('active');
            return;
        }
        const navListRect = navList.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const left = elRect.left - navListRect.left;
        const width = elRect.width;

        activePill.style.left = `${left}px`;
        activePill.style.width = `${width}px`;
        activePill.classList.add('active');
    }

    function updateActivePill() {
        const activeLink = document.querySelector('.nav-link.active');
        movePillToElement(activeLink);
    }

    // Smooth hover gliding effect
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            movePillToElement(link);
        });
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            movePillToElement(link);
        });
    });

    navList.addEventListener('mouseleave', () => {
        updateActivePill();
    });

    // Initial position trigger & window resize handler
    setTimeout(updateActivePill, 100);
    window.addEventListener('resize', updateActivePill);
    window.updateDynamicIslandPill = updateActivePill;
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

        // 1. Dynamic Island Compact Morphing State
        if (scrollPos > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. Scroll to Top Button Visibility
        if (scrollToTopBtn) {
            if (scrollPos > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
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
            let activeChanged = false;
            navLinks.forEach(link => {
                const isTarget = link.getAttribute('href') === `#${currentSectionId}`;
                if (isTarget && !link.classList.contains('active')) {
                    link.classList.add('active');
                    activeChanged = true;
                } else if (!isTarget) {
                    link.classList.remove('active');
                }
            });

            if (activeChanged && typeof window.updateDynamicIslandPill === 'function') {
                window.updateDynamicIslandPill();
            }
        }
    });

    // Scroll to Top Click Event
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Set loading state on button for visual feedback
        const btnText = submitBtn.querySelector('span');
        const btnIcon = submitBtn.querySelector('i');
        const msgContainer = document.getElementById('form-msg');

        btnText.textContent = "Sending...";
        btnIcon.className = "fa-solid fa-circle-notch fa-spin";
        submitBtn.disabled = true;

        // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with actual EmailJS IDs
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                btnText.textContent = "Sent Successfully!";
                btnIcon.className = "fa-solid fa-check";
                msgContainer.innerHTML = '<p style="color: #10b981; margin-top: 10px; font-size: 0.9rem;">Message sent successfully! I will get back to you soon.</p>';
                form.reset();
                setTimeout(() => {
                    btnText.textContent = "Send Message";
                    btnIcon.className = "fa-solid fa-paper-plane";
                    submitBtn.disabled = false;
                    msgContainer.innerHTML = '';
                }, 5000);
            }, function(error) {
                btnText.textContent = "Failed to Send";
                btnIcon.className = "fa-solid fa-xmark";
                msgContainer.innerHTML = '<p style="color: #ef4444; margin-top: 10px; font-size: 0.9rem;">Failed to send message. Please try again later.</p>';
                setTimeout(() => {
                    btnText.textContent = "Send Message";
                    btnIcon.className = "fa-solid fa-paper-plane";
                    submitBtn.disabled = false;
                }, 4000);
            });
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

/* --- Skills Progress Bar Animation --- */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
        // Store the original width in a data attribute and reset inline style to 0
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* --- Visitor Counter --- */
function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) return;
    
    let views = localStorage.getItem('portfolio-views');
    if (!views) {
        views = Math.floor(Math.random() * 500) + 1000; // Start at a base number
    }
    
    // Increment on new session
    if (!sessionStorage.getItem('portfolio-visited')) {
        views = parseInt(views) + 1;
        localStorage.setItem('portfolio-views', views);
        sessionStorage.setItem('portfolio-visited', 'true');
    }
    
    counterElement.textContent = parseInt(views).toLocaleString();
}

/* --- Mobile Interface Profile Tab Switcher, Clock & 3D Tilt --- */
function initMobileProfileTheme() {
    // 1. Interactive Bottom Dock Tab Switching
    const dockItems = document.querySelectorAll('.dock-item');
    const tabPanes = document.querySelectorAll('.mobile-tab-pane');

    if (dockItems.length && tabPanes.length) {
        dockItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetTab = item.getAttribute('data-tab');
                
                // Update active dock button
                dockItems.forEach(btn => btn.classList.remove('active'));
                item.classList.add('active');

                // Update active tab pane
                tabPanes.forEach(pane => {
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });
    }

    // 2. Real-time Status Bar Digital Clock
    const mobileClock = document.getElementById('mobile-clock');
    if (mobileClock) {
        function updateClock() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            mobileClock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 3. Dynamic 3D Interactive Tilt on Hover
    const phone = document.getElementById('mobile-profile-phone');
    if (phone) {
        const wrapper = phone.parentElement;
        if (wrapper) {
            wrapper.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return; // Disable on small touch screens
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateX = (-y / rect.height) * 12;
                const rotateY = (x / rect.width) * 12;
                phone.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                phone.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        }
    }
}

/* --- macOS Laptop Interface Contact Section (Sidebar, Dock, Clock & 3D Tilt) --- */
function initMacOSContactTheme() {
    // 1. Sidebar Nav & Dock Navigation Switcher
    const navItems = document.querySelectorAll('.macos-nav-item');
    const dockItems = document.querySelectorAll('.dock-icon-item');
    const panes = document.querySelectorAll('.macos-view-pane');

    function switchPane(targetPaneId) {
        // Update Sidebar
        navItems.forEach(item => {
            if (item.getAttribute('data-macos-pane') === targetPaneId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Dock Active Indicator
        dockItems.forEach(item => {
            if (item.getAttribute('data-dock-target') === targetPaneId) {
                item.classList.add('active-app');
            } else {
                item.classList.remove('active-app');
            }
        });

        // Update Panes
        panes.forEach(pane => {
            if (pane.id === targetPaneId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    if (navItems.length) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-macos-pane');
                switchPane(target);
            });
        });
    }

    if (dockItems.length) {
        dockItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-dock-target');
                switchPane(target);
            });
        });
    }

    // 2. Real-time Status Bar Clock for macOS Top Bar
    const macosClock = document.getElementById('macos-clock');
    if (macosClock) {
        function updateClock() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            macosClock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 3. Dynamic 3D Laptop Lid Tilt on Hover
    const macbook = document.getElementById('macbook-contact-screen');
    if (macbook) {
        const wrapper = macbook.parentElement;
        if (wrapper) {
            wrapper.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return;
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateX = (-y / rect.height) * 8;
                const rotateY = (x / rect.width) * 8;
                macbook.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                macbook.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        }
    }
}

/* --- PlayStation 5 (PS5) Project Dashboard Controller --- */
function initPS5ProjectConsole() {
    const tiles = document.querySelectorAll('.ps5-game-tile');
    const stageCard = document.getElementById('ps5-stage-card');
    const stageBackdrop = document.getElementById('ps5-stage-backdrop');
    const stageCategory = document.getElementById('ps5-stage-category');
    const stageTitle = document.getElementById('ps5-stage-title');
    const stageRating = document.getElementById('ps5-stage-rating');
    const stageDesc = document.getElementById('ps5-stage-desc');
    const stageTags = document.getElementById('ps5-stage-tags');
    const actionPlay = document.getElementById('ps5-action-play');
    const actionPdf = document.getElementById('ps5-action-pdf');
    const actionGithub = document.getElementById('ps5-action-github');

    if (!tiles.length) return;

    const gamesData = [
        {
            title: "Blood Donor Finder",
            category: "Web System & Database",
            categoryIcon: "fa-solid fa-database",
            rating: "MATCHING: 99.4% INSTANT",
            desc: "A responsive web platform designed to streamline blood donation. Connects blood donors with recipients in real-time, matching medical requests instantly based on blood group requirements and location constraints.",
            image: "assets/images/project_blood_donor.png",
            tags: ["HTML5", "CSS3", "JavaScript", "MySQL", "DBMS"],
            playUrl: "https://mithun-mithu.github.io/Blood-Donor-Finder---2.0/",
            pdfUrl: "Blood%20Donor%20Finder.pdf",
            githubUrl: "#"
        },
        {
            title: "Fake News Detection using AI",
            category: "Artificial Intelligence & NLP",
            categoryIcon: "fa-solid fa-brain",
            rating: "ACCURACY: 98.7% NLP",
            desc: "A machine learning application designed to identify and flag misleading news content. Uses advanced natural language processing (NLP) classifiers to verify article textual markers and calculate authenticity confidence.",
            image: "assets/images/project_fake_news.png",
            tags: ["Python", "NLP", "Machine Learning", "Scikit-Learn", "HTML5 / CSS3"],
            playUrl: "https://aifake.vercel.app/",
            pdfUrl: "Fake%20news%20%20detection.pdf",
            githubUrl: "#"
        },
        {
            title: "QRGen AI",
            category: "Web System & SaaS AI",
            categoryIcon: "fa-solid fa-qrcode",
            rating: "GENERATION: 0.2s SPEED",
            desc: "A premium, production-ready SaaS-style web application for generating and scanning QR codes. Features a breathtaking, futuristic glassmorphism design.",
            image: "assets/images/project_ai_saas.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Glassmorphism", "AI SaaS"],
            playUrl: "https://qr-gen-ai-nine.vercel.app/",
            pdfUrl: null,
            githubUrl: "#"
        },
        {
            title: "SecurePass AI",
            category: "Web System & Security",
            categoryIcon: "fa-solid fa-shield-halved",
            rating: "ENCRYPTION: 256-BIT",
            desc: "An advanced password generator tool designed to create strong, secure, and customizable passwords to enhance digital security.",
            image: "assets/images/project_collaborative.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Cybersecurity", "Entropy"],
            playUrl: "https://secure-pass-ai-advanced-password-ge.vercel.app/",
            pdfUrl: null,
            githubUrl: "#"
        },
        {
            title: "Cute Lamp Login",
            category: "Interactive Web UI",
            categoryIcon: "fa-solid fa-lightbulb",
            rating: "ANIMATION: 60 FPS",
            desc: "An interactive, beautifully designed login page featuring a cute lamp animation and modern aesthetics.",
            image: "assets/images/project_ai_saas.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Interactive UI/UX"],
            playUrl: "https://cute-lamp-login-delta.vercel.app/",
            pdfUrl: null,
            githubUrl: "#"
        }
    ];

    function selectGame(index) {
        const game = gamesData[index];
        if (!game) return;

        tiles.forEach((tile, i) => {
            if (i === parseInt(index)) {
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        });

        // Trigger animation reset
        if (stageCard) {
            stageCard.style.animation = 'none';
            void stageCard.offsetWidth; // trigger reflow
            stageCard.style.animation = 'ps5FadeIn 0.4s ease';
        }

        // Animate stage backdrop & content
        if (stageBackdrop) {
            stageBackdrop.style.backgroundImage = `url('${game.image}')`;
        }
        if (stageCategory) {
            stageCategory.innerHTML = `<i class="${game.categoryIcon}"></i> ${game.category}`;
        }
        if (stageTitle) stageTitle.textContent = game.title;
        if (stageRating) stageRating.textContent = game.rating;
        if (stageDesc) stageDesc.textContent = game.desc;

        if (stageTags) {
            stageTags.innerHTML = game.tags.map(t => `<span class="ps5-tag">${t}</span>`).join('');
        }

        if (actionPlay) {
            actionPlay.href = game.playUrl || '#';
        }

        if (actionPdf) {
            if (game.pdfUrl) {
                actionPdf.href = game.pdfUrl;
                actionPdf.style.display = 'inline-flex';
            } else {
                actionPdf.style.display = 'none';
            }
        }

        if (actionGithub) {
            actionGithub.href = game.githubUrl || '#';
        }
    }

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const index = tile.getAttribute('data-game-index');
            selectGame(index);
        });
    });
}

/* --- Windows 11 Contact Section Interactive Handler --- */
function initWin11ContactTheme() {
    const navItems = document.querySelectorAll('.win11-nav-item');
    const viewPanes = document.querySelectorAll('.win11-view-pane');
    const dockIcons = document.querySelectorAll('.win11-taskbar-icon[data-win11-dock]');

    function switchPane(targetId) {
        navItems.forEach(item => {
            if (item.getAttribute('data-win11-pane') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        dockIcons.forEach(icon => {
            if (icon.getAttribute('data-win11-dock') === targetId) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });

        viewPanes.forEach(pane => {
            if (pane.id === targetId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-win11-pane');
            if (target) switchPane(target);
        });
    });

    dockIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const target = icon.getAttribute('data-win11-dock');
            if (target) switchPane(target);
        });
    });

    // Windows 11 Taskbar Clock
    const timeEl = document.getElementById('win11-contact-clock-time');
    const dateEl = document.getElementById('win11-contact-clock-date');
    if (timeEl && dateEl) {
        function updateClock() {
            const now = new Date();
            timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            dateEl.textContent = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
        }
/* --- PlayStation 5 (PS5) Project Dashboard Controller --- */
function initPS5ProjectConsole() {
    const tiles = document.querySelectorAll('.ps5-game-tile');
    const stageCard = document.getElementById('ps5-stage-card');
    const stageBackdrop = document.getElementById('ps5-stage-backdrop');
    const stageCategory = document.getElementById('ps5-stage-category');
    const stageTitle = document.getElementById('ps5-stage-title');
    const stageRating = document.getElementById('ps5-stage-rating');
    const stageDesc = document.getElementById('ps5-stage-desc');
    const stageTags = document.getElementById('ps5-stage-tags');
    const actionPlay = document.getElementById('ps5-action-play');
    const actionPdf = document.getElementById('ps5-action-pdf');
    const actionGithub = document.getElementById('ps5-action-github');

    if (!tiles.length) return;

    const gamesData = [
        {
            title: "Blood Donor Finder",
            category: "Web System & Database",
            categoryIcon: "fa-solid fa-database",
            rating: "MATCHING: 99.4% INSTANT",
            desc: "A responsive web platform designed to streamline blood donation. Connects blood donors with recipients in real-time, matching medical requests instantly based on blood group requirements and location constraints.",
            image: "assets/images/project_blood_donor.png",
            tags: ["HTML5", "CSS3", "JavaScript", "MySQL", "DBMS"],
            playUrl: "https://mithun-mithu.github.io/Blood-Donor-Finder---2.0/",
            pdfUrl: "Blood%20Donor%20Finder.pdf",
            githubUrl: "#"
        },
        {
            title: "Fake News Detection using AI",
            category: "Artificial Intelligence & NLP",
            categoryIcon: "fa-solid fa-brain",
            rating: "ACCURACY: 98.7% NLP",
            desc: "A machine learning application designed to identify and flag misleading news content. Uses advanced natural language processing (NLP) classifiers to verify article textual markers and calculate authenticity confidence.",
            image: "assets/images/project_fake_news.png",
            tags: ["Python", "NLP", "Machine Learning", "Scikit-Learn", "HTML5 / CSS3"],
            playUrl: "https://aifake.vercel.app/",
            pdfUrl: "Fake%20news%20%20detection.pdf",
            githubUrl: "#"
        },
        {
            title: "QRGen AI",
            category: "Web System & SaaS AI",
            categoryIcon: "fa-solid fa-qrcode",
            rating: "GENERATION: 0.2s SPEED",
            desc: "A premium, production-ready SaaS-style web application for generating and scanning QR codes. Features a breathtaking, futuristic glassmorphism design.",
            image: "assets/images/project_ai_saas.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Glassmorphism", "AI SaaS"],
            playUrl: "https://qr-gen-ai-nine.vercel.app/",
            pdfUrl: null,
            githubUrl: "#"
        },
        {
            title: "SecurePass AI",
            category: "Web System & Security",
            categoryIcon: "fa-solid fa-shield-halved",
            rating: "ENCRYPTION: 256-BIT",
            desc: "An advanced password generator tool designed to create strong, secure, and customizable passwords to enhance digital security.",
            image: "assets/images/project_collaborative.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Cybersecurity", "Entropy"],
            playUrl: "https://secure-pass-ai-advanced-password-ge.vercel.app/",
            pdfUrl: null,
            githubUrl: "#"
        },
        {
            title: "Cute Lamp Login",
            category: "Interactive Web UI",
            categoryIcon: "fa-solid fa-lightbulb",
            rating: "ANIMATION: 60 FPS",
            desc: "An interactive, beautifully designed login page featuring a cute lamp animation and modern aesthetics.",
            image: "assets/images/project_ai_saas.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Interactive UI/UX"],
            playUrl: "https://cute-lamp-login-delta.vercel.app/",
            pdfUrl: null,
            githubUrl: "#"
        }
    ];

    function selectGame(index) {
        const game = gamesData[index];
        if (!game) return;

        tiles.forEach((tile, i) => {
            if (i === parseInt(index)) {
                tile.classList.add('active');
            } else {
                tile.classList.remove('active');
            }
        });

        // Trigger animation reset
        if (stageCard) {
            stageCard.style.animation = 'none';
            void stageCard.offsetWidth; // trigger reflow
            stageCard.style.animation = 'ps5FadeIn 0.4s ease';
        }

        // Animate stage backdrop & content
        if (stageBackdrop) {
            stageBackdrop.style.backgroundImage = `url('${game.image}')`;
        }
        if (stageCategory) {
            stageCategory.innerHTML = `<i class="${game.categoryIcon}"></i> ${game.category}`;
        }
        if (stageTitle) stageTitle.textContent = game.title;
        if (stageRating) stageRating.textContent = game.rating;
        if (stageDesc) stageDesc.textContent = game.desc;

        if (stageTags) {
            stageTags.innerHTML = game.tags.map(t => `<span class="ps5-tag">${t}</span>`).join('');
        }

        if (actionPlay) {
            actionPlay.href = game.playUrl || '#';
        }

        if (actionPdf) {
            if (game.pdfUrl) {
                actionPdf.href = game.pdfUrl;
                actionPdf.style.display = 'inline-flex';
            } else {
                actionPdf.style.display = 'none';
            }
        }

        if (actionGithub) {
            actionGithub.href = game.githubUrl || '#';
        }
    }

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const index = tile.getAttribute('data-game-index');
            selectGame(index);
        });
    });
}

/* --- Windows 11 Contact Section Interactive Handler --- */
function initWin11ContactTheme() {
    const navItems = document.querySelectorAll('.win11-nav-item');
    const viewPanes = document.querySelectorAll('.win11-view-pane');
    const dockIcons = document.querySelectorAll('.win11-taskbar-icon[data-win11-dock]');

    function switchPane(targetId) {
        navItems.forEach(item => {
            if (item.getAttribute('data-win11-pane') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        dockIcons.forEach(icon => {
            if (icon.getAttribute('data-win11-dock') === targetId) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });

        viewPanes.forEach(pane => {
            if (pane.id === targetId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-win11-pane');
            if (target) switchPane(target);
        });
    });

    dockIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const target = icon.getAttribute('data-win11-dock');
            if (target) switchPane(target);
        });
    });

    // Windows 11 Taskbar Clock
    const timeEl = document.getElementById('win11-contact-clock-time');
    const dateEl = document.getElementById('win11-contact-clock-date');
    if (timeEl && dateEl) {
        function updateClock() {
            const now = new Date();
            timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            dateEl.textContent = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
}

