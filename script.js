/* ═══════════════════════════════════════════
   BIKEBAZAAR — script.js
   Complete functionality + visual effects
═══════════════════════════════════════════ */

'use strict';

// ──────────────────────────────────────────
//  DATA
// ──────────────────────────────────────────
const BIKE_IMAGES = {
  activa: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  pulsar: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80',
  splendor: 'https://images.unsplash.com/photo-1544733422-251b04e4e98c?w=600&q=80',
  generic1: 'https://images.unsplash.com/photo-1615172282427-f84ab1793334?w=600&q=80',
  generic2: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80',
  generic3: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80',
  ev: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
  royal: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
};

const LISTINGS = [
  {
    id: 1, model: 'Honda Activa 6G', year: 2022, price: 65000, km: 12500,
    city: 'Pimpri', rc: 'MH12AB3456', verified: true, isEV: false,
    category: 'scooter', phone: '9876543210',
    desc: 'Well maintained, single owner, all documents clear. Newly serviced.',
    img: BIKE_IMAGES.activa, aiPrice: 67000, priceTag: 'fair',
    owner: 'Rajesh Kumar',
  },
  {
    id: 2, model: 'Bajaj Pulsar 150', year: 2021, price: 72000, km: 21000,
    city: 'Chinchwad', rc: 'MH14XY7890', verified: true, isEV: false,
    category: 'commuter', phone: '9765432109',
    desc: 'Sports mode, original paint, no accidents. Minor scratches on tank.',
    img: BIKE_IMAGES.pulsar, aiPrice: 68000, priceTag: 'high',
    owner: 'Suresh Patil',
  },
  {
    id: 3, model: 'Hero Splendor Plus', year: 2020, price: 45000, km: 34000,
    city: 'Wakad', rc: 'MH15CD2345', verified: false, isEV: false,
    category: 'commuter', phone: '9654321098',
    desc: 'Fuel efficient daily rider, runs perfectly. Insurance valid till Dec 2025.',
    img: BIKE_IMAGES.splendor, aiPrice: 48000, priceTag: 'low',
    owner: 'Amit Sharma',
  },
  {
    id: 4, model: 'Ola S1 Pro (EV)', year: 2023, price: 95000, km: 8000,
    city: 'Hinjewadi', rc: 'MH12EV0011', verified: true, isEV: true,
    category: 'ev', phone: '9543210987',
    desc: 'Electric scooter, full charge range 135km, fast charger included.',
    img: BIKE_IMAGES.ev, aiPrice: 98000, priceTag: 'fair',
    owner: 'Priya Nair',
  },
  {
    id: 5, model: 'Royal Enfield Classic 350', year: 2022, price: 155000, km: 9500,
    city: 'Kothrud', rc: 'MH12RE5599', verified: true, isEV: false,
    category: 'sports', phone: '9432109876',
    desc: 'Signals variant, original accessories, all papers. Must ride experience!',
    img: BIKE_IMAGES.royal, aiPrice: 160000, priceTag: 'low',
    owner: 'Vikram Bose',
  },
  {
    id: 6, model: 'TVS Jupiter 125', year: 2023, price: 78000, km: 5200,
    city: 'Pune', rc: 'MH12TV8833', verified: true, isEV: false,
    category: 'scooter', phone: '9321098765',
    desc: 'Almost new, under warranty. Family used only on weekends.',
    img: BIKE_IMAGES.generic1, aiPrice: 80000, priceTag: 'fair',
    owner: 'Meena Desai',
  },
  {
    id: 7, model: 'KTM Duke 200', year: 2021, price: 118000, km: 18000,
    city: 'Pimpri', rc: 'MH12KT6677', verified: false, isEV: false,
    category: 'sports', phone: '9210987654',
    desc: 'Street legal, naked sports, aftermarket exhaust. Fast delivery possible.',
    img: BIKE_IMAGES.generic2, aiPrice: 115000, priceTag: 'high',
    owner: 'Arjun Mehta',
  },
  {
    id: 8, model: 'Honda CB Shine', year: 2020, price: 52000, km: 29000,
    city: 'Pune', rc: 'MH12CB4422', verified: true, isEV: false,
    category: 'commuter', phone: '9109876543',
    desc: 'Reliable workhorse, just serviced. Good mileage, clean engine.',
    img: BIKE_IMAGES.generic3, aiPrice: 55000, priceTag: 'fair',
    owner: 'Sandeep Joshi',
  },
];

