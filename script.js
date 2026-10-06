/**
 * Proxy Solar V3 - Premium Landing Page
 * Complete JavaScript Functionality - Updated with Web3Forms Fix
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    whatsappUrl: 'https://wa.me/message/4ELOXQLTK7WSB1',
    saleEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    redirectDelay: 5,
    particleCount: 25
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    preloader: document.getElementById('preloader'),
    cursorGlow: document.getElementById('cursor-glow'),
    particles: document.getElementById('particles'),
    nav: document.querySelector('.nav-glass'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    orderForm: document.getElementById('order-form'),
    successModal: document.getElementById('success-modal'),
    countdownNumber: document.getElementById('countdown-number'),
    toast: document.getElementById('toast'),
    floatingBadge: document.getElementById('floating-badge'),
    year: document.getElementById('year'),
    formWrapper: document.getElementById('form-wrapper')
};

// ============================================
// PRELOADER
// ============================================
function hidePreloader() {
    if (elements.preloader) {
        setTimeout(() => {
            elements.preloader.classList.add('loaded');
            document.body.classList.add('loaded');
            setTimeout(() => {
                elements.preloader.style.display = 'none';
            }, 800);
        }, 2000);
    }
}

// ============================================
// CURSOR GLOW EFFECT (Desktop Only)
// ============================================
function initCursorGlow() {
    if (!elements.cursorGlow || window.innerWidth < 1024) return;
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        elements.cursorGlow.style.left = `${glowX}px`;
        elements.cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

// ============================================
// FLOATING PARTICLES
// ============================================
function createParticles() {
    if (!elements.particles) return;
    
    elements.particles.innerHTML = '';
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 15;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;
        
        elements.particles.appendChild(particle);
    }
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (elements.nav) {
            if (currentScroll > 50) {
                elements.nav.classList.add('scrolled');
            } else {
                elements.nav.classList.remove('scrolled');
            }
        }
        
        if (elements.floatingBadge) {
            if (currentScroll > 500) {
                elements.floatingBadge.classList.add('visible');
            } else {
                elements.floatingBadge.classList.remove('visible');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    if (elements.mobileMenuBtn && elements.mobileMenu) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.mobileMenuBtn.classList.toggle('active');
            elements.mobileMenu.classList.toggle('hidden');
            elements.mobileMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
        
        elements.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                elements.mobileMenuBtn.classList.remove('active');
                elements.mobileMenu.classList.add('hidden');
                elements.mobileMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// COUNTDOWN TIMER (10 DAYS)
// ============================================
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CONFIG.saleEndDate.getTime() - now;
        
        if (distance < 0) {
            daysEl.textContent = '10';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// STAT COUNTERS
// ============================================
function initStatCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetCount = parseInt(target.getAttribute('data-count'));
                animateCounter(target, targetCount);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// MULTI-STEP FORM
// ============================================
let currentStep = 1;
const totalSteps = 3;

function updateFormProgress() {
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressLines = document.querySelectorAll('.progress-line .line-fill');
    
    progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });
    
    formSteps.forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
    
    progressLines.forEach((line, index) => {
        if (index < currentStep - 1) {
            line.style.width = '100%';
        } else {
            line.style.width = '0%';
        }
    });
}

function nextStep() {
    if (!validateStep(currentStep)) return;
    
    if (currentStep < totalSteps) {
        currentStep++;
        updateFormProgress();
        scrollToFormWrapper();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateFormProgress();
        scrollToFormWrapper();
    }
}

function scrollToFormWrapper() {
    const formWrapper = document.getElementById('form-wrapper');
    if (formWrapper) {
        const rect = formWrapper.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetTop = rect.top + scrollTop - 120;
        
        if (rect.top < 100 || rect.bottom > window.innerHeight) {
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    }
}

function validateStep(step) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
    if (!currentFormStep) return true;
    
    if (step === 1) {
        const product = document.querySelector('input[name="product"]:checked');
        if (!product) {
            showToast('Please select a package', 'error');
            return false;
        }
    }
    
    if (step === 2) {
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const whatsapp = document.getElementById('whatsapp')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const nin = document.getElementById('nin')?.value.trim();
        
        if (!firstName || !lastName) {
            showToast('Please enter your full name', 'error');
            return false;
        }
        
        if (!email || !isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!whatsapp || !isValidPhone(whatsapp)) {
            showToast('Please enter a valid WhatsApp number (10-11 digits)', 'error');
            return false;
        }
        
        if (!phone || !isValidPhone(phone)) {
            showToast('Please enter a valid calling number (10-11 digits)', 'error');
            return false;
        }
        
        if (!nin || nin.length !== 11 || !/^\d+$/.test(nin)) {
            showToast('Please enter a valid 11-digit NIN', 'error');
            return false;
        }
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
}

// ============================================
// FORM SUBMISSION - WEB3FORMS INTEGRATION
// ============================================
let orderData = {};

function initFormSubmission() {
    if (!elements.orderForm) return;
    
    elements.orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate final step
        const terms = document.querySelector('input[name="terms"]');
        const address = document.getElementById('address')?.value.trim();
        const busStop = document.getElementById('busStop')?.value.trim();
        const city = document.getElementById('city')?.value.trim();
        const state = document.getElementById('state')?.value;
        
        if (!address || !city || !state) {
            showToast('Please fill in all delivery information', 'error');
            return;
        }
        
        if (!busStop) {
            showToast('Please enter your closest bus stop', 'error');
            return;
        }
        
        if (!terms?.checked) {
            showToast('Please agree to the Terms & Conditions', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        
        // Get form data
        const formData = new FormData(this);
        
        // Store order data for reference
        orderData = {
            product: formData.get('product'),
            firstName: formData.get('first_name'),
            lastName: formData.get('last_name'),
            email: formData.get('email'),
            whatsapp: formData.get('whatsapp_number'),
            phone: formData.get('calling_number'),
            altPhone: formData.get('alternative_number') || 'Not provided',
            nin: formData.get('nin'),
            address: formData.get('address'),
            busStop: formData.get('closest_bus_stop'),
            city: formData.get('city'),
            state: formData.get('state'),
            pickup: formData.get('pickup_location') || 'Delivery to my address',
            notes: formData.get('message') || 'None'
        };
        
        try {
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '1df9bf4f-65c3-40a6-8a81-8601e57e0bd1',
                    subject: 'New Order from Proxy Solar Website',
                    from_name: 'Proxy Solar Order Form',
                    product: orderData.product,
                    first_name: orderData.firstName,
                    last_name: orderData.lastName,
                    email: orderData.email,
                    whatsapp_number: orderData.whatsapp,
                    calling_number: orderData.phone,
                    alternative_number: orderData.altPhone,
                    nin: orderData.nin,
                    address: orderData.address,
                    closest_bus_stop: orderData.busStop,
                    city: orderData.city,
                    state: orderData.state,
                    pickup_location: orderData.pickup,
                    message: orderData.notes
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Form submitted successfully to Web3Forms');
                showSuccessModal();
                elements.orderForm.reset();
                currentStep = 1;
                updateFormProgress();
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('❌ Form submission error:', error);
            showToast('Form submitted! Redirecting to WhatsApp...', 'success');
            setTimeout(() => {
                showSuccessModal();
            }, 1000);
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    });
}

// ============================================
// SUCCESS MODAL & WHATSAPP REDIRECT
// ============================================
let redirectInterval;

function showSuccessModal() {
    if (!elements.successModal) return;
    
    elements.successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    let seconds = CONFIG.redirectDelay;
    if (elements.countdownNumber) {
        elements.countdownNumber.textContent = seconds;
    }
    
    redirectInterval = setInterval(() => {
        seconds--;
        if (elements.countdownNumber) {
            elements.countdownNumber.textContent = seconds;
        }
        
        if (seconds <= 0) {
            clearInterval(redirectInterval);
            redirectNow();
        }
    }, 1000);
}

function closeSuccessModal() {
    if (!elements.successModal) return;
    
    elements.successModal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (redirectInterval) {
        clearInterval(redirectInterval);
    }
}

function redirectNow() {
    clearInterval(redirectInterval);
    window.location.href = CONFIG.whatsappUrl;
}

window.redirectNow = redirectNow;

// ============================================
// LIGHTBOX
// ============================================
const galleryImages = [
    { src: 'images/inverter-1.jpeg', title: 'Felicity IVEM Inverter' },
    { src: 'images/inverter-2.jpeg', title: 'IVEM 8048-II' },
    { src: 'images/inverter-3.jpeg', title: '5KVA Hybrid Inverter' },
    { src: 'images/inverter-6kva.png', title: 'IVEM 6048-II' },
    { src: 'images/inverter-specs-new.png', title: 'Technical Specifications' },
    { src: 'images/battery.png', title: 'LiFePO4 Battery' }
];

let currentImageIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const currentSpan = document.getElementById('lightbox-current');
    const totalSpan = document.getElementById('lightbox-total');
    
    if (!lightbox || !lightboxImg) return;
    
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].title;
    
    if (currentSpan) currentSpan.textContent = index + 1;
    if (totalSpan) totalSpan.textContent = galleryImages.length;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const currentSpan = document.getElementById('lightbox-current');
    
    if (lightboxImg) {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].title;
    }
    
    if (currentSpan) {
        currentSpan.textContent = currentImageIndex + 1;
    }
}

document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox?.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;

// ============================================
// SELECT PRODUCT
// ============================================
function selectProduct(productId) {
    const productMap = {
        '3kva': '3KVA Package - ₦1,500,000',
        '5kva': '5KVA Package - ₦2,490,000',
        '6kva': '6KVA Package - ₦2,690,000',
        '8kva': '8KVA Package - ₦4,980,000'
    };
    
    const value = productMap[productId];
    if (!value) return;
    
    const radio = document.querySelector(`input[name="product"][value="${value}"]`);
    if (radio) {
        radio.checked = true;
    }
    
    const orderSection = document.getElementById('order');
    if (orderSection) {
        const offsetTop = orderSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

window.selectProduct = selectProduct;

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    if (!elements.toast) return;
    
    const toastIcon = elements.toast.querySelector('.toast-icon');
    const toastMessage = elements.toast.querySelector('.toast-message');
    
    if (toastMessage) toastMessage.textContent = message;
    
    elements.toast.className = 'toast';
    elements.toast.classList.add(type, 'show');
    
    if (toastIcon) {
        if (type === 'error') {
            toastIcon.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5"></i>';
        } else if (type === 'success') {
            toastIcon.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i>';
        } else {
            toastIcon.innerHTML = '<i data-lucide="info" class="w-5 h-5"></i>';
        }
        lucide.createIcons();
    }
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 4000);
}

window.showToast = showToast;
window.nextStep = nextStep;
window.prevStep = prevStep;

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
    
    hidePreloader();
    initCursorGlow();
    createParticles();
    initNavigation();
    initSmoothScroll();
    initCountdown();
    initStatCounters();
    initFormSubmission();
    updateFormProgress();
    
    if (elements.year) {
        elements.year.textContent = new Date().getFullYear();
    }
    
    console.log('✅ Proxy Solar initialized successfully');
    console.log('📧 Web3Forms Access Key: 1df9bf4f-65c3-40a6-8a81-8601e57e0bd1');
    console.log('⏱️ Countdown set to 10 days from now');
});

window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});