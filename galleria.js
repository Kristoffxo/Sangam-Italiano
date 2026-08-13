/* Galleria — mosaic, filters, lightbox. Vanilla JS, no dependencies.

   HOW TO PUT REAL PHOTOS IN
   Add `photo:'assets/margherita.jpg'` to any item below. If `photo` is set the
   tile renders an <img> instead of the drawing — nothing else changes. Leave it
   out and you get the SVG. Mixing the two is fine while photos trickle in.

   Nothing here is a photograph and nothing was taken from the web: the Google
   listing's pictures belong to the customers who shot them, and stock pizza
   would misrepresent this kitchen's food. See docs/PHOTOS-STATUS.md. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const SOFT = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── shared chrome: theme, drawer, hunger bar ─────── */
const nav = $('#nav'), bar = $('#hungerbar span');
const onScroll = () => {
  nav.classList.toggle('nav--stuck', scrollY > 40);
  const max = document.body.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

$('[data-close-devnote]').addEventListener('click', () => $('#devnote').classList.add('devnote--gone'));

const themeTog = $('#themeTog');
const applyTheme = t => {
  document.documentElement.setAttribute('data-theme', t);
  themeTog.setAttribute('aria-pressed', t === 'light');
  themeTog.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
};
let theme = (() => { try { return localStorage.getItem('sangam-theme') || 'dark'; } catch (e) { return 'dark'; } })();
applyTheme(theme);
themeTog.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('sangam-theme', theme); } catch (e) {}
  applyTheme(theme);
});

const burger = $('#burger');
const setNav = open => {
  nav.classList.toggle('nav--open', open);
  document.body.classList.toggle('navlock', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
burger.addEventListener('click', () => setNav(!nav.classList.contains('nav--open')));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => setNav(false)));
matchMedia('(min-width:821px)').addEventListener('change', e => { if (e.matches) setNav(false); });

/* ══ SVG PLATES ══════════════════════════════════════
   All viewBox 400 400. Drawn, not photographed. */
