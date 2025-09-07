// 🚀 Modern Interactive Website JavaScript - Fixed Version
// This file handles all interactive features and animations

/* ===== IMMEDIATE INITIALIZATION ===== */
// Initialize features immediately when script loads
(function() {
    'use strict';

    // 🎯 Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWebsite);
    } else {
        initializeWebsite();
    }

    function initializeWebsite() {
        console.log('🚀 Initializing interactive website...');
        
        initThemeToggle();
        initMobileNavigation();
        initSmoothScrolling();
        initScrollReveal();
        initFormValidation();
        initButtonEffects();
        initHeaderScroll();
        initNumberAnimations();
        initParallaxEffect();
        
        console.log('✨ Website initialized successfully!');
    }

    /* ===== 🌙 THEME TOGGLE FUNCTIONALITY ===== */
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');
        
        if (!themeToggle || !themeIcon) {
            console.warn('Theme toggle elements not found');
            return;
        }
        
        // Get saved theme from localStorage or default to light
        let currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        
        // Update icon based on current theme
        updateThemeIcon(themeIcon, currentTheme);
        
        // Add click event listener
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle theme
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Apply new theme
            document.documentElement.setAttribute('data-color-scheme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            
            // Update icon with animation
            updateThemeIcon(themeIcon, currentTheme);
            
            // Add fun scale animation
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
            
            console.log(`🎨 Theme switched to ${currentTheme} mode`);
        });

        function updateThemeIcon(iconElement, theme) {
            iconElement.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    /* ===== 🍔 MOBILE NAVIGATION ===== */
    function initMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!navToggle || !navMenu) {
            console.warn('Mobile navigation elements not found');
            return;
        }

        // Toggle mobile menu
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('show');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
            
            console.log('🍔 Mobile menu toggled');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    /* ===== 🎯 SMOOTH SCROLLING ===== */
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed header
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 70;
                    const offsetTop = targetSection.offsetTop - headerHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    console.log(`🎯 Scrolling to ${targetId}`);
                }
            });
        });
    }

    /* ===== 👁️ SCROLL REVEAL ANIMATIONS ===== */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        if (!revealElements.length) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, 100);
                    
                    observer.unobserve(entry.target);
                    console.log('✨ Element revealed');
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    /* ===== 📝 FORM VALIDATION ===== */
    function initFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        // Real-time validation
        if (nameField) {
            nameField.addEventListener('blur', () => validateName());
            nameField.addEventListener('input', () => clearFieldError(nameField, 'name-error'));
        }
        
        if (emailField) {
            emailField.addEventListener('blur', () => validateEmail());
            emailField.addEventListener('input', () => clearFieldError(emailField, 'email-error'));
        }
        
        if (messageField) {
            messageField.addEventListener('blur', () => validateMessage());
            messageField.addEventListener('input', () => clearFieldError(messageField, 'message-error'));
        }

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                submitForm(form);
            } else {
                console.log('❌ Form validation failed');
            }
        });

        function validateName() {
            if (!nameField) return true;
            
            const value = nameField.value.trim();
            const errorElement = document.getElementById('name-error');
            
            if (value.length < 2) {
                showFieldError(nameField, errorElement, 'Name must be at least 2 characters long');
                return false;
            }
            
            showFieldSuccess(nameField, errorElement);
            return true;
        }

        function validateEmail() {
            if (!emailField) return true;
            
            const value = emailField.value.trim();
            const errorElement = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(value)) {
                showFieldError(emailField, errorElement, 'Please enter a valid email address');
                return false;
            }
            
            showFieldSuccess(emailField, errorElement);
            return true;
        }

        function validateMessage() {
            if (!messageField) return true;
            
            const value = messageField.value.trim();
            const errorElement = document.getElementById('message-error');
            
            if (value.length < 10) {
                showFieldError(messageField, errorElement, 'Message must be at least 10 characters long');
                return false;
            }
            
            showFieldSuccess(messageField, errorElement);
            return true;
        }

        function showFieldError(field, errorElement, message) {
            field.classList.remove('success');
            field.classList.add('error');
            if (errorElement) errorElement.textContent = message;
        }

        function showFieldSuccess(field, errorElement) {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorElement) errorElement.textContent = '';
        }

        function clearFieldError(field, errorId) {
            field.classList.remove('error');
            const errorElement = document.getElementById(errorId);
            if (errorElement) errorElement.textContent = '';
        }

        function submitForm(form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) return;
            
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = 'Sending... ⏳';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Success state
                submitButton.innerHTML = 'Message Sent! ✅';
                submitButton.style.background = 'var(--color-success)';
                
                // Reset form
                form.reset();
                document.querySelectorAll('.form-control').forEach(field => {
                    field.classList.remove('error', 'success');
                });
                document.querySelectorAll('.form-error').forEach(error => {
                    error.textContent = '';
                });
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
                
                console.log('📧 Form submitted successfully!');
            }, 1500);
        }
    }

    /* ===== ✨ BUTTON EFFECTS ===== */
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });

            // Click effects
            button.addEventListener('click', function() {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        });
    }

    /* ===== 📜 HEADER SCROLL EFFECTS ===== */
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Add backdrop blur when scrolling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header when scrolling down fast, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    /* ===== 🔢 NUMBER ANIMATIONS ===== */
    function initNumberAnimations() {
        const statNumbers = document.querySelectorAll('.stat__number');
        
        if (!statNumbers.length) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.textContent;
                    const finalNumber = parseInt(text.replace(/\D/g, ''));
                    
                    if (finalNumber) {
                        animateNumber(element, 0, finalNumber, 2000, text);
                    }
                    
                    observer.unobserve(element);
                }
            });
        });
        
        statNumbers.forEach(element => {
            observer.observe(element);
        });

        function animateNumber(element, start, end, duration, originalText) {
            const startTime = performance.now();
            const difference = end - start;
            const suffix = originalText.replace(/\d/g, '').replace('+', '');
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (difference * easeOutQuart));
                
                element.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            requestAnimationFrame(updateNumber);
        }
    }

    /* ===== 🎨 PARALLAX EFFECT ===== */
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero__bg-element');
        
        if (!parallaxElements.length) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
            
            ticking = false;
        }
    }

    /* ===== 🎮 EASTER EGG - KONAMI CODE ===== */
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join(',') === konamiCode.join(',')) {
            triggerEasterEgg();
        }
    });
    
    function triggerEasterEgg() {
        document.body.style.animation = 'rainbow 3s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 6000);
        
        console.log('🎉 Konami code activated! Rainbow mode!');
    }

})();

// Add CSS for rainbow animation via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .btn.clicked {
        transform: scale(0.95) translateY(-2px);
    }
    
    .header.scrolled {
        background: rgba(var(--color-slate-900-rgb, 19, 52, 59), 0.98);
    }
`;
document.head.appendChild(style);

console.log('🎉 Interactive website JavaScript loaded successfully!');
console.log('✨ All features initialized and ready to use!');
console.log('🎮 Try the Konami code: ↑↑↓↓←→←→BA for a surprise!');
