(() => {
  /* 시대 목록: data.js에서 렌더링 */
  document.getElementById('about-eras').innerHTML = ERAS.map((e) => {
    const n = ROADS.filter((r) => r.era === e.id).length;
    return `<li><a class="about-era" href="era.html?era=${e.id}" style="--era:${e.color}">${e.name} <small>${e.en} · ${n}개의 길</small> <span class="arrow" aria-hidden="true">→</span></a></li>`;
  }).join('');
})();