const A = {};
const wrap = inner => `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const char = (n, r0 = 152, r1 = 176) => {
  let o = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + .4, r = r0 + Math.random() * (r1 - r0);
    o += `<circle cx="${(200 + Math.cos(a) * r).toFixed(0)}" cy="${(200 + Math.sin(a) * r).toFixed(0)}" r="${(5 + Math.random() * 7).toFixed(1)}" fill="#4A2C14" opacity=".55"/>`;
  }
  return o;
};
const pizzaBase = sauce => `
  <circle cx="200" cy="200" r="184" fill="#C98F42"/>
  <circle cx="200" cy="200" r="172" fill="#EBBE77"/>
  ${char(14)}
  <circle cx="200" cy="200" r="148" fill="${sauce}"/>`;

A.margherita = wrap(`${pizzaBase('#C2412B')}
  <ellipse cx="150" cy="158" rx="30" ry="23" fill="#FFF8E7"/>
  <ellipse cx="246" cy="150" rx="25" ry="19" fill="#FFF8E7"/>
  <ellipse cx="262" cy="238" rx="29" ry="22" fill="#FFF8E7"/>
  <ellipse cx="152" cy="256" rx="26" ry="20" fill="#FFF8E7"/>
  <ellipse cx="200" cy="200" rx="22" ry="17" fill="#FFF8E7"/>
  <ellipse cx="142" cy="152" rx="9" ry="6" fill="#F2E6CC" opacity=".8"/>
  <ellipse cx="256" cy="232" rx="8" ry="5" fill="#F2E6CC" opacity=".8"/>
  <g fill="#4E7F42">
    <path d="M196 132c-11 8-15 15-15 25a15 15 0 0030 0c0-10-4-17-15-25z"/>
    <path d="M124 210c-11 8-15 15-15 25a15 15 0 0030 0c0-10-4-17-15-25z" transform="rotate(-38 124 222)"/>
    <path d="M272 190c-10 7-14 14-14 23a14 14 0 0028 0c0-9-4-16-14-23z" transform="rotate(42 272 201)"/>
  </g>
  <circle cx="176" cy="228" r="4" fill="#E8C168" opacity=".65"/>
  <circle cx="228" cy="176" r="3.4" fill="#E8C168" opacity=".65"/>`);

A.marinara = wrap(`${pizzaBase('#B93A22')}
  <g fill="#F6EBD2">
    <ellipse cx="164" cy="166" rx="13" ry="8" transform="rotate(24 164 166)"/>
    <ellipse cx="238" cy="180" rx="12" ry="7" transform="rotate(-18 238 180)"/>
    <ellipse cx="196" cy="242" rx="13" ry="8" transform="rotate(48 196 242)"/>
    <ellipse cx="254" cy="246" rx="11" ry="7" transform="rotate(12 254 246)"/>
    <ellipse cx="140" cy="222" rx="11" ry="7" transform="rotate(-32 140 222)"/>
  </g>
  <g fill="#5E7A34" opacity=".85">
    <circle cx="180" cy="196" r="3.2"/><circle cx="216" cy="152" r="2.6"/>
    <circle cx="252" cy="212" r="3"/><circle cx="164" cy="262" r="2.8"/>
    <circle cx="226" cy="272" r="2.4"/><circle cx="126" cy="182" r="2.6"/>
    <circle cx="204" cy="212" r="2.4"/><circle cx="272" cy="166" r="2.2"/>
  </g>
  <ellipse cx="200" cy="200" rx="120" ry="112" fill="#D9552F" opacity=".18"/>`);

A.truffle = wrap(`${pizzaBase('#EFE2C6')}
  <g fill="#9A7550">
    <ellipse cx="158" cy="164" rx="26" ry="15" transform="rotate(-16 158 164)"/>
    <ellipse cx="246" cy="172" rx="24" ry="14" transform="rotate(22 246 172)"/>
    <ellipse cx="200" cy="236" rx="27" ry="15" transform="rotate(-8 200 236)"/>
    <ellipse cx="140" cy="238" rx="21" ry="12" transform="rotate(34 140 238)"/>
    <ellipse cx="262" cy="246" rx="22" ry="13" transform="rotate(-28 262 246)"/>
  </g>
  <g fill="#B99270" opacity=".8">
    <ellipse cx="152" cy="160" rx="9" ry="4.5"/><ellipse cx="240" cy="168" rx="8" ry="4"/>
    <ellipse cx="194" cy="232" rx="9" ry="4.5"/>
  </g>
  <g fill="#3B2E22">
    <ellipse cx="182" cy="196" rx="14" ry="5" transform="rotate(-24 182 196)"/>
    <ellipse cx="228" cy="212" rx="12" ry="4.4" transform="rotate(18 228 212)"/>
    <ellipse cx="204" cy="164" rx="11" ry="4" transform="rotate(38 204 164)"/>
    <ellipse cx="166" cy="266" rx="10" ry="3.8" transform="rotate(-12 166 266)"/>
  </g>
  <circle cx="220" cy="252" r="4" fill="#C8A24E" opacity=".7"/>`);

A.salame = wrap(`${pizzaBase('#C2412B')}
  <g>
    <circle cx="152" cy="158" r="27" fill="#9E3730"/><circle cx="152" cy="158" r="23" fill="#B3453C"/>
    <circle cx="248" cy="164" r="25" fill="#9E3730"/><circle cx="248" cy="164" r="21" fill="#B3453C"/>
    <circle cx="196" cy="234" r="28" fill="#9E3730"/><circle cx="196" cy="234" r="24" fill="#B3453C"/>
    <circle cx="268" cy="248" r="23" fill="#9E3730"/><circle cx="268" cy="248" r="19" fill="#B3453C"/>
    <circle cx="132" cy="242" r="22" fill="#9E3730"/><circle cx="132" cy="242" r="18" fill="#B3453C"/>
  </g>
  <g fill="#EAD3C4">
    <circle cx="146" cy="152" r="4"/><circle cx="158" cy="164" r="3.2"/>
    <circle cx="244" cy="158" r="3.6"/><circle cx="254" cy="170" r="2.8"/>
    <circle cx="190" cy="228" r="4.2"/><circle cx="202" cy="240" r="3.4"/>
    <circle cx="264" cy="243" r="3"/><circle cx="128" cy="238" r="3"/>
  </g>
  <ellipse cx="176" cy="196" rx="18" ry="8" fill="#E08A3C" opacity=".3"/>
  <ellipse cx="234" cy="212" rx="14" ry="6" fill="#E08A3C" opacity=".28"/>`);

const plate = `<circle cx="200" cy="205" r="168" fill="#EDE6D6"/>
  <circle cx="200" cy="205" r="150" fill="#F7F2E6"/>
  <circle cx="200" cy="205" r="118" fill="#EFE8DA"/>`;

A.ravioli = wrap(`${plate}
  <g>
    <rect x="132" y="140" width="72" height="72" rx="9" fill="#EDDCB4" transform="rotate(-10 168 176)"/>
    <rect x="204" y="164" width="70" height="70" rx="9" fill="#E6D2A6" transform="rotate(14 239 199)"/>
    <rect x="158" y="222" width="74" height="74" rx="9" fill="#EDDCB4" transform="rotate(6 195 259)"/>
  </g>
  <g fill="#D6BE86" opacity=".7">
    <circle cx="168" cy="176" r="9"/><circle cx="239" cy="199" r="8"/><circle cx="195" cy="259" r="9"/>
  </g>
  <path d="M118 250q40 34 90 26t80-40" stroke="#F0DFA8" stroke-width="15" fill="none" stroke-linecap="round" opacity=".75"/>
  <g fill="#F5EBCE">
    <path d="M262 132l16-22 16 22z"/><path d="M118 300l14-19 14 19z"/><path d="M286 268l12-16 12 16z"/>
  </g>
  <g fill="#4E7F42"><circle cx="212" cy="150" r="5"/><circle cx="150" cy="288" r="4.4"/></g>
  <g fill="#3A3028" opacity=".7"><circle cx="184" cy="200" r="2.4"/><circle cx="248" cy="252" r="2"/><circle cx="146" cy="216" r="1.8"/></g>`);

A.raviolidi = wrap(`${plate}
  <g fill="#E9D8AE">
    <path d="M200 128c26 0 44 20 44 42s-18 40-44 40-44-18-44-40 18-42 44-42z"/>
    <path d="M146 226c24 0 40 18 40 38s-16 36-40 36-40-16-40-36 16-38 40-38z"/>
    <path d="M258 226c24 0 40 18 40 38s-16 36-40 36-40-16-40-36 16-38 40-38z"/>
  </g>
  <g stroke="#CDB27A" stroke-width="2.4" fill="none" opacity=".8">
    <path d="M162 154q38-14 76 0M112 250q34-12 68 0M224 250q34-12 68 0"/>
  </g>
  <g fill="#C2412B" opacity=".85"><circle cx="200" cy="170" r="7"/><circle cx="146" cy="264" r="6"/><circle cx="258" cy="264" r="6"/></g>
  <path d="M104 196q48 26 96 14" stroke="#EFDFA6" stroke-width="12" fill="none" stroke-linecap="round" opacity=".6"/>
  <g fill="#4E7F42"><circle cx="238" cy="196" r="5"/><circle cx="176" cy="304" r="4"/></g>`);

A.arancini = wrap(`${plate}
  <g>
    <circle cx="158" cy="238" r="52" fill="#C68A34"/><circle cx="158" cy="238" r="46" fill="#D99E45"/>
    <circle cx="252" cy="230" r="47" fill="#C68A34"/><circle cx="252" cy="230" r="41" fill="#D99E45"/>
    <circle cx="206" cy="152" r="45" fill="#CE9339"/><circle cx="206" cy="152" r="39" fill="#E0A64C"/>
  </g>
  <g fill="#B87B27" opacity=".55">
    <circle cx="140" cy="222" r="4"/><circle cx="170" cy="252" r="3.4"/><circle cx="156" cy="212" r="3"/>
    <circle cx="266" cy="216" r="3.6"/><circle cx="240" cy="246" r="3.2"/><circle cx="258" cy="238" r="2.6"/>
    <circle cx="194" cy="138" r="3.4"/><circle cx="218" cy="164" r="3"/><circle cx="200" cy="166" r="2.6"/>
  </g>
  <g fill="#EFC978" opacity=".5">
    <circle cx="146" cy="216" r="9"/><circle cx="240" cy="212" r="8"/><circle cx="194" cy="136" r="8"/>
  </g>
  <path d="M296 292q22-14 30-36" stroke="#B23A22" stroke-width="13" fill="none" stroke-linecap="round"/>
  <g fill="#4E7F42"><circle cx="120" cy="176" r="6"/><circle cx="288" cy="170" r="5"/></g>`);

A.garlicbread = wrap(`
  <circle cx="200" cy="200" r="176" fill="#EFE8DA"/>
  <rect x="34" y="146" width="332" height="112" rx="26" fill="#C98F42"/>
  <rect x="34" y="146" width="332" height="96" rx="24" fill="#E7B15E"/>
  <g stroke="#C98F42" stroke-width="5" stroke-linecap="round">
    <path d="M104 152v88M174 152v88M244 152v88M314 152v88"/>
  </g>
  <g fill="#F4DDA9" opacity=".65">
    <ellipse cx="70" cy="182" rx="20" ry="11"/><ellipse cx="140" cy="176" rx="18" ry="10"/>
    <ellipse cx="210" cy="184" rx="20" ry="11"/><ellipse cx="280" cy="176" rx="18" ry="10"/>
    <ellipse cx="340" cy="184" rx="16" ry="9"/>
  </g>
  <g fill="#4E7F42">
    <circle cx="88" cy="200" r="5"/><circle cx="156" cy="212" r="4.4"/><circle cx="226" cy="198" r="5"/>
    <circle cx="292" cy="210" r="4.4"/><circle cx="122" cy="222" r="3.6"/><circle cx="258" cy="222" r="3.6"/>
    <circle cx="330" cy="206" r="3.4"/>
  </g>
  <g fill="#FBF3DF">
    <ellipse cx="60" cy="300" rx="26" ry="20"/><ellipse cx="104" cy="308" rx="20" ry="16"/>
    <ellipse cx="52" cy="292" rx="9" ry="6" fill="#EADFC2"/>
  </g>
  <g fill="#3A3028" opacity=".5"><circle cx="200" cy="164" r="2.4"/><circle cx="268" cy="166" r="2"/></g>`);

A.tiramisu = wrap(`
  <circle cx="200" cy="200" r="178" fill="#EFE8DA"/>
  <path d="M118 108h164l-16 214a16 16 0 01-16 15h-100a16 16 0 01-16-15z" fill="#F2EDE0"/>
  <path d="M124 138h152l-4 52H128z" fill="#D8B98A"/>
  <path d="M128 190h144l-4 50H132z" fill="#F6EEDC"/>
  <path d="M132 240h136l-4 50H136z" fill="#C79A63"/>
  <path d="M136 290h128l-3 30a10 10 0 01-10 9h-102a10 10 0 01-10-9z" fill="#F6EEDC"/>
  <path d="M118 108h164l-3 34H121z" fill="#5C3A22"/>
  <g fill="#3E2716" opacity=".8">
    <circle cx="148" cy="124" r="3"/><circle cx="182" cy="130" r="2.4"/><circle cx="214" cy="120" r="3.2"/>
    <circle cx="246" cy="128" r="2.6"/><circle cx="166" cy="134" r="2"/><circle cx="230" cy="134" r="2.2"/>
  </g>
  <ellipse cx="200" cy="108" rx="82" ry="13" fill="#6B4526"/>
  <ellipse cx="200" cy="106" rx="70" ry="9" fill="#4A2E19" opacity=".55"/>
  <g fill="#2E1C0F"><ellipse cx="200" cy="100" rx="13" ry="9" transform="rotate(-18 200 100)"/>
    <path d="M193 96q7 4 14 0" stroke="#5C3A22" stroke-width="1.6" fill="none"/></g>
  <path d="M296 300q18-10 26-28" stroke="#C8A24E" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/>
  <g fill="#F2EDE0" opacity=".5"><ellipse cx="140" cy="200" rx="7" ry="16"/></g>`);

A.gelato = wrap(`
  <circle cx="200" cy="200" r="178" fill="#EFE8DA"/>
  <path d="M132 214h136l-20 138a14 14 0 01-14 12h-68a14 14 0 01-14-12z" fill="#F7F2E6"/>
  <path d="M132 214h136l-4 26H136z" fill="#E8DFC8"/>
  <circle cx="168" cy="176" r="52" fill="#F3E4C4"/>
  <circle cx="168" cy="176" r="44" fill="#FAF0D8"/>
  <circle cx="238" cy="186" r="46" fill="#B9563C"/>
  <circle cx="238" cy="186" r="38" fill="#CE6A48"/>
  <g fill="#FFF" opacity=".35">
    <ellipse cx="152" cy="156" rx="14" ry="9"/><ellipse cx="226" cy="168" rx="12" ry="8"/>
  </g>
  <g fill="#8E3B25" opacity=".5"><circle cx="248" cy="200" r="5"/><circle cx="230" cy="204" r="3.6"/></g>
  <g fill="#C8A24E"><circle cx="184" cy="146" r="4.4"/><circle cx="204" cy="160" r="3.4"/></g>
  <path d="M258 128q10-24 32-30" stroke="#4E7F42" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M288 96q14 2 20 12" stroke="#4E7F42" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g stroke="#E8DFC8" stroke-width="3" opacity=".8"><path d="M156 262v78M200 262v86M244 262v78"/></g>`);

