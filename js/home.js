(() => {
  const snap = document.getElementById('snap');
  const hero = document.getElementById('hero');
  const roads = document.getElementById('roads');

  /* 1. 4분할 패널 렌더링: 삼국시대 / 조선 / 일제강점기 / About (data.js의 HOME_PANELS 순서) */
  const panelsEl = document.getElementById('panels');
  const pad = (n) => String(n).padStart(2, '0');

  panelsEl.innerHTML = HOME_PANELS.map((id, i) => {
    const no = pad(i + 1);

    /* About 패널 */
    if (id === 'about') {
      return `
        <section class="panel panel--about" data-panel="about" tabindex="0" aria-label="${ABOUT.name}"
                 style="--pos:${ABOUT.pos}">
          <div class="panel__bg" aria-hidden="true" style="background-image:url('${ABOUT.cover}')"></div>
          <div class="panel__scrim" aria-hidden="true"></div>
          <div class="panel__head">
            <span class="panel__no">| ${no} | ${ABOUT.en}</span>
            <strong class="panel__name">${ABOUT.name}</strong>
          </div>
          <strong class="panel__vname" aria-hidden="true">${ABOUT.name}</strong>
          <div class="panel__body panel__body--about">
            <p class="panel__desc">${ABOUT.desc}</p>
            <a class="panel__more" href="${ABOUT.href}">About 보기 <span aria-hidden="true">→</span></a>
          </div>
        </section>`;
    }

    /* 시대 패널 + 해당 시대의 길 3개 */
    const era = ERAS.find((e) => e.id === id);
    const items = ROADS.filter((r) => r.era === id);
    const list = items.map((r, k) => `
        <li style="--d:${0.35 + k * 0.1}s">
          <a class="panel-road" href="road.html?road=${r.slug}">
            <span class="panel-road__no">| ${k + 1} | ${r.en}</span>
            <span class="panel-road__name">${r.name}<span class="panel-road__arrow" aria-hidden="true">→</span></span>
            <span class="panel-road__person">${r.person}</span>
          </a>
        </li>`).join('');

    return `
      <section class="panel era-panel" data-era="${era.id}" data-panel="${era.id}" tabindex="0" aria-label="${era.name}"
               style="--pos:${era.pos}">
        <div class="panel__bg" aria-hidden="true" style="background-image:url('${era.cover}')"></div>
        <div class="panel__scrim" aria-hidden="true"></div>
        <div class="panel__head">
          <span class="panel__no">| ${no} | ${era.en}</span>
          <strong class="panel__name">${era.name}</strong>
        </div>
        <strong class="panel__vname" aria-hidden="true">${era.name}</strong>
        <a class="panel__more panel__more--top" href="era.html?era=${era.id}">시대 보기 <span aria-hidden="true">→</span></a>
        <ul class="panel__body panel__roads">${list}</ul>
      </section>`;
  }).join('');

  /* 1-1. 호버/포커스/탭으로 한 패널만 펼치고, 마우스가 벗어나면 처음 상태(4등분)로 복귀 */
  const panels = [...panelsEl.querySelectorAll('.panel')];
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  let timer = null;

  const activate = (panel) => {
    clearTimeout(timer);
    panels.forEach((p) => p.classList.toggle('is-active', p === panel));
    panelsEl.classList.toggle('has-active', !!panel);
  };
  const reset = () => { clearTimeout(timer); activate(null); };

  panels.forEach((panel) => {
    /* 마우스: 살짝 지연을 둬서 스쳐 지나갈 때 깜빡이지 않게 */
    panel.addEventListener('mouseenter', () => {
      if (!canHover.matches) return;
      clearTimeout(timer);
      timer = setTimeout(() => activate(panel), 60);
    });
    /* 키보드 포커스 */
    panel.addEventListener('focusin', () => activate(panel));
    /* 터치(호버 없는 기기): 탭하면 펼침. 펼쳐진 뒤의 링크는 그대로 이동 */
    panel.addEventListener('click', (e) => {
      if (!panel.classList.contains('is-active')) {
        if (e.target.closest('a')) e.preventDefault();
        activate(panel);
      }
    });
  });
  panelsEl.addEventListener('mouseleave', () => { if (canHover.matches) reset(); });
  panelsEl.addEventListener('focusout', (e) => {
    if (!panelsEl.contains(e.relatedTarget)) reset();
  });

  /* 2. 스크롤 진행도(0~1)를 히어로에 전달: 히어로가 천천히 밀려나며 덮이는 효과 */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;
  const update = () => {
    ticking = false;
    const p = reduce.matches ? 0 : Math.min(1, Math.max(0, snap.scrollTop / snap.clientHeight));
    hero.style.setProperty('--p', p.toFixed(3));
  };
  snap.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  /* 3. NEXT → Roads 섹션으로 이동 */
  document.getElementById('next').addEventListener('click', () => {
    snap.scrollTo({ top: roads.offsetTop, behavior: 'smooth' });
  });

  /* 4. 로고 클릭: 홈에서는 새로고침 대신 히어로로 부드럽게 복귀 */
  document.querySelector('.sidebar__logo').addEventListener('click', (e) => {
    e.preventDefault();
    snap.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
