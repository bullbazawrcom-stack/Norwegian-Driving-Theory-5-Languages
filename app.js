var LN = { no: "Norsk", en: "English", ru: "Русский" },
  LI = { no: 0, en: 1, ru: 2 };
var UI = {
  no: {
    sub: "Øv til teoriprøven. Alle spørsmål er på norsk.",
    pick: "Velg språk for oversettelse og meny",
    std: "standard",
    prac: "Øvelse",
    pracD: "Alle spørsmål, svar med en gang",
    exam: "Prøveeksamen",
    examD: "Ingen hint, med tid. Bestått: 85 %",
    mist: "Øv på feil",
    mistD: "Spørsmål du har svart feil på",
    topic: "Etter tema",
    q: "Spørsmål",
    ok: "Riktig. ",
    bad: "Feil. ",
    next: "Neste",
    fin: "Se resultat",
    menu: "Til menyen",
    tr: "Oversettelse",
    pass: "Bestått!",
    fail: "Ikke bestått. Prøv igjen.",
    wrong: "Feil svar",
    yours: "Ditt svar",
    right: "Riktig svar",
    none: "Ingen lagrede feil ennå.",
    best: "Beste prøveeksamen",
    time: "Tid",
    lang: "Bytt språk",
    note: "Læremateriell, ikke offisielle spørsmål. Se vegvesen.no.",
    need: "Krav",
  },
  en: {
    sub: "Practise for the theory test. All questions are in Norwegian.",
    pick: "Choose the language for translation and menu",
    std: "default",
    prac: "Practice",
    pracD: "All questions, instant feedback",
    exam: "Mock exam",
    examD: "No hints, timed. Pass mark: 85%",
    mist: "Practise mistakes",
    mistD: "Questions you answered wrongly",
    topic: "By topic",
    q: "Question",
    ok: "Correct. ",
    bad: "Wrong. ",
    next: "Next",
    fin: "See result",
    menu: "Back to menu",
    tr: "Translation",
    pass: "Passed!",
    fail: "Not passed. Try again.",
    wrong: "Wrong answers",
    yours: "Your answer",
    right: "Correct answer",
    none: "No saved mistakes yet.",
    best: "Best mock exam",
    time: "Time",
    lang: "Change language",
    note: "Study material, not official questions. See vegvesen.no.",
    need: "Needed",
  },
  ru: {
    sub: "Тренажёр теоретического экзамена. Все вопросы на норвежском.",
    pick: "Выберите язык перевода и меню",
    std: "по умолчанию",
    prac: "Тренировка",
    pracD: "Все вопросы, ответ сразу",
    exam: "Пробный экзамен",
    examD: "Без подсказок, на время. Порог: 85 %",
    mist: "Работа над ошибками",
    mistD: "Вопросы, где вы ошиблись",
    topic: "По темам",
    q: "Вопрос",
    ok: "Верно. ",
    bad: "Неверно. ",
    next: "Далее",
    fin: "Результат",
    menu: "В меню",
    tr: "Перевод",
    pass: "Сдано!",
    fail: "Не сдано. Попробуйте ещё раз.",
    wrong: "Ошибки",
    yours: "Ваш ответ",
    right: "Верный ответ",
    none: "Сохранённых ошибок пока нет.",
    best: "Лучший пробный экзамен",
    time: "Время",
    lang: "Сменить язык",
    note: "Учебный материал, не официальные вопросы. См. vegvesen.no.",
    need: "Нужно",
  },
};
var T = {
  speed: ["Fart", "Speed", "Скорость"],
  prio: ["Vikeplikt", "Right of way", "Приоритет"],
  sign: ["Skilt", "Signs", "Знаки"],
  safe: ["Sikkerhet", "Safety", "Безопасность"],
  rule: ["Regler", "Rules", "Правила"],
};
var NM = [
  ["Vikeplikt", "Give way", "Уступи дорогу"],
  ["Stopp", "Stop", "Стоп"],
  ["Forkjørsvei", "Priority road", "Главная дорога"],
  ["Innkjøring forbudt", "No entry", "Въезд запрещён"],
  [
    "Fartsgrense 50 km/t",
    "Speed limit 50 km/h",
    "Ограничение скорости 50 км/ч",
  ],
];
var SVG = [
  '<svg viewBox="0 0 100 100"><polygon points="8,12 92,12 50,88" fill="#fff" stroke="#d00" stroke-width="10" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 100 100"><polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill="#d00" stroke="#fff" stroke-width="3"/><text x="50" y="57" text-anchor="middle" font-size="19" font-weight="700" fill="#fff" font-family="Arial,sans-serif">STOPP</text></svg>',
  '<svg viewBox="0 0 100 100"><polygon points="50,3 97,50 50,97 3,50" fill="#fff" stroke="#888" stroke-width="2"/><polygon points="50,15 85,50 50,85 15,50" fill="#fc0"/></svg>',
  '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#d00"/><rect x="20" y="42" width="60" height="16" fill="#fff"/></svg>',
  '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fff" stroke="#d00" stroke-width="10"/><text x="50" y="62" text-anchor="middle" font-size="34" font-weight="700" fill="#111" font-family="Arial,sans-serif">50</text></svg>',
];
var SQ = [
  "Hva betyr dette skiltet?",
  "What does this sign mean?",
  "Что означает этот знак?",
];
var SE = ["Skiltet betyr: ", "This sign means: ", "Знак означает: "];
function sg(i) {
  var o = [NM[i]],
    k;
  for (k = 0; k < 5 && o.length < 4; k++) if (k !== i) o.push(NM[k]);
  return {
    t: "sign",
    s: SVG[i],
    q: SQ,
    o: o,
    a: 0,
    e: NM[i].map(function (n, l) {
      return SE[l] + n;
    }),
  };
}
var D = [
  {
    t: "speed",
    q: [
      "Hvilken fartsgrense gjelder i tettbygd strøk når intet annet er skiltet?",
      "What speed limit applies in a built-up area when nothing else is signed?",
      "Какое ограничение скорости в населённом пункте, если нет других знаков?",
    ],
    o: ["30 km/t", "50 km/t", "60 km/t", "70 km/t"],
    a: 1,
    e: [
      "Utgangspunktet er 50 km/t i tettbygd strøk.",
      "The default is 50 km/h in built-up areas.",
      "По умолчанию в населённом пункте 50 км/ч.",
    ],
  },
  {
    t: "speed",
    q: [
      "Hva er den generelle fartsgrensen utenfor tettbygd strøk?",
      "What is the general speed limit outside built-up areas?",
      "Какова общая скорость вне населённых пунктов?",
    ],
    o: ["60 km/t", "70 km/t", "80 km/t", "90 km/t"],
    a: 2,
    e: [
      "Generelt 80 km/t når det ikke er skiltet annet.",
      "Generally 80 km/h unless signed otherwise.",
      "Обычно 80 км/ч, если нет других знаков.",
    ],
  },
  {
    t: "prio",
    q: [
      "Hvem har forkjørsrett i et kryss uten skilt og vikelinjer?",
      "Who has priority at an unsigned junction with no give-way lines?",
      "Кто имеет преимущество на перекрёстке без знаков и разметки?",
    ],
    o: [
      [
        "Jeg har vikeplikt for kjøretøy fra høyre",
        "I must yield to vehicles from the right",
        "Я уступаю транспорту справа",
      ],
      [
        "Jeg har vikeplikt for kjøretøy fra venstre",
        "I must yield to vehicles from the left",
        "Я уступаю транспорту слева",
      ],
      ["Den som kjører raskest", "The fastest driver", "Кто едет быстрее"],
      ["Den som kommer først", "Whoever arrives first", "Кто приехал первым"],
    ],
    a: 0,
    e: [
      "Høyreregelen: gi vei for kjøretøy fra høyre.",
      "Right-hand rule: give way to vehicles from the right.",
      "Правило правой руки: уступайте транспорту справа.",
    ],
  },
  {
    t: "prio",
    q: [
      "Hva betyr gult lys i trafikklyset?",
      "What does a yellow traffic light mean?",
      "Что означает жёлтый сигнал светофора?",
    ],
    o: [
      [
        "Kjør videre i samme fart",
        "Keep driving at the same speed",
        "Ехать дальше с той же скоростью",
      ],
      [
        "Stans hvis du kan gjøre det trygt",
        "Stop if you can do so safely",
        "Остановиться, если это безопасно",
      ],
      ["Øk farten", "Speed up", "Ускориться"],
      ["Vikeplikt for gående", "Yield to pedestrians", "Уступить пешеходам"],
    ],
    a: 1,
    e: [
      "Gult betyr at du skal stanse hvis det er trygt.",
      "Yellow means stop if it is safe to do so.",
      "Жёлтый: остановитесь, если это безопасно.",
    ],
  },
  {
    t: "safe",
    q: [
      "Hvem skal bruke bilbelte?",
      "Who must wear a seat belt?",
      "Кто должен быть пристёгнут?",
    ],
    o: [
      ["Bare føreren", "Only the driver", "Только водитель"],
      ["Bare de foran", "Only those in front", "Только сидящие впереди"],
      ["Alle i bilen", "Everyone in the car", "Все в машине"],
      ["Bare på motorvei", "Only on motorways", "Только на трассе"],
    ],
    a: 2,
    e: [
      "Alle som har tilgjengelig belte skal bruke det.",
      "Everyone with a belt available must use it.",
      "Пристёгиваются все, у кого есть ремень.",
    ],
  },
  {
    t: "safe",
    q: [
      "Hvor høyt må et barn være for å sitte uten barnesikringsutstyr?",
      "How tall must a child be to ride without a child restraint?",
      "Какого роста должен быть ребёнок, чтобы ехать без детского удерживающего устройства?",
    ],
    o: ["100 cm", "120 cm", "135 cm", "150 cm"],
    a: 2,
    e: [
      "Barn under 135 cm skal ha barnesikringsutstyr.",
      "Children under 135 cm need a child restraint.",
      "Дети ниже 135 см ездят в детском кресле или бустере.",
    ],
  },
  {
    t: "safe",
    q: [
      "Kan du holde mobilen i hånden mens du kjører?",
      "May you hold a phone in your hand while driving?",
      "Можно ли держать телефон в руке за рулём?",
    ],
    o: [
      [
        "Ja, hvis jeg kjører sakte",
        "Yes, if I drive slowly",
        "Да, если еду медленно",
      ],
      [
        "Ja, hvis jeg bare leser meldinger",
        "Yes, if I am only reading messages",
        "Да, если только читаю сообщения",
      ],
      ["Nei, det er forbudt", "No, it is prohibited", "Нет, это запрещено"],
      [
        "Ja, ved korte samtaler",
        "Yes, for short calls",
        "Да, для коротких звонков",
      ],
    ],
    a: 2,
    e: [
      "Det er forbudt å holde mobil i hånden under kjøring.",
      "Holding a phone while driving is prohibited.",
      "Держать телефон в руке при вождении запрещено.",
    ],
  },
  {
    t: "safe",
    q: [
      "Når må du bruke kjørelys eller nærlys?",
      "When must you use daytime running lights or dipped headlights?",
      "Когда нужно включать ходовые огни или ближний свет?",
    ],
    o: [
      ["Bare i mørket", "Only in the dark", "Только в темноте"],
      ["Bare om vinteren", "Only in winter", "Только зимой"],
      ["Hele døgnet", "Around the clock", "Круглосуточно"],
      [
        "Bare utenfor tettbygd strøk",
        "Only outside built-up areas",
        "Только вне населённых пунктов",
      ],
    ],
    a: 2,
    e: [
      "Lys er påbudt hele døgnet når bilen er i bevegelse.",
      "Lights are required around the clock while driving.",
      "Свет обязателен круглосуточно во время движения.",
    ],
  },
  {
    t: "safe",
    q: [
      "Hva er minste lovlige mønsterdybde på sommerdekk?",
      "What is the minimum legal tread depth on summer tyres?",
      "Какова минимальная глубина протектора на летних шинах?",
    ],
    o: ["0,8 mm", "1,6 mm", "3 mm", "4 mm"],
    a: 1,
    e: ["Minimum er 1,6 mm.", "The minimum is 1.6 mm.", "Минимум 1,6 мм."],
  },
  {
    t: "rule",
    q: [
      "Hva er promillegrensen for bilførere i Norge?",
      "What is the blood alcohol limit for drivers in Norway?",
      "Какой предел алкоголя в крови для водителей в Норвегии?",
    ],
    o: ["0,0 promille", "0,2 promille", "0,5 promille", "0,8 promille"],
    a: 1,
    e: [
      "Grensen er 0,2 promille.",
      "The limit is 0.2 per mille.",
      "Предел 0,2 промилле.",
    ],
  },
  {
    t: "rule",
    q: [
      "Hvor nær et kryss er det forbudt å parkere?",
      "How close to a junction is parking prohibited?",
      "Как близко к перекрёстку запрещена парковка?",
    ],
    o: ["2 meter", "5 meter", "10 meter", "20 meter"],
    a: 1,
    e: [
      "Parkering er forbudt innenfor 5 meter fra krysset.",
      "Parking is prohibited within 5 metres of a junction.",
      "Парковка запрещена ближе 5 м от перекрёстка.",
    ],
  },
  sg(0),
  sg(1),
  sg(2),
  sg(3),
  sg(4),
];
NM.push(
  ["Parkering forbudt", "No parking", "Парковка запрещена"],
  ["Stans forbudt", "No stopping", "Остановка запрещена"],
);
SVG.push(
  '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#1f5fb4" stroke="#d00" stroke-width="9"/><line x1="24" y1="76" x2="76" y2="24" stroke="#d00" stroke-width="9"/></svg>',
  '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#1f5fb4" stroke="#d00" stroke-width="9"/><line x1="24" y1="76" x2="76" y2="24" stroke="#d00" stroke-width="9"/><line x1="24" y1="24" x2="76" y2="76" stroke="#d00" stroke-width="9"/></svg>',
);
function Q(t, q, o, a, e) {
  D.push({ t: t, q: q, o: o, a: a, e: e });
}
Q(
  "prio",
  [
    "Hvem har forkjørsrett når du skal kjøre inn i en rundkjøring?",
    "Who has priority when you enter a roundabout?",
    "Кто имеет преимущество, когда вы въезжаете на круг?",
  ],
  [
    [
      "Kjøretøy som allerede er i rundkjøringen",
      "Vehicles already in the roundabout",
      "Транспорт, уже движущийся по кругу",
    ],
    [
      "Den som skal inn i rundkjøringen",
      "Those entering the roundabout",
      "Въезжающие на круг",
    ],
    ["Den største bilen", "The largest vehicle", "Самая большая машина"],
    [
      "Kjøretøy fra høyre utenfor rundkjøringen",
      "Vehicles from the right outside it",
      "Транспорт справа вне круга",
    ],
  ],
  0,
  [
    "Du må vike for kjøretøy som allerede er i rundkjøringen.",
    "You must give way to vehicles already in the roundabout.",
    "Уступайте транспорту, который уже едет по кругу.",
  ],
);
Q(
  "prio",
  [
    "Hva skal du gjøre når en fotgjenger skal krysse i et gangfelt?",
    "What must you do when a pedestrian is about to cross at a pedestrian crossing?",
    "Что нужно сделать, когда пешеход собирается перейти по переходу?",
  ],
  [
    [
      "Stanse og la fotgjengeren gå",
      "Stop and let the pedestrian cross",
      "Остановиться и пропустить пешехода",
    ],
    ["Blinke og kjøre forbi", "Flash and drive past", "Мигнуть и проехать"],
    ["Øke farten", "Speed up", "Ускориться"],
    [
      "Tute og kjøre videre",
      "Honk and keep going",
      "Посигналить и ехать дальше",
    ],
  ],
  0,
  [
    "Du skal redusere farten og stanse for fotgjengere i eller på vei inn i gangfeltet.",
    "You must slow down and stop for pedestrians in or entering the crossing.",
    "Нужно снизить скорость и остановиться для пешеходов на переходе или входящих на него.",
  ],
);
Q(
  "prio",
  [
    "Hva må du gjøre ved et stoppskilt?",
    "What must you do at a stop sign?",
    "Что нужно сделать у знака «Стоп»?",
  ],
  [
    [
      "Stanse helt og gi vikeplikt",
      "Stop completely and give way",
      "Полностью остановиться и уступить дорогу",
    ],
    [
      "Senke farten og kjøre videre",
      "Slow down and continue",
      "Снизить скорость и ехать дальше",
    ],
    [
      "Stanse bare hvis det kommer biler",
      "Stop only if cars are coming",
      "Остановиться, только если есть машины",
    ],
    ["Blinke og kjøre", "Flash and go", "Мигнуть и ехать"],
  ],
  0,
  [
    "Stoppskilt betyr at du skal stanse helt og gi vikeplikt.",
    "A stop sign means you must stop completely and give way.",
    "Знак «Стоп» требует полностью остановиться и уступить дорогу.",
  ],
);
Q(
  "prio",
  [
    "Hva betyr rødt lys i trafikklyset?",
    "What does a red traffic light mean?",
    "Что означает красный сигнал светофора?",
  ],
  [
    ["Stans", "Stop", "Стоп"],
    ["Kjør forsiktig", "Proceed with care", "Ехать осторожно"],
    [
      "Kjør hvis det er fritt",
      "Go if the road is clear",
      "Ехать, если свободно",
    ],
    ["Sakk farten", "Slow down", "Снизить скорость"],
  ],
  0,
  [
    "Rødt lys betyr at du skal stanse.",
    "Red means you must stop.",
    "Красный означает: остановитесь.",
  ],
);
Q(
  "prio",
  [
    "Et utrykningskjøretøy med blålys og sirene kommer bakfra. Hva gjør du?",
    "An emergency vehicle with blue lights and siren approaches from behind. What do you do?",
    "Сзади приближается спецавтомобиль с мигалкой и сиреной. Ваши действия?",
  ],
  [
    [
      "Gir plass og stanser om nødvendig",
      "Make room and stop if necessary",
      "Уступаю дорогу, при необходимости останавливаюсь",
    ],
    ["Øker farten", "Speed up", "Увеличиваю скорость"],
    [
      "Holder samme fart og posisjon",
      "Keep speed and position",
      "Не меняю скорость и положение",
    ],
    [
      "Stanser midt i veien",
      "Stop in the middle of the road",
      "Останавливаюсь посреди дороги",
    ],
  ],
  0,
  [
    "Du skal gi fri vei og om nødvendig stanse.",
    "You must give way and stop if necessary.",
    "Нужно освободить дорогу и при необходимости остановиться.",
  ],
);
Q(
  "prio",
  [
    "Du skal svinge til venstre i et kryss. Møtende trafikk skal rett frem. Hvem har vikeplikt?",
    "You are turning left at a junction and oncoming traffic goes straight. Who must give way?",
    "Вы поворачиваете налево, встречный транспорт едет прямо. Кто должен уступить?",
  ],
  [
    [
      "Jeg, som svinger til venstre",
      "I, turning left",
      "Я, поворачивающий налево",
    ],
    ["Den møtende trafikken", "The oncoming traffic", "Встречный транспорт"],
    ["Den som kjører raskest", "The fastest driver", "Кто едет быстрее"],
    ["Ingen har vikeplikt", "Nobody", "Никто"],
  ],
  0,
  [
    "Den som svinger til venstre har vikeplikt for møtende trafikk.",
    "A driver turning left must give way to oncoming traffic.",
    "Поворачивающий налево уступает встречному транспорту.",
  ],
);
Q(
  "speed",
  [
    "Hva skjer med bremselengden når farten dobles?",
    "What happens to the braking distance when speed doubles?",
    "Что происходит с тормозным путём при удвоении скорости?",
  ],
  [
    ["Den dobles", "It doubles", "Удваивается"],
    [
      "Den blir omtrent firedoblet",
      "It becomes about four times longer",
      "Становится примерно в четыре раза длиннее",
    ],
    ["Den er uændret", "It is unchanged", "Не меняется"],
    ["Den halveres", "It is halved", "Уменьшается вдвое"],
  ],
  1,
  [
    "Dobbel fart gir omtrent fire ganger så lang bremselengde.",
    "Double the speed means about four times the braking distance.",
    "Двойная скорость даёт примерно в четыре раза больший тормозной путь.",
  ],
);
Q(
  "speed",
  [
    "Omtrent hvor langt kjører du på ett sekund i 80 km/t?",
    "About how far do you travel in one second at 80 km/h?",
    "Сколько примерно вы проезжаете за секунду на скорости 80 км/ч?",
  ],
  ["ca. 8 m", "ca. 22 m", "ca. 50 m", "ca. 80 m"],
  1,
  [
    "80 km/t er omtrent 22 meter i sekundet.",
    "80 km/h is about 22 metres per second.",
    "80 км/ч — это около 22 метров в секунду.",
  ],
);
Q(
  "speed",
  [
    "Hvordan skal du tilpasse farten ved dårlig sikt?",
    "How should you adjust your speed in poor visibility?",
    "Как нужно выбирать скорость при плохой видимости?",
  ],
  [
    [
      "Slik at jeg kan stanse på strekningen jeg ser er fri",
      "So I can stop within the distance I can see is clear",
      "Чтобы успеть остановиться на видимом свободном участке",
    ],
    [
      "Følge fartsgrensen uansett",
      "Follow the speed limit regardless",
      "Держать разрешённую скорость при любых условиях",
    ],
    [
      "Kjøre tett på bilen foran",
      "Drive close behind the car ahead",
      "Ехать вплотную за машиной впереди",
    ],
    [
      "Bruke full lysstyrke og øke farten",
      "Use full beam and speed up",
      "Включить дальний свет и ускориться",
    ],
  ],
  0,
  [
    "Farten må alltid tilpasses sikt og føre.",
    "Speed must always suit visibility and conditions.",
    "Скорость всегда должна соответствовать видимости и условиям.",
  ],
);
Q(
  "safe",
  [
    "Kan du ha et bakovervendt barnesete foran hvis passasjerairbagen er på?",
    "May you use a rear-facing child seat in front if the passenger airbag is on?",
    "Можно ли ставить кресло против хода движения спереди при включённой подушке безопасности?",
  ],
  [
    [
      "Nei, airbagen må være slått av",
      "No, the airbag must be switched off",
      "Нет, подушку нужно отключить",
    ],
    ["Ja, alltid", "Yes, always", "Да, всегда"],
    [
      "Ja, hvis barnet er over 3 år",
      "Yes, if the child is over 3",
      "Да, если ребёнку больше 3 лет",
    ],
    [
      "Ja, med ekstra belte",
      "Yes, with an extra belt",
      "Да, с дополнительным ремнём",
    ],
  ],
  0,
  [
    "Airbagen kan skade barnet alvorlig og må være avslått.",
    "The airbag can seriously injure the child and must be off.",
    "Подушка может серьёзно травмировать ребёнка, её нужно отключить.",
  ],
);
Q(
  "safe",
  [
    "Du merker at du blir trett under kjøring. Hva bør du gjøre?",
    "You feel tired while driving. What should you do?",
    "Вы чувствуете усталость за рулём. Что делать?",
  ],
  [
    ["Stoppe og hvile", "Stop and rest", "Остановиться и отдохнуть"],
    [
      "Åpne vinduet og kjøre videre",
      "Open the window and keep driving",
      "Открыть окно и ехать дальше",
    ],
    ["Skru opp musikken", "Turn up the music", "Сделать музыку громче"],
    [
      "Øke farten for å komme fram",
      "Speed up to arrive sooner",
      "Ускориться, чтобы быстрее доехать",
    ],
  ],
  0,
  [
    "Trøtthet øker ulykkesrisikoen. Stopp og hvil.",
    "Tiredness raises crash risk. Stop and rest.",
    "Усталость повышает риск аварии. Остановитесь и отдохните.",
  ],
);
Q(
  "safe",
  [
    "Legen har skrevet ut ny medisin. Hva bør du gjøre før du kjører?",
    "Your doctor prescribed a new medicine. What should you do before driving?",
    "Врач выписал новое лекарство. Что сделать перед поездкой?",
  ],
  [
    [
      "Sjekke om medisinen påvirker kjøreevnen",
      "Check whether it affects driving ability",
      "Проверить, влияет ли оно на способность водить",
    ],
    ["Kjøre som vanlig", "Drive as usual", "Ехать как обычно"],
    ["Ta dobbel dose", "Take a double dose", "Принять двойную дозу"],
    ["Drikke kaffe", "Drink coffee", "Выпить кофе"],
  ],
  0,
  [
    "Mange medisiner kan svekke reaksjonsevnen. Les pakningsvedlegget og spør legen.",
    "Many medicines reduce reaction time. Read the leaflet and ask your doctor.",
    "Многие лекарства снижают реакцию. Прочитайте инструкцию и спросите врача.",
  ],
);
Q(
  "safe",
  [
    "Hva er minste mønsterdybde på vinterdekk?",
    "What is the minimum tread depth on winter tyres?",
    "Какова минимальная глубина протектора зимних шин?",
  ],
  ["1,6 mm", "3 mm", "4,5 mm", "6 mm"],
  1,
  [
    "Vinterdekk skal ha minst 3 mm mønsterdybde.",
    "Winter tyres need at least 3 mm of tread.",
    "У зимних шин протектор должен быть не менее 3 мм.",
  ],
);
Q(
  "safe",
  [
    "Hvor stor avstand bør du holde til bilen foran i god sikt?",
    "What distance should you keep to the car ahead in good conditions?",
    "Какую дистанцию до машины впереди нужно держать при хорошей видимости?",
  ],
  [
    ["Minst 3 sekunder", "At least 3 seconds", "Не менее 3 секунд"],
    ["Ca. 1 sekund", "About 1 second", "Около 1 секунды"],
    ["Så tett som mulig", "As close as possible", "Как можно ближе"],
    ["Én billængde", "One car length", "Одну длину машины"],
  ],
  0,
  [
    "Hold minst tre sekunders avstand. Øk den ved dårlig føre.",
    "Keep at least three seconds. Increase it in poor conditions.",
    "Держите не менее трёх секунд. При плохих условиях — больше.",
  ],
);
Q(
  "safe",
  [
    "Når kan du bruke tåkelys foran?",
    "When may you use front fog lights?",
    "Когда можно включать передние противотуманные фары?",
  ],
  [
    [
      "Ved nedsatt sikt på grunn av tåke eller snø",
      "When visibility is reduced by fog or snow",
      "При плохой видимости из-за тумана или снега",
    ],
    ["Alltid i mørket", "Always in the dark", "Всегда в темноте"],
    ["I tunnel", "In tunnels", "В тоннелях"],
    [
      "Når jeg vil bli sett",
      "Whenever I want to be seen",
      "Когда хочу, чтобы меня заметили",
    ],
  ],
  0,
  [
    "Tåkelys skal kun brukes når sikten er dårlig.",
    "Fog lights are only for poor visibility.",
    "Противотуманные фары используют только при плохой видимости.",
  ],
);
Q(
  "safe",
  [
    "Må du ha varseltrekant i bilen?",
    "Must you carry a warning triangle in the car?",
    "Обязательно ли возить в машине знак аварийной остановки?",
  ],
  [
    ["Ja, den er påbudt", "Yes, it is required", "Да, он обязателен"],
    ["Nei, det er frivillig", "No, it is optional", "Нет, это необязательно"],
    ["Bare om vinteren", "Only in winter", "Только зимой"],
    ["Bare på motorvei", "Only on motorways", "Только на трассе"],
  ],
  0,
  [
    "Varseltrekant er påbudt utstyr.",
    "A warning triangle is mandatory equipment.",
    "Знак аварийной остановки — обязательное оборудование.",
  ],
);
Q(
  "safe",
  [
    "Hvilket nødnummer ringer du for ambulanse?",
    "Which emergency number do you call for an ambulance?",
    "По какому номеру вызывать скорую помощь?",
  ],
  ["110", "112", "113", "115"],
  2,
  [
    "113 er medisinsk nødhjelp, 112 politi og 110 brann.",
    "113 is medical emergency, 112 police and 110 fire.",
    "113 — скорая помощь, 112 — полиция, 110 — пожарные.",
  ],
);
Q(
  "safe",
  [
    "Du kommer til en trafikkulykke. Hva er det første du gjør?",
    "You arrive at a traffic accident. What do you do first?",
    "Вы приехали на место аварии. Что делать в первую очередь?",
  ],
  [
    [
      "Sikre stedet og varsle nødetatene",
      "Secure the scene and alert emergency services",
      "Обезопасить место и вызвать службы",
    ],
    ["Kjøre videre", "Drive on", "Ехать дальше"],
    [
      "Flytte alle skadde",
      "Move everyone injured",
      "Переместить всех пострадавших",
    ],
    ["Ta bilder", "Take photos", "Сделать фото"],
  ],
  0,
  [
    "Sikre stedet, varsle og hjelp de skadde.",
    "Secure the scene, call for help and assist the injured.",
    "Обезопасьте место, вызовите помощь и помогите пострадавшим.",
  ],
);
Q(
  "safe",
  [
    "Kan alkohol under promillegrensen påvirke kjøreevnen?",
    "Can alcohol below the legal limit affect driving ability?",
    "Может ли алкоголь ниже допустимого предела влиять на вождение?",
  ],
  [
    [
      "Ja, selv små mengder kan svekke",
      "Yes, even small amounts can impair",
      "Да, даже небольшие дозы могут ухудшить",
    ],
    ["Nei, aldri", "No, never", "Нет, никогда"],
    [
      "Bare ved over 1,0 promille",
      "Only above 1.0 per mille",
      "Только выше 1,0 промилле",
    ],
    ["Bare om natten", "Only at night", "Только ночью"],
  ],
  0,
  [
    "Alkohol svekker dømmekraft og reaksjonsevne, også under grensen.",
    "Alcohol impairs judgement and reaction even under the limit.",
    "Алкоголь ухудшает суждение и реакцию даже ниже предела.",
  ],
);
Q(
  "rule",
  [
    "Når er det forbudt å kjøre forbi?",
    "When is overtaking prohibited?",
    "Когда обгон запрещён?",
  ],
  [
    [
      "Når jeg ikke har fri sikt",
      "When I do not have clear visibility",
      "Когда нет свободного обзора",
    ],
    ["Når det regner", "When it rains", "Когда идёт дождь"],
    [
      "Når jeg kjører over 50 km/t",
      "When driving over 50 km/h",
      "Когда скорость выше 50 км/ч",
    ],
    ["Aldri", "Never", "Никогда"],
  ],
  0,
  [
    "Du må ikke kjøre forbi uten fri sikt, for eksempel i svinger og bakketopper.",
    "Do not overtake without clear visibility, such as at bends and crests.",
    "Нельзя обгонять без свободного обзора, например на поворотах и перевалах.",
  ],
);
Q(
  "rule",
  [
    "Hvem kan bruke kollektivfeltet?",
    "Who may use the bus lane?",
    "Кто может использовать полосу общественного транспорта?",
  ],
  [
    [
      "Kjøretøy som skiltene tillater, som buss",
      "Vehicles allowed by the signs, such as buses",
      "Транспорт, разрешённый знаками, например автобусы",
    ],
    ["Alle biler", "All cars", "Все автомобили"],
    ["Bare syklister", "Cyclists only", "Только велосипедисты"],
    ["Bare drosjer", "Taxis only", "Только такси"],
  ],
  0,
  [
    "Kollektivfelt er forbeholdt kjøretøy som skiltene viser.",
    "Bus lanes are reserved for vehicles shown on the signs.",
    "Полоса выделена для транспорта, указанного на знаках.",
  ],
);
Q(
  "rule",
  [
    "Du parkerer nedover en bakke. Hva gjør du?",
    "You park downhill. What do you do?",
    "Вы паркуетесь на спуске. Что делаете?",
  ],
  [
    [
      "Setter bilen i gir, trekker håndbremsen og vrir hjulene mot fortauet",
      "Select gear, apply the handbrake and turn the wheels towards the kerb",
      "Включаю передачу, ставлю на ручник и поворачиваю колёса к бордюру",
    ],
    [
      "Bare trekker håndbremsen",
      "Only apply the handbrake",
      "Только ставлю на ручник",
    ],
    ["Lar bilen stå i fri", "Leave it in neutral", "Оставляю на нейтрали"],
    [
      "Vrir hjulene ut mot veien",
      "Turn the wheels towards the road",
      "Поворачиваю колёса к дороге",
    ],
  ],
  0,
  [
    "Slik ruller ikke bilen ut i veien.",
    "This stops the car rolling into the road.",
    "Так машина не покатится на дорогу.",
  ],
);
Q(
  "rule",
  [
    "Når skal du gi tegn med blinklys?",
    "When must you use your indicator?",
    "Когда нужно включать указатель поворота?",
  ],
  [
    [
      "Før du svinger eller skifter felt, i god tid",
      "Before turning or changing lane, in good time",
      "Перед поворотом или перестроением заранее",
    ],
    ["Etter at du har svingt", "After turning", "После поворота"],
    ["Bare i kryss", "Only at junctions", "Только на перекрёстках"],
    [
      "Aldri på landevei",
      "Never on country roads",
      "Никогда на загородных дорогах",
    ],
  ],
  0,
  [
    "Gi tegn tidlig så andre forstår hva du skal gjøre.",
    "Signal early so others understand your intention.",
    "Сигнализируйте заранее, чтобы другие поняли ваши намерения.",
  ],
);
Q(
  "rule",
  [
    "Hvordan kjører du mest miljøvennlig?",
    "What is the most environmentally friendly way to drive?",
    "Как ехать наиболее экологично?",
  ],
  [
    [
      "Jevn fart og forutseende kjøring",
      "Steady speed and anticipation",
      "Ровная скорость и предвидение ситуации",
    ],
    [
      "Mange kraftige akselerasjoner",
      "Frequent hard acceleration",
      "Частые резкие ускорения",
    ],
    [
      "Høy fart på motorvei",
      "High speed on motorways",
      "Высокая скорость на трассе",
    ],
    [
      "Tomgang ved stopp",
      "Idling when stopped",
      "Работа двигателя на холостом ходу",
    ],
  ],
  0,
  [
    "Rolig og forutseende kjøring sparer drivstoff og miljø.",
    "Calm, anticipatory driving saves fuel and the environment.",
    "Спокойная, предусмотрительная езда экономит топливо и бережёт природу.",
  ],
);
Q(
  "rule",
  [
    "Bilen begynner å aquaplane. Hva gjør du?",
    "The car starts to aquaplane. What do you do?",
    "Машина начинает аквапланировать. Что делаете?",
  ],
  [
    [
      "Tar av gassen og holder rattet rolig",
      "Ease off the accelerator and hold the wheel steady",
      "Убираю газ и ровно держу руль",
    ],
    ["Bremser hardt", "Brake hard", "Резко торможу"],
    ["Svinger kraftig", "Steer sharply", "Резко поворачиваю руль"],
    ["Gir full gass", "Accelerate fully", "Даю полный газ"],
  ],
  0,
  [
    "Unngå brå bevegelser til dekkene får feste igjen.",
    "Avoid sudden moves until the tyres grip again.",
    "Избегайте резких движений, пока шины не вернут сцепление.",
  ],
);
Q(
  "rule",
  [
    "Hvordan bør du bremse på isete vei?",
    "How should you brake on an icy road?",
    "Как тормозить на обледенелой дороге?",
  ],
  [
    [
      "Tidlig, forsiktig og jevnt",
      "Early, gently and smoothly",
      "Заранее, мягко и плавно",
    ],
    ["Brått og hardt", "Suddenly and hard", "Резко и сильно"],
    ["Ikke bremse i det hele tatt", "Not at all", "Не тормозить вообще"],
    ["Bruke håndbremsen", "Use the handbrake", "Использовать ручник"],
  ],
  0,
  [
    "Brå bremsing kan gi skrens.",
    "Sudden braking can cause a skid.",
    "Резкое торможение может привести к заносу.",
  ],
);
Q(
  "rule",
  [
    "Hva betyr en heltrukket gul midtlinje?",
    "What does a solid yellow centre line mean?",
    "Что означает сплошная жёлтая осевая линия?",
  ],
  [
    [
      "Du må ikke kjøre over linjen",
      "You must not cross the line",
      "Нельзя пересекать линию",
    ],
    [
      "Du kan alltid kjøre forbi",
      "You may always overtake",
      "Всегда можно обгонять",
    ],
    ["Parkering er tillatt", "Parking is allowed", "Парковка разрешена"],
    [
      "Veien er enveiskjørt",
      "The road is one-way",
      "Дорога с односторонним движением",
    ],
  ],
  0,
  [
    "Heltrukket midtlinje skal ikke krysses.",
    "A solid centre line must not be crossed.",
    "Сплошную осевую пересекать нельзя.",
  ],
);
D.push(sg(5), sg(6));
D.forEach(function (x, i) {
  x.id = i;
});
var lang = null,
  showTr = true,
  S = null,
  tm = null,
  app = document.getElementById("app"),
  sub = document.getElementById("sub");