A.oven = wrap(`
  <circle cx="200" cy="200" r="196" fill="#1B1310"/>
  <defs>
    <radialGradient id="gMouth" cx="50%" cy="66%" r="58%">
      <stop offset="0%" stop-color="#FFE1A0"/><stop offset="42%" stop-color="#F0842E"/>
      <stop offset="100%" stop-color="#5B1607"/>
    </radialGradient>
    <radialGradient id="gHalo" cx="50%" cy="62%" r="60%">
      <stop offset="0%" stop-color="#F0842E" stop-opacity=".5"/><stop offset="100%" stop-color="#F0842E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="200" cy="236" r="180" fill="url(#gHalo)"/>
  <path d="M46 316Q200 46 354 316Z" fill="#33261E"/>
  <path d="M64 312Q200 78 336 312Z" fill="#221913"/>
  <path d="M96 300Q200 130 304 300Z" fill="url(#gMouth)"/>
  <g fill="#FFC65C" opacity=".92">
    <path d="M124 300q12-52 30-70 4 34 20 50-6 30-16 20z"/>
    <path d="M176 300q16-64 36-84 6 40 24 60-8 36-22 24z"/>
    <path d="M240 300q14-56 34-74 4 36 22 54-8 32-22 20z"/>
  </g>
  <g fill="#FFE9AE" opacity=".8">
    <path d="M162 300q10-34 22-46 3 22 13 33-4 20-11 13z"/>
    <path d="M226 300q9-30 20-42 3 20 12 30-4 18-10 12z"/>
  </g>
  <ellipse cx="200" cy="282" rx="80" ry="18" fill="#E2AC5C"/>
  <ellipse cx="200" cy="278" rx="66" ry="14" fill="#B9412C"/>
  <ellipse cx="184" cy="275" rx="10" ry="4.5" fill="#FFF6E2"/>
  <ellipse cx="214" cy="280" rx="9" ry="4" fill="#FFF6E2"/>
  <rect x="40" y="312" width="320" height="30" rx="9" fill="#2B1F18"/>
  <rect x="26" y="338" width="348" height="22" rx="11" fill="#171009"/>
  <g fill="#FFD27A"><circle cx="140" cy="120" r="2.6"/><circle cx="252" cy="98" r="2"/><circle cx="196" cy="70" r="2.4"/><circle cx="292" cy="146" r="1.8"/><circle cx="112" cy="170" r="2"/></g>`);

