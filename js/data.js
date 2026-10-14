const ERAS = [
  { id: 'joseon',         name: '조선시대',   en: 'Joseon',            color: '#A83D3D', cover: 'img/era-joseon.jpg', pos: '55% 50%', title: '조선시대의<br>세 길을 걷다' },
  { id: 'japanese',       name: '일제강점기', en: 'Japanese Colonial', color: '#315B72', cover: 'img/era-japanese.jpg', pos: '15% 50%', title: '일제강점기의<br>세 길을 걷다' },
  { id: 'three-kingdoms', name: '삼국시대',   en: 'Three Kingdoms',    color: '#C99A3E', cover: 'img/era-three-kingdoms.jpg', pos: '15% 50%', title: '삼국시대의<br>세 길을 걷다' },
];

/* desc·img는 임시값입니다. img가 비어 있으면 시대 컬러 그라데이션 플레이스홀더가 표시됩니다. */
const ROADS = [
  { slug: 'sejong-ro',   era: 'joseon',         name: '세종로',   en: 'Sejong-ro',   person: '세종대왕',  desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'toegye-ro',   era: 'joseon',         name: '퇴계로',   en: 'Toegye-ro',   person: '퇴계 이황', desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'chungmu-ro',  era: 'joseon',         name: '충무로',   en: 'Chungmu-ro',  person: '이순신',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'dosan-daero', era: 'japanese',       name: '도산대로', en: 'Dosan-daero', person: '안창호',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'sowol-gil',   era: 'japanese',       name: '소월길',   en: 'Sowol-gil',   person: '김소월',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'baekbeom-ro', era: 'japanese',       name: '백범로',   en: 'Baekbeom-ro', person: '김구',      desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'jinheung-ro', era: 'three-kingdoms', name: '진흥로',   en: 'Jinheung-ro', person: '진흥왕',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'euncheon-ro', era: 'three-kingdoms', name: '은천로',   en: 'Euncheon-ro', person: '강감찬',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
  { slug: 'eulji-ro',    era: 'three-kingdoms', name: '을지로',   en: 'Eulji-ro',    person: '을지문덕',  desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.', img: '' },
];

/* 홈 2번째 섹션 패널 순서 (시간순) + About */
const HOME_PANELS = ['three-kingdoms', 'joseon', 'japanese', 'about'];
const ABOUT = {
  name: 'About', en: 'About', cover: 'img/era-about.jpg', pos: '68% 50%',
  desc: '도로명에 남은 한국 역사의 인물과 이야기를 시대별로 살펴봅니다.',
  href: 'about.html',
};
