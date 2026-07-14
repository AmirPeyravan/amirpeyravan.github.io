function toggleMenu() {
const menu = document.getElementById('mobileMenu');
const btn = document.querySelector('.hamburger');
const isOpen = menu.classList.toggle('open');
btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.querySelector('.hamburger')?.addEventListener('click', toggleMenu);
document.querySelectorAll('.mobile-menu a').forEach((link) => {
link.addEventListener('click', toggleMenu);
});

// Reveal-on-scroll
const revealRootMargin = window.matchMedia('(max-width: 900px)').matches
  ? '0px 0px 0px 0px'
  : '0px 0px -40px 0px';
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: revealRootMargin });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Cinematic section framing: each section "comes into frame" as it dominates the viewport
const cineSections = document.querySelectorAll('.cine-section');
const cineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-frame', entry.isIntersecting);
  });
}, { threshold: 0.2 });
cineSections.forEach(el => cineObserver.observe(el));

// Active nav link tracking
const navLinks = document.querySelectorAll('[data-nav]');
const sectionIds = ['about', 'skills', 'projects', 'experience', 'contact'];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });
sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});

// Scroll progress rail
const progressRail = document.getElementById('progressRail');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressRail.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Tech icon marquee — seamless loop, starts from Laravel, no gap
const techStack = [
  { name: 'Laravel', icon: 'laravel/laravel-original' },
  { name: 'PHP', icon: 'php/php-original' },
  { name: 'Docker', icon: 'docker/docker-original' },
  { name: 'MySQL', icon: 'mysql/mysql-original' },
  { name: 'MongoDB', icon: 'mongodb/mongodb-original' },
  { name: 'React', icon: 'react/react-original' },
  { name: 'Next.js', icon: 'nextjs/nextjs-original' },
  { name: 'Nginx', icon: 'nginx/nginx-original' },
  { name: 'Kubernetes', icon: 'kubernetes/kubernetes-line' },
  { name: 'Git', icon: 'git/git-original' },
  { name: 'Python', icon: 'python/python-original' },
  { name: 'Linux', icon: 'linux/linux-original' },
  { name: 'GitLab', icon: 'gitlab/gitlab-original' },
  { name: 'Redis', icon: 'redis/redis-original' },
  { name: 'Elasticsearch', icon: 'elasticsearch/elasticsearch-original' },
  { name: 'JavaScript', icon: 'javascript/javascript-original' }
];
const techMarqueeTrack = document.getElementById('techMarqueeTrack');
const iconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
function buildTechChips(list) {
  return list.map(t =>
    `<img class="tech-icon" src="${iconBase}${t.icon}.svg" alt="${t.name}" title="${t.name}">`
  ).join('');
}

function initMarquee() {
  const container = techMarqueeTrack?.parentElement;
  if (!techMarqueeTrack || !container) return;

  const iconsHtml = buildTechChips(techStack);

  function createSet() {
    const set = document.createElement('div');
    set.className = 'marquee-set';
    set.innerHTML = iconsHtml;
    return set;
  }

  techMarqueeTrack.innerHTML = '';
  techMarqueeTrack.style.transform = 'translateX(0)';
  techMarqueeTrack.appendChild(createSet());

  const containerWidth = container.getBoundingClientRect().width;
  while (techMarqueeTrack.scrollWidth < containerWidth * 2) {
    techMarqueeTrack.appendChild(createSet());
  }
  if (techMarqueeTrack.querySelectorAll('.marquee-set').length % 2 === 1) {
    techMarqueeTrack.appendChild(createSet());
  }

  const halfWidth = techMarqueeTrack.scrollWidth / 2;
  const pxPerSecond = window.matchMedia('(max-width: 900px)').matches ? 42 : 52;
  const duration = halfWidth / pxPerSecond;

  techMarqueeTrack.style.setProperty('--marquee-distance', `-${halfWidth}px`);
  techMarqueeTrack.style.setProperty('--marquee-duration', `${duration}s`);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  techMarqueeTrack.style.animation = reducedMotion
    ? 'none'
    : 'marquee-scroll var(--marquee-duration) linear infinite';
}

initMarquee();
let marqueeResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(marqueeResizeTimer);
  marqueeResizeTimer = setTimeout(initMarquee, 200);
});

// Hero orbit — gentle parallax on scroll
const heroOrbit = document.getElementById('heroOrbit');
let orbitTicking = false;
window.addEventListener('scroll', () => {
  if (!orbitTicking && heroOrbit) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      heroOrbit.style.transform = `translateY(${scrolled * 0.04}px)`;
      orbitTicking = false;
    });
    orbitTicking = true;
  }
}, { passive: true });

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.split(' ').includes(filter);
      card.classList.toggle('hidden-card', !show);
    });
  });
});

const profileImg = document.querySelector('.profile-frame img');
if (profileImg && profileImg.src.includes('your-image-url-here')) {
  profileImg.style.display = 'none';
  profileImg.parentNode.querySelector('.profile-placeholder').style.display = 'flex';
}

// Mobile browser chrome — orange tab bar on mobile; section-sync on desktop
const mobileMq = window.matchMedia('(max-width: 900px)');
const accentColor = '#c84b31';

function syncThemeColor() {
  const meta = mobileMq.matches
    ? document.querySelector('meta[name="theme-color"][media*="max-width"]')
    : document.querySelector('meta[name="theme-color"][media*="min-width"]');
  return meta;
}

let themeColorMeta = syncThemeColor();

if (mobileMq.matches && themeColorMeta) {
  themeColorMeta.setAttribute('content', accentColor);
} else if (themeColorMeta) {
  const sectionColors = {
    hero: '#f5f2ec',
    about: '#f5f2ec',
    skills: '#ede9e0',
    projects: '#f5f2ec',
    experience: '#ede9e0',
    contact: '#f5f2ec'
  };
  const colorSections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
  const colorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && themeColorMeta) {
        const color = sectionColors[entry.target.id];
        if (color) themeColorMeta.setAttribute('content', color);
      }
    });
  }, { threshold: 0.5 });
  colorSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) colorObserver.observe(el);
  });
}

mobileMq.addEventListener('change', () => {
  themeColorMeta = syncThemeColor();
  if (mobileMq.matches && themeColorMeta) {
    themeColorMeta.setAttribute('content', accentColor);
  }
});
