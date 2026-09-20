function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.hamburger');
  if (!menu || !btn) return;
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Menu');
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

// Active nav link tracking — scroll position picks the section in view
const navLinks = document.querySelectorAll('[data-nav]');
const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact'];
const NAV_ACTIVE_OFFSET = 120;

function setActiveNavSection(id) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

function updateActiveNav() {
  const scrollPos = window.scrollY + NAV_ACTIVE_OFFSET;
  let currentId = '';

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    if (scrollPos >= sectionTop) currentId = id;
  });

  if (currentId) {
    setActiveNavSection(currentId);
  } else {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// Resume preview modal
const RESUME_PDF = 'Amirhossein_Peyravan_Resume.pdf';
const resumeModal = document.getElementById('resumeModal');
const resumeIframe = resumeModal?.querySelector('iframe');
let resumeScrollY = 0;

function openResumeModal() {
  if (!resumeModal) return;
  resumeScrollY = window.scrollY;
  resumeModal.classList.add('open');
  resumeModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (resumeIframe) {
    resumeIframe.src = `${RESUME_PDF}#toolbar=0&navpanes=0`;
  }
  resumeModal.querySelector('.resume-modal-close')?.focus();
}

function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  resumeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  window.scrollTo(0, resumeScrollY);
  if (resumeIframe) resumeIframe.src = 'about:blank';
}

document.getElementById('resumeBtn')?.addEventListener('click', openResumeModal);
document.getElementById('mobileResumeBtn')?.addEventListener('click', () => {
  const menu = document.getElementById('mobileMenu');
  if (menu?.classList.contains('open')) toggleMenu();
  openResumeModal();
});

resumeModal?.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeResumeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
    closeResumeModal();
  }
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

// Project logo river — two counter-scrolling rows, bare logos, no links
const logoRowA = [
  { name: 'Nexavio', src: 'companies/nexavio.png' },
  { name: 'Aloomelk', src: 'companies/aloomelk.svg' },
  { name: 'Moviesho', src: 'companies/moviesho.png' },
  { name: 'Khodroonet', src: 'companies/khodroonet.png' },
  { name: 'ASDP Co', src: 'companies/asdpco.png' },
  { name: 'Mother Pharmacy', src: 'companies/mother-pharmacy.svg' },
  { name: 'Sazkala', src: 'companies/sazkala.png' },
  { name: 'Karinja', src: 'companies/karinja.png' },
  { name: 'RCS Iran', src: 'companies/rcs_iran.png' },
  { name: 'Next Hour', src: 'companies/next-hour.png' },
  { name: 'Fars Developers', src: 'companies/farsdevelopers.png' }
];

const logoRowB = [
  { name: 'Hominex', src: 'companies/hominex.webp' },
  { name: 'Parnian Data', src: 'companies/parniandata.png' },
  { name: 'Iracode', src: 'companies/iracode.png' },
  { name: 'Ahoora Gallery', src: 'companies/ahoora-gallery.png' },
  { name: 'Bazargani Ahmadian', src: 'companies/bazargani-ahmadian.png' },
  { name: 'Islamic Azad University', src: 'companies/iau_ir.webp' },
  { name: 'Tehran Municipality District 1', src: 'companies/region1.tehran.svg' },
  { name: 'Homi Work', src: 'companies/homi_work.png' },
  { name: 'Majazisho', src: 'companies/majazisho.png' },
  { name: 'Zaminpak', src: 'companies/zaminpak.png' }
];

function buildLogoMarks(list) {
  return list.map(logo =>
    `<span class="logo-mark"><img src="${logo.src}" alt="${logo.name}" title="${logo.name}" decoding="async"></span>`
  ).join('');
}

function initLogoRiverTrack(trackEl, logos, pxPerSecond, reverse) {
  const container = trackEl?.parentElement;
  if (!trackEl || !container) return;

  const marksHtml = buildLogoMarks(logos);

  function createSet(ariaHidden) {
    const set = document.createElement('div');
    set.className = 'logo-set';
    if (ariaHidden) set.setAttribute('aria-hidden', 'true');
    set.innerHTML = marksHtml;
    return set;
  }

  trackEl.innerHTML = '';
  trackEl.style.transform = 'translateX(0)';
  trackEl.appendChild(createSet(false));

  const containerWidth = container.getBoundingClientRect().width;
  while (trackEl.scrollWidth < containerWidth * 2) {
    trackEl.appendChild(createSet(true));
  }
  if (trackEl.querySelectorAll('.logo-set').length % 2 === 1) {
    trackEl.appendChild(createSet(true));
  }

  const halfWidth = trackEl.scrollWidth / 2;
  const duration = halfWidth / pxPerSecond;

  trackEl.style.setProperty('--marquee-distance', `-${halfWidth}px`);
  trackEl.style.setProperty('--marquee-duration', `${duration}s`);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const direction = reverse ? ' reverse' : '';
  trackEl.style.animation = reducedMotion
    ? 'none'
    : `marquee-scroll var(--marquee-duration) linear infinite${direction}`;
}

function waitForLogoImages(trackEl) {
  const images = [...(trackEl?.querySelectorAll('img') || [])];
  if (!images.length) return Promise.resolve();
  return Promise.all(images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  }));
}

async function initLogoRiver() {
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const trackA = document.getElementById('logoRiverTrackA');
  const trackB = document.getElementById('logoRiverTrackB');

  initLogoRiverTrack(trackA, logoRowA, isMobile ? 38 : 46, false);
  initLogoRiverTrack(trackB, logoRowB, isMobile ? 32 : 38, true);

  await Promise.all([waitForLogoImages(trackA), waitForLogoImages(trackB)]);
  initLogoRiverTrack(trackA, logoRowA, isMobile ? 38 : 46, false);
  initLogoRiverTrack(trackB, logoRowB, isMobile ? 32 : 38, true);
}

initLogoRiver();

let marqueeResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(marqueeResizeTimer);
  marqueeResizeTimer = setTimeout(() => {
    initMarquee();
    initLogoRiver();
  }, 200);
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
    projects: '#f5f2ec',
    skills: '#ede9e0',
    experience: '#ede9e0',
    contact: '#f5f2ec'
  };
  const colorSections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
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