var TI = { speed: "🏎️", prio: "🚦", sign: "🛑", safe: "🛡️", rule: "📜" },
  FL = { no: "🇳🇴", en: "🇬🇧", ru: "🇷🇺" };
function u(k) {
  return UI[lang][k];
}
function tx(x, l) {
  return Array.isArray(x) ? x[l] : x;
}
function esc(s) {
  return String(s).replace(/[&<>]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
  });
}
function shuffle(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)),
      t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}
function sv() {
  try {
    return JSON.parse(localStorage.getItem("tp2")) || {};
  } catch (e) {
    return {};
  }
}
function put(o) {
  try {
    localStorage.setItem("tp2", JSON.stringify(o));
  } catch (e) {}
}
function stop() {
  if (tm) {
    clearInterval(tm);
    tm = null;
  }
}
function pickLang() {
  stop();
  S = null;
  hb(false);
  document.documentElement.setAttribute("dir", "ltr");
  sub.textContent = "Velg språk · Choose language · Выберите язык";
  var h = "";
  Object.keys(LN).forEach(function (k) {
    h +=
      '<button class="opt mi" data-l="' +
      k +
      '"><span class="ic">' +
      FL[k] +
      "</span><span><b>" +
      LN[k] +
      "</b>" +
      (k === "no" ? "<small>standard · default · по умолчанию</small>" : "") +
      "</span></button>";
  });
  app.innerHTML = h;
  Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (b) {
    b.onclick = function () {
      lang = b.dataset.l;
      menu();
    };
  });
}
function menu() {
  stop();
  S = null;
  hb(false);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  sub.textContent = u("sub");
  var d = sv(),
    miss = (d.missed || []).length,
    h = "";
  h +=
    '<button class="opt mi" id="m1"><span class="ic">📖</span><span><b>' +
    u("prac") +
    "</b><small>" +
    u("pracD") +
    "</small></span></button>";
  h +=
    '<button class="opt mi" id="m2"><span class="ic">📝</span><span><b>' +
    u("exam") +
    "</b><small>" +
    u("examD") +
    "</small></span></button>";
  h +=
    '<button class="opt mi" id="m3"><span class="ic">🎯</span><span><b>' +
    u("mist") +
    " (" +
    miss +
    ")</b><small>" +
    u("mistD") +
    "</small></span></button>";
  h +=
    '<button class="opt mi" id="m4"><span class="ic">📚</span><span><b>' +
    VUI[lang][0] +
    "</b><small>" +
    VUI[lang][1] +
    "</small></span></button>";
  h += "<h3>" + u("topic") + "</h3><div>";
  Object.keys(T).forEach(function (k) {
    h +=
      '<button class="chip" data-t="' +
      k +
      '">' +
      TI[k] +
      " " +
      tn(k, lang) +
      "</button>";
  });
  h += "</div>";
  if (d.best != null)
    h +=
      '<p class="tr" style="margin-top:12px">' +
      u("best") +
      ": " +
      d.best +
      " / " +
      D.length +
      "</p>";
  h +=
    '<p class="tr"><a id="lg">' +
    u("lang") +
    '</a></p><p class="tr" style="font-size:.8rem">' +
    u("note") +
    "</p>";
  app.innerHTML = h;
  document.getElementById("m1").onclick = function () {
    begin(D, false);
  };
  document.getElementById("m2").onclick = function () {
    begin(shuffle(D).slice(0, 45), true);
  };
  document.getElementById("m3").onclick = function () {
    var m = sv().missed || [];
    var l = D.filter(function (x) {
      return m.indexOf(x.id) > -1;
    });
    if (!l.length) {
      alert(u("none"));
      return;
    }
    begin(l, false);
  };
  document.getElementById("lg").onclick = pickLang;
  document.getElementById("m4").onclick = vocab;
  Array.prototype.forEach.call(app.querySelectorAll(".chip"), function (b) {
    b.onclick = function () {
      begin(
        D.filter(function (x) {
          return x.t === b.dataset.t;
        }),
        false,
      );
    };
  });
}
function fmt(s) {
  var m = Math.floor(s / 60),
    r = s % 60;
  return m + ":" + (r < 10 ? "0" : "") + r;
}
var BK = { no: "Tilbake", en: "Back", ru: "Назад" },
  SK = { no: "Ikke besvart", en: "Not answered", ru: "Без ответа" },
  EX = { no: "Forklaring", en: "Explanation", ru: "Объяснение" };