A.swing = wrap(`
  <circle cx="200" cy="200" r="196" fill="#241C17"/>
  <circle cx="200" cy="180" r="150" fill="#F0842E" opacity=".07"/>
  <g stroke="#8C7A5E" stroke-width="5" stroke-linecap="round">
    <path d="M96 0l12 176"/><path d="M304 0l-12 176"/>
  </g>
  <rect x="72" y="176" width="256" height="30" rx="15" fill="#8B5E3C"/>
  <rect x="80" y="142" width="240" height="42" rx="21" fill="#C9A227" opacity=".9"/>
  <circle cx="132" cy="148" r="26" fill="#E8DCC0"/>
  <circle cx="200" cy="140" r="29" fill="#F3EAD3"/>
  <circle cx="268" cy="148" r="26" fill="#E8DCC0"/>
  <circle cx="124" cy="140" r="8" fill="#F7F1E0" opacity=".7"/>
  <circle cx="192" cy="132" r="9" fill="#FBF6E8" opacity=".7"/>
  <g fill="#4E7F42">
    <path d="M52 330c-16 12-22 22-22 36a22 22 0 0044 0c0-14-6-24-22-36z"/>
    <path d="M92 348c-12 9-17 17-17 27a17 17 0 0034 0c0-10-5-18-17-27z"/>
  </g>
  <rect x="30" y="366" width="86" height="34" rx="8" fill="#6B4B32"/>
  <g fill="#FFD27A" opacity=".8"><circle cx="336" cy="88" r="14"/></g>
  <circle cx="336" cy="88" r="30" fill="#FFD27A" opacity=".14"/>
  <g fill="#3A2E24"><rect x="0" y="352" width="400" height="48"/></g>`);

