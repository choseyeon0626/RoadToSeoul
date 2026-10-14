(() => {
  /* 1. ?era= 값으로 시대 결정 (없거나 잘못되면 조선시대) */
  const q = new URLSearchParams(location.search).get('era');
  const era = ERAS.find((e) => e.id === q) || ERAS[0];
  document.body.dataset.era = era.id;                 // --era 자동 전환
  document.title = `${era.name} – 길이 된 이름`;

  document.getElementById('era-title').innerHTML = era.title;
  document.getElementById('era-eyebrow').textContent = `${era.en.toUpperCase()} · 3 ROADS`;

  /* 사이드 내비: 현재 시대 활성 표시 */
  document.querySelectorAll('.sidebar__link[data-era]').forEach((l) =>
    l.classList.toggle('is-active', l.dataset.era === era.id)
  );

  /* 2. 카드 3장 렌더링 (문구·이미지는 data.js에서만 수정) */
  const list = document.getElementById('road-cards');
  list.innerHTML = ROADS.filter((r) => r.era === era.id).map((r, i) => `
    <li>
      <a class="road-card" href="road.html?road=${r.slug}" data-road="${r.slug}">
        <div class="road-card__bg"${r.img ? ` style="background-image:url('${r.img}')"` : ''}></div>
        <div class="road-card__top">
          <span class="road-card__label"><span class="road-card__sep">|</span> ${i + 1} <span class="road-card__sep">|</span> ${r.en}</span>
          <strong class="road-card__name">${r.name}</strong>
        </div>
        <p class="road-card__desc">${r.desc}</p>
      </a>
    </li>`).join('');

  /* 3. 카드 클릭 → 카드가 화면 전체로 확장되며 road.html로 진입 (FLIP) */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const body = document.body;

  list.addEventListener('click', (e) => {
    const card = e.target.closest('.road-card');
    if (!card) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;   // 새 탭 열기는 그대로 허용
    e.preventDefault();
    if (body.classList.contains('is-transitioning')) return;              // 중복 클릭 방지

    const href = card.href;
    sessionStorage.setItem('roadEnter', card.dataset.road);               // road.html이 이어받을 신호
    body.classList.add('is-transitioning');                               // 스크롤 잠금 + 나머지 페이드아웃

    /* reduced-motion: 확장 없이 짧은 페이드 후 이동 */
    if (reduce.matches) { setTimeout(() => { location.href = href; }, 200); return; }

    const rect = card.getBoundingClientRect();
    const clone = card.cloneNode(true);
    clone.removeAttribute('href');
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('road-card--clone');
    Object.assign(clone.style, {
      position: 'fixed', top: rect.top + 'px', left: rect.left + 'px',
      width: rect.width + 'px', height: rect.height + 'px',
      zIndex: 1000, margin: 0, aspectRatio: 'auto',
      transition: 'top .8s cubic-bezier(.77,0,.18,1), left .8s cubic-bezier(.77,0,.18,1), width .8s cubic-bezier(.77,0,.18,1), height .8s cubic-bezier(.77,0,.18,1)'
    });
    body.appendChild(clone);

    let done = false;
    const go = () => { if (!done) { done = true; location.href = href; } };

    requestAnimationFrame(() => requestAnimationFrame(() => {
      clone.classList.add('is-expanding');
      Object.assign(clone.style, {
        top: '0px', left: '0px',
        width: document.documentElement.clientWidth + 'px',
        height: window.innerHeight + 'px'
      });
    }));

    /* 자식의 opacity 전환도 버블링되므로 클론 자신의 width 전환만 확인 */
    clone.addEventListener('transitionend', (ev) => {
      if (ev.target === clone && ev.propertyName === 'width') go();
    });
    setTimeout(go, 1100);                                                 // 안전장치
  });

  /* 4. 뒤로가기(bfcache 복원) 시 전환 상태 초기화 */
  window.addEventListener('pageshow', () => {
    body.classList.remove('is-transitioning');
    document.querySelectorAll('body > .road-card').forEach((el) => el.remove());
  });
})();