function begin(list, exam) {
  stop();
  S = { list: shuffle(list), i: 0, exam: exam, left: 5400, ans: [], perms: [] };
  if (exam) {
    tm = setInterval(function () {
      S.left--;
      var e = document.getElementById("tm");
      if (e) e.textContent = fmt(S.left);
      if (S.left <= 0) finish();
    }, 1000);
  }
  showQ();
}
function go(d) {
  S.i = Math.max(0, Math.min(S.list.length - 1, S.i + d));
  showQ();
}
function showQ() {
  var q = S.list[S.i],
    L = lang,
    c = qt(q, L),
    nq = qt(q, "no"),
    sn = L !== "no" && showNo,
    n = S.list.length,
    a = S.ans[S.i],
    done = a !== undefined && !S.exam,
    last = S.i === n - 1,
    rt = L === "ar",
    sc = 0,
    h = "";
  S.list.forEach(function (x, i) {
    if (S.ans[i] === x.a) sc++;
  });
  if (!S.perms[S.i]) S.perms[S.i] = shuffle([0, 1, 2, 3]);
  h +=
    '<div class="bar"><i style="width:' +
    ((S.i + 1) / n) * 100 +
    '%"></i></div><div class="meta"><span>' +
    u("q") +
    " " +
    (S.i + 1) +
    " / " +
    n +
    " · " +
    tn(q.t, L) +
    "</span><span>" +
    (S.exam
      ? u("time") + ': <b id="tm">' + fmt(S.left) + "</b>"
      : u("ok").replace(". ", "") + ": " + sc) +
    '</span></div><div class="qn">';
  S.list.forEach(function (x, i) {
    var k = "qb",
      v = S.ans[i];
    if (v !== undefined) k += S.exam ? " a" : v === x.a ? " c" : " w";
    if (i === S.i) k += " cur";
    h +=
      '<button class="' + k + '" data-k="' + i + '">' + (i + 1) + "</button>";
  });
  h += "</div>";
  if (q.s) h += '<div class="sign">' + q.s + "</div>";
  h +=
    '<p class="q">' +
    (L === "no" ? hl(c.q) : esc(c.q)) +
    "</p>" +
    (c.fb ? '<p class="tr">🌐 English</p>' : "") +
    (sn ? '<p class="tr nq" dir="ltr">' + hl(nq.q) + "</p>" : "") +
    (L === "no" || sn
      ? '<p class="tr" style="font-size:.78rem;margin:0 0 8px">👆 ' +
        MY[L][3] +
        "</p>"
      : "");
  S.perms[S.i].forEach(function (p) {
    var k = "opt";
    if (done) {
      if (p === q.a) k += " ok";
      else if (p === a) k += " bad";
    } else if (S.exam && p === a) k += " sel";
    h +=
      '<button class="' +
      k +
      '" data-p="' +
      p +
      '">' +
      (done && L === "no" ? hl(c.o[p]) : esc(c.o[p])) +
      (sn
        ? '<small class="nq" dir="ltr">' +
          (done ? hl(nq.o[p]) : esc(nq.o[p])) +
          "</small>"
        : "") +
      "</button>";
  });
  if (done) {
    var ok = a === q.a;
    h +=
      '<div class="exp"><b>' +
      (ok ? u("ok") : u("bad")) +
      "</b>" +
      (ok
        ? ""
        : u("yours") +
          ": " +
          esc(c.o[a]) +
          ". " +
          u("right") +
          ": <b>" +
          esc(c.o[q.a]) +
          "</b>.") +
      "<br><b>" +
      EX[L] +
      ":</b> " +
      (L === "no" ? hl(c.e) : esc(c.e)) +
      (sn ? '<br><span class="tr nq" dir="ltr">' + hl(nq.e) + "</span>" : "") +
      "</div>";
  }
  h +=
    '<div class="nav"><button class="nb" id="bk"' +
    (S.i ? "" : " disabled") +
    ">" +
    (rt ? "→ " : "← ") +
    BK[L] +
    '</button><button class="nb" id="hm" title="' +
    u("menu") +
    '">⌂</button><button class="btn" id="fw">' +
    (last ? u("fin") : u("next") + (rt ? " ←" : " →")) +
    "</button></div>";
  if (S.exam && !last)
    h +=
      '<p class="tr" style="margin:10px 0 0"><a id="sb">' +
      u("fin") +
      "</a></p>";
  if (L !== "no")
    h +=
      '<div class="row"><button class="nb' +
      (showNo ? " on" : "") +
      '" id="tg">🇳🇴 ' +
      NORL[L] +
      "</button></div>";
  app.innerHTML = h;
  wireWords();
  var tg = document.getElementById("tg");
  if (tg)
    tg.onclick = function () {
      showNo = !showNo;
      showQ();
    };
  if (!done)
    Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (b) {
      b.onclick = function () {
        answer(+b.dataset.p);
      };
    });
  Array.prototype.forEach.call(app.querySelectorAll(".qb"), function (b) {
    b.onclick = function () {
      S.i = +b.dataset.k;
      showQ();
    };
  });
  document.getElementById("bk").onclick = function () {
    go(-1);
  };
  document.getElementById("fw").onclick = function () {
    if (last) finish();
    else go(1);
  };
  document.getElementById("hm").onclick = menu;
  var sb = document.getElementById("sb");
  if (sb) sb.onclick = finish;
  hb(true);
}
function answer(p) {
  var q = S.list[S.i];
  if (!S.exam && S.ans[S.i] !== undefined) return;
  S.ans[S.i] = p;
  if (!S.exam) {
    var d = sv(),
      m = (d.missed || []).filter(function (x) {
        return x !== q.id;
      });
    if (p !== q.a) m.push(q.id);
    d.missed = m;
    put(d);
  }
  showQ();
}
function finish() {
  if (!S) return;
  var ex = S.exam,
    n = S.list.length,
    sc = 0,
    need = n === 45 ? 38 : Math.ceil(n * 0.85),
    l = LI[lang],
    h = "",
    wr = [],
    d = sv(),
    m = d.missed || [];
  stop();
  S.list.forEach(function (q, i) {
    var p = S.ans[i];
    if (p === q.a) {
      sc++;
      if (ex)
        m = m.filter(function (x) {
          return x !== q.id;
        });
    } else {
      wr.push({ q: q, p: p });
      if (ex && p !== undefined && m.indexOf(q.id) < 0) m.push(q.id);
    }
  });
  if (ex && (d.best == null || sc > d.best)) d.best = sc;
  d.missed = m;
  put(d);
  h += '<div class="big">' + sc + " / " + n + "</div>";
  if (ex)
    h +=
      "<p><b>" +
      (sc >= need ? u("pass") : u("fail")) +
      "</b> " +
      u("need") +
      ": " +
      need +
      " / " +
      n +
      "</p>";
  if (wr.length) {
    h += "<h3>" + u("wrong") + "</h3>";
    wr.forEach(function (w) {
      var q = w.q,
        c = qt(q, lang),
        nq = qt(q, "no"),
        sn = lang !== "no" && showNo;
      h +=
        '<div class="rev"><b>' +
        esc(c.q) +
        "</b>" +
        (sn ? '<div class="tr nq" dir="ltr">' + esc(nq.q) + "</div>" : "") +
        (q.s ? '<div class="sign">' + q.s + "</div>" : "") +
        "<br>" +
        u("yours") +
        ": " +
        (w.p === undefined ? SK[lang] : esc(c.o[w.p])) +
        "<br>" +
        u("right") +
        ": <b>" +
        esc(c.o[q.a]) +
        "</b>" +
        (sn
          ? ' <span class="nq" dir="ltr">(' + esc(nq.o[q.a]) + ")</span>"
          : "") +
        '<br><span class="tr">' +
        esc(c.e) +
        "</span></div>";
    });
  }
  h +=
    '<div class="row"><button class="btn" id="mn">' +
    u("menu") +
    "</button></div>";
  app.innerHTML = h;
  document.getElementById("mn").onclick = menu;
}
var TH = [
  ["hvit", "#ffffff", "Hvit"],
  ["svart", "#000000", "Svart"],
  ["krem", "#c4511e", "Krem"],
  ["skog", "#4f7a2e", "Skog"],
  ["bar", "#b8325a", "Bær"],
  ["natt", "#3a2a20", "Natt"],
  ["nordlys", "linear-gradient(135deg,#0b1a24 40%,#4be3a8)", "Nordlys"],
  ["synth", "linear-gradient(135deg,#140b2e 40%,#ff4fd8)", "Synth"],
  ["lavendel", "#6d4fd1", "Lavendel"],
  ["hav", "#0b7f93", "Hav"],
  ["solnedgang", "linear-gradient(135deg,#ff9a5a,#d6336c)", "Solnedgang"],
];
function theme(k, save) {
  document.documentElement.setAttribute("data-theme", k);
  if (save) {
    var d = sv();
    d.theme = k;
    put(d);
  }
  Array.prototype.forEach.call(document.querySelectorAll(".dot"), function (b) {
    b.classList.toggle("on", b.dataset.k === k);
  });
}
var th = document.getElementById("th"),
  hbtn = document.getElementById("hb");