A.table = wrap(`
  <circle cx="200" cy="200" r="196" fill="#241C17"/>
  <circle cx="200" cy="196" r="140" fill="#F0842E" opacity=".08"/>
  <rect x="0" y="252" width="400" height="148" fill="#6B4B32"/>
  <rect x="0" y="252" width="400" height="12" fill="#8B5E3C"/>
  <g>
    <rect x="186" y="150" width="28" height="102" rx="6" fill="#F3EAD3"/>
    <ellipse cx="200" cy="150" rx="14" ry="6" fill="#E8DCC0"/>
    <path d="M200 108c-9 12-13 20-13 28a13 13 0 0026 0c0-8-4-16-13-28z" fill="#FFC65C"/>
    <path d="M200 120c-5 7-7 12-7 17a7 7 0 0014 0c0-5-2-10-7-17z" fill="#FFF3CE"/>
    <circle cx="200" cy="136" r="42" fill="#FFD27A" opacity=".18"/>
  </g>
  <g>
    <path d="M92 168h56l-6 40a22 22 0 01-44 0z" fill="#8E2F22" opacity=".8"/>
    <path d="M92 154h56v16H92z" fill="#D9CDB4" opacity=".45"/>
    <rect x="116" y="208" width="8" height="40" fill="#D9CDB4" opacity=".55"/>
    <ellipse cx="120" cy="250" rx="22" ry="6" fill="#D9CDB4" opacity=".55"/>
  </g>
  <g>
    <path d="M256 174h48l-5 34a19 19 0 01-38 0z" fill="#8E2F22" opacity=".8"/>
    <path d="M256 162h48v14h-48z" fill="#D9CDB4" opacity=".45"/>
    <rect x="276" y="208" width="7" height="40" fill="#D9CDB4" opacity=".55"/>
    <ellipse cx="280" cy="250" rx="19" ry="5" fill="#D9CDB4" opacity=".55"/>
  </g>
  <ellipse cx="200" cy="286" rx="76" ry="20" fill="#EDE6D6"/>
  <ellipse cx="200" cy="283" rx="60" ry="15" fill="#F7F2E6"/>
  <g fill="#C98F42"><ellipse cx="200" cy="282" rx="34" ry="9"/></g>
  <g fill="#C2412B" opacity=".85"><ellipse cx="200" cy="281" rx="24" ry="6"/></g>
  <g fill="#3A2E24" opacity=".5"><ellipse cx="200" cy="308" rx="86" ry="10"/></g>`);

