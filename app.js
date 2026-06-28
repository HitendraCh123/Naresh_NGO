/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  const st = document.getElementById('scrollTop');
  if (st) st.classList.toggle('show', window.scrollY > 400);
});

/* ─── MOBILE NAV ─── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mOverlay   = document.getElementById('mobileOverlay');
const toggleMob  = () => { mobileNav.classList.toggle('open'); mOverlay.classList.toggle('open'); };
if (hamburger) hamburger.addEventListener('click', toggleMob);
if (mOverlay) mOverlay.addEventListener('click', toggleMob);
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => { mobileNav.classList.remove('open'); mOverlay.classList.remove('open'); }));

/* ─── ACTIVE NAV LINK BY CURRENT PAGE ─── */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
  }, 16);
}

const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statObs.disconnect();
    }
  });
}, { threshold: 0.4 });
const statsEl = document.getElementById('stats');
if (statsEl) statObs.observe(statsEl);

/* ─── CONTACT FORM ─── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function handleSubmit() {
  const name  = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg   = document.getElementById('cMsg').value.trim();
  if (!name || !email || !msg) { showToast('⚠️ Please fill in all required fields.'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { showToast('⚠️ Please enter a valid email.'); return; }
  showToast('✅ Thank you! We will get back to you soon. / धन्यवाद!');
  ['cName','cPhone','cEmail','cPurpose','cMsg'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

/* ─── SMOOTH STAGGER for grid cards ─── */
document.querySelectorAll('.vmv-grid .vmv-card, .programs-grid .prog-card, .legal-grid .legal-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

/* ─── PROGRAMS PAGE: category tabs ─── */
const catTabs = document.querySelectorAll('.cat-tab');
const catPanels = document.querySelectorAll('.cat-panel');
if (catTabs.length) {
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      catPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.cat);
      if (target) target.classList.add('active');
      const anchor = document.getElementById('catTabsAnchor');
      if (anchor) window.scrollTo({ top: anchor.offsetTop - 90, behavior: 'smooth' });
    });
  });
}

/* ─── HERO STARFIELD generator (home page only) ─── */
const starField = document.querySelector('.hero-stars');
if (starField) {
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 3.5) + 's';
    s.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
    starField.appendChild(s);
  }
}