hbtn.onclick = menu;
function hb(on) {
  hbtn.hidden = !on;
  if (on) hbtn.textContent = "⌂ " + u("menu");
}
var tb = document.createElement("button");
tb.className = "tgl";
tb.innerHTML =
  '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABICAMAAACa07iCAAAAwFBMVEUVFhYW41hl6uz2Gxz90ganB+ogICDSI/z6XbFGL03wbNggrvcUIVVra2v1tQH29vZXVVwzMzMfUlz93mRTEQ1p6pX8WWIx6N2N9+5Ta/EHViYEafprUwKmAQKhoaHtldsVWKGccgIEpzttAaIl2q/yMpStI2gdoZIMqVVMTExH53qyigOPlfgdOZdhU5JOqpd5j/uqfODeK2VHhXk/Pz9+AMOSeqkAAAADAgM3NjtEQ0goJyo9PEETFRXyBAb+1wVnKr5DAAAAQHRSTlPp//////+e///+////GP8H/mL///////////////8T/////////////03/////////////BP//AP7+/v7++///t9j5LQAABm1JREFUeNqdmAdX20oQhQc3rFi4gBNjmuklIfUVr1it+f//6t07syu5CDjnzeEEE2u/vVO1kixhBz2aVBack95kGe1g+YHJcjnquUbrXYwOJpMPCWQQEYqifKGNxy9mpYcWUdRk9CEDCCxdN6MUBAT+IybmTUVyQMRLWZbYWlcEj49ZlhFClv9QjPScH2e6Lwkm35uSgA9l9c3bkcEiiwS2m563YefTBPFklGUGncV7YsQEY89pewXCCnYuBvFOVAf8Go8zUTEXbzO8m67aX2AKaZsSMl4KH2D4c6yRkQaPUE/cyYkhvqzUzpUMXzQUap5iytAEMYZ356tKBW1KIZ6pzW/+6XZvchfjG9xuUIxhMv6sGBGNybkLltWbrtkNY5SVCK7sVIoyCkRD/Wi3I6RNZ8Dodj/RSHGusMp7atRhjHZCUIi4DIxMEfv7qoTSNMm9t3W0a6sYJGC9QrSStGrDUzNjVcuofcmI2FfrdjM6w9pFpCcNMXVaFjUjxjSrEPt0BlHVqHgOhqbcrtbDEXObdRMiMgoXyoLZWa8TYxTrQmKNZdsM+hKshV42/FFGprVulFimxS4DMS1RajAOLDRJb7Sug1ypivScRZltMiy3PhY+Z4yvkhx1ZBSH3ocSdC0RqiPvRoimlq647P7+ntNhLSjKwNgqM91DR1Ao6LPulHWT5ViGVX/6sLs/Qgg6sBdn0Iuu0FmobV6UWZkYaLnULlJiTkt/Aevf3UFVQebBBqPkrLCAlYkRON3zPGfvI6fejReLT6rknomGkEnlCyde4atRUWSJUXresBzFYV/n+ou+2Z0LuGiDobrc2RXsDB+KyhddTlPpAgRaiAxmutz0BdefDTu04fCMyk1Hngd1Q2Ww9vs6Cz6RwcTJKDFUxbdO5+joCIjh8EqV4JLD2WBwKVrfBb2/71cMVEsZazXqAOL1iKZKOldYpozj49lskBOi+/Qjo99nTMVcMQZq48wQr9Gd2HPj4+PWYDBAIjUriYFfcIURhC+jqMO5IRmvZmB8s94/bMHgj3rDSo5Z6WeY84Eju1fFw0mnRigkuDIxoCR36goK7V4TO0XFQRbLYbL8OzLoSoerYcqYojsSozW4hGuePQvOdCrO6h6l6jmi1xgRQciws8uwuznPBiiZAjevkxD4KxzoPZuMTmedMZRtBmL28MiuKbTgUDutB1Q0IDiE4WLGY52h8WAijDEbHEK2k9bs9pDLaM79bM0EoUadiVi4hhaI5MoVj1d1TBFhJro1m7FftWQPj1utQwdFLiij9MmZ1xhS4X6RMVBXAjaGpAetfGzaAoM9U+lgqUcIg9E5o4zIQI0xA/Cfdhu4d3B/ofpmQTM8iQxvEKv0DvvFGKgvqIAoEw8hooGSY3WFm/dGkbHWt50hx6Ux8sHgIXcW/p+JwfB9xh9Miw73yFCIzo+zqR5XjaFny1DEAGDd7BZNgNJotT4f4gu7PyRGUa7PsZoRJH48AQEheFT9Co8qDmoGKCXPXhxbNcPHLwVBbKkMV7JQvfgiIdYYlRApakYS5dwtCLNb0T4LheVXFLHG0FOf6CG3ikf+3TKEzD7c3qJK1YEfCk4q1hhonpPrPdj1STAIwpyfXiqkukdyiowX1rYyqs/JykCssf7rV6WIQpRxmltmA24SXmmy+K1q5GK5wSgV8Rm2p6YQMganp5xhJsGC8O/ihwO0RiQdTgzx1RiPwcUaOz0V9hsCEyxE2eK3hA2EMqj1eq8mwE5i3w4GcAZfX86/WyDD8289uF9sPjew9wNl1Ii9a2fzwxjOzedzDgvsn7ltRGKc7FWxSBExBn2BK7/m85w+oXD9zpld7GIy9hoZmB3ifjwrQ2dx2FLxESM3GW7+TF88g+R2ELUvW5YYOW8I8vxrfklWIyLmhTHdsGu7eeD0EpieX5QRrLRGOw+YdW437ISd560BLStOqnnRrGNbyHXqEmuuS84y/emNGh5zRSd4bJdkj/afPk5mrfTg5A1EYvCSWoWkwg76jY+j8g2EMqref7TeTwPEGDZB3kHUjDSDQj1QgzVNSIh3ntXj1OI0jQfBIt1TfXRF3kPoOwOfhvCmhXjAsGAAMXrv3YVvIPgQTypa3zwAjt5/h+LCjjm7Q1LG9vNb07ucSfO7nHST+whBBp6bJ71tkzTI/c6jaDOjycCNcuRp+T8ZsIsJjlq9xlceG/YfEiwkUKL9f5sAAAAASUVORK5CYII=">';
