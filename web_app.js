/**
 * CIPEM 2026 Interactive Web Catalogue — JavaScript Application
 * Full Bilingual Version (Français / English)
 * Consultation exclusive : recherche multi-critères, filtrage par pôle, modal programme détaillé.
 * Aucune commande ni demande de devis (site purement consultatif).
 */

// I18N Dictionaries
const I18N = {
  fr: {
    topBadgeOfficial: "Centre Agréé • N° 11-1372-15",
    topNoticeText: 'Formation Continue <span style="margin:0 4px; opacity:0.3">|</span> Imputation légale TFP',
    topNoticeAddress: '24 rue Cyrus le grand, 1002 Tunis',
    navLinkHome: "Accueil",
    navLinkCatalogue: "Catalogue 2026",
    navLinkFlipbook: "Le Livre",
    navLinkAbout: "Le Centre",
    navLinkContact: "Contact",
    navPdfText: "Télécharger PDF",
    heroPillText: "Catalogue des Formations Professionnelles 2026",
    heroTitle: "Excellence Technique,<br>Industrielle et <span>Managériale</span>",
    heroDesc: "Partenaire de référence pour la montée en compétences des équipes industrielles. <strong>35 domaines métiers</strong> et <strong>+410 formations certifiantes</strong> en sessions <strong>Inter-Entreprises</strong> ou <strong>Intra-Entreprise</strong> sur site.",
    heroSearchPlaceholder: "Formation, norme, logiciel... (ex. AutoCAD, HYSYS, NF C 18-510)",
    heroSearchBtn: "Rechercher",
    searchTagLabel: "Populaires :",
    heroAccredBadgeText: "Centre Officiel Agréé d’État",
    heroAccredLabel: "<strong>Agrément Formation Continue</strong> Ministère de la Formation Professionnelle &mdash; Tunisie",
    heroTfpTitle: "Imputation TFP",
    heroTfpDesc: "Actions éligibles à l’imputation légale sur la Taxe de Formation Professionnelle.",
    statLabel1: "Domaines Métiers",
    statSub1: "Technique et Management",
    statLabel2: "Formations",
    statSub2: "Certifiantes et opérationnelles",
    statNum3: "Inter",
    statLabel3: "et Intra",
    statSub3: "En centre ou sur site",
    statLabel4: "Conforme TFP",
    statSub4: "Agrément N° 11-1372-15",
    catalogueSearchPlaceholder: "Rechercher une formation, norme...",
    tabPole0: "Tous les Domaines (35)",
    tabPole1: "Pôle Technique et Ingénierie (22)",
    tabPole2: "Pôle Management et Finance (13)",
    cardCoursesCount: "Formations",
    cardInterIntra: "Inter et Intra • Agréé",
    cardBtnView: "Voir le programme ➔",
    resultsCount: (domainsCount, totalCourses) => `<strong>${domainsCount} domaines</strong> — ${totalCourses} formations disponibles`,
    noResultsTitle: "Aucune formation trouvée",
    noResultsDesc: "Essayez d'autres mots-clés ou réinitialisez les filtres.",
    noResultsBtn: "Réinitialiser la recherche",
    matchingCoursesLabel: (count) => `<strong>${count} formation(s) correspondante(s) :</strong>`,
    otherCoursesLabel: (count) => `...et ${count} autre(s)`,
    aboutBadge: "À PROPOS DU CIPEM",
    aboutTitle: "Une Structure Pluridisciplinaire de Référence",
    aboutP1: "Le <strong>CIPEM</strong> (Chemical Industrial and Petroleum Engineering and Management) est une structure d’ingénierie et de formation professionnelle continue agréée sous le numéro <strong>11-1372-15</strong>.",
    aboutP2: "Nous accompagnons les grands comptes industriels, les compagnies énergétiques et pétrolières ainsi que les entreprises publiques et privees dans la qualification, la montée en compétences et la certification de leurs equipes.",
    aboutCta: "Explorer toutes les formations",
    featTitle1: "Modalités Pédagogiques",
    featDesc1: "Formations Inter-Entreprises a Tunis ou Intra-Entreprise directement sur vos chantiers, usines et bases opérationnelles avec programmes 100% sur mesure.",
    featTitle2: "Corps Professoral d’Experts",
    featDesc2: "Formateurs seniors et ingénieurs praticiens issus du milieu industriel. Pédagogie orientée cas réels, schémas industriels et normes (NF, API, ISO, ASME).",
    featTitle3: "Valorisation et Imputation TFP",
    featDesc3: "Délivrance d’une attestation officielle CIPEM à chaque participant. Actions éligibles aux financements et ristournes légales de la Taxe de Formation Professionnelle.",
    contactBadge: "CONTACT ET INFORMATIONS ADMINISTRATIVES",
    contactTitle: "Informations et Secrétariat Pédagogique",
    contactDesc: "Pour toute information sur les programmes, les plannings ou l’organisation de sessions spécifiques, notre équipe est à votre écoute.",
    contactCardTitle1: "Siège Social",
    contactCardBody1: "24 rue Cyrus le grand<br>le Passage, 1002 Tunis<br>Tunisie",
    contactCardTitle2: "Téléphone et Mobile",
    contactCardBody2: "Fixe : <strong>+216 71 254 978</strong><br>Mobile : <strong>+216 98 645 545</strong><br>Fax : +216 71 353 078",
    contactCardTitle3: "Emails et Présence Web",
    contactCardBody3: 'Formations : <strong><a href="mailto:formation@cipem.com.tn" style="color:var(--orange); text-decoration:none;">formation@cipem.com.tn</a></strong><br>Direction : <strong><a href="mailto:Cipem@cipem.com.tn" style="color:inherit; text-decoration:none;">Cipem@cipem.com.tn</a></strong><br>Facebook : <strong><a href="https://www.facebook.com/cipem.com.tn" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none;">fb.com/cipem.com.tn</a></strong><br>Portail Web : <strong><a href="https://www.cipem.com.tn" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none;">www.cipem.com.tn</a></strong>',
    contactCardTitle4: "Agrément et Fiscalité",
    contactCardBody4: "Agrément : <strong>N° 11-1372-15</strong><br>Matricule Fiscal : 1322330N/A/M/000<br>Registre de Commerce : 1322330N",
    footerOfficialText: "<strong>CIPEM</strong> &bull; Numéro d'Enregistrement : 11-1372-15 &bull; 24 rue Cyrus le grand le Passage, 1002 Tunis &bull; +216 71 254 978 &bull; formation@cipem.com.tn &bull; Cipem@cipem.com.tn &bull; fb.com/cipem.com.tn &bull; www.cipem.com.tn",
    modalTableCol1: "Désignation de la formation",
    modalTableCol2: "Durée",
    modalTableCol3: "Inter",
    modalTableCol4: "Intra",
    modalDaysBadge: (days) => `${days} Jours`,
    modalSub: (sub, count) => `${sub}  •  ${count} formations certifiantes`,
    modalNotice: '<strong>Cadre officiel CIPEM :</strong> Agréé sous le N° 11-1372-15 • Imputation légale TFP autorisée • Attestation officielle délivrée à chaque participant.<br><span style="margin-top:6px; display:block; font-size:0.82rem; color:#94A3B8;">Pour toute demande d’information ou calendrier détaillé, contactez le pôle formation : <a href="mailto:formation@cipem.com.tn" style="color:#D96522; text-decoration:none; font-weight:600;">formation@cipem.com.tn</a> ou <a href="mailto:Cipem@cipem.com.tn" style="color:#D96522; text-decoration:none; font-weight:600;">Cipem@cipem.com.tn</a> — +216 71 254 978</span>',
    // Flipbook Section Translations
    fbBadge: '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> Feuilleter le Catalogue',
    fbTitle: 'Le Catalogue en <em>Livre Interactif</em>',
    fbDesc: 'Feuilletez notre catalogue de formations comme un vrai livre. Cliquez sur les pages ou utilisez les flèches pour naviguer page par page.',
    fbPageLeftTitle: 'Cliquer pour reculer',
    fbPageRightTitle: 'Cliquer pour avancer',
    fbLoadingText: 'Chargement du catalogue haute définition...',
    fbFirstTitle: 'Première page (Couverture)',
    fbPrevText: 'Précédent',
    fbNextText: 'Suivant',
    fbLastTitle: 'Dernière page',
    fbFullscreenTitle: 'Plein écran',
    fbKbdHintText: 'pour naviguer entre les pages',
    fbThumbsLabel: 'Aperçu des pages'
  },
  en: {
    topBadgeOfficial: "Certified Center • No. 11-1372-15",
    topNoticeText: 'Continuous Training <span style="margin:0 4px; opacity:0.3">|</span> TFP Legal Tax Deduction',
    topNoticeAddress: '24 Cyrus le Grand St., 1002 Tunis',
    navLinkHome: "Home",
    navLinkCatalogue: "2026 Catalogue",
    navLinkFlipbook: "The Book",
    navLinkAbout: "About Us",
    navLinkContact: "Contact",
    navPdfText: "Download PDF",
    heroPillText: "2026 Professional Training Catalogue",
    heroTitle: "Technical, Industrial<br>and <span>Managerial</span> Excellence",
    heroDesc: "Leading reference partner for empowering industrial workforce skills. <strong>35 specialized domains</strong> and <strong>+410 certified training courses</strong> available in <strong>Inter-Company</strong> or on-site <strong>Intra-Company</strong> sessions.",
    heroSearchPlaceholder: "Course, standard, software... (e.g. AutoCAD, HYSYS, NF C 18-510)",
    heroSearchBtn: "Search",
    searchTagLabel: "Popular:",
    heroAccredBadgeText: "Official State Certified Center",
    heroAccredLabel: "<strong>Continuous Training Accreditation</strong> Ministry of Vocational Training &mdash; Tunisia",
    heroTfpTitle: "TFP Deduction",
    heroTfpDesc: "Training actions eligible for legal deductions under the Vocational Training Tax.",
    statLabel1: "Core Domains",
    statSub1: "Technical and Management",
    statLabel2: "Courses",
    statSub2: "Certified and operational",
    statNum3: "Inter",
    statLabel3: "and Intra",
    statSub3: "In-center or on-site",
    statLabel4: "TFP Compliant",
    statSub4: "Accreditation No. 11-1372-15",
    catalogueSearchPlaceholder: "Search for a course, standard...",
    tabPole0: "All Domains (35)",
    tabPole1: "Technical and Engineering Division (22)",
    tabPole2: "Management and Finance Division (13)",
    cardCoursesCount: "Courses",
    cardInterIntra: "Inter and Intra • Certified",
    cardBtnView: "View Curriculum ➔",
    resultsCount: (domainsCount, totalCourses) => `<strong>${domainsCount} domains</strong> — ${totalCourses} courses available`,
    noResultsTitle: "No training courses found",
    noResultsDesc: "Try other keywords or reset your filters.",
    noResultsBtn: "Reset Search",
    matchingCoursesLabel: (count) => `<strong>${count} matching course(s):</strong>`,
    otherCoursesLabel: (count) => `...and ${count} more`,
    aboutBadge: "ABOUT CIPEM",
    aboutTitle: "A Multidisciplinary Center of Excellence",
    aboutP1: "<strong>CIPEM</strong> (Chemical Industrial and Petroleum Engineering and Management) is an engineering and continuous vocational training institution accredited under number <strong>11-1372-15</strong>.",
    aboutP2: "We support major industrial players, energy and oil companies, as well as public and private enterprises in upskilling, qualification, and certification of their professional workforce.",
    aboutCta: "Explore All Courses",
    featTitle1: "Training Methodologies",
    featDesc1: "Inter-Company sessions in Tunis or Intra-Company training directly at your industrial facilities, plants, and operational sites with 100% customized programs.",
    featTitle2: "Expert Faculty",
    featDesc2: "Senior instructors and practicing engineers with deep industrial field experience. Practical pedagogy focused on real cases, engineering schematics, and standards (NF, API, ISO, ASME).",
    featTitle3: "Accreditation and TFP Eligibility",
    featDesc3: "Issuance of an official CIPEM certificate to each participant. Programs fully eligible for legal deductions under the Vocational Training Tax (TFP).",
    contactBadge: "CONTACT AND ADMINISTRATIVE INFORMATION",
    contactTitle: "Information and Educational Secretariat",
    contactDesc: "For any inquiries regarding curriculum details, planning, or customized training sessions, our team is at your disposal.",
    contactCardTitle1: "Headquarters",
    contactCardBody1: "24 rue Cyrus le grand<br>le Passage, 1002 Tunis<br>Tunisia",
    contactCardTitle2: "Phone and Mobile",
    contactCardBody2: "Landline : <strong>+216 71 254 978</strong><br>Mobile : <strong>+216 98 645 545</strong><br>Fax : +216 71 353 078",
    contactCardTitle3: "Emails and Web Presence",
    contactCardBody3: 'Training Department : <strong><a href="mailto:formation@cipem.com.tn" style="color:var(--orange); text-decoration:none;">formation@cipem.com.tn</a></strong><br>Management : <strong><a href="mailto:Cipem@cipem.com.tn" style="color:inherit; text-decoration:none;">Cipem@cipem.com.tn</a></strong><br>Facebook : <strong><a href="https://www.facebook.com/cipem.com.tn" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none;">fb.com/cipem.com.tn</a></strong><br>Web Portal : <strong><a href="https://www.cipem.com.tn" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:none;">www.cipem.com.tn</a></strong>',
    contactCardTitle4: "Accreditation and Tax Details",
    contactCardBody4: "Accreditation : <strong>No. 11-1372-15</strong><br>Tax Identification Number : 1322330N/A/M/000<br>Commercial Register : 1322330N",
    footerOfficialText: "<strong>CIPEM</strong> &bull; Registration Number : 11-1372-15 &bull; 24 rue Cyrus le grand le Passage, 1002 Tunis &bull; +216 71 254 978 &bull; formation@cipem.com.tn &bull; Cipem@cipem.com.tn &bull; fb.com/cipem.com.tn &bull; www.cipem.com.tn",
    modalTableCol1: "Course Designation",
    modalTableCol2: "Duration",
    modalTableCol3: "Inter",
    modalTableCol4: "Intra",
    modalDaysBadge: (days) => `${days} Days`,
    modalSub: (sub, count) => `${sub}  •  ${count} certified courses`,
    modalNotice: '<strong>Official CIPEM Framework:</strong> Certified under No. 11-1372-15 • Authorized TFP legal tax deduction • Official certificate awarded to each participant.<br><span style="margin-top:6px; display:block; font-size:0.82rem; color:#94A3B8;">For course outlines, detailed scheduling or customized sessions, please contact our training team: <a href="mailto:formation@cipem.com.tn" style="color:#D96522; text-decoration:none; font-weight:600;">formation@cipem.com.tn</a> or <a href="mailto:Cipem@cipem.com.tn" style="color:#D96522; text-decoration:none; font-weight:600;">Cipem@cipem.com.tn</a> — +216 71 254 978</span>',
    // Flipbook Section Translations
    fbBadge: '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> Browse the Catalogue',
    fbTitle: 'The Catalogue as an <em>Interactive Book</em>',
    fbDesc: 'Browse our training catalogue just like a real book. Click on pages or use the arrows to flip through page by page.',
    fbPageLeftTitle: 'Click to flip back',
    fbPageRightTitle: 'Click to flip forward',
    fbLoadingText: 'Loading high-definition catalogue...',
    fbFirstTitle: 'First page (Cover)',
    fbPrevText: 'Previous',
    fbNextText: 'Next',
    fbLastTitle: 'Last page',
    fbFullscreenTitle: 'Fullscreen',
    fbKbdHintText: 'to navigate between pages',
    fbThumbsLabel: 'Page Previews'
  }
};