// ──────────────────────────────────────────
//  STATE
// ──────────────────────────────────────────
let state = {
  listings: [...LISTINGS],
  filtered: [...LISTINGS],
  theme: 'dark',
  searchQuery: '',
  categoryFilter: 'all',
  cityFilter: 'all',
  sortBy: 'newest',
  budgetMax: 200000,
  verifiedOnly: false,
  emiOpen: false,
};

// ──────────────────────────────────────────
//  DOM REFS
// ──────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  searchInput: $('searchInput'),
  searchInputMobile: $('searchInputMobile'),
  searchClear: $('searchClear'),
  listingsGrid: $('listingsGrid'),
  skeletonGrid: $('skeletonGrid'),
  emptyState: $('emptyState'),
  resultsCount: $('resultsCount'),
  sortSelect: $('sortSelect'),
  citySelect: $('citySelect'),
  budgetSlider: $('budgetSlider'),
  budgetValue: $('budgetValue'),
  verifiedOnly: $('verifiedOnly'),
  modalOverlay: $('modalOverlay'),
  modalClose: $('modalClose'),
  addListingBtn: $('addListingBtn'),
  themeToggle: $('themeToggle'),
  heroBrowse: $('heroBrowse'),
  heroSell: $('heroSell'),
  detailOverlay: $('detailOverlay'),
  detailClose: $('detailClose'),
  detailContent: $('detailContent'),
  navbar: $('navbar'),
  backToTop: $('backToTop'),
  toggleEMI: $('toggleEMI'),
  emiPanel: $('emiPanel'),
  emiResult: $('emiResult'),
  clearFilters: $('clearFilters'),
  confettiCanvas: $('confettiCanvas'),
  toastContainer: $('toastContainer'),
  particleCanvas: $('particleCanvas'),
};

// ──────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────
function init() {
  loadTheme();
  initParticles();
  animateStats();
  bindEvents();

  // Fake loading delay for skeleton effect
  setTimeout(() => {
    dom.skeletonGrid.classList.add('hidden');
    dom.listingsGrid.classList.remove('hidden');
    renderListings();
  }, 1200);
}

// ──────────────────────────────────────────
//  THEME
// ──────────────────────────────────────────
function loadTheme() {
  const saved = localStorage.getItem('bbTheme') || 'dark';
  setTheme(saved);
}

function setTheme(t) {
  state.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('bbTheme', t);
}