tb.title = "Tema";
tb.setAttribute("aria-label", "Tema");
var pp = document.createElement("div");
pp.className = "pp";
TH.forEach(function (t) {
  var b = document.createElement("button");
  b.className = "dot";
  b.dataset.k = t[0];
  b.title = t[2];
  b.setAttribute("aria-label", t[2]);
  b.style.background = t[1];
  b.onclick = function (e) {
    e.stopPropagation();
    theme(t[0], true);
    th.classList.remove("open");
  };
  pp.appendChild(b);
});
tb.onclick = function (e) {
  e.stopPropagation();
  th.classList.toggle("open");
};
document.addEventListener("click", function () {
  th.classList.remove("open");
});
th.appendChild(tb);
th.appendChild(pp);
theme(
  sv().theme ||
    (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches
      ? "natt"
      : "krem"),
  false,
);
LN.uk = "Українська";
LN.ar = "العربية";
LN.so = "Soomaali";
FL.uk = "🇺🇦";
FL.ar = "🇸🇦";
FL.so = "🇸🇴";
var NORL = {
    en: "Norwegian",
    ru: "Норвежский",
    uk: "Норвезька",
    ar: "النرويجية",
    so: "Norwiijiyaan",
  },
  showNo = false;
BK.uk = "Назад";
BK.ar = "السابق";
BK.so = "Dib";
SK.uk = "Без відповіді";
SK.ar = "بلا إجابة";
SK.so = "Aan la jawaabin";
EX.uk = "Пояснення";
EX.ar = "التوضيح";
EX.so = "Sharaxaad";
UI.uk = {
  sub: "Тренажер теоретичного іспиту. Усе українською, норвезький текст можна показати кнопкою.",
  prac: "Тренування",
  pracD: "Усі запитання, відповідь одразу",
  exam: "Пробний іспит",
  examD: "Без підказок, на час. Поріг: 85 %",
  mist: "Робота над помилками",
  mistD: "Запитання, де ви помилилися",
  topic: "За темами",
  q: "Запитання",
  ok: "Правильно. ",
  bad: "Неправильно. ",
  next: "Далі",
  fin: "Результат",
  menu: "У меню",
  pass: "Складено!",
  fail: "Не складено. Спробуйте ще раз.",
  wrong: "Помилки",
  yours: "Ваша відповідь",
  right: "Правильна відповідь",
  none: "Збережених помилок ще немає.",
  best: "Найкращий пробний іспит",
  time: "Час",
  lang: "Змінити мову",
  note: "Навчальний матеріал, не офіційні запитання. Див. vegvesen.no.",
  need: "Потрібно",
};
UI.ar = {
  sub: "تدرّب على اختبار النظرية. كل شيء بالعربية، ويمكنك إظهار النص النرويجي بزر.",
  prac: "تدريب",
  pracD: "كل الأسئلة مع الإجابة فورًا",
  exam: "امتحان تجريبي",
  examD: "بدون تلميحات ومع وقت. النجاح: 85 %",
  mist: "التدرّب على الأخطاء",
  mistD: "أسئلة أخطأت فيها",
  topic: "حسب الموضوع",
  q: "سؤال",
  ok: "صحيح. ",
  bad: "خطأ. ",
  next: "التالي",
  fin: "النتيجة",
  menu: "القائمة",
  pass: "نجحت!",
  fail: "لم تنجح. حاول مرة أخرى.",
  wrong: "الأخطاء",
  yours: "إجابتك",
  right: "الإجابة الصحيحة",
  none: "لا توجد أخطاء محفوظة بعد.",
  best: "أفضل امتحان تجريبي",
  time: "الوقت",
  lang: "تغيير اللغة",
  note: "مواد تعليمية وليست أسئلة رسمية. راجع vegvesen.no.",
  need: "المطلوب",
};
UI.so = {
  sub: "Ku layli imtixaanka aragtida. Wax kasta waa Soomaali, qoraalka Norwiijiga waxaad ku muujin kartaa badhan.",
  prac: "Layli",
  pracD: "Dhammaan su’aalaha, jawaab isla markiiba",
  exam: "Imtixaan tijaabo",
  examD: "Tilmaan la’aan, waqti leh. Gudbid: 85 %",
  mist: "Layli khaladaadka",
  mistD: "Su’aalaha aad ku khaldantay",
  topic: "Mawduuc",
  q: "Su’aal",
  ok: "Sax. ",
  bad: "Khalad. ",
  next: "Xiga",
  fin: "Natiijada",
  menu: "Menu",
  pass: "Waad gudubtay!",
  fail: "Ma gudbin. Isku day mar kale.",
  wrong: "Khaladaadka",
  yours: "Jawaabtaada",
  right: "Jawaabta saxda ah",
  none: "Weli khalad la keydiyey ma jiro.",
  best: "Imtixaanka tijaabo ugu fiican",
  time: "Waqti",
  lang: "Beddel luqadda",
  note: "Agab waxbarasho, ma ahan su’aalo rasmi ah. Eeg vegvesen.no.",
  need: "Loo baahan yahay",
};
var PK = {
  uk: {
    t: {
      speed: "Швидкість",
      prio: "Перевага",
      sign: "Знаки",
      safe: "Безпека",
      rule: "Правила",
    },
    sg: {
      n: [
        "Дати дорогу",
        "Стоп",
        "Головна дорога",
        "В’їзд заборонено",
        "Обмеження швидкості 50 км/год",
      ],
      q: "Що означає цей знак?",
      e: "Знак означає: ",
    },
    d: [
      [
        "Яке обмеження швидкості в населеному пункті, якщо немає інших знаків?",
        ["30 км/год", "50 км/год", "60 км/год", "70 км/год"],
        "За замовчуванням у населеному пункті 50 км/год.",
      ],
      [
        "Яка загальна швидкість поза населеними пунктами?",
        ["60 км/год", "70 км/год", "80 км/год", "90 км/год"],
        "Зазвичай 80 км/год, якщо немає інших знаків.",
      ],
      [
        "Хто має перевагу на перехресті без знаків і розмітки?",
        [
          "Я поступаюся транспорту справа",
          "Я поступаюся транспорту зліва",
          "Той, хто їде швидше",
          "Той, хто приїхав першим",
        ],
        "Правило правої руки: поступайтеся транспорту справа.",
      ],
      [
        "Що означає жовтий сигнал світлофора?",
        [
          "Їхати далі з тією самою швидкістю",
          "Зупинитися, якщо це безпечно",
          "Прискоритися",
          "Поступитися пішоходам",
        ],
        "Жовтий: зупиніться, якщо це безпечно.",
      ],
      [
        "Хто має бути пристебнутий?",
        [
          "Лише водій",
          "Лише ті, хто спереду",
          "Усі в автомобілі",
          "Лише на трасі",
        ],
        "Пристібаються всі, хто має ремінь.",
      ],
      [
        "Якого зросту має бути дитина, щоб їхати без дитячого утримувального пристрою?",
        ["100 см", "120 см", "135 см", "150 см"],
        "Діти нижчі за 135 см їздять у дитячому кріслі або бустері.",
      ],
      [
        "Чи можна тримати телефон у руці за кермом?",
        [
          "Так, якщо їду повільно",
          "Так, якщо лише читаю повідомлення",
          "Ні, це заборонено",
          "Так, для коротких дзвінків",
        ],
        "Тримати телефон у руці під час руху заборонено.",
      ],
      [
        "Коли потрібно вмикати денні ходові вогні або ближнє світло?",
        [
          "Лише в темряві",
          "Лише взимку",
          "Цілодобово",
          "Лише поза населеними пунктами",
        ],
        "Світло обов’язкове цілодобово під час руху.",
      ],
      [
        "Яка мінімальна допустима глибина протектора літніх шин?",
        ["0,8 мм", "1,6 мм", "3 мм", "4 мм"],
        "Мінімум 1,6 мм.",
      ],
      [
        "Яка межа алкоголю в крові для водіїв у Норвегії?",
        ["0,0 проміле", "0,2 проміле", "0,5 проміле", "0,8 проміле"],
        "Межа — 0,2 проміле.",
      ],
      [
        "Як близько до перехрестя заборонено паркуватися?",
        ["2 метри", "5 метрів", "10 метрів", "20 метрів"],
        "Паркування заборонене ближче ніж за 5 м від перехрестя.",
      ],
    ],
  },
  ar: {
    t: {
      speed: "السرعة",
      prio: "أولوية المرور",
      sign: "اللافتات",
      safe: "السلامة",
      rule: "القواعد",
    },
    sg: {
      n: [
        "أفسح الطريق",
        "قف",
        "طريق ذو أولوية",
        "ممنوع الدخول",
        "حدّ السرعة 50 كم/س",
      ],
      q: "ماذا تعني هذه اللافتة؟",
      e: "تعني اللافتة: ",
    },
    d: [
      [
        "ما حدّ السرعة داخل المناطق المأهولة عندما لا توجد لافتة أخرى؟",
        ["30 كم/س", "50 كم/س", "60 كم/س", "70 كم/س"],
        "الحدّ الافتراضي داخل المناطق المأهولة هو 50 كم/س.",
      ],
      [
        "ما حدّ السرعة العام خارج المناطق المأهولة؟",
        ["60 كم/س", "70 كم/س", "80 كم/س", "90 كم/س"],
        "عمومًا 80 كم/س ما لم توجد لافتة مختلفة.",
      ],
      [
        "من له أولوية المرور عند تقاطع بلا لافتات ولا خطوط إفساح الطريق؟",
        [
          "عليّ إفساح الطريق للمركبات القادمة من اليمين",
          "عليّ إفساح الطريق للمركبات القادمة من اليسار",
          "صاحب السرعة الأعلى",
          "من يصل أولًا",
        ],
        "قاعدة اليمين: أفسح الطريق للمركبات القادمة من اليمين.",
      ],
      [
        "ماذا يعني الضوء الأصفر في إشارة المرور؟",
        [
          "تابع القيادة بالسرعة نفسها",
          "توقّف إذا كان ذلك آمنًا",
          "زد سرعتك",
          "أفسح الطريق للمشاة",
        ],
        "الأصفر يعني التوقف إذا كان ذلك آمنًا.",
      ],
      [
        "من يجب عليه ربط حزام الأمان؟",
        [
          "السائق فقط",
          "الجالسون في الأمام فقط",
          "جميع من في السيارة",
          "على الطرق السريعة فقط",
        ],
        "على كل من يتوفر له حزام أن يستخدمه.",
      ],
      [
        "ما الطول الذي يجب أن يبلغه الطفل ليجلس دون مقعد أو وسيلة حماية للأطفال؟",
        ["100 سم", "120 سم", "135 سم", "150 سم"],
        "الأطفال دون 135 سم يحتاجون إلى وسيلة حماية للأطفال.",
      ],
      [
        "هل يجوز حمل الهاتف المحمول باليد أثناء القيادة؟",
        [
          "نعم، إذا كنت أقود ببطء",
          "نعم، إذا كنت أقرأ الرسائل فقط",
          "لا، هذا ممنوع",
          "نعم، للمكالمات القصيرة",
        ],
        "يُمنع حمل الهاتف باليد أثناء القيادة.",
      ],
      [
        "متى يجب استخدام أضواء النهار أو الأضواء المنخفضة؟",
        [
          "في الظلام فقط",
          "في الشتاء فقط",
          "على مدار الساعة",
          "خارج المناطق المأهولة فقط",
        ],
        "الإضاءة إلزامية على مدار الساعة أثناء القيادة.",
      ],
      [
        "ما الحد الأدنى القانوني لعمق نقش الإطارات الصيفية؟",
        ["0,8 مم", "1,6 مم", "3 مم", "4 مم"],
        "الحد الأدنى 1,6 مم.",
      ],
      [
        "ما الحد المسموح به لنسبة الكحول في الدم للسائقين في النرويج؟",
        ["0,0 بالألف", "0,2 بالألف", "0,5 بالألف", "0,8 بالألف"],
        "الحد هو 0,2 بالألف.",
      ],
      [
        "ما أقرب مسافة من التقاطع يُمنع عندها الوقوف؟",
        ["2 متر", "5 أمتار", "10 أمتار", "20 مترًا"],
        "يُمنع الوقوف على بعد أقل من 5 أمتار من التقاطع.",
      ],
    ],
  },
  so: {
    t: {
      speed: "Xawaaraha",
      prio: "Mudnaanta marinka",
      sign: "Calaamadaha",
      safe: "Badbaadada",
      rule: "Xeerarka",
    },
    sg: {
      n: [
        "Marinka sii",
        "Istaag",
        "Waddo mudnaan leh",
        "Gelitaan mamnuuc",
        "Xadka xawaaraha 50 km/saac",
      ],
      q: "Maxay calaamaddan ka dhigan tahay?",
      e: "Calaamaddu waxay ka dhigan tahay: ",
    },
    d: [
      [
        "Xadka xawaaraha ee deegaannada la dhisay waa maxay haddii calaamad kale aysan jirin?",
        ["30 km/saac", "50 km/saac", "60 km/saac", "70 km/saac"],
        "Caadi ahaan waa 50 km/saac deegaannada la dhisay.",
      ],
      [
        "Waa maxay xadka xawaaraha guud ee banaanka deegaannada la dhisay?",
        ["60 km/saac", "70 km/saac", "80 km/saac", "90 km/saac"],
        "Guud ahaan waa 80 km/saac haddii calaamad kale aysan jirin.",
      ],
      [
        "Yaa mudnaanta marinka leh isgoys aan lahayn calaamado iyo khadadka dhiibista?",
        [
          "Waa inaan marinka siiyaa gawaarida midigta ka imanaysa",
          "Waa inaan marinka siiyaa gawaarida bidixda ka imanaysa",
          "Kan ugu xawaaraha badan",
          "Kan ugu horreeya ee yimaada",
        ],
        "Xeerka midigta: marinka sii gawaarida midigta ka imanaysa.",
      ],
      [
        "Maxay ka dhigan tahay iftiinka jaalaha ah ee laydhka taraafikada?",
        [
          "Sii wad xawaaraha isku mid ah",
          "Istaag haddii ay badbaado tahay",
          "Xawaaraha kordhi",
          "Marinka sii dadka lugeynaya",
        ],
        "Jaale: istaag haddii ay badbaado tahay.",
      ],
      [
        "Yaa waa inuu xirtaa suunka kursiga?",
        [
          "Darawalka kaliya",
          "Kuwa hore fadhiya kaliya",
          "Qof kasta oo gaariga ku jira",
          "Waddooyinka waaweyn oo keliya",
        ],
        "Qof kasta oo suun heli kara waa inuu isticmaalaa.",
      ],
      [
        "Intee le’eg ayuu ilmuhu dhererkiisu noqon karaa si uu u fadhiisto isagoo aan lahayn kursi ilmaha?",
        ["100 cm", "120 cm", "135 cm", "150 cm"],
        "Carruurta ka gaaban 135 cm waxay u baahan yihiin kursi ilmaha.",
      ],
      [
        "Ma ogol tahay in taleefanka gacanta lagu qabto markaad wadayso?",
        [
          "Haa, haddaan si tartiib ah u wado",
          "Haa, haddaan fariimo kaliya akhrinayo",
          "Maya, waa mamnuuc",
          "Haa, wicitaannada gaagaaban",
        ],
        "Waa mamnuuc in taleefanka gacanta lagu qabto markaad wadayso.",
      ],
      [
        "Goorma ayaa waajib ah in la isticmaalo nalalka maalinta ama nalalka hoose?",
        [
          "Gudcurka kaliya",
          "Jiilaalka kaliya",
          "Maalinta iyo habeenkaba",
          "Banaanka deegaannada la dhisay kaliya",
        ],
        "Nalalku waa waajib maalinta oo dhan markaad wadayso.",
      ],
      [
        "Waa maxay qoto-dheerida ugu yar ee sharciga ah ee taayirrada xagaaga?",
        ["0,8 mm", "1,6 mm", "3 mm", "4 mm"],
        "Ugu yaraan waa 1,6 mm.",
      ],
      [
        "Waa maxay xadka khamriga dhiigga ee darawallada Norway?",
        ["0,0 promille", "0,2 promille", "0,5 promille", "0,8 promille"],
        "Xadku waa 0,2 promille.",
      ],
      [
        "Intee ka dhow isgoyska ayaa baarkinka laga mamnuucay?",
        ["2 mitir", "5 mitir", "10 mitir", "20 mitir"],
        "Waa mamnuuc baarkin ka dhow 5 mitir isgoyska.",
      ],
    ],
  },
};
function qt(q, L) {
  var li = LI[L],
    p = PK[L];
  if (li !== undefined)
    return {
      q: q.q[li],
      o: q.o.map(function (o) {
        return tx(o, li);
      }),
      e: q.e[li],
    };
  if (q.s) {
    var g = p.sg,
      k = function (o) {
        return g.n[NM.indexOf(o)] || o[1];
      };
    return { q: g.q, o: q.o.map(k), e: g.e + k(q.o[q.a]) };
  }
  var d = p.d[q.id];
  if (!d) {
    var r = qt(q, "en");
    r.fb = 1;
    return r;
  }
  return { q: d[0], o: d[1], e: d[2] };
}
function tn(k, L) {
  var li = LI[L];
  return li !== undefined ? T[k][li] : PK[L].t[k];
}
var VUI = {
  no: [
    "Begreper",
    "Lær ord fra teoriprøven",
    "Vis",
    "Kan det",
    "Øv mer",
    "Alle ord er lært!",
    "Start på nytt",
    "Alle ord",
    "kjent",
  ],
  en: [
    "Words",
    "Learn words from the theory test",
    "Show",
    "I know it",
    "Practise",
    "All words learned!",
    "Start over",
    "All words",
    "known",
  ],
  ru: [
    "Слова",
    "Учите слова из теоретического экзамена",
    "Показать",
    "Знаю",
    "Повторить",
    "Все слова выучены!",
    "Начать заново",
    "Все слова",
    "выучено",
  ],
  uk: [
    "Слова",
    "Вивчайте слова з теоретичного іспиту",
    "Показати",
    "Знаю",
    "Повторити",
    "Усі слова вивчено!",
    "Почати знову",
    "Усі слова",
    "вивчено",
  ],
  ar: [
    "المفردات",
    "تعلّم كلمات اختبار النظرية",
    "إظهار",
    "أعرفها",
    "أعد",
    "تعلّمت كل الكلمات!",
    "ابدأ من جديد",
    "كل الكلمات",
    "معروفة",
  ],
  so: [
    "Erayada",
    "Baro erayada imtixaanka aragtida",
    "Muuji",
    "Waan ogahay",
    "Ku celi",
    "Dhammaan erayada waad baratay!",
    "Dib u bilow",
    "Dhammaan erayada",
    "la yaqaan",
  ],
};
var LX = { no: 1, en: 1, ru: 2, uk: 3, ar: 4, so: 5 };
var W = [
  [
    "vikeplikt",
    "duty to give way",
    "обязанность уступить дорогу",
    "обов’язок поступитися дорогою",
    "واجب إفساح الطريق",
    "waajibka marinka siinta",
  ],
  [
    "forkjørsrett",
    "right of way",
    "право преимущественного проезда",
    "право першочергового проїзду",
    "حق الأولوية في المرور",
    "xaqa mudnaanta marinka",
  ],
  ["kryss", "junction", "перекрёсток", "перехрестя", "تقاطع", "isgoys"],
  [
    "fartsgrense",
    "speed limit",
    "ограничение скорости",
    "обмеження швидкості",
    "حد السرعة",
    "xadka xawaaraha",
  ],
  [
    "promille",
    "per mille (blood alcohol)",
    "промилле (алкоголь в крови)",
    "проміле (алкоголь у крові)",
    "بالألف (الكحول في الدم)",
    "promille (khamriga dhiigga)",
  ],
  [
    "bilbelte",
    "seat belt",
    "ремень безопасности",
    "ремінь безпеки",
    "حزام الأمان",
    "suunka kursiga",
  ],
  [
    "forbikjøring",
    "overtaking",
    "обгон",
    "обгін",
    "التجاوز",
    "dhaafidda gaadiidka",
  ],
  [
    "fotgjenger",
    "pedestrian",
    "пешеход",
    "пішохід",
    "المشاة",
    "qofka lugeynaya",
  ],
  [
    "trafikklys",
    "traffic light",
    "светофор",
    "світлофор",
    "إشارة المرور",
    "laydhka taraafikada",
  ],
  ["parkering", "parking", "парковка", "паркування", "الوقوف", "baarkin"],
  [
    "nærlys",
    "dipped headlights",
    "ближний свет",
    "ближнє світло",
    "الأضواء المنخفضة",
    "nalalka hoose",
  ],
  [
    "mønsterdybde",
    "tread depth",
    "глубина протектора",
    "глибина протектора",
    "عمق نقش الإطار",
    "qoto-dheerida taayirka",
  ],
  [
    "førerkort",
    "driving licence",
    "водительские права",
    "водійське посвідчення",
    "رخصة القيادة",
    "liisanka darawalnimada",
  ],
  [
    "teoriprøve",
    "theory test",
    "теоретический экзамен",
    "теоретичний іспит",
    "اختبار النظرية",
    "imtixaanka aragtida",
  ],
  [
    "oppkjøring",
    "practical driving test",
    "практический экзамен по вождению",
    "практичний іспит з водіння",
    "الاختبار العملي للقيادة",
    "imtixaanka wadista",
  ],
  [
    "vikelinje",
    "give-way line",
    "линия «Уступи дорогу»",
    "лінія «Дати дорогу»",
    "خط إفساح الطريق",
    "khadka marinka siinta",
  ],
  [
    "varseltrekant",
    "warning triangle",
    "знак аварийной остановки",
    "знак аварійної зупинки",
    "مثلث التحذير",
    "saddex-xagalka digniinta",
  ],
  [
    "fotgjengerovergang",
    "pedestrian crossing",
    "пешеходный переход",
    "пішохідний перехід",
    "ممر المشاة",
    "meesha laga gudbo ee dadka lugeynaya",
  ],
  [
    "glatt føre",
    "slippery road",
    "скользкая дорога",
    "слизька дорога",
    "طريق زلق",
    "waddo simbiriirixan",
  ],
  ["forsikring", "insurance", "страховка", "страхування", "التأمين", "caymis"],
  ["bot", "fine", "штраф", "штраф", "غرامة", "ganaax"],
  ["tåke", "fog", "туман", "туман", "ضباب", "ceeryaamo"],
  ["bil", "car", "автомобиль", "автомобіль", "سيارة", "gaari"],
  ["sykkel", "bicycle", "велосипед", "велосипед", "دراجة هوائية", "baaskiil"],
  ["motorsykkel", "motorcycle", "мотоцикл", "мотоцикл", "دراجة نارية", "mooto"],
  ["buss", "bus", "автобус", "автобус", "حافلة", "bas"],
  ["lastebil", "truck", "грузовик", "вантажівка", "شاحنة", "gaari xamuul"],
  ["vei", "road", "дорога", "дорога", "طريق", "waddo"],
  [
    "motorvei",
    "motorway",
    "автомагистраль",
    "автомагістраль",
    "طريق سريع",
    "waddo weyn",
  ],
  ["fortau", "pavement", "тротуар", "тротуар", "رصيف", "dhabbaha lugta"],
  [
    "sykkelfelt",
    "bike lane",
    "велодорожка",
    "велодоріжка",
    "مسار الدراجات",
    "waddada baaskiilada",
  ],
  ["skilt", "sign", "знак", "знак", "لافتة", "calaamad"],
  [
    "rundkjøring",
    "roundabout",
    "круговое движение",
    "кільцева розв’язка",
    "دوّار",
    "wareegga gaadiidka",
  ],
  ["høyre", "right", "право, справа", "право, праворуч", "يمين", "midig"],
  ["venstre", "left", "лево, слева", "ліво, ліворуч", "يسار", "bidix"],
  ["sjåfør", "driver", "водитель", "водій", "سائق", "darawal"],
  ["passasjer", "passenger", "пассажир", "пасажир", "راكب", "rakaab"],
  ["ulykke", "accident", "авария", "аварія", "حادث", "shil"],
  [
    "skade",
    "injury, damage",
    "травма, повреждение",
    "травма, пошкодження",
    "إصابة، ضرر",
    "dhaawac, waxyeelo",
  ],
  [
    "førstehjelp",
    "first aid",
    "первая помощь",
    "перша допомога",
    "إسعافات أولية",
    "gargaarka degdegga ah",
  ],
  [
    "nødnummer",
    "emergency number",
    "номер экстренной службы",
    "номер екстреної служби",
    "رقم الطوارئ",
    "lambarka degdegga",
  ],
  [
    "vinterdekk",
    "winter tyres",
    "зимние шины",
    "зимові шини",
    "إطارات شتوية",
    "taayirrada jiilaalka",
  ],
  [
    "piggdekk",
    "studded tyres",
    "шипованные шины",
    "шиповані шини",
    "إطارات مسمّرة",
    "taayirrada musmaarka leh",
  ],
  ["bensin", "petrol", "бензин", "бензин", "بنزين", "batrool"],
  ["diesel", "diesel", "дизель", "дизель", "ديزل", "diisil"],
  ["batteri", "battery", "аккумулятор", "акумулятор", "بطارية", "baytari"],
  ["motor", "engine", "двигатель", "двигун", "محرك", "matoor"],
  ["bremser", "brakes", "тормоза", "гальма", "الفرامل", "bireegyada"],
  ["speil", "mirror", "зеркало", "дзеркало", "مرآة", "muraayad"],
  ["rattet", "steering wheel", "руль", "кермо", "عجلة القيادة", "sukaanka"],
  ["lykt", "headlight", "фара", "фара", "المصباح الأمامي", "nalka hore"],
  [
    "blinklys",
    "indicator",
    "указатель поворота",
    "вказівник повороту",
    "إشارة الانعطاف",
    "tilmaamaha leexashada",
  ],
  ["hastighet", "speed", "скорость", "швидкість", "سرعة", "xawaare"],
  [
    "avstand",
    "distance",
    "расстояние, дистанция",
    "відстань, дистанція",
    "مسافة",
    "masaafo",
  ],
  [
    "trafikkskole",
    "driving school",
    "автошкола",
    "автошкола",
    "مدرسة تعليم القيادة",
    "dugsiga wadista",
  ],
  [
    "kjøretøy",
    "vehicle",
    "транспортное средство",
    "транспортний засіб",
    "مركبة",
    "gaadhi",
  ],
  [
    "veiarbeid",
    "roadworks",
    "дорожные работы",
    "дорожні роботи",
    "أعمال طرق",
    "shaqada waddooyinka",
  ],
  ["regn", "rain", "дождь", "дощ", "مطر", "roob"],
  ["mørke", "darkness", "темнота", "темрява", "ظلام", "gudcur"],
  [
    "lyskryss",
    "junction with traffic lights",
    "перекрёсток со светофором",
    "перехрестя зі світлофором",
    "تقاطع بإشارات ضوئية",
    "isgoys laydh leh",
  ],
  [
    "brannslokker",
    "fire extinguisher",
    "огнетушитель",
    "вогнегасник",
    "طفاية حريق",
    "aalad dab-damis",
  ],
  ["stoppe", "to stop", "остановиться", "зупинитися", "يتوقف", "istaagid"],
  [
    "enveiskjøring",
    "one-way street",
    "движение в одном направлении",
    "рух в одному напрямку",
    "شارع باتجاه واحد",
    "waddo hal dhinac ah",
  ],
  [
    "gågate",
    "pedestrian street",
    "пешеходная улица",
    "пішохідна вулиця",
    "شارع للمشاة",
    "waddo dadka lugeynaya",
  ],
  [
    "kollektivfelt",
    "bus lane",
    "полоса для общественного транспорта",
    "смуга для громадського транспорту",
    "مسار النقل العام",
    "waddada gaadiidka dadweynaha",
  ],
  [
    "tettbygd strøk",
    "built-up area",
    "населённый пункт",
    "населений пункт",
    "منطقة مأهولة",
    "deegaan la dhisay",
  ],
  [
    "møtende trafikk",
    "oncoming traffic",
    "встречное движение",
    "зустрічний рух",
    "حركة مرور قادمة من الاتجاه المعاكس",
    "gaadiidka ka soo hor imanaya",
  ],
  ["sving", "bend, turn", "поворот", "поворот", "منعطف", "leexasho"],
  ["tunnel", "tunnel", "туннель", "тунель", "نفق", "tunnel"],
  ["bro", "bridge", "мост", "міст", "جسر", "buundo"],
  [
    "jernbaneovergang",
    "railway crossing",
    "железнодорожный переезд",
    "залізничний переїзд",
    "معبر سكة حديد",
    "marinka tareenka",
  ],
  ["trikk", "tram", "трамвай", "трамвай", "ترام", "tram"],
  [
    "ambulanse",
    "ambulance",
    "скорая помощь",
    "швидка допомога",
    "سيارة إسعاف",
    "ambalaas",
  ],
  [
    "utrykningskjøretøy",
    "emergency vehicle",
    "спецтранспорт экстренных служб",
    "автомобіль екстрених служб",
    "مركبة طوارئ",
    "gaadhi degdeg ah",
  ],
  ["politi", "police", "полиция", "поліція", "شرطة", "booliis"],
  [
    "håndbrems",
    "handbrake",
    "ручной тормоз",
    "ручне гальмо",
    "فرامل اليد",
    "bireegga gacanta",
  ],
  [
    "tåkelys",
    "fog lights",
    "противотуманные фары",
    "протитуманні фари",
    "أضواء الضباب",
    "nalalka ceeryaamada",
  ],
  [
    "øvelseskjøring",
    "practice driving",
    "учебная езда",
    "навчальна їзда",
    "القيادة التدريبية",
    "layliga wadista",
  ],
  [
    "sikkerhetskurs",
    "safety course",
    "курс безопасности",
    "курс безпеки",
    "دورة السلامة",
    "koorsada badbaadada",
  ],
  [
    "glattkjøring",
    "skid-control course",
    "курс вождения по скользкой дороге",
    "курс водіння на слизькій дорозі",
    "دورة القيادة على الطرق الزلقة",
    "koorsada wadista waddooyinka simbiriirixan",
  ],
  [
    "legeerklæring",
    "medical certificate",
    "медицинская справка",
    "медична довідка",
    "شهادة طبية",
    "warqadda dhakhtarka",
  ],
  [
    "bestå",
    "to pass (an exam)",
    "сдать экзамен",
    "скласти іспит",
    "ينجح",
    "gudbid",
  ],
  [
    "stryke",
    "to fail (an exam)",
    "не сдать экзамен",
    "не скласти іспит",
    "يرسب",
    "ku fashilmid",
  ],
  [
    "kjøretime",
    "driving lesson",
    "урок вождения",
    "урок водіння",
    "درس قيادة",
    "casharka wadista",
  ],
  [
    "trafikkregler",
    "traffic rules",
    "правила дорожного движения",
    "правила дорожнього руху",
    "قواعد المرور",
    "xeerarka taraafikada",
  ],
  [
    "bremselengde",
    "braking distance",
    "тормозной путь",
    "гальмівний шлях",
    "مسافة الكبح",
    "masaafada joogsiga",
  ],
  [
    "rødt lys",
    "red light",
    "красный свет",
    "червоне світло",
    "الضوء الأحمر",
    "iftiinka cas",
  ],
  [
    "gult lys",
    "yellow light",
    "жёлтый свет",
    "жовте світло",
    "الضوء الأصفر",
    "iftiinka jaalaha",
  ],
  [
    "grønt lys",
    "green light",
    "зелёный свет",
    "зелене світло",
    "الضوء الأخضر",
    "iftiinka cagaaran",
  ],
  [
    "fartsovertredelse",
    "speeding offence",
    "превышение скорости",
    "перевищення швидкості",
    "تجاوز السرعة المسموحة",
    "xad-dhaafka xawaaraha",
  ],
  [
    "stopplinje",
    "stop line",
    "стоп-линия",
    "лінія зупинки",
    "خط التوقف",
    "khadka istaagga",
  ],
];
var VS = null,
  VP = null,
  VF = false;