// Application State
const state = {
  currentLang: 'fr',
  activePole: 0, // 0: All, 1: Technique, 2: Management
  searchQuery: '',
  currentModalDomain: null
};

// DOM Elements
const domainsGrid = document.getElementById('domainsGrid');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('heroSearchInput');
const catalogueSearchInput = document.getElementById('catalogueSearchInput');
const catalogueSearchClear = document.getElementById('catalogueSearchClear');
const poleTabs = document.querySelectorAll('.pole-tab');
const courseModal = document.getElementById('courseModal');
const modalDomainTitle = document.getElementById('modalDomainTitle');
const modalDomainSub = document.getElementById('modalDomainSub');
const modalCoursesBody = document.getElementById('modalCoursesBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const langBtnFr = document.getElementById('langBtnFr');
const langBtnEn = document.getElementById('langBtnEn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('cipem_lang') || 'fr';
  setLanguage(savedLang, false);
  setupEventListeners();
});

// Switch Language
function setLanguage(lang, shouldScroll = false) {
  state.currentLang = (lang === 'en') ? 'en' : 'fr';
  localStorage.setItem('cipem_lang', state.currentLang);
  document.documentElement.lang = state.currentLang;

  // Toggle active class on lang switcher buttons
  if (langBtnFr) langBtnFr.classList.toggle('active', state.currentLang === 'fr');
  if (langBtnEn) langBtnEn.classList.toggle('active', state.currentLang === 'en');

  // Update static UI texts
  const t = I18N[state.currentLang];
  const setText = (id, text, isHtml = false) => {
    const el = document.getElementById(id);
    if (el) {
      if (isHtml) el.innerHTML = text;
      else el.textContent = text;
    }
  };

  setText('topBadgeOfficial', t.topBadgeOfficial);
  setText('topNoticeText', t.topNoticeText, true);
  if (document.getElementById('topNoticeAddress')) {
    document.getElementById('topNoticeAddress').innerHTML = `
      <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ${t.topNoticeAddress}
    `;
  }

  setText('navLinkHome', t.navLinkHome);
  setText('navLinkCatalogue', t.navLinkCatalogue);
  setText('navLinkFlipbook', t.navLinkFlipbook);
  setText('navLinkAbout', t.navLinkAbout);
  setText('navLinkContact', t.navLinkContact);
  setText('navPdfText', t.navPdfText);

  // Switch the PDF download link to the appropriate language version
  const pdfBtn = document.getElementById('navPdfBtn');
  if (pdfBtn) {
    const pdfHref = state.currentLang === 'en'
      ? (pdfBtn.dataset.hrefEn || pdfBtn.getAttribute('data-href-en'))
      : (pdfBtn.dataset.hrefFr || pdfBtn.getAttribute('data-href-fr'));
    if (pdfHref) {
      pdfBtn.setAttribute('href', pdfHref);
      pdfBtn.setAttribute('download', pdfHref);
    }
  }

  setText('heroPillText', t.heroPillText);
  setText('heroTitle', t.heroTitle, true);
  setText('heroDesc', t.heroDesc, true);
  if (searchInput) searchInput.placeholder = t.heroSearchPlaceholder;
  setText('heroSearchBtn', t.heroSearchBtn);
  setText('searchTagLabel', t.searchTagLabel);

  setText('heroAccredBadgeText', t.heroAccredBadgeText);
  setText('heroAccredLabel', t.heroAccredLabel, true);
  setText('heroTfpTitle', t.heroTfpTitle);
  setText('heroTfpDesc', t.heroTfpDesc);

  setText('statLabel1', t.statLabel1);
  setText('statSub1', t.statSub1);
  setText('statLabel2', t.statLabel2);
  setText('statSub2', t.statSub2);
  setText('statNum3', t.statNum3);
  setText('statLabel3', t.statLabel3);
  setText('statSub3', t.statSub3);
  setText('statLabel4', t.statLabel4);
  setText('statSub4', t.statSub4);

  if (catalogueSearchInput) catalogueSearchInput.placeholder = t.catalogueSearchPlaceholder;
  setText('tabPole0', t.tabPole0);
  setText('tabPole1', t.tabPole1);
  setText('tabPole2', t.tabPole2);

  setText('aboutBadge', t.aboutBadge);
  setText('aboutTitle', t.aboutTitle);
  setText('aboutP1', t.aboutP1, true);
  setText('aboutP2', t.aboutP2, true);
  setText('aboutCta', t.aboutCta);

  setText('featTitle1', t.featTitle1);
  setText('featDesc1', t.featDesc1);
  setText('featTitle2', t.featTitle2);
  setText('featDesc2', t.featDesc2);
  setText('featTitle3', t.featTitle3);
  setText('featDesc3', t.featDesc3);

  setText('contactBadge', t.contactBadge);
  setText('contactTitle', t.contactTitle);
  setText('contactDesc', t.contactDesc);
  setText('contactCardTitle1', t.contactCardTitle1);
  setText('contactCardBody1', t.contactCardBody1, true);
  setText('contactCardTitle2', t.contactCardTitle2);
  setText('contactCardBody2', t.contactCardBody2, true);
  setText('contactCardTitle3', t.contactCardTitle3);
  setText('contactCardBody3', t.contactCardBody3, true);
  setText('contactCardTitle4', t.contactCardTitle4);
  setText('contactCardBody4', t.contactCardBody4, true);

  setText('footerOfficialText', t.footerOfficialText, true);

  // Flipbook section UI texts
  setText('fbBadge', t.fbBadge, true);
  setText('fbTitle', t.fbTitle, true);
  setText('fbDesc', t.fbDesc);
  setText('fbPrevText', t.fbPrevText);
  setText('fbNextText', t.fbNextText);
  setText('fbLoadingText', t.fbLoadingText);
  setText('fbKbdHintText', t.fbKbdHintText);
  setText('fbThumbsLabel', t.fbThumbsLabel);

  const elFirst = document.getElementById('fbFirst');
  if (elFirst) elFirst.title = t.fbFirstTitle;
  const elLast = document.getElementById('fbLast');
  if (elLast) elLast.title = t.fbLastTitle;
  const elFs = document.getElementById('fbFullscreenBtn');
  if (elFs) elFs.title = t.fbFullscreenTitle;
  const elPageL = document.getElementById('fbPageLeft');
  if (elPageL) elPageL.title = t.fbPageLeftTitle;
  const elPageR = document.getElementById('fbPageRight');
  if (elPageR) elPageR.title = t.fbPageRightTitle;

  // Re-render domain cards
  renderDomains();

  // If flipbook is initialized, switch its language
  if (window.reloadFlipbookForLang) {
    window.reloadFlipbookForLang(state.currentLang);
  }

  // If a modal is currently open, refresh its content in the active language
  if (state.currentModalDomain && courseModal && courseModal.classList.contains('active')) {
    openDomainModal(state.currentModalDomain.id);
  }
}