A.dough = wrap(`
  <circle cx="200" cy="200" r="172" fill="#EFE8DA"/>
  <g transform="translate(200 200) scale(.86) translate(-200 -200)">
  <rect x="28" y="118" width="344" height="212" rx="16" fill="#D9CFBA"/>
  <rect x="42" y="132" width="316" height="184" rx="10" fill="#E8DFC8"/>
  <g>
    <circle cx="126" cy="200" r="56" fill="#EFD9A8"/><circle cx="126" cy="200" r="48" fill="#F7E7C0"/>
    <circle cx="266" cy="196" r="54" fill="#EFD9A8"/><circle cx="266" cy="196" r="46" fill="#F7E7C0"/>
    <circle cx="196" cy="272" r="50" fill="#EFD9A8"/><circle cx="196" cy="272" r="42" fill="#F7E7C0"/>
  </g>
  <g fill="#E3CD9C" opacity=".8">
    <circle cx="110" cy="184" r="6"/><circle cx="140" cy="212" r="5"/><circle cx="128" cy="176" r="4"/>
    <circle cx="252" cy="182" r="5.4"/><circle cx="280" cy="208" r="4.6"/><circle cx="270" cy="176" r="3.8"/>
    <circle cx="182" cy="258" r="5"/><circle cx="210" cy="286" r="4.4"/><circle cx="198" cy="252" r="3.6"/>
  </g>
  <g fill="#FBF6E8" opacity=".75">
    <circle cx="106" cy="180" r="13"/><circle cx="246" cy="176" r="12"/><circle cx="178" cy="254" r="12"/>
  </g>
  <g fill="#FFF" opacity=".55">
    <circle cx="70" cy="150" r="3"/><circle cx="330" cy="146" r="2.4"/><circle cx="304" cy="292" r="2.8"/>
    <circle cx="88" cy="300" r="2.2"/><circle cx="200" cy="146" r="2"/><circle cx="348" cy="222" r="2.4"/>
  </g>
  </g>
  <text x="200" y="92" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="32" fill="#9A7B4A">48 hours</text>`);

/* The chef: a monogram, deliberately not a likeness. Inventing a face for a
   real named person would be worse than showing none. */
