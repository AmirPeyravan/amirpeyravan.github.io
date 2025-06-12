// پیش‌نمایش
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// تایپ نمایشی (بازنویسی‌شده)
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["توسعه‌دهنده Full Stack", "طراح UI/UX", "PHP-Laravel | C#-.Net | ", "دانشجوی مهندسی کامپیوتر"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.style.display = 'inline';
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.style.display = 'inline';
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

// انیمیشن نشانگر ماوس سفارشی
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorOuter.style.left = mouseX + 'px';
    cursorOuter.style.top = mouseY + 'px';

    cursorInner.style.left = mouseX + 'px';
    cursorInner.style.top = mouseY + 'px';

    cursorInner.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';

    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        cursorInner.style.backgroundColor = '#f59e0b';
        cursorOuter.style.borderColor = '#6d28d9';
        cursorInner.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorOuter.style.transform = 'translate(-50%, -50%) scale(2)';
    } else {
        cursorInner.style.backgroundColor = '#f59e0b';
        cursorOuter.style.borderColor = '#6d28d9';
    }
});

document.addEventListener('mouseleave', () => {
    cursorInner.style.display = 'none';
    cursorOuter.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursorInner.style.display = '';
    cursorOuter.style.display = '';
});

// اسکرول به بالا
const scrollToTopBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// منوی چسبان
const stickyNav = document.querySelector('.sticky-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
});

// انیمیشن‌های GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.from(".circle-image", {
    duration: 1.5,
    scale: 0,
    opacity: 0,
    ease: "elastic.out(1, 0.3)",
    scrollTrigger: {
        trigger: "#home",
        start: "top center"
    }
});

gsap.from(".floating-element", {
    duration: 1,
    y: -50,
    opacity: 0,
    stagger: 0.2,
    delay: 0.5,
    scrollTrigger: {
        trigger: "#home",
        start: "top center"
    }
});

gsap.from("h1, p", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    delay: 0.8,
    scrollTrigger: {
        trigger: "#home",
        start: "top center"
    }
});

gsap.from("#about .glass-card", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%"
    },
    duration: 1,
    y: 50,
    opacity: 0
});

gsap.from(".skill-item", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 80%"
    },
    duration: 1,
    x: -50,
    opacity: 0,
    stagger: 0.2
});

gsap.from(".portfolio-card", {
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 80%"
    },
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2
});

gsap.from("#contact .glass-card", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%"
    },
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2
});

// تم تیره/روشن
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--dark-bg', '#f8fafc');
        document.documentElement.style.setProperty('--light-bg', '#e2e8f0');
        document.documentElement.style.setProperty('--text-color', '#0f172a');
        document.documentElement.style.setProperty('--text-secondary', '#475569');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.style.setProperty('--dark-bg', '#0f172a');
        document.documentElement.style.setProperty('--light-bg', '#1e293b');
        document.documentElement.style.setProperty('--text-color', '#f8fafc');
        document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});



// کنترل منوی همبرگری
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').prepend(hamburger);

const navLinks = document.querySelector('nav .flex');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
// جلوگیری از اسکرول صفحه هنگام باز بودن منو
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// بستن منو با کلیک خارج از آن
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    document.addEventListener('click', (e) => {
        if (
            nav &&
            hamburger &&
            navLinks &&
            !nav.contains(e.target) &&
            !hamburger.contains(e.target) &&
            navLinks.classList.contains('active')
        ) {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});


// تنظیم برای sticky-nav
const stickyHamburger = document.createElement('div');
stickyHamburger.className = 'hamburger';
stickyHamburger.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.sticky-nav').prepend(stickyHamburger);

const stickyNavLinks = document.querySelector('.sticky-nav .flex');
stickyHamburger.addEventListener('click', () => {
    stickyNavLinks.classList.toggle('active');
    if (stickyNavLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// بستن منو با کلیک روی لینک‌ها
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        stickyNavLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});