function applySearch(query) {
  state.searchQuery = query.trim().toLowerCase();
  if (searchInput && searchInput.value !== query) searchInput.value = query;
  if (catalogueSearchInput && catalogueSearchInput.value !== query) catalogueSearchInput.value = query;
  if (catalogueSearchClear) {
    catalogueSearchClear.style.display = query.trim() ? 'inline-flex' : 'none';
  }
  renderDomains();
}

function setupEventListeners() {
  // Language Switch Buttons
  if (langBtnFr) {
    langBtnFr.addEventListener('click', () => setLanguage('fr'));
  }
  if (langBtnEn) {
    langBtnEn.addEventListener('click', () => setLanguage('en'));
  }

  // Pole Tabs
  poleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      poleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activePole = parseInt(tab.dataset.pole, 10);
      renderDomains();
    });
  });

  // Catalogue Search Input (Direct in filter bar)
  if (catalogueSearchInput) {
    catalogueSearchInput.addEventListener('input', (e) => {
      applySearch(e.target.value);
    });
  }

  // Clear button in catalogue search bar
  if (catalogueSearchClear) {
    catalogueSearchClear.addEventListener('click', () => {
      applySearch('');
      if (catalogueSearchInput) catalogueSearchInput.focus();
    });
  }

  // Hero Search Input (Real-time live search with scroll)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      applySearch(e.target.value);
      if (state.searchQuery) {
        document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach(l => l.classList.remove('active'));
        const catLink = document.getElementById('navLinkCatalogue');
        if (catLink) catLink.classList.add('active');
      }
    });
  }

  // Quick Tags
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.query;
      applySearch(q);
      document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.forEach(l => l.classList.remove('active'));
      const catLink = document.getElementById('navLinkCatalogue');
      if (catLink) catLink.classList.add('active');
    });
  });

  // Modal Close
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (courseModal) {
    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) closeModal();
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Navigation Menu Active State (Click & ScrollSpy) ──
  const navLinks = document.querySelectorAll('.nav-links a');
  let isNavClickScrolling = false;
  let navScrollTimeout = null;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      isNavClickScrolling = true;
      clearTimeout(navScrollTimeout);
      navScrollTimeout = setTimeout(() => {
        isNavClickScrolling = false;
      }, 800);
    });
  });

  // Clicking brand logo activates Home
  const navBrand = document.querySelector('.nav-brand');
  if (navBrand) {
    navBrand.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      const homeLink = document.getElementById('navLinkHome');
      if (homeLink) homeLink.classList.add('active');
    });
  }

  // In-page links leading to catalogue (e.g. About CTA button)
  document.querySelectorAll('a[href="#catalogue"]').forEach(btn => {
    btn.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      const catLink = document.getElementById('navLinkCatalogue');
      if (catLink) catLink.classList.add('active');
    });
  });

  // ScrollSpy: dynamically move the orange active highlight while scrolling
  const sections = [
    document.getElementById('hero'),
    document.getElementById('catalogue'),
    document.getElementById('flipbook'),
    document.getElementById('about'),
    document.getElementById('contact')
  ].filter(Boolean);

  window.addEventListener('scroll', () => {
    if (isNavClickScrolling) return;

    // If near bottom of the page, activate Contact
    const scrollBottom = window.innerHeight + window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    if (docHeight - scrollBottom < 80) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#contact'));
      return;
    }

    const scrollPos = window.scrollY + 120;
    let activeId = '';

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = sec.getAttribute('id');
        break;
      }
    }

    if (activeId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${activeId}`);
      });
    }
  }, { passive: true });
}

// Filter and Render Domains or Search Results
function renderDomains() {
  if (!domainsGrid) return;
  domainsGrid.innerHTML = '';
  const t = I18N[state.currentLang];
  const isEn = state.currentLang === 'en';

  let filtered = CIPEM_CATALOGUE.filter(d => {
    if (state.activePole !== 0 && d.pole !== state.activePole) return false;
    if (state.searchQuery) {
      const q = state.searchQuery;
      // Match against both French and English titles for seamless search
      const matchTitle = (d.title && d.title.toLowerCase().includes(q)) || (d.title_en && d.title_en.toLowerCase().includes(q));
      const matchSub = (d.subtitle && d.subtitle.toLowerCase().includes(q)) || (d.subtitle_en && d.subtitle_en.toLowerCase().includes(q));
      const matchCourse = d.courses.some(c => 
        (c.title && c.title.toLowerCase().includes(q)) || 
        (c.title_en && c.title_en.toLowerCase().includes(q))
      );
      return matchTitle || matchSub || matchCourse;
    }
    return true;
  });

  // Count total displayed courses
  let totalCoursesCount = 0;
  filtered.forEach(d => {
    if (state.searchQuery) {
      const q = state.searchQuery;
      totalCoursesCount += d.courses.filter(c =>
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.title_en && c.title_en.toLowerCase().includes(q)) ||
        (d.title && d.title.toLowerCase().includes(q)) ||
        (d.title_en && d.title_en.toLowerCase().includes(q))
      ).length;
    } else {
      totalCoursesCount += d.courseCount;
    }
  });

  if (resultsCount) {
    resultsCount.innerHTML = t.resultsCount(filtered.length, totalCoursesCount);
  }

  if (filtered.length === 0) {
    domainsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 16px; border: 1px dashed #CBD5E1;">
        <h3 style="font-size: 1.4rem; color: #0F2A4A; margin-bottom: 8px;">${t.noResultsTitle}</h3>
        <p style="color: #64748B;">${t.noResultsDesc}</p>
        <button class="btn btn-primary" style="margin-top: 16px;" onclick="resetSearch()">${t.noResultsBtn}</button>
      </div>
    `;
    return;
  }

  filtered.forEach(domain => {
    const card = document.createElement('div');
    card.className = 'domain-card';

    const domainTitle = isEn ? (domain.title_en || domain.title) : domain.title;
    const domainSub = isEn ? (domain.subtitle_en || domain.subtitle) : domain.subtitle;
    const poleName = isEn ? (domain.poleName_en || domain.poleName) : domain.poleName;

    // Highlight matching courses in search results
    let matchingCourseHtml = '';
    if (state.searchQuery) {
      const q = state.searchQuery;
      const matchingCourses = domain.courses.filter(c => 
        (c.title && c.title.toLowerCase().includes(q)) || 
        (c.title_en && c.title_en.toLowerCase().includes(q))
      );
      if (matchingCourses.length > 0) {
        matchingCourseHtml = `
          <div style="background: #F8FAFC; border-left: 3px solid ${domain.accent}; padding: 8px 12px; margin-bottom: 12px; border-radius: 4px; font-size: 0.82rem;">
            ${t.matchingCoursesLabel(matchingCourses.length)}
            <ul style="margin-top: 4px; padding-left: 16px; color: #334155;">
              ${matchingCourses.slice(0, 3).map(mc => {
                const cTitle = isEn ? (mc.title_en || mc.title) : mc.title;
                const dLabel = isEn ? `${mc.days}D` : `${mc.days}J`;
                return `<li>${cTitle} (${dLabel})</li>`;
              }).join('')}
              ${matchingCourses.length > 3 ? `<li><em>${t.otherCoursesLabel(matchingCourses.length - 3)}</em></li>` : ''}
            </ul>
          </div>
        `;
      }
    }

    card.innerHTML = `
      <div class="domain-card-img-wrap">
        <img class="domain-card-img" src="${domain.image}" alt="${domainTitle}" onerror="this.src='vertical_images/training.jpg'">
        <div class="domain-card-badge">${String(domain.id + 1).padStart(2, '0')}</div>
        <div class="domain-card-count">${domain.courseCount} ${t.cardCoursesCount}</div>
      </div>
      <div class="domain-card-body">
        <div style="font-size: 0.75rem; font-weight: 700; color: ${domain.accent}; text-transform: uppercase; margin-bottom: 4px;">
          ${poleName}
        </div>
        <h3 class="domain-card-title">${domainTitle}</h3>
        <p class="domain-card-sub">${domainSub}</p>
        ${matchingCourseHtml}
        <div class="domain-card-footer">
          <span style="font-size: 0.8rem; color: #64748B;">${t.cardInterIntra}</span>
          <button class="btn-expand-domain" onclick="openDomainModal(${domain.id})">
            ${t.cardBtnView}
          </button>
        </div>
      </div>
    `;
    domainsGrid.appendChild(card);
  });
}