A.chef = wrap(`
  <circle cx="200" cy="200" r="196" fill="#241C17"/>
  <circle cx="200" cy="200" r="150" fill="#F0842E" opacity=".06"/>
  <circle cx="200" cy="200" r="118" fill="none" stroke="#C8A24E" stroke-width="1.5" opacity=".55"/>
  <circle cx="200" cy="200" r="104" fill="none" stroke="#C8A24E" stroke-width="4" opacity=".28"/>
  <text x="200" y="228" text-anchor="middle" font-family="Georgia,serif" font-size="112" font-weight="700" fill="#F3EAD3">KG</text>
  <text x="200" y="272" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="21" fill="#C8A24E">chef &amp; founder</text>
  <path d="M148 300h104" stroke="#C8A24E" stroke-width="1.5" opacity=".5"/>
  <g fill="#C8A24E" opacity=".8"><circle cx="200" cy="316" r="3"/></g>
  <g fill="#4E7F42" opacity=".9">
    <path d="M100 112c-9 7-13 13-13 21a13 13 0 0026 0c0-8-4-14-13-21z"/>
    <path d="M300 112c-9 7-13 13-13 21a13 13 0 0026 0c0-8-4-14-13-21z"/>
  </g>`);

/* ══ THE TILES ═══════════════════════════════════════ */
const ITEMS = [
  { id:'margherita', cat:'Pizza', t:'Margherita', span:'w2 h2',
    d:'San Marzano, fior di latte, basil cut that morning. Ninety seconds on the stone gives the cornicione its leopard spots. The dish everything else is judged against.' },
  { id:'oven', cat:'The room', t:'The oven, mid-service', span:'w2',
    d:'Wood only, floor at 450°C, and a fire that is not allowed to die before the last table. The pizza goes in, gets one turn, and comes out.' },
  { id:'marinara', cat:'Pizza', t:'Marinara',
    d:'No cheese at all — tomato, garlic, oregano, olive oil. The oldest recipe in Naples and the hardest to hide behind.' },
  { id:'truffle', cat:'Pizza', t:'Mushroom Truffle',
    d:'Funghi and truffle oil over fior di latte. Rich, earthy, and the one reviewers keep coming back to name.' },
  { id:'salame', cat:'Pizza', t:'Salame',
    d:'Cured salame that cups and crisps at the edges, holding a little pool of chilli oil in each round.' },
  { id:'ravioli', cat:'Pasta', t:'Ravioli Alfredo',
    d:'Folded in-house each morning. Butter and parmigiano, cracked pepper, nothing else competing for attention.' },
  { id:'raviolidi', cat:'Pasta', t:'Ravioli of the day',
    d:'Whatever the kitchen folded this morning. Ask — the answer changes and it is usually the best thing on the card.' },
  { id:'arancini', cat:'Antipasti', t:'Arancini',
    d:'Fried risotto balls with a molten centre. Order them while you are still arguing about pizza.' },
  { id:'garlicbread', cat:'Antipasti', t:'Hand-rolled garlic bread', span:'w2',
    d:'Rolled by hand and baked straight on the stone. One reviewer wants more garlic in it. The kitchen has been told.' },
  { id:'tiramisu', cat:'Dolci', t:'Tiramisù',
    d:'Mascarpone, coffee, cocoa, layered in the morning and gone by the end of service.' },
  { id:'gelato', cat:'Dolci', t:'Gelato',
    d:'Two scoops. The flavours rotate, so the board by the counter is the only honest menu for this one.' },
  { id:'swing', cat:'The room', t:'The sofa swing',
    d:'The single most written-about object in the restaurant. Guests queue for it. Take it if it is free.' },
  { id:'table', cat:'The room', t:'A table at dusk', span:'w2',
    d:'Low light, live music kept quiet enough to talk over, and an open kitchen you can watch from most seats.' },
  { id:'dough', cat:'The room', t:'Forty-eight hours in',
    d:'00 Napoletana flour, water, salt, a little yeast. Then two days of being left alone, which is the whole secret.' },
  { id:'chef', cat:'The chef', t:'Chef Kushal Gupta',
    d:'Founder, previously of Basil Box. Shown as a monogram rather than a portrait — there is no photograph here we have the right to publish.' }
];

const CATS = ['All', 'Pizza', 'Pasta', 'Antipasti', 'Dolci', 'The room', 'The chef'];
let filter = 'All';

/* ── render ─────────────────────────────────────── */
const ZOOM = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7"/><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6"/></svg>';