function vk() {
  return sv().known || [];
}
function vsave(k) {
  var d = sv();
  d.known = k;
  put(d);
}
function speak(w) {
  try {
    var s = new SpeechSynthesisUtterance(w);
    s.lang = "nb-NO";
    speechSynthesis.cancel();
    speechSynthesis.speak(s);
  } catch (e) {}
}
function learn() {
  stop();
  S = null;
  hb(true);
  var V = VUI[lang],
    x = LX[lang],
    k = vk(),
    left = [],
    h,
    e;
  W.forEach(function (w, i) {
    if (k.indexOf(i) < 0) left.push(i);
  });
  sub.textContent = V[1];
  h =
    '<div class="meta"><span>' +
    V[0] +
    "</span><span>" +
    k.length +
    " / " +
    W.length +
    " " +
    V[8] +
    '</span></div><div class="bar"><i style="width:' +
    (k.length / W.length) * 100 +
    '%"></i></div>';
  if (!left.length) {
    VS = null;
    h +=
      '<div class="big">🎉</div><p>' +
      V[5] +
      '</p><div class="row"><button class="btn" id="vr">' +
      V[6] +
      "</button></div>";
  } else {
    if (VS === null || left.indexOf(VS) < 0) {
      var pool =
        left.length > 1
          ? left.filter(function (j) {
              return j !== VP;
            })
          : left;
      VS = pool[Math.floor(Math.random() * pool.length)];
      VF = false;
    }
    var w = W[VS];
    h +=
      '<div class="vc"><div class="vw" dir="ltr">' +
      esc(w[0]) +
      ' <button class="nb" id="vs" title="nb-NO">🔊</button></div>' +
      (VF
        ? '<div class="vt">' + esc(w[x]) + "</div>"
        : '<div class="row" style="justify-content:center"><button class="btn" id="vf">' +
          V[2] +
          "</button></div>") +
      "</div>" +
      (VF
        ? '<div class="row"><button class="btn" id="vk">' +
          V[3] +
          '</button><button class="nb" id="vm">' +
          V[4] +
          "</button></div>"
        : "");
  }
  h +=
    '<div class="row"><button class="nb" id="vb">' +
    (lang === "ar" ? "→ " : "← ") +
    V[0] +
    "</button></div>";
  app.innerHTML = h;
  if ((e = document.getElementById("vf")))
    e.onclick = function () {
      VF = true;
      learn();
    };
  if ((e = document.getElementById("vs")))
    e.onclick = function () {
      speak(W[VS][0]);
    };
  if ((e = document.getElementById("vk")))
    e.onclick = function () {
      k.push(VS);
      vsave(k);
      VS = null;
      VF = false;
      learn();
    };
  if ((e = document.getElementById("vm")))
    e.onclick = function () {
      VP = VS;
      VS = null;
      VF = false;
      learn();
    };
  if ((e = document.getElementById("vr")))
    e.onclick = function () {
      vsave([]);
      VS = null;
      VP = null;
      VF = false;
      learn();
    };
  if ((e = document.getElementById("vb"))) e.onclick = vocab;
}
var VX = {
    no: ["Quiz", "Velg riktig oversettelse", "Lær", "ord igjen"],
    en: ["Quiz", "Pick the right translation", "Learn", "words left"],
    ru: ["Викторина", "Выберите верный перевод", "Учить", "слов осталось"],
    uk: [
      "Вікторина",
      "Оберіть правильний переклад",
      "Вчити",
      "слів залишилось",
    ],
    ar: ["اختبار", "اختر الترجمة الصحيحة", "تعلّم", "كلمات متبقية"],
    so: ["Su’aalo", "Dooro turjumaadda saxda ah", "Baro", "erayo harsan"],
  },
  QZ = null;
