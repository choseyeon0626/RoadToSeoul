(() => {
  const sidebar = document.getElementById('sidebar');
  const snap = document.getElementById('snap');
  if (!sidebar) return;

  /* 1. 섹션에 따라 글자색 테마 전환 ─────────────────────
     히어로 위: light(#FEFEFE) / Roads 위: dark(--gray-900)
     섹션 상단이 화면의 40% 지점을 지나면 해당 섹션의 테마로 바꾼다. */
  const sections = snap ? [...snap.querySelectorAll('[data-theme]')] : [];
  const updateTheme = () => {
    const top = snap.getBoundingClientRect().top;
    const line = snap.clientHeight * 0.4;
    let theme = sections[0].dataset.theme;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top - top <= line) theme = s.dataset.theme;
    });
    if (sidebar.dataset.theme !== theme) sidebar.dataset.theme = theme;
  };
  if (snap) {   /* 스냅 컨테이너가 없는 페이지는 HTML의 data-theme을 그대로 사용 */
    snap.addEventListener('scroll', updateTheme, { passive: true });
    window.addEventListener('resize', updateTheme);
    updateTheme();
  }

  /* 2. 활성 표시: 길 목록의 시대 그룹에 마우스/포커스가 있으면 해당 메뉴를 강조 */
  const links = [...sidebar.querySelectorAll('.sidebar__link[data-era]')];
  const setActive = (id) =>
    links.forEach((l) => l.classList.toggle('is-active', l.dataset.era === id));
  const eraOf = (el) => {
    const g = el && el.closest ? el.closest('.era-panel') : null;
    return g ? g.dataset.era : null;
  };
  if (snap) {   /* 홈에서만: 호버/포커스한 시대 그룹을 강조 (시대 페이지는 era.js가 고정 표시) */
    document.addEventListener('mouseover', (e) => setActive(eraOf(e.target)));
    document.addEventListener('focusin', (e) => setActive(eraOf(e.target)));
  }

  /* 3. 모바일 햄버거 메뉴 */
  const toggle = sidebar.querySelector('.sidebar__toggle');
  const label = toggle.querySelector('span');
  const setOpen = (open) => {
    sidebar.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? '닫기' : '메뉴';
  };
  toggle.addEventListener('click', () => setOpen(!sidebar.classList.contains('is-open')));
  sidebar.querySelectorAll('.sidebar__link, .sidebar__logo').forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  );
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 768) setOpen(false); });
})();
