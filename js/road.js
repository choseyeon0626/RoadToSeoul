(() => {
  /* 1. ?road= 값으로 길 결정 (없거나 잘못되면 홈으로) */
  const slug = new URLSearchParams(location.search).get('road');
  const road = ROADS.find((r) => r.slug === slug);
  if (!road) { location.replace('index.html'); return; }
  const era = ERAS.find((e) => e.id === road.era);
  const order = ROADS.filter((r) => r.era === road.era).indexOf(road) + 1;

  document.body.dataset.era = era.id;
  document.title = `${road.name} – 길이 된 이름`;

  document.getElementById('road-label').innerHTML =
    `<span class="road-hero__sep">|</span> ${order} <span class="road-hero__sep">|</span> ${road.en}`;
  document.getElementById('road-name').textContent = road.name;
  document.getElementById('road-person').textContent = `${era.name} · ${road.person}`;
  document.getElementById('road-desc').textContent = road.desc;

  /* Gill history: data.js의 세 스토리를 기존 영역에 연결 */
  ['gillstory1', 'gillstory2', 'gillstory3'].forEach((key) => {
    const storyEl = document.getElementById(`road-${key}`);
    if (!storyEl) return;
    storyEl.textContent = road[key] || '';
    storyEl.hidden = !road[key];
  });

  if (road.img) document.getElementById('road-bg').style.backgroundImage = `url('${road.img}')`;

  /* 같은 시대의 다른 길 + 시대 링크 */
  document.getElementById('road-more').innerHTML = ROADS
    .filter((r) => r.era === road.era && r.slug !== road.slug)
    .map((r) => `<li><a class="road-link" href="road.html?road=${r.slug}">${r.name} <small>${r.person}</small> <span aria-hidden="true">→</span></a></li>`)
    .join('');
  const eraLink = document.getElementById('road-era');
  eraLink.href = `era.html?era=${era.id}`;
  document.getElementById('road-era-en').textContent = era.en.toUpperCase();

  document.querySelectorAll('.sidebar__link[data-era]').forEach((l) =>
    l.classList.toggle('is-active', l.dataset.era === era.id));

  /* 2. 카드에서 확장되어 들어왔는지 확인 (era.js가 남긴 신호) */
  try {
    if (sessionStorage.getItem('roadEnter') === road.slug) document.body.classList.add('from-card');
    sessionStorage.removeItem('roadEnter');
  } catch (e) {}

  /* 3. 사이드 내비 글자색: 어두운 첫 화면 위 light / 흰 본문 위 dark */
  const sidebar = document.getElementById('sidebar');
  const sections = [...document.querySelectorAll('[data-theme]')].filter((s) => s !== sidebar);
  const updateTheme = () => {
    /* 데스크톱은 내비 하단(약 300px), 태블릿·모바일은 상단 바 높이를 기준으로 어느 섹션 위에 있는지 판단 */
    const probe = window.innerWidth >= 1024 ? 300 : 32;
    let theme = sidebar.dataset.theme;
    sections.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) theme = s.dataset.theme;
    });
    if (sidebar.dataset.theme !== theme) sidebar.dataset.theme = theme;
  };
  window.addEventListener('scroll', updateTheme, { passive: true });
  window.addEventListener('resize', updateTheme);
  updateTheme();
})();