// ──────────────────────────────────────────
//  PARTICLES (hero background)
// ──────────────────────────────────────────
function initParticles() {
  const canvas = dom.particleCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  for (let i = 0; i < 80; i++) particles.push(randomParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isLight = state.theme === 'light';

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(30,60,114,${p.alpha})`
        : `rgba(255,107,53,${p.alpha * 0.8})`;
      ctx.fill();

      // Connect nearby particles
      particles.slice(i + 1).forEach((p2) => {
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 100) * 0.15;
          ctx.strokeStyle = isLight
            ? `rgba(30,60,114,${alpha})`
            : `rgba(255,107,53,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ──────────────────────────────────────────
//  STATS COUNTER ANIMATION
// ──────────────────────────────────────────
function animateStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString('en-IN');
        if (current >= target) {
          el.textContent = target.toLocaleString('en-IN');
          clearInterval(timer);
        }
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  $$('[data-target]').forEach((el) => observer.observe(el));
}

// ──────────────────────────────────────────
//  RENDER LISTINGS
// ──────────────────────────────────────────
function renderListings() {
  applyFilters();

  const grid = dom.listingsGrid;
  if (state.filtered.length === 0) {
    grid.classList.add('hidden');
    dom.emptyState.classList.remove('hidden');
    dom.resultsCount.textContent = 'No bikes found';
    return;
  }

  dom.emptyState.classList.add('hidden');
  grid.classList.remove('hidden');
  dom.resultsCount.textContent = `${state.filtered.length} bike${state.filtered.length !== 1 ? 's' : ''} found`;

  grid.innerHTML = state.filtered.map((b, i) => cardHTML(b, i)).join('');

  // Stagger animation
  grid.querySelectorAll('.bike-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.06}s`;
  });

  // Bind card events
  grid.querySelectorAll('.bike-card').forEach((card) => {
    const id = parseInt(card.dataset.id);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn')) openDetail(id);
    });
  });

  grid.querySelectorAll('.btn-whatsapp').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.closest('.bike-card').dataset.id);
      openWhatsApp(id);
    });
  });

  grid.querySelectorAll('.btn-details').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.closest('.bike-card').dataset.id);
      openDetail(id);
    });
  });

  // Animate price bars
  setTimeout(() => {
    grid.querySelectorAll('.ai-price-fill').forEach((fill) => {
      fill.style.width = fill.dataset.width + '%';
    });
  }, 100);
}

function cardHTML(b, i) {
  const priceFmt = formatPrice(b.price);
  const aiInfo = aiPriceInfo(b.price, b.aiPrice);
  const isLocal = ['Pimpri', 'Chinchwad'].includes(b.city);

  return `
  <article class="bike-card ${b.verified ? 'verified' : ''}" data-id="${b.id}" tabindex="0" role="button" aria-label="View ${b.model} details">
    <div class="card-img-wrap">
      <img src="${b.img}" alt="${b.model}" loading="lazy" onerror="this.src='https://placehold.co/600x340/1c2230/8b949e?text=${encodeURIComponent(b.model)}'"/>
      <div class="card-badges">
        ${b.verified ? '<span class="badge badge-verified">✅ RC Verified</span>' : ''}
        ${b.isEV ? '<span class="badge badge-ev">⚡ EV</span>' : ''}
        ${isLocal ? '<span class="badge badge-hyperlocal">📍 Pimpri Seller</span>' : ''}
      </div>
      <div class="badge-price-tag">${priceFmt}</div>
    </div>
    <div class="card-body">
      <div class="card-model">${b.model}</div>
      <div class="card-city">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        ${b.city}, Pune · ${b.year}
      </div>
      <div class="card-stats">
        <span class="stat-pill">🏁 ${b.km.toLocaleString('en-IN')} km</span>
        <span class="stat-pill">📋 ${b.rc}</span>
        ${b.verified ? '<span class="stat-pill" style="color:var(--success)">✓ Verified</span>' : '<span class="stat-pill" style="color:var(--warning)">⚠ Unverified</span>'}
      </div>
      <div class="ai-price-row ${aiInfo.cls}">
        <div class="ai-price-label">
          <span>🤖 AI Fair Price: ${formatPrice(b.aiPrice)}</span>
          <span style="color:${aiInfo.color};font-weight:600">${aiInfo.label}</span>
        </div>
        <div class="ai-price-bar">
          <div class="ai-price-fill" data-width="${aiInfo.pct}" style="width:0%;background:${aiInfo.color}"></div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-whatsapp btn-sm">💬 WhatsApp</button>
      <button class="btn btn-ghost btn-sm btn-details">View Details</button>
    </div>
  </article>`;
}

function aiPriceInfo(price, aiPrice) {
  const ratio = price / aiPrice;
  if (ratio < 0.95) return { label: 'Great Deal 🟢', cls: 'price-low', color: 'var(--ev-green)', pct: 30 };
  if (ratio > 1.05) return { label: 'High Price 🔴', cls: 'price-high', color: 'var(--danger)', pct: 80 };
  return { label: 'Fair Price 🟡', cls: 'price-fair', color: 'var(--success)', pct: 55 };
}