function resetSearch() {
  applySearch('');
  state.activePole = 0;
  poleTabs.forEach(t => t.classList.toggle('active', t.dataset.pole === '0'));
  renderDomains();
}

// ── Open Domain Modal (consultation only) ──
function openDomainModal(domainId) {
  const domain = CIPEM_CATALOGUE.find(d => d.id === domainId);
  if (!domain) return;
  state.currentModalDomain = domain;

  const t = I18N[state.currentLang];
  const isEn = state.currentLang === 'en';

  const domainTitle = isEn ? (domain.title_en || domain.title) : domain.title;
  const domainSub = isEn ? (domain.subtitle_en || domain.subtitle) : domain.subtitle;

  modalDomainTitle.textContent = `${String(domain.id + 1).padStart(2, '0')} | ${domainTitle.toUpperCase()}`;
  modalDomainSub.textContent = t.modalSub(domainSub, domain.courseCount);

  const tableRows = domain.courses.map(c => {
    const courseTitle = isEn ? (c.title_en || c.title) : c.title;
    return `
      <tr>
        <td class="course-title-cell">
          <span style="color: ${domain.accent}; margin-right: 6px;">▪</span>${courseTitle}
        </td>
        <td style="text-align: center;">
          <span class="course-badge-days">${t.modalDaysBadge(c.days)}</span>
        </td>
        <td style="text-align: center;">
          <span class="badge-check">✓</span>
        </td>
        <td style="text-align: center;">
          <span class="badge-check">✓</span>
        </td>
      </tr>
    `;
  }).join('');

  modalCoursesBody.innerHTML = `
    <div class="modal-courses-table-wrap">
      <table class="courses-table">
        <thead>
          <tr>
            <th style="width: 60%;">${t.modalTableCol1}</th>
            <th class="center" style="width: 14%;">${t.modalTableCol2}</th>
            <th class="center" style="width: 13%;">${t.modalTableCol3}</th>
            <th class="center" style="width: 13%;">${t.modalTableCol4}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
    <div style="margin-top: 20px; padding: 14px 18px; background: #F8FAFC; border-radius: 8px; border: 1px solid #E2E8F0; font-size: 0.88rem; color: #475569;">
      ${t.modalNotice}
    </div>
  `;

  courseModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (courseModal) courseModal.classList.remove('active');
  document.body.style.overflow = '';
}