function vocab() {
  stop();
  S = null;
  QZ = null;
  hb(true);
  var V = VUI[lang],
    X = VX[lang],
    x = LX[lang],
    k = vk(),
    left = W.length - k.length,
    h;
  sub.textContent = V[1];
  h =
    '<div class="meta"><span>' +
    V[0] +
    "</span><span>" +
    k.length +
    " / " +
    W.length +
    " " +
    V[8] +
    '</span></div><div class="bar"><i style="width:' +
    (k.length / W.length) * 100 +
    '%"></i></div>';
  h +=
    '<button class="opt mi" id="vq"><span class="ic">❓</span><span><b>' +
    X[0] +
    "</b><small>" +
    X[1] +
    "</small></span></button>";
  h +=
    '<button class="opt mi" id="vl"><span class="ic">📖</span><span><b>' +
    X[2] +
    " (" +
    left +
    ")</b><small>" +
    left +
    " " +
    X[3] +
    "</small></span></button>";
  h +=
    '<button class="opt mi" id="va"><span class="ic">📋</span><span><b>' +
    V[7] +
    " (" +
    W.length +
    ")</b><small>" +
    k.length +
    " / " +
    W.length +
    " " +
    V[8] +
    "</small></span></button>";
  h +=
    '<button class="opt mi" id="vy"><span class="ic">⭐</span><span><b>' +
    MY[lang][0] +
    " (" +
    (sv().mine || []).length +
    ")</b><small>" +
    MY[lang][3] +
    "</small></span></button>";
  app.innerHTML = h;
  document.getElementById("vq").onclick = quiz;
  document.getElementById("vl").onclick = learn;
  document.getElementById("va").onclick = vall;
  document.getElementById("vy").onclick = mywords;
}
function quiz() {
  stop();
  S = null;
  hb(true);
  var V = VUI[lang],
    X = VX[lang],
    x = LX[lang],
    h;
  if (!QZ) {
    var kk = vk(),
      idx = W.map(function (w, i) {
        return i;
      }),
      unk = shuffle(
        idx.filter(function (i) {
          return kk.indexOf(i) < 0;
        }),
      ),
      kn = shuffle(
        idx.filter(function (i) {
          return kk.indexOf(i) > -1;
        }),
      );
    QZ = { l: unk.concat(kn).slice(0, 10), i: 0, sc: 0, a: null, o: null };
  }
  if (QZ.i >= QZ.l.length) {
    h =
      '<div class="big">' +
      QZ.sc +
      " / " +
      QZ.l.length +
      '</div><div class="row"><button class="btn" id="qa">' +
      X[2] +
      '</button><button class="nb" id="qb">' +
      X[0] +
      "</button></div>";
    app.innerHTML = h;
    document.getElementById("qa").onclick = learn;
    document.getElementById("qb").onclick = function () {
      QZ = null;
      quiz();
    };
    return;
  }
  var i = QZ.l[QZ.i],
    w = W[i];
  if (!QZ.o) {
    var seen = {},
      opts = [i];
    seen[w[x]] = 1;
    shuffle(
      W.map(function (a, j) {
        return j;
      }),
    ).forEach(function (j) {
      if (opts.length < 4 && !seen[W[j][x]]) {
        seen[W[j][x]] = 1;
        opts.push(j);
      }
    });
    QZ.o = shuffle(opts);
  }
  h =
    '<div class="bar"><i style="width:' +
    (QZ.i / QZ.l.length) * 100 +
    '%"></i></div><div class="meta"><span>' +
    X[0] +
    " " +
    (QZ.i + 1) +
    " / " +
    QZ.l.length +
    "</span><span>" +
    u("ok").replace(". ", "") +
    ": " +
    QZ.sc +
    "</span></div>";
  h +=
    '<div class="vc"><div class="vw" dir="ltr">' +
    esc(w[0]) +
    ' <button class="nb" id="vs" title="nb-NO">🔊</button></div></div>';
  QZ.o.forEach(function (j) {
    var c = "opt";
    if (QZ.a !== null) {
      if (j === i) c += " ok";
      else if (j === QZ.a) c += " bad";
    }
    h +=
      '<button class="' +
      c +
      '" data-j="' +
      j +
      '"' +
      (QZ.a !== null ? " disabled" : "") +
      ">" +
      esc(W[j][x]) +
      "</button>";
  });
  if (QZ.a !== null)
    h +=
      '<div class="row"><button class="btn" id="qn">' +
      (QZ.i === QZ.l.length - 1 ? u("fin") : u("next")) +
      "</button></div>";
  app.innerHTML = h;
  document.getElementById("vs").onclick = function () {
    speak(w[0]);
  };
  if (QZ.a === null)
    Array.prototype.forEach.call(app.querySelectorAll(".opt"), function (b) {
      b.onclick = function () {
        var j = +b.dataset.j,
          d = sv(),
          kn2 = (d.known || []).filter(function (f) {
            return f !== i;
          });
        QZ.a = j;
        if (j === i) {
          QZ.sc++;
          kn2.push(i);
        }
        d.known = kn2;
        put(d);
        quiz();
      };
    });
  var qn = document.getElementById("qn");
  if (qn)
    qn.onclick = function () {
      QZ.i++;
      QZ.a = null;
      QZ.o = null;
      quiz();
    };
}
var VY = {
    no: ["Søk...", "ikke lært"],
    en: ["Search...", "not learned"],
    ru: ["Поиск...", "не выучено"],
    uk: ["Пошук...", "не вивчено"],
    ar: ["بحث...", "غير معروفة"],
    so: ["Raadi...", "aan la baran"],
  },
  ALF = "all",
  ALQ = "";
