const ERAS = [
  { id: 'joseon',         name: '조선시대',   en: 'Joseon',            color: '#A83D3D', cover: 'img/era-joseon.jpg', pos: '55% 50%', title: '조선시대의<br>세 길을 걷다' },
  { id: 'japanese',       name: '일제강점기', en: 'Japanese Colonial', color: '#315B72', cover: 'img/era-japanese.jpg', pos: '15% 50%', title: '일제강점기의<br>세 길을 걷다' },
  { id: 'three-kingdoms', name: '삼국시대',   en: 'Three Kingdoms',    color: '#C99A3E', cover: 'img/era-three-kingdoms.jpg', pos: '15% 50%', title: '삼국시대의<br>세 길을 걷다' },
];

/* desc·img는 임시값입니다. img가 비어 있으면 시대 컬러 그라데이션 플레이스홀더가 표시됩니다. */
const ROADS = [
  { slug: 'sejong-ro',   era: 'joseon',         name: '세종로',   en: 'Sejong-ro',   person: '세종대왕',  desc: '세종대왕의 위대한 유산과 역사를 품고 달리는 광화문의 중심길, 세종로.',gillstory1: '도로 이름이 붙은 이유세종로는 조선 제4대 왕인 세종대왕의 이름을 따서 붙여진 도로명이다. 세종대왕은 훈민정음을 창제하고 과학, 농업, 음악 등 여러 분야의 발전을 이끌었다. 세종로는 광화문 앞에서 세종문화회관과 광화문광장 일대를 지나는 도로로, 조선의 역사와 국가의 중심 공간을 상징하는 장소와 연결되어 있다.',gillstory2: '세종대왕(1397~1450)은 조선의 제4대 왕으로, 1418년에 즉위하여 1450년까지 재위했다. 대표적인 업적은 백성이 쉽게 읽고 쓸 수 있도록 훈민정음을 창제한 것이다. 훈민정음의 창제 과정과 원리는 1446년에 반포된 《훈민정음 해례본》에 기록되어 있다. 또한 세종은 집현전을 통해 학문 연구를 장려하고, 장영실 등 여러 인재와 함께 과학기술 발전에도 힘썼다.',gillstory3: '세종로는 서울특별시 종로구의 광화문 앞을 지나는 도로로, 광화문광장과 세종문화회관, 정부서울청사 등 주요 시설과 연결된다.', img: './img/Sejong.jpg' },
  { slug: 'toegye-ro',   era: 'joseon',         name: '퇴계로',   en: 'Toegye-ro',   person: '퇴계 이황', desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '퇴계로는 조선 시대의 대표적인 성리학자인 퇴계 이황의 호인 ‘퇴계’를 따서 붙여진 도로명이다. 이황은 성리학을 연구하고 후학을 양성하여조선의 학문과 교육 발전에 큰 영향을 미쳤다. 퇴계로라는 이름은 그의 학문적 업적과 사상을 오늘날의 도시 공간에서 기억하게 한다.',gillstory2: '이황(1501~1570)은 조선 전기의 문신이자 성리학자이다. 그는 인간의 본성과 도덕, 올바른 삶의 자세를 연구했으며, 학문 연구와 후학 양성에 힘썼다. 대표적인 저서인 《성학십도》는 1568년 선조에게 올린 책으로, 성리학의 주요 원리와 마음을 바르게 수양하는 방법을 열 개의 도표와 설명으로 정리했다. 이황은 한국 성리학의 발전에 큰 영향을 준 학자로 평가받는다.',gillstory3: '퇴계로는 서울특별시 중구에 위치하며 서울역과 회현동, 명동, 충무로, 동대문역사문화공원 일대 등을 연결한다. 주변에는 남대문시장과 명동 등 상업시설과 관광지가 밀집해 있다. 자동차가 이동하는 주요 도로인 동시에 보행환경 개선사업을 통해 보행자의 편의도 고려한 도심 공간으로 활용되고 있다.', img: './img/toegye.jpg' },
  { slug: 'chungmu-ro',  era: 'joseon',         name: '충무로',   en: 'Chungmu-ro',  person: '이순신',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '이순신(1545~1598)은 조선 중기의 무신으로, 임진왜란 당시 조선 수군을 이끌며 여러 해전에서 승리를 거두었다. 대표적인 전투로는 한산도대첩과 명량해전이 있다. 그는 전쟁 중에도 군사와 병력을 관리하고 해상 방어를 강화하여 조선을 지키는 데 크게 기여했다. 이순신이 전쟁 중 기록한 《난중일기》는 당시 전쟁 상황과 군인의 생활을 보여 주는 중요한 역사 자료이다. 이순신은 사후 ‘충무공’이라는 시호를 받았다.',gillstory3: '충무로는 서울특별시 중구에 위치하며 명동과 퇴계로, 을지로 등 서울 도심의 주요 지역과 연결된다. 과거부터 영화 제작과 인쇄업이 발달한 지역으로 알려져 있으며, 현재도 인쇄 관련 업체와 상업시설이 자리하고 있다. 주변에는 충무로역과 남산으로 이어지는 길이 있어 교통과 상업, 문화 활동이 함께 이루어진다.', img: './img/chungmu.jpg' },
  { slug: 'dosan-daero', era: 'japanese',       name: '도산대로', en: 'Dosan-daero', person: '안창호',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '',gillstory3: '', img: './img/dosan.png' },
  { slug: 'sowol-gil',   era: 'japanese',       name: '소월길',   en: 'Sowol-gil',   person: '김소월',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '',gillstory3: '', img: '/img/sowol.png' },
  { slug: 'baekbeom-ro', era: 'japanese',       name: '백범로',   en: 'Baekbeom-ro', person: '김구',      desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '',gillstory3: '', img: '/img/bakbum.jpg' },
  { slug: 'jinheung-ro', era: 'three-kingdoms', name: '진흥로',   en: 'Jinheung-ro', person: '진흥왕',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '',gillstory3: '', img: '/img/jinheung.jpg' },
  { slug: 'euncheon-ro', era: 'three-kingdoms', name: '은천로',   en: 'Euncheon-ro', person: '강감찬',    desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '',gillstory3: '', img: '/img/euncheon-ro.jpg' },
  { slug: 'eulji-ro',    era: 'three-kingdoms', name: '을지로',   en: 'Eulji-ro',    person: '을지문덕',  desc: '임시 설명 문구입니다. 길 이름의 유래와 인물 이야기가 이곳에 들어갑니다.',gillstory1: '',gillstory2: '',gillstory3: '', img: '/img/eulji.jpg' },
];

/* 홈 2번째 섹션 패널 순서 (시간순) + About */
const HOME_PANELS = ['three-kingdoms', 'joseon', 'japanese', 'about'];
const ABOUT = {
  name: 'About', en: 'About', cover: 'img/era-about.jpg', pos: '68% 50%',
  desc: '도로명에 남은 한국 역사의 인물과 이야기를 시대별로 살펴봅니다.',
  href: 'about.html',
};
