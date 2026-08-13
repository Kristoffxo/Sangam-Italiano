/* Sangam Italiano — interactions. Vanilla JS, no dependencies.
   NOTE: every price in this file is a PLACEHOLDER. Replace with the
   kitchen's real menu before launch. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const SOFT = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── preloader ───────────────────────────────────── */
addEventListener('load', () => setTimeout(() => $('#preload').classList.add('preload--done'), SOFT ? 0 : 900));

/* ── dev note ────────────────────────────────────── */
$('[data-close-devnote]').addEventListener('click', () => $('#devnote').classList.add('devnote--gone'));

/* ── nav + hunger bar ────────────────────────────── */
const nav = $('#nav'), bar = $('#hungerbar span');
const onScroll = () => {
  nav.classList.toggle('nav--stuck', scrollY > 40);
  const max = document.body.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ── cursor glow ─────────────────────────────────── */
if (!SOFT && matchMedia('(pointer:fine)').matches) {
  const g = $('#glow');
  addEventListener('pointermove', e => {
    g.style.opacity = 1;
    g.style.left = e.clientX + 'px';
    g.style.top = e.clientY + 'px';
  }, { passive: true });
}

/* ── reveal on scroll ────────────────────────────── */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('reveal--in'); io.unobserve(e.target); }
}), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
const watch = () => $$('.reveal, .tl li').forEach(el => io.observe(el));

/* ── floating basil ──────────────────────────────── */
const LEAF = '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C7 6 4 10 4 15a8 8 0 0016 0c0-5-3-9-8-13z" fill="#5E8F4E"/><path d="M12 4v16" stroke="#3E6B33" stroke-width="1.2"/></svg>';
if (!SOFT) {
  const box = $('#leaves');
  for (let i = 0; i < 14; i++) {
    const d = document.createElement('div');
    d.className = 'leaf';
    d.innerHTML = LEAF;
    d.style.left = rnd(0, 100) + '%';
    d.style.setProperty('--dx', rnd(-90, 90) + 'px');
    d.style.setProperty('--dr', rnd(180, 620) + 'deg');
    d.style.animationDuration = rnd(11, 22) + 's';
    d.style.animationDelay = rnd(0, 16) + 's';
    d.style.scale = rnd(.5, 1.15);
    box.appendChild(d);
  }
  const sp = $('#sparks');
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.style.left = rnd(26, 74) + '%';
    s.style.top = rnd(62, 74) + '%';
    s.style.animationDuration = rnd(1.6, 3.6) + 's';
    s.style.animationDelay = rnd(0, 3) + 's';
    sp.appendChild(s);
  }
}

/* ── oven parallax ───────────────────────────────── */
if (!SOFT && matchMedia('(pointer:fine)').matches) {
  const oven = $('#oven');
  addEventListener('pointermove', e => {
    const x = (e.clientX / innerWidth - .5) * 16, y = (e.clientY / innerHeight - .5) * 12;
    oven.style.transform = `translate3d(${x}px,${y}px,0) rotateY(${x * .35}deg)`;
  }, { passive: true });
}

/* ── marquee ─────────────────────────────────────── */
const WORDS = ['48-hour cold ferment', '00 Napoletana flour', 'San Marzano, crushed by hand',
  'fior di latte', 'basil from the garden out back', '450°C stone floor', '90 seconds, no longer',
  'wood fire only', 'no shortcuts'];
$('#marqueeTrack').innerHTML = [...WORDS, ...WORDS]
  .map(w => `<b>${w}</b><i>&#10022;</i>`).join('');