function formatPrice(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

// ──────────────────────────────────────────
//  FILTERS
// ──────────────────────────────────────────
function applyFilters() {
  let list = [...state.listings];

  // Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(
      (b) =>
        b.model.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.rc.toLowerCase().includes(q) ||
        b.owner.toLowerCase().includes(q)
    );
  }

  // Category
  if (state.categoryFilter !== 'all') {
    if (state.categoryFilter === 'ev') {
      list = list.filter((b) => b.isEV);
    } else {
      list = list.filter((b) => b.category === state.categoryFilter);
    }
  }

  // City
  if (state.cityFilter !== 'all') {
    list = list.filter((b) => b.city === state.cityFilter);
  }

  // Budget
  list = list.filter((b) => b.price <= state.budgetMax);

  // Verified only
  if (state.verifiedOnly) {
    list = list.filter((b) => b.verified);
  }

  // Sort
  switch (state.sortBy) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'km-asc': list.sort((a, b) => a.km - b.km); break;
    case 'verified': list.sort((a, b) => b.verified - a.verified); break;
    default: list.sort((a, b) => b.id - a.id);
  }

  state.filtered = list;
}

// ──────────────────────────────────────────
//  DETAIL MODAL
// ──────────────────────────────────────────
function openDetail(id) {
  const b = state.listings.find((x) => x.id === id);
  if (!b) return;
  const aiInfo = aiPriceInfo(b.price, b.aiPrice);
  const emi = calcEmiValue(b.price, 15000, 12, 12);

  dom.detailContent.innerHTML = `
    <div class="detail-img-wrap">
      <img src="${b.img}" alt="${b.model}" loading="lazy" onerror="this.src='https://placehold.co/700x400/1c2230/8b949e?text=${encodeURIComponent(b.model)}'"/>
    </div>
    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:0.5rem">
      <h2 class="detail-title">${b.model}</h2>
      ${b.verified ? '<span class="badge badge-verified">✅ RC Verified</span>' : ''}
      ${b.isEV ? '<span class="badge badge-ev">⚡ EV</span>' : ''}
    </div>
    <div class="detail-price">${formatPrice(b.price)}</div>
    <p style="color:var(--text-secondary);margin:0.75rem 0;font-size:0.9rem">${b.desc}</p>
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-item-label">Year</div><div class="detail-item-value">${b.year}</div></div>
      <div class="detail-item"><div class="detail-item-label">KM Driven</div><div class="detail-item-value">${b.km.toLocaleString('en-IN')} km</div></div>
      <div class="detail-item"><div class="detail-item-label">City</div><div class="detail-item-value">📍 ${b.city}, Pune</div></div>
      <div class="detail-item"><div class="detail-item-label">RC Number</div><div class="detail-item-value">${b.rc}</div></div>
      <div class="detail-item"><div class="detail-item-label">AI Fair Price</div><div class="detail-item-value" style="color:${aiInfo.color}">${formatPrice(b.aiPrice)} — ${aiInfo.label}</div></div>
      <div class="detail-item"><div class="detail-item-label">EMI (12 mo, 12%)</div><div class="detail-item-value" style="color:var(--accent)">₹${emi.toLocaleString('en-IN')}/mo</div></div>
    </div>
    <div class="detail-actions">
      <button class="btn btn-whatsapp" onclick="openWhatsApp(${b.id})">💬 WhatsApp Seller</button>
      <button class="btn btn-primary" onclick="callSeller('${b.phone}')">📞 Call Now</button>
      <button class="btn btn-ghost" onclick="shareWhatsApp(${b.id})">🔗 Share</button>
    </div>
  `;

  dom.detailOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  dom.detailOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

// ──────────────────────────────────────────
//  WHATSAPP
// ──────────────────────────────────────────
function openWhatsApp(id) {
  const b = state.listings.find((x) => x.id === id);
  if (!b) return;
  const msg = `Hi! I'm interested in your ${b.model} (${b.year}) listed on BikeBazaar for ${formatPrice(b.price)}. RC: ${b.rc}. Is it still available?`;
  window.open(`https://wa.me/91${b.phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function callSeller(phone) {
  window.open(`tel:+91${phone}`);
}

function shareWhatsApp(id) {
  const b = state.listings.find((x) => x.id === id);
  if (!b) return;
  const msg = `Check out this ${b.model} (${b.year}) for ${formatPrice(b.price)} on BikeBazaar Pune! 🏍️`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('Link shared on WhatsApp!', 'success');
}

// ──────────────────────────────────────────
//  ADD LISTING MODAL
// ──────────────────────────────────────────
let rcVerified = false;
let currentStep = 1;

function openAddListing() {
  resetForm();
  dom.modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  dom.modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function resetForm() {
  currentStep = 1;
  rcVerified = false;
  $('listingForm').reset();
  showStep(1);
  $('rcStatus').classList.add('hidden');
  $('step2Next').classList.add('hidden');
  $('verifyBtnText').textContent = '🔍 Verify RC';
  $('verifySpinner').classList.add('hidden');
  updateStepUI(1);
}

function showStep(n) {
  for (let i = 1; i <= 3; i++) {
    const el = $(`step${i}`);
    if (el) el.classList.toggle('hidden', i !== n);
  }
  currentStep = n;
  updateStepUI(n);
}

function updateStepUI(n) {
  $$('.step').forEach((s) => {
    const sn = parseInt(s.dataset.step);
    s.classList.toggle('active', sn === n);
    s.classList.toggle('done', sn < n);
  });
}

function validateStep1() {
  const fields = ['bikeModel', 'bikeYear', 'bikePrice', 'bikeKm', 'bikeCity', 'bikePhone'];
  let valid = true;
  fields.forEach((f) => {
    const el = $(f);
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    } else {
      el.classList.remove('error');
    }
  });
  if (!valid) showToast('Please fill all required fields', 'error');
  return valid;
}

// RC Verification (mock)
function verifyRC() {
  const rc = $('rcNumber').value.trim().toUpperCase();
  const owner = $('ownerName').value.trim();

  if (!rc || !owner) {
    showToast('Enter RC number and owner name', 'error');
    return;
  }

  // Show spinner
  $('verifyBtnText').textContent = 'Verifying…';
  $('verifySpinner').classList.remove('hidden');

  setTimeout(() => {
    $('verifyBtnText').textContent = '🔍 Verify RC';
    $('verifySpinner').classList.add('hidden');

    const statusEl = $('rcStatus');
    const inner = $('rcStatusInner');
    statusEl.classList.remove('hidden');

    // 80% chance verified
    const pass = !rc.includes('BAD') && Math.random() > 0.2;
    rcVerified = pass;

    if (pass) {
      inner.className = 'rc-status-inner rc-verified';
      inner.innerHTML = `
        <div class="rc-status-title" style="color:var(--success)">✅ RC Verified Successfully</div>
        <div class="rc-check-item">✓ Registration: <strong>${rc}</strong></div>
        <div class="rc-check-item">✓ Owner: <strong>${owner}</strong> — Name matches</div>
        <div class="rc-check-item">✓ No active bank loan detected</div>
        <div class="rc-check-item">✓ Not reported stolen (VAHAN mock)</div>
        <div class="rc-check-item">✓ Insurance: Active</div>
        <div class="rc-check-item" style="margin-top:0.5rem;color:var(--text-muted);font-size:0.75rem">Mock VAHAN API — for demonstration only</div>
      `;
      $('step2Next').classList.remove('hidden');
      triggerConfetti();
      showToast('RC verified! 🎉 Your listing gets a verified badge.', 'success');
    } else {
      inner.className = 'rc-status-inner rc-warning';
      inner.innerHTML = `
        <div class="rc-status-title" style="color:var(--danger)">⚠️ RC Verification Issue</div>
        <div class="rc-check-item">⚠ RC Number: <strong>${rc}</strong></div>
        <div class="rc-check-item">❌ Possible discrepancy in records</div>
        <div class="rc-check-item">⚠ Please verify physical RC document</div>
        <div class="rc-check-item" style="margin-top:0.5rem;color:var(--text-muted);font-size:0.75rem">Mock VAHAN API — for demonstration only</div>
      `;
      $('step2Next').classList.remove('hidden');
      showToast('RC could not be fully verified. Listing will be unverified.', 'error');
    }
  }, 2500);
}

function buildPublishPreview() {
  const data = getFormData();
  $('publishPreview').innerHTML = `
    <div class="preview-row"><span class="preview-label">Model</span><span class="preview-value">${data.model}</span></div>
    <div class="preview-row"><span class="preview-label">Year</span><span class="preview-value">${data.year}</span></div>
    <div class="preview-row"><span class="preview-label">Price</span><span class="preview-value" style="color:var(--accent)">${formatPrice(parseInt(data.price))}</span></div>
    <div class="preview-row"><span class="preview-label">KM Driven</span><span class="preview-value">${parseInt(data.km).toLocaleString('en-IN')} km</span></div>
    <div class="preview-row"><span class="preview-label">City</span><span class="preview-value">📍 ${data.city}</span></div>
    <div class="preview-row"><span class="preview-label">RC Status</span><span class="preview-value" style="color:${rcVerified ? 'var(--success)' : 'var(--warning)'}">${rcVerified ? '✅ Verified' : '⚠ Unverified'}</span></div>
  `;

  const price = parseInt(data.price);
  const aiPrice = Math.round(price * (0.9 + Math.random() * 0.2));
  const aiInfo = aiPriceInfo(price, aiPrice);
  const pct = aiInfo.pct;

  $('priceAnalysis').innerHTML = `
    <div class="price-label-row">
      <span>Too Low ₹${formatPrice(Math.round(aiPrice * 0.8))}</span>
      <span style="color:${aiInfo.color};font-weight:700">${aiInfo.label}</span>
      <span>Too High ₹${formatPrice(Math.round(aiPrice * 1.2))}</span>
    </div>
    <div class="price-analysis-bar">
      <div class="price-analysis-fill" style="width:${pct}%;background:${aiInfo.color}"></div>
    </div>
    <p style="font-size:0.82rem;color:var(--text-muted);margin-top:0.5rem">AI suggests fair market price: <strong style="color:var(--text-primary)">${formatPrice(aiPrice)}</strong></p>
  `;
}

function getFormData() {
  return {
    model: $('bikeModel').value.trim(),
    year: $('bikeYear').value.trim(),
    price: $('bikePrice').value.trim(),
    km: $('bikeKm').value.trim(),
    city: $('bikeCity').value,
    phone: $('bikePhone').value.trim(),
    desc: $('bikeDesc').value.trim(),
    rc: $('rcNumber').value.trim().toUpperCase(),
    owner: $('ownerName').value.trim(),
    isEV: $('isEV').checked,
  };
}

function publishListing(e) {
  e.preventDefault();
  const data = getFormData();
  const price = parseInt(data.price);
  const aiPrice = Math.round(price * (0.9 + Math.random() * 0.2));

  const imgKeys = Object.keys(BIKE_IMAGES);
  const modelLow = data.model.toLowerCase();
  let imgKey = imgKeys.find((k) => modelLow.includes(k)) || imgKeys[Math.floor(Math.random() * imgKeys.length)];

  const newBike = {
    id: Date.now(),
    model: data.model,
    year: parseInt(data.year),
    price,
    km: parseInt(data.km),
    city: data.city,
    rc: data.rc || 'MH00XX0000',
    verified: rcVerified,
    isEV: data.isEV,
    category: data.isEV ? 'ev' : 'commuter',
    phone: data.phone || '9999999999',
    desc: data.desc || 'No description provided.',
    img: BIKE_IMAGES[imgKey],
    aiPrice,
    priceTag: aiPriceInfo(price, aiPrice).cls.replace('price-', ''),
    owner: data.owner || 'Seller',
  };

  state.listings.unshift(newBike);
  closeModal();
  renderListings();
  showToast(`🎉 "${data.model}" listed successfully!`, 'success');
  triggerConfetti();

  // Scroll to listings
  setTimeout(() => {
    document.getElementById('listingsSection').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

// ──────────────────────────────────────────
//  EMI CALCULATOR
// ──────────────────────────────────────────
function calcEmiValue(price, down, months, rate) {
  const loan = price - down;
  const r = rate / 12 / 100;
  if (r === 0) return Math.round(loan / months);
  const emi = (loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(emi);
}

function calculateEMI() {
  const price = parseInt($('emiPrice').value) || 65000;
  const down = parseInt($('emiDown').value) || 0;
  const months = parseInt($('emiTenure').value) || 12;
  const rate = parseFloat($('emiRate').value) || 12;

  const emi = calcEmiValue(price, down, months, rate);
  const loan = price - down;
  const total = emi * months;
  const interest = total - loan;

  const result = dom.emiResult;
  result.innerHTML = `
    <div class="emi-monthly">₹${emi.toLocaleString('en-IN')}<span style="font-size:1rem;font-weight:400;color:var(--text-muted)">/month</span></div>
    <div class="emi-details">
      Loan Amount: ₹${loan.toLocaleString('en-IN')} · Total Payable: ₹${total.toLocaleString('en-IN')} · Interest: ₹${interest.toLocaleString('en-IN')}
    </div>
  `;
  result.classList.add('show');
}

// ──────────────────────────────────────────
//  CONFETTI
// ──────────────────────────────────────────
function triggerConfetti() {
  const canvas = dom.confettiCanvas;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.pointerEvents = 'none';

  const colors = ['#ff6b35', '#ffc107', '#28a745', '#1e3c72', '#ff6b6b', '#00d4aa', '#fff'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    w: Math.random() * 12 + 4,
    h: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 4 + 2,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 8,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rot += p.vr;
      if (p.y > canvas.height + 20) { p.y = -10; p.x = Math.random() * canvas.width; p.vy = Math.random() * 3 + 1; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / 180);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 200) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ──────────────────────────────────────────
//  TOAST
// ──────────────────────────────────────────
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ──────────────────────────────────────────
//  RIPPLE
// ──────────────────────────────────────────
function addRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  ripple.style.left = `${e.clientX - rect.left - 20}px`;
  ripple.style.top = `${e.clientY - rect.top - 20}px`;
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

// ──────────────────────────────────────────
//  BIND EVENTS
// ──────────────────────────────────────────
function bindEvents() {

  // Theme toggle
  dom.themeToggle.addEventListener('click', () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
    showToast(state.theme === 'light' ? '☀️ Light mode activated' : '🌙 Dark mode activated', 'info');
  });

  // Search inputs
  function handleSearch(val) {
    state.searchQuery = val;
    dom.searchClear.classList.toggle('visible', val.length > 0);
    renderListings();
  }
  dom.searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
    if (dom.searchInputMobile) dom.searchInputMobile.value = e.target.value;
  });
  if (dom.searchInputMobile) {
    dom.searchInputMobile.addEventListener('input', (e) => {
      handleSearch(e.target.value);
      dom.searchInput.value = e.target.value;
    });
  }
  dom.searchClear.addEventListener('click', () => {
    dom.searchInput.value = '';
    if (dom.searchInputMobile) dom.searchInputMobile.value = '';
    handleSearch('');
  });

  // Filter chips
  $$('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.categoryFilter = chip.dataset.filter;
      renderListings();
    });
  });

  // Sort
  dom.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderListings();
  });

  // City
  dom.citySelect.addEventListener('change', (e) => {
    state.cityFilter = e.target.value;
    renderListings();
  });

  // Budget
  dom.budgetSlider.addEventListener('input', (e) => {
    state.budgetMax = parseInt(e.target.value);
    const v = state.budgetMax;
    dom.budgetValue.textContent = v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${v.toLocaleString('en-IN')}`;
    // Update gradient
    const pct = ((v - 10000) / (200000 - 10000)) * 100;
    e.target.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--border) ${pct}%)`;
    renderListings();
  });

  // Verified only
  dom.verifiedOnly.addEventListener('change', (e) => {
    state.verifiedOnly = e.target.checked;
    renderListings();
  });

  // Open modal
  dom.addListingBtn.addEventListener('click', openAddListing);
  if (dom.heroSell) dom.heroSell.addEventListener('click', openAddListing);
  if (dom.heroBrowse) {
    dom.heroBrowse.addEventListener('click', () => {
      document.getElementById('listingsSection').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Close modal
  dom.modalClose.addEventListener('click', closeModal);
  dom.modalOverlay.addEventListener('click', (e) => {
    if (e.target === dom.modalOverlay) closeModal();
  });

  // Modal steps
  $('step1Next').addEventListener('click', () => {
    if (validateStep1()) showStep(2);
  });
  $('step2Back').addEventListener('click', () => showStep(1));
  $('step2Next').addEventListener('click', () => {
    buildPublishPreview();
    showStep(3);
  });
  $('step3Back').addEventListener('click', () => showStep(2));
  $('verifyRC').addEventListener('click', verifyRC);

  // Publish form
  $('listingForm').addEventListener('submit', publishListing);

  // Detail modal
  dom.detailClose.addEventListener('click', closeDetail);
  dom.detailOverlay.addEventListener('click', (e) => {
    if (e.target === dom.detailOverlay) closeDetail();
  });

  // EMI panel
  dom.toggleEMI.addEventListener('click', () => {
    state.emiOpen = !state.emiOpen;
    dom.emiPanel.classList.toggle('open', state.emiOpen);
    dom.toggleEMI.classList.toggle('active', state.emiOpen);
  });
  $('calcEMI').addEventListener('click', calculateEMI);

  // Clear filters
  if (dom.clearFilters) {
    dom.clearFilters.addEventListener('click', () => {
      state.searchQuery = '';
      state.categoryFilter = 'all';
      state.cityFilter = 'all';
      state.sortBy = 'newest';
      state.budgetMax = 200000;
      state.verifiedOnly = false;
      dom.searchInput.value = '';
      if (dom.searchInputMobile) dom.searchInputMobile.value = '';
      dom.sortSelect.value = 'newest';
      dom.citySelect.value = 'all';
      dom.budgetSlider.value = 200000;
      dom.budgetValue.textContent = '₹2,00,000';
      dom.verifiedOnly.checked = false;
      $$('.chip').forEach((c) => c.classList.toggle('active', c.dataset.filter === 'all'));
      renderListings();
    });
  }

  // Scroll events
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    dom.navbar.classList.toggle('scrolled', y > 10);
    dom.backToTop.classList.toggle('hidden', y < 400);
  }, { passive: true });

  // Back to top
  dom.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!dom.modalOverlay.classList.contains('hidden')) closeModal();
      if (!dom.detailOverlay.classList.contains('hidden')) closeDetail();
    }
  });

  // Ripple on buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (btn) addRipple(e, btn);
  });

  // Hamburger (just toggles mobile nav search)
  $('hamburger').addEventListener('click', () => {
    const ms = document.querySelector('.mobile-search');
    ms.style.display = ms.style.display === 'block' ? 'none' : 'block';
  });
}

// ──────────────────────────────────────────
//  EXPOSE GLOBALS (for inline onclick)
// ──────────────────────────────────────────
window.openWhatsApp = openWhatsApp;
window.callSeller = callSeller;
window.shareWhatsApp = shareWhatsApp;

// ──────────────────────────────────────────
//  START
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