const media = it => it.photo
  ? `<img src="${it.photo}" alt="${it.t} at Sangam Italiano" loading="lazy">`
  : A[it.id] || '';

const mosaic = $('#mosaic');
mosaic.innerHTML = ITEMS.map((it, i) => {
  const sp = (it.span || '').split(' ').filter(Boolean).map(s => `sp-${s}`).join(' ');
  return `<li class="${sp}">
    <button type="button" class="tile ${it.photo ? '' : 'tile--placeholder'}"
            data-i="${i}" data-cat="${it.cat}" style="--d:${(i % 8 * .05).toFixed(2)}s"
            aria-label="View ${it.t}">
      <span class="tile__art">${media(it)}</span>
      <span class="tile__scrim"></span>
      <span class="tile__zoom">${ZOOM}</span>
      <span class="tile__meta">
        <span class="tile__k">${it.cat}</span>
        <span class="tile__t">${it.t}</span>
      </span>
    </button></li>`;
}).join('');

$('#galFilters').innerHTML = CATS.map(c =>
  `<button type="button" class="tab${c === filter ? ' tab--on' : ''}" role="tab" data-cat="${c}">${c}</button>`).join('');

function applyFilter() {
  let shown = 0;
  $$('.tile').forEach(t => {
    const on = filter === 'All' || t.dataset.cat === filter;
    t.parentElement.classList.toggle('tile--hidden', !on);
    if (on) shown++;
  });
  $('#galCount').textContent = shown + (shown === 1 ? ' plate' : ' plates');
}
$('#galFilters').addEventListener('click', e => {
  const b = e.target.closest('[data-cat]'); if (!b) return;
  filter = b.dataset.cat;
  $$('#galFilters .tab').forEach(t => t.classList.toggle('tab--on', t === b));
  applyFilter();
});

/* reveal tiles as they scroll in */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('tile--in'); io.unobserve(e.target); }
}), { threshold: .08, rootMargin: '0px 0px -6% 0px' });
$$('.tile').forEach(t => io.observe(t));
$$('.reveal').forEach(el => new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('reveal--in');
}), { threshold: .12 }).observe(el));

/* dim the others while hovering one */
if (matchMedia('(hover:hover)').matches) {
  mosaic.addEventListener('pointerover', e => {
    if (e.target.closest('.tile')) mosaic.classList.add('mosaic--hovering');
  });
  mosaic.addEventListener('pointerleave', () => mosaic.classList.remove('mosaic--hovering'));
}

/* ══ LIGHTBOX ════════════════════════════════════════ */
const lbox = $('#lbox');
let idx = 0, lastFocus = null;

const visible = () => $$('.tile').filter(t => !t.parentElement.classList.contains('tile--hidden'));

function openBox(i) {
  idx = i;
  const it = ITEMS[i];
  $('#lboxArt').innerHTML = media(it);
  $('#lboxKicker').textContent = it.photo ? it.cat : it.cat + ' · illustration';
  $('#lboxTitle').textContent = it.t;
  $('#lboxDesc').textContent = it.d;
  const vis = visible(), pos = vis.findIndex(t => +t.dataset.i === i);
  $('#lboxN').textContent = (pos + 1) + ' / ' + vis.length;
  lbox.hidden = false;
  document.body.classList.add('lboxopen');
  $('#lboxClose').focus();
}
function closeBox() {
  lbox.hidden = true;
  document.body.classList.remove('lboxopen');
  if (lastFocus) lastFocus.focus();
}
function step(dir) {
  const vis = visible(); if (!vis.length) return;
  let pos = vis.findIndex(t => +t.dataset.i === idx);
  pos = (pos + dir + vis.length) % vis.length;
  openBox(+vis[pos].dataset.i);
}

mosaic.addEventListener('click', e => {
  const b = e.target.closest('.tile'); if (!b) return;
  lastFocus = b;
  openBox(+b.dataset.i);
});
$('#lboxClose').addEventListener('click', closeBox);
$('#lboxPrev').addEventListener('click', () => step(-1));
$('#lboxNext').addEventListener('click', () => step(1));
lbox.addEventListener('click', e => { if (e.target === lbox) closeBox(); });
addEventListener('keydown', e => {
  if (lbox.hidden) { if (e.key === 'Escape') setNav(false); return; }
  if (e.key === 'Escape') closeBox();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
});
/* swipe on touch */
let tx = 0;
lbox.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
lbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
}, { passive: true });

applyFilter();
})();