function vall() {
  stop();
  S = null;
  hb(true);
  var V = VUI[lang],
    Y = VY[lang],
    h;
  sub.textContent = V[7];
  h =
    '<div class="row" style="margin-top:0"><button class="nb" id="vb">' +
    (lang === "ar" ? "→ " : "← ") +
    V[0] +
    '</button></div><input class="sq" id="sq" type="search" placeholder="' +
    Y[0] +
    '" value="' +
    esc(ALQ).replace(/"/g, "&quot;") +
    '"><div>';
  [
    ["all", V[7]],
    ["kn", V[8]],
    ["un", Y[1]],
  ].forEach(function (c) {
    h +=
      '<button class="chip' +
      (ALF === c[0] ? " sel" : "") +
      '" data-f="' +
      c[0] +
      '">' +
      c[1] +
      "</button>";
  });
  h += '</div><div id="wl"></div>';
  app.innerHTML = h;
  fill();
  document.getElementById("vb").onclick = vocab;
  document.getElementById("sq").oninput = function (e) {
    ALQ = e.target.value;
    fill();
  };
  Array.prototype.forEach.call(app.querySelectorAll(".chip"), function (b) {
    b.onclick = function () {
      ALF = b.dataset.f;
      vall();
    };
  });
}
function fill() {
  var x = LX[lang],
    k = vk(),
    q = ALQ.toLowerCase(),
    h = "";
  W.forEach(function (w, i) {
    var kn = k.indexOf(i) > -1;
    if ((ALF === "kn" && !kn) || (ALF === "un" && kn)) return;
    if (
      q &&
      w[0].toLowerCase().indexOf(q) < 0 &&
      w[x].toLowerCase().indexOf(q) < 0
    )
      return;
    h +=
      '<div class="rev vl"><button class="nb sp" data-w="' +
      i +
      '">🔊</button><b dir="ltr">' +
      esc(w[0]) +
      "</b> — " +
      esc(w[x]) +
      (kn ? " ✓" : "") +
      "</div>";
  });
  var el = document.getElementById("wl");
  el.innerHTML = h || "—";
  Array.prototype.forEach.call(el.querySelectorAll(".sp"), function (b) {
    b.onclick = function () {
      speak(W[+b.dataset.w][0]);
    };
  });
}
var ZS = [0.9, 1, 1.15, 1.3, 1.5, 1.75],
  ZI = 1;
function setZ(i, save) {
  ZI = Math.max(0, Math.min(ZS.length - 1, i));
  document.querySelector("main").style.zoom = ZS[ZI];
  if (save) {
    var d = sv();
    d.z = ZI;
    put(d);
  }
}
document.getElementById("zm1").onclick = function () {
  setZ(ZI - 1, true);
};
document.getElementById("zm2").onclick = function () {
  setZ(ZI + 1, true);
};
var z0 = sv().z;
setZ(z0 != null ? z0 : window.innerWidth >= 1000 ? 3 : 1, false);
var MY = {
  no: [
    "Mine ord",
    "Legg til",
    "Lagt til",
    "Trykk på et ord for å lagre det",
    "Ingen ord ennå",
  ],
  en: ["My words", "Add", "Added", "Tap a word to save it", "No words yet"],
  ru: [
    "Мои слова",
    "Добавить",
    "Добавлено",
    "Нажмите на слово, чтобы сохранить",
    "Слов пока нет",
  ],
  uk: [
    "Мої слова",
    "Додати",
    "Додано",
    "Торкніться слова, щоб зберегти",
    "Слів ще немає",
  ],
  ar: [
    "كلماتي",
    "إضافة",
    "تمت الإضافة",
    "اضغط على كلمة لحفظها",
    "لا توجد كلمات بعد",
  ],
  so: [
    "Erayadayda",
    "Ku dar",
    "Waa lagu daray",
    "Taabo erayga si aad u keydiso",
    "Weli eray ma jiro",
  ],
};
Object.keys(UI).forEach(function (k) {
  UI[k].examD = UI[k].examD.replace("85 %", "38/45 · 90 min");
});
function hl(t) {
  return String(t)
    .split(/([A-Za-zÀ-ÿ]+)/)
    .map(function (p, i) {
      return i % 2
        ? '<span class="wd" data-w="' + p + '">' + p + "</span>"
        : esc(p);
    })
    .join("");
}
function wireWords() {
  var P = document.getElementById("wp");
  if (P) P.hidden = true;
  Array.prototype.forEach.call(app.querySelectorAll(".wd"), function (s) {
    s.onclick = function (e) {
      e.stopPropagation();
      wp(s.dataset.w);
    };
  });
}
function wp(w) {
  var P = document.getElementById("wp"),
    l = w.toLowerCase(),
    x = LX[lang],
    M = MY[lang],
    i = -1,
    has = (sv().mine || []).some(function (m) {
      return m.w === l;
    });
  if (!P) {
    P = document.createElement("div");
    P.id = "wp";
    document.body.appendChild(P);
  }
  W.forEach(function (r, j) {
    if (r[0].toLowerCase() === l) i = j;
  });
  P.innerHTML =
    '<b dir="ltr">' +
    esc(w) +
    '</b><button class="nb" id="wsp">🔊</button>' +
    (i > -1 ? "<span>" + esc(W[i][x]) + "</span>" : "") +
    '<button class="btn" id="wad"' +
    (has ? " disabled" : "") +
    ">" +
    (has ? "✓ " + M[2] : "+ " + M[1]) +
    '</button><button class="nb" id="wx">✕</button>';
  P.hidden = false;
  document.getElementById("wsp").onclick = function () {
    speak(w);
  };
  document.getElementById("wx").onclick = function () {
    P.hidden = true;
  };
  document.getElementById("wad").onclick = function () {
    var d = sv(),
      m = d.mine || [];
    m.push({ w: l, q: S && S.list ? S.list[S.i].id : null });
    d.mine = m;
    put(d);
    wp(w);
  };
}
function mywords() {
  stop();
  S = null;
  hb(true);
  var V = VUI[lang],
    M = MY[lang],
    x = LX[lang],
    d = sv(),
    m = d.mine || [],
    h;
  sub.textContent = M[0];
  h =
    '<div class="row" style="margin-top:0"><button class="nb" id="vb">' +
    (lang === "ar" ? "→ " : "← ") +
    V[0] +
    '</button></div><div class="meta" style="margin-top:10px"><span>' +
    M[0] +
    "</span><span>" +
    m.length +
    "</span></div>";
  if (!m.length) h += '<p class="tr">' + M[4] + "</p>";
  m.forEach(function (r, j) {
    var i = -1,
      q = r.q != null ? D[r.q] : null;
    W.forEach(function (w, k) {
      if (w[0].toLowerCase() === r.w) i = k;
    });
    h +=
      '<div class="rev vl"><button class="nb sp" data-s="' +
      j +
      '">🔊</button><b dir="ltr">' +
      esc(r.w) +
      "</b>" +
      (i > -1 ? " — " + esc(W[i][x]) : "") +
      ' <button class="nb sp" data-x="' +
      j +
      '">✕</button>' +
      (q ? '<div class="tr">' + esc(qt(q, lang).q) + "</div>" : "") +
      "</div>";
  });
  app.innerHTML = h;
  document.getElementById("vb").onclick = vocab;
  Array.prototype.forEach.call(app.querySelectorAll("[data-s]"), function (b) {
    b.onclick = function () {
      speak(m[+b.dataset.s].w);
    };
  });
  Array.prototype.forEach.call(app.querySelectorAll("[data-x]"), function (b) {
    b.onclick = function () {
      m.splice(+b.dataset.x, 1);
      d.mine = m;
      put(d);
      mywords();
    };
  });
}
var h1 = document.querySelector("h1");
h1.setAttribute("role", "button");
h1.setAttribute("tabindex", "0");
h1.title = "Meny";
function goHome() {
  var P = document.getElementById("wp");
  if (P) P.hidden = true;
  if (lang) menu();
  else pickLang();
}
h1.onclick = goHome;
h1.onkeydown = function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    goHome();
  }
};
pickLang();