/* ══ THE FORGE ═══════════════════════════════════════ */
const BASES = [
  { id: 'marg',  name: 'La Margherita', price: 340, veg: true,  sauce: '#C6402A' },
  { id: 'mari',  name: 'La Marinara',   price: 290, veg: true,  sauce: '#B93A22' },
  { id: 'bianca',name: 'La Bianca',     price: 360, veg: true,  sauce: '#EDE0C4' }
];
const TOPS = [
  { id:'fdl',  name:'Fior di latte', price:70,  veg:true,
    art:'<ellipse cx="12" cy="12" rx="9" ry="7" fill="#FFF8E7"/><ellipse cx="9" cy="10" rx="2.4" ry="1.8" fill="#F0E4C8"/>',
    draw:(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="${rnd(13,18)}" ry="${rnd(10,14)}" fill="#FFF8E7" opacity=".95"/>` },
  { id:'basil',name:'Garden basil', price:30, veg:true,
    art:'<path d="M12 3C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-10z" fill="#5E8F4E"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y}) rotate(${rnd(0,360)})"><path d="M0 -13C-5 -7 -7 -3 -7 2a7 7 0 0014 0c0-5-2-9-7-15z" fill="#4E7F42"/><path d="M0 -13V4" stroke="#38602D" stroke-width="1.4"/></g>` },
  { id:'funghi',name:'Funghi', price:80, veg:true,
    art:'<path d="M4 12a8 8 0 0116 0z" fill="#C9A98A"/><rect x="10" y="12" width="4" height="8" rx="2" fill="#E8D9C2"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y}) rotate(${rnd(-30,30)})"><ellipse cx="0" cy="0" rx="12" ry="7" fill="#A8825F"/><ellipse cx="-3" cy="-2" rx="4" ry="2.4" fill="#C09A76"/></g>` },
  { id:'truffle',name:'Truffle oil', price:120, veg:true,
    art:'<circle cx="12" cy="13" r="7" fill="#3B2E22"/><circle cx="10" cy="11" r="1.6" fill="#5C4A38"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="8" ry="5" fill="#3B2E22"/><ellipse cx="-2" cy="-1" rx="2" ry="1.3" fill="#5C4A38"/></g>` },
  { id:'olive',name:'Black olives', price:45, veg:true,
    art:'<ellipse cx="12" cy="12" rx="7" ry="5.5" fill="#2E2A38"/><ellipse cx="12" cy="12" rx="2.4" ry="1.8" fill="#C6402A"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y}) rotate(${rnd(0,180)})"><ellipse rx="8" ry="6" fill="#2E2A38"/><ellipse rx="2.6" ry="2" fill="#8E3B25"/></g>` },
  { id:'chilli',name:'Calabrian chilli', price:35, veg:true,
    art:'<path d="M8 5c6 1 9 6 8 13-4 1-8-3-8-13z" fill="#C6402A"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y}) rotate(${rnd(0,360)})"><path d="M-6 -7c7 1 10 7 9 15-5 1-9-4-9-15z" fill="#BE3A24"/></g>` },
  { id:'parm', name:'Parmigiano', price:60, veg:true,
    art:'<path d="M4 16l8-9 8 9z" fill="#F2E3BE"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y}) rotate(${rnd(0,360)})"><path d="M-7 5L0 -6 7 5z" fill="#F2E3BE" opacity=".92"/></g>` },
  { id:'salame',name:'Salame', price:110, veg:false,
    art:'<circle cx="12" cy="12" r="8" fill="#B3453C"/><circle cx="9" cy="10" r="1.4" fill="#F0DCCF"/><circle cx="14" cy="14" r="1.6" fill="#F0DCCF"/>',
    draw:(x,y)=>`<g transform="translate(${x},${y})"><circle r="${rnd(11,15)}" fill="#A83E36"/><circle cx="-4" cy="-3" r="2.2" fill="#EAD3C4"/><circle cx="4" cy="4" r="2.6" fill="#EAD3C4"/><circle cx="5" cy="-5" r="1.8" fill="#EAD3C4"/></g>` }
];

let base = BASES[0];
const picked = new Map();
let state = 'idle';

const chips = $('#baseChips'), grid = $('#topGrid');
chips.innerHTML = BASES.map(b =>
  `<button type="button" class="chip${b.id === base.id ? ' chip--on' : ''}" data-base="${b.id}">${b.name} &middot; &#8377;${b.price}</button>`).join('');
grid.innerHTML = TOPS.map(t =>
  `<button type="button" class="top" data-top="${t.id}" aria-pressed="false">
     <span class="top__n" data-n="${t.id}">0</span>
     <svg viewBox="0 0 24 24" aria-hidden="true">${t.art}</svg>
     <b>${t.name}</b><small>+&#8377;${t.price}</small>
   </button>`).join('');

/* place a topping inside the sauce circle, roughly evenly */
function spot() {
  const a = rnd(0, Math.PI * 2), r = Math.sqrt(Math.random()) * 122;
  return [200 + Math.cos(a) * r, 200 + Math.sin(a) * r];
}

function nameIt() {
  const ids = [...picked.keys()];
  if (!ids.length) return base.name;
  const bits = ids.slice(0, 2).map(id => TOPS.find(t => t.id === id).name.split(' ')[0]);
  return base.name + ' ' + (ids.length > 2 ? 'Completa' : 'con ' + bits.join(' e '));
}

function total() {
  let n = base.price;
  picked.forEach((q, id) => { n += TOPS.find(t => t.id === id).price * q; });
  return n;
}

function paintTicket() {
  const lines = [`<li><span>${base.name}</span><span>&#8377;${base.price}</span></li>`];
  picked.forEach((q, id) => {
    const t = TOPS.find(x => x.id === id);
    lines.push(`<li><span>${t.name}${q > 1 ? ' &times;' + q : ''}</span><span>&#8377;${t.price * q}</span></li>`);
  });
  $('#ticketLines').innerHTML = lines.join('');
  $('#ticketName').textContent = nameIt();
  const el = $('#ticketTotal'), to = total(), from = +el.textContent || 0;
  if (SOFT) { el.textContent = to; return; }
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / 380, 1);
    el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

function redrawSauce() {
  $('.pz-sauce').setAttribute('fill', base.id === 'bianca' ? base.sauce : 'url(#sauceG)');
}

chips.addEventListener('click', e => {
  const b = e.target.closest('[data-base]'); if (!b || state === 'baking') return;
  base = BASES.find(x => x.id === b.dataset.base);
  $$('.chip', chips).forEach(c => c.classList.toggle('chip--on', c === b));
  redrawSauce(); paintTicket(); unbake();
});

grid.addEventListener('click', e => {
  const b = e.target.closest('[data-top]'); if (!b || state === 'baking') return;
  const t = TOPS.find(x => x.id === b.dataset.top);
  const q = (picked.get(t.id) || 0) + 1;
  if (q > 3) { picked.delete(t.id); } else { picked.set(t.id, q); }
  const now = picked.get(t.id) || 0;
  b.classList.toggle('top--on', now > 0);
  b.setAttribute('aria-pressed', now > 0);
  $(`[data-n="${t.id}"]`).textContent = now;
  // repaint all toppings so counts stay honest
  const layer = $('#pzToppings');
  layer.innerHTML = '';
  picked.forEach((qty, id) => {
    const tt = TOPS.find(x => x.id === id);
    const n = qty * 4;
    for (let i = 0; i < n; i++) {
      const [x, y] = spot();
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'topping');
      g.style.animationDelay = (i * 0.03) + 's';
      g.innerHTML = tt.draw(x.toFixed(1), y.toFixed(1));
      layer.appendChild(g);
    }
  });
  paintTicket(); unbake();
});

function unbake() {
  $('#peel').classList.remove('peel--baked');
  $('#forgeDone').hidden = true;
  $('#fireBtn').disabled = false;
  $('#tempVal').textContent = '24°C';
  $('#timeVal').textContent = '0s';
  $('#tempBar').style.width = '5%';
  state = 'idle';
}

/* char + steam layers, built once */
(() => {
  const char = $('#pzChar'), steam = $('#pzSteam');
  let c = '';
  for (let i = 0; i < 16; i++) {
    const a = rnd(0, Math.PI * 2), r = rnd(150, 172);
    c += `<circle cx="${(200 + Math.cos(a) * r).toFixed(1)}" cy="${(200 + Math.sin(a) * r).toFixed(1)}" r="${rnd(5, 12).toFixed(1)}" fill="#4A2C14"/>`;
  }
  char.innerHTML = c;
  let s = '';
  for (let i = 0; i < 7; i++) {
    s += `<circle cx="${rnd(120, 280).toFixed(0)}" cy="170" r="${rnd(8, 16).toFixed(0)}" fill="#F8F2E4" style="animation-delay:${(i * .34).toFixed(2)}s"/>`;
  }
  steam.innerHTML = s;
})();

$('#fireBtn').addEventListener('click', () => {
  if (state === 'baking') return;
  state = 'baking';
  const peel = $('#peel'), btn = $('#fireBtn');
  btn.disabled = true;
  peel.classList.remove('peel--baked');
  peel.classList.add('peel--baking');

  const DUR = SOFT ? 300 : 2600;
  const t0 = performance.now();
  (function run(now) {
    const p = Math.min((now - t0) / DUR, 1);
    $('#tempVal').textContent = Math.round(24 + p * 426) + '°C';
    $('#timeVal').textContent = Math.round(p * 90) + 's';
    $('#tempBar').style.width = (5 + p * 95) + '%';
    if (p < 1) return requestAnimationFrame(run);
    peel.classList.remove('peel--baking');
    peel.classList.add('peel--baked');
    state = 'done';
    const n = nameIt();
    $('#doneName').textContent = n;
    $('#doneLine').textContent =
      `Ninety seconds at 450°C. ${picked.size ? picked.size + ' topping' + (picked.size > 1 ? 's' : '') : 'Bare and proud'} · ₹${total()}.`;
    $('#forgeDone').hidden = false;
    btn.disabled = false;
  })(t0);
});

$('#resetBtn').addEventListener('click', () => {
  picked.clear();
  $('#pzToppings').innerHTML = '';
  $$('.top', grid).forEach(b => { b.classList.remove('top--on'); b.setAttribute('aria-pressed', 'false'); });
  $$('[data-n]').forEach(n => n.textContent = '0');
  paintTicket(); unbake();
});

/* ══ MENU ════════════════════════════════════════════ */
const ART = {
  pizza:'<circle cx="26" cy="26" r="23" fill="#E7B15E"/><circle cx="26" cy="26" r="19" fill="#C6402A"/><ellipse cx="19" cy="21" rx="5" ry="4" fill="#FFF8E7"/><ellipse cx="32" cy="30" rx="4.4" ry="3.4" fill="#FFF8E7"/><path d="M30 18c-3 2-4 4-4 7a4 4 0 008 0c0-3-1-5-4-7z" fill="#5E8F4E"/>',
  pasta:'<ellipse cx="26" cy="32" rx="21" ry="13" fill="#EDE0C4"/><path d="M10 30q8-9 16 0t16 0" stroke="#D9A94E" stroke-width="3" fill="none"/><circle cx="20" cy="28" r="3" fill="#C6402A"/><circle cx="33" cy="31" r="2.4" fill="#5E8F4E"/>',
  bread:'<rect x="7" y="18" width="38" height="17" rx="8" fill="#E7B15E"/><path d="M14 26h24M14 31h20" stroke="#C98F42" stroke-width="2"/><circle cx="18" cy="22" r="2" fill="#5E8F4E"/><circle cx="34" cy="23" r="2" fill="#5E8F4E"/>',
  ball:'<circle cx="18" cy="32" r="10" fill="#D9A94E"/><circle cx="34" cy="30" r="9" fill="#C99A3E"/><circle cx="26" cy="20" r="8" fill="#E5B95C"/>',
  dolce:'<path d="M10 30h32l-4 14H14z" fill="#EDE0C4"/><ellipse cx="26" cy="30" rx="16" ry="6" fill="#FFF8E7"/><circle cx="26" cy="22" r="4" fill="#C6402A"/><rect x="25" y="14" width="2" height="6" fill="#5E8F4E"/>',
  ravioli:'<rect x="9" y="14" width="16" height="16" rx="3" fill="#EDE0C4"/><rect x="27" y="22" width="16" height="16" rx="3" fill="#E5D5B4"/><circle cx="17" cy="22" r="3" fill="#C6402A"/><circle cx="35" cy="30" r="3" fill="#5E8F4E"/>'
};
const DISHES = [
  // ── evidence: named by reviewers or seen on the menu board ──
  { cat:'Pizza', n:'Margherita', d:'San Marzano, fior di latte, basil cut this morning. The one everybody orders.', p:340, veg:true, art:'pizza', loved:true },
  { cat:'Pizza', n:'Marinara',   d:'No cheese. Tomato, garlic, oregano, olive oil — the oldest recipe in Naples.', p:290, veg:true, art:'pizza' },
  { cat:'Pizza', n:'Mushroom Truffle', d:'Funghi, truffle oil, fior di latte. Rich, earthy, gone fast.', p:520, veg:true, art:'pizza', loved:true },
  { cat:'Pizza', n:'Vegetariano', d:'Whatever the garden and the market gave us this week.', p:420, veg:true, art:'pizza' },
  { cat:'Pizza', n:'Funghi',     d:'Mushrooms, mozzarella, thyme. Quiet and very good.', p:430, veg:true, art:'pizza' },
  { cat:'Pizza', n:'Salame',     d:'Cured salame, tomato, fior di latte, a little chilli.', p:470, veg:false, art:'pizza' },

  { cat:'Antipasti', n:'Hand-Rolled Garlic Bread', d:'Rolled by hand, baked on the stone. Reviewers want more garlic — we are listening.', p:180, veg:true, art:'bread', loved:true },
  { cat:'Antipasti', n:'Arancini', d:'Fried risotto balls, molten centre. Order these while you decide.', p:240, veg:true, art:'ball', loved:true },

  { cat:'Pasta', n:'Ravioli Alfredo', d:'Ravioli folded in-house, butter and parmigiano sauce.', p:450, veg:true, art:'ravioli', loved:true },
  { cat:'Pasta', n:'Ravioli of the Day', d:'Ask what the kitchen folded this morning.', p:460, veg:true, art:'ravioli', neu:true },

  { cat:'Dolci', n:'Tiramisù', d:'Mascarpone, coffee, cocoa. Made in the morning, eaten by night.', p:260, veg:true, art:'dolce', neu:true },
  { cat:'Dolci', n:'Gelato', d:'Two scoops. Flavours change — the board will tell you.', p:190, veg:true, art:'dolce', neu:true }
];
const CATS = ['All', 'Pizza', 'Pasta', 'Antipasti', 'Dolci'];
let cat = 'All', vegOnly = false;

$('#menuTabs').innerHTML = CATS.map(c =>
  `<button type="button" class="tab${c === cat ? ' tab--on' : ''}" role="tab" data-cat="${c}">${c}</button>`).join('');

function paintMenu() {
  const rows = DISHES.filter(d => (cat === 'All' || d.cat === cat) && (!vegOnly || d.veg));
  $('#menuList').innerHTML = rows.map((d, i) => `
    <li class="mi reveal" style="--d:${(i * .04).toFixed(2)}s">
      <div class="mi__art"><svg viewBox="0 0 52 52" aria-hidden="true">${ART[d.art]}</svg></div>
      <div>
        <div class="mi__name">${d.n}
          ${d.loved ? '<span class="badge badge--loved">loved</span>' : ''}
          ${d.neu ? '<span class="badge badge--new">unconfirmed</span>' : ''}
          ${d.veg ? '<span class="badge badge--veg">veg</span>' : ''}
        </div>
        <p class="mi__desc">${d.d}</p>
      </div>
      <div class="mi__price">&#8377;${d.p}<small>placeholder</small></div>
    </li>`).join('') || '<li class="mi"><div></div><div><p class="mi__desc">Nothing in this section yet.</p></div></li>';
  watch();
}
$('#menuTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-cat]'); if (!b) return;
  cat = b.dataset.cat;
  $$('.tab').forEach(t => t.classList.toggle('tab--on', t === b));
  paintMenu();
});
$('#vegTog').addEventListener('click', e => {
  vegOnly = !vegOnly;
  e.currentTarget.setAttribute('aria-pressed', vegOnly);
  paintMenu();
});

/* ══ DOUGH TIMELINE ══════════════════════════════════ */
const STEPS = [
  { h:'Hour 0',  t:'Flour, water, salt, a little yeast', d:'00 Napoletana flour. Nothing else goes in — no oil, no sugar, no improver.', sz:6 },
  { h:'Hour 1',  t:'Mixed, then left alone', d:'Worked just enough to come together, then covered and forgotten on purpose.', sz:9 },
  { h:'Hour 4',  t:'Divided into balls', d:'Weighed by hand, shaped, and set into trays.', sz:12 },
  { h:'Hour 24', t:'Cold and slow', d:'This is where the flavour actually happens. Rushing here is the one unforgivable shortcut.', sz:17 },
  { h:'Hour 48', t:'Ready', d:'Soft, blistered, alive. Stretched by hand — a rolling pin would crush everything we waited for.', sz:23 },
  { h:'+90 sec', t:'Into the fire', d:'450°C stone floor, wood flame overhead, one turn. Out before you finish your sentence.', sz:23 }
];
$('#timeline').innerHTML = STEPS.map((s, i) => `
  <li style="transition-delay:${(i * .06).toFixed(2)}s">
    <span class="tl__dot"><i style="--sz:${s.sz}px"></i></span>
    <p class="tl__h">${s.h}</p>
    <h3 class="tl__t">${s.t}</h3>
    <p class="tl__d">${s.d}</p>
  </li>`).join('');

/* ══ ROOM: swing + music bars ════════════════════════ */
const sw = $('#swing');
sw.addEventListener('click', () => {
  sw.classList.remove('swing--kick');
  void sw.offsetWidth;
  sw.classList.add('swing--kick');
});
$('#viz').innerHTML = Array.from({ length: 26 }, (_, i) =>
  `<i style="animation-duration:${(.5 + (i % 5) * .17).toFixed(2)}s;animation-delay:${(i * .05).toFixed(2)}s"></i>`).join('');

/* ══ REVIEWS (verbatim from Google) ══════════════════ */
const REVS = [
  { who:'Prashasti', meta:'Local Guide · 30 reviews · 3 months ago',
    q:'Great place, great service and extremely tasty food loved the vegetarian pizza, mushroom truffle was also good… Best place for pizza 🍕' },
  { who:'Diksha Bijlani', meta:'Local Guide · 38 reviews · 4 months ago',
    q:'This place is absolutely lovely! … we loved the neopolitan style margherita pizza, the hand rolled garlic bread, and arancini balls. It is clear they are passionate about authenticity of the food.' },
  { who:'Azeem Rashid', meta:'3 reviews · 4 months ago',
    q:'I visited this place with my mother around 10 PM… The place was clean, well-kept, and had a really calming vibe. I especially loved the open-style setup.' },
  { who:'Google review summary', meta:'aggregated highlight',
    q:'Had live music, good subtle lighting, a sofa swing and pinterest vibe.' }
];
$('#revsRail').innerHTML = REVS.map(r => `
  <article class="rev">
    <p class="rev__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
    <p class="rev__q">&ldquo;${r.q}&rdquo;</p>
    <div class="rev__who">
      <span class="rev__av">${r.who[0]}</span>
      <span class="rev__meta"><b>${r.who}</b><span>${r.meta}</span></span>
    </div>
  </article>`).join('');

/* ── boot ────────────────────────────────────────── */
redrawSauce(); paintTicket(); paintMenu(); watch();
})();
