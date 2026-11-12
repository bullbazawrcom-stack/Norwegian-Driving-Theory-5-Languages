var LN={no:"Norsk",en:"English",ru:"Русский"},LI={no:0,en:1,ru:2};
var UI={
no:{sub:"Øv til teoriprøven. Alle spørsmål er på norsk.",pick:"Velg språk for oversettelse og meny",std:"standard",prac:"Øvelse",pracD:"Alle spørsmål, svar med en gang",exam:"Prøveeksamen",examD:"Ingen hint, med tid. Bestått: 85 %",mist:"Øv på feil",mistD:"Spørsmål du har svart feil på",topic:"Etter tema",q:"Spørsmål",ok:"Riktig. ",bad:"Feil. ",next:"Neste",fin:"Se resultat",menu:"Til menyen",tr:"Oversettelse",pass:"Bestått!",fail:"Ikke bestått. Prøv igjen.",wrong:"Feil svar",yours:"Ditt svar",right:"Riktig svar",none:"Ingen lagrede feil ennå.",best:"Beste prøveeksamen",time:"Tid",lang:"Bytt språk",note:"Læremateriell, ikke offisielle spørsmål. Se vegvesen.no.",need:"Krav"},
en:{sub:"Practise for the theory test. All questions are in Norwegian.",pick:"Choose the language for translation and menu",std:"default",prac:"Practice",pracD:"All questions, instant feedback",exam:"Mock exam",examD:"No hints, timed. Pass mark: 85%",mist:"Practise mistakes",mistD:"Questions you answered wrongly",topic:"By topic",q:"Question",ok:"Correct. ",bad:"Wrong. ",next:"Next",fin:"See result",menu:"Back to menu",tr:"Translation",pass:"Passed!",fail:"Not passed. Try again.",wrong:"Wrong answers",yours:"Your answer",right:"Correct answer",none:"No saved mistakes yet.",best:"Best mock exam",time:"Time",lang:"Change language",note:"Study material, not official questions. See vegvesen.no.",need:"Needed"},
ru:{sub:"Тренажёр теоретического экзамена. Все вопросы на норвежском.",pick:"Выберите язык перевода и меню",std:"по умолчанию",prac:"Тренировка",pracD:"Все вопросы, ответ сразу",exam:"Пробный экзамен",examD:"Без подсказок, на время. Порог: 85 %",mist:"Работа над ошибками",mistD:"Вопросы, где вы ошиблись",topic:"По темам",q:"Вопрос",ok:"Верно. ",bad:"Неверно. ",next:"Далее",fin:"Результат",menu:"В меню",tr:"Перевод",pass:"Сдано!",fail:"Не сдано. Попробуйте ещё раз.",wrong:"Ошибки",yours:"Ваш ответ",right:"Верный ответ",none:"Сохранённых ошибок пока нет.",best:"Лучший пробный экзамен",time:"Время",lang:"Сменить язык",note:"Учебный материал, не официальные вопросы. См. vegvesen.no.",need:"Нужно"}
};
var T={speed:["Fart","Speed","Скорость"],prio:["Vikeplikt","Right of way","Приоритет"],sign:["Skilt","Signs","Знаки"],safe:["Sikkerhet","Safety","Безопасность"],rule:["Regler","Rules","Правила"]};
var NM=[["Vikeplikt","Give way","Уступи дорогу"],["Stopp","Stop","Стоп"],["Forkjørsvei","Priority road","Главная дорога"],["Innkjøring forbudt","No entry","Въезд запрещён"],["Fartsgrense 50 km/t","Speed limit 50 km/h","Ограничение скорости 50 км/ч"]];
var SVG=[
'<svg viewBox="0 0 100 100"><polygon points="8,12 92,12 50,88" fill="#fff" stroke="#d00" stroke-width="10" stroke-linejoin="round"/></svg>',
'<svg viewBox="0 0 100 100"><polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill="#d00" stroke="#fff" stroke-width="3"/><text x="50" y="57" text-anchor="middle" font-size="19" font-weight="700" fill="#fff" font-family="Arial,sans-serif">STOPP</text></svg>',
'<svg viewBox="0 0 100 100"><polygon points="50,3 97,50 50,97 3,50" fill="#fff" stroke="#888" stroke-width="2"/><polygon points="50,15 85,50 50,85 15,50" fill="#fc0"/></svg>',
'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#d00"/><rect x="20" y="42" width="60" height="16" fill="#fff"/></svg>',
'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fff" stroke="#d00" stroke-width="10"/><text x="50" y="62" text-anchor="middle" font-size="34" font-weight="700" fill="#111" font-family="Arial,sans-serif">50</text></svg>'
];
var SQ=["Hva betyr dette skiltet?","What does this sign mean?","Что означает этот знак?"];
var SE=["Skiltet betyr: ","This sign means: ","Знак означает: "];
function sg(i){var o=[NM[i]],k;for(k=0;k<5&&o.length<4;k++)if(k!==i)o.push(NM[k]);
 return {t:"sign",s:SVG[i],q:SQ,o:o,a:0,e:NM[i].map(function(n,l){return SE[l]+n})}}
var D=[
{t:"speed",q:["Hvilken fartsgrense gjelder i tettbygd strøk når intet annet er skiltet?","What speed limit applies in a built-up area when nothing else is signed?","Какое ограничение скорости в населённом пункте, если нет других знаков?"],o:["30 km/t","50 km/t","60 km/t","70 km/t"],a:1,e:["Utgangspunktet er 50 km/t i tettbygd strøk.","The default is 50 km/h in built-up areas.","По умолчанию в населённом пункте 50 км/ч."]},
{t:"speed",q:["Hva er den generelle fartsgrensen utenfor tettbygd strøk?","What is the general speed limit outside built-up areas?","Какова общая скорость вне населённых пунктов?"],o:["60 km/t","70 km/t","80 km/t","90 km/t"],a:2,e:["Generelt 80 km/t når det ikke er skiltet annet.","Generally 80 km/h unless signed otherwise.","Обычно 80 км/ч, если нет других знаков."]},
{t:"prio",q:["Hvem har forkjørsrett i et kryss uten skilt og vikelinjer?","Who has priority at an unsigned junction with no give-way lines?","Кто имеет преимущество на перекрёстке без знаков и разметки?"],o:[["Jeg har vikeplikt for kjøretøy fra høyre","I must yield to vehicles from the right","Я уступаю транспорту справа"],["Jeg har vikeplikt for kjøretøy fra venstre","I must yield to vehicles from the left","Я уступаю транспорту слева"],["Den som kjører raskest","The fastest driver","Кто едет быстрее"],["Den som kommer først","Whoever arrives first","Кто приехал первым"]],a:0,e:["Høyreregelen: gi vei for kjøretøy fra høyre.","Right-hand rule: give way to vehicles from the right.","Правило правой руки: уступайте транспорту справа."]},
{t:"prio",q:["Hva betyr gult lys i trafikklyset?","What does a yellow traffic light mean?","Что означает жёлтый сигнал светофора?"],o:[["Kjør videre i samme fart","Keep driving at the same speed","Ехать дальше с той же скоростью"],["Stans hvis du kan gjøre det trygt","Stop if you can do so safely","Остановиться, если это безопасно"],["Øk farten","Speed up","Ускориться"],["Vikeplikt for gående","Yield to pedestrians","Уступить пешеходам"]],a:1,e:["Gult betyr at du skal stanse hvis det er trygt.","Yellow means stop if it is safe to do so.","Жёлтый: остановитесь, если это безопасно."]},
{t:"safe",q:["Hvem skal bruke bilbelte?","Who must wear a seat belt?","Кто должен быть пристёгнут?"],o:[["Bare føreren","Only the driver","Только водитель"],["Bare de foran","Only those in front","Только сидящие впереди"],["Alle i bilen","Everyone in the car","Все в машине"],["Bare på motorvei","Only on motorways","Только на трассе"]],a:2,e:["Alle som har tilgjengelig belte skal bruke det.","Everyone with a belt available must use it.","Пристёгиваются все, у кого есть ремень."]},
{t:"safe",q:["Hvor høyt må et barn være for å sitte uten barnesikringsutstyr?","How tall must a child be to ride without a child restraint?","Какого роста должен быть ребёнок, чтобы ехать без детского удерживающего устройства?"],o:["100 cm","120 cm","135 cm","150 cm"],a:2,e:["Barn under 135 cm skal ha barnesikringsutstyr.","Children under 135 cm need a child restraint.","Дети ниже 135 см ездят в детском кресле или бустере."]},
{t:"safe",q:["Kan du holde mobilen i hånden mens du kjører?","May you hold a phone in your hand while driving?","Можно ли держать телефон в руке за рулём?"],o:[["Ja, hvis jeg kjører sakte","Yes, if I drive slowly","Да, если еду медленно"],["Ja, hvis jeg bare leser meldinger","Yes, if I am only reading messages","Да, если только читаю сообщения"],["Nei, det er forbudt","No, it is prohibited","Нет, это запрещено"],["Ja, ved korte samtaler","Yes, for short calls","Да, для коротких звонков"]],a:2,e:["Det er forbudt å holde mobil i hånden under kjøring.","Holding a phone while driving is prohibited.","Держать телефон в руке при вождении запрещено."]},
{t:"safe",q:["Når må du bruke kjørelys eller nærlys?","When must you use daytime running lights or dipped headlights?","Когда нужно включать ходовые огни или ближний свет?"],o:[["Bare i mørket","Only in the dark","Только в темноте"],["Bare om vinteren","Only in winter","Только зимой"],["Hele døgnet","Around the clock","Круглосуточно"],["Bare utenfor tettbygd strøk","Only outside built-up areas","Только вне населённых пунктов"]],a:2,e:["Lys er påbudt hele døgnet når bilen er i bevegelse.","Lights are required around the clock while driving.","Свет обязателен круглосуточно во время движения."]},
{t:"safe",q:["Hva er minste lovlige mønsterdybde på sommerdekk?","What is the minimum legal tread depth on summer tyres?","Какова минимальная глубина протектора на летних шинах?"],o:["0,8 mm","1,6 mm","3 mm","4 mm"],a:1,e:["Minimum er 1,6 mm.","The minimum is 1.6 mm.","Минимум 1,6 мм."]},
{t:"rule",q:["Hva er promillegrensen for bilførere i Norge?","What is the blood alcohol limit for drivers in Norway?","Какой предел алкоголя в крови для водителей в Норвегии?"],o:["0,0 promille","0,2 promille","0,5 promille","0,8 promille"],a:1,e:["Grensen er 0,2 promille.","The limit is 0.2 per mille.","Предел 0,2 промилле."]},
{t:"rule",q:["Hvor nær et kryss er det forbudt å parkere?","How close to a junction is parking prohibited?","Как близко к перекрёстку запрещена парковка?"],o:["2 meter","5 meter","10 meter","20 meter"],a:1,e:["Parkering er forbudt innenfor 5 meter fra krysset.","Parking is prohibited within 5 metres of a junction.","Парковка запрещена ближе 5 м от перекрёстка."]},
sg(0),sg(1),sg(2),sg(3),sg(4)
];
NM.push(['Parkering forbudt','No parking','Парковка запрещена'],['Stans forbudt','No stopping','Остановка запрещена']);
SVG.push('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#1f5fb4" stroke="#d00" stroke-width="9"/><line x1="24" y1="76" x2="76" y2="24" stroke="#d00" stroke-width="9"/></svg>','<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#1f5fb4" stroke="#d00" stroke-width="9"/><line x1="24" y1="76" x2="76" y2="24" stroke="#d00" stroke-width="9"/><line x1="24" y1="24" x2="76" y2="76" stroke="#d00" stroke-width="9"/></svg>');
function Q(t,q,o,a,e){D.push({t:t,q:q,o:o,a:a,e:e})}
Q('prio',['Hvem har forkjørsrett når du skal kjøre inn i en rundkjøring?','Who has priority when you enter a roundabout?','Кто имеет преимущество, когда вы въезжаете на круг?'],[['Kjøretøy som allerede er i rundkjøringen','Vehicles already in the roundabout','Транспорт, уже движущийся по кругу'],['Den som skal inn i rundkjøringen','Those entering the roundabout','Въезжающие на круг'],['Den største bilen','The largest vehicle','Самая большая машина'],['Kjøretøy fra høyre utenfor rundkjøringen','Vehicles from the right outside it','Транспорт справа вне круга']],0,['Du må vike for kjøretøy som allerede er i rundkjøringen.','You must give way to vehicles already in the roundabout.','Уступайте транспорту, который уже едет по кругу.']);
Q('prio',['Hva skal du gjøre når en fotgjenger skal krysse i et gangfelt?','What must you do when a pedestrian is about to cross at a pedestrian crossing?','Что нужно сделать, когда пешеход собирается перейти по переходу?'],[['Stanse og la fotgjengeren gå','Stop and let the pedestrian cross','Остановиться и пропустить пешехода'],['Blinke og kjøre forbi','Flash and drive past','Мигнуть и проехать'],['Øke farten','Speed up','Ускориться'],['Tute og kjøre videre','Honk and keep going','Посигналить и ехать дальше']],0,['Du skal redusere farten og stanse for fotgjengere i eller på vei inn i gangfeltet.','You must slow down and stop for pedestrians in or entering the crossing.','Нужно снизить скорость и остановиться для пешеходов на переходе или входящих на него.']);
Q('prio',['Hva må du gjøre ved et stoppskilt?','What must you do at a stop sign?','Что нужно сделать у знака «Стоп»?'],[['Stanse helt og gi vikeplikt','Stop completely and give way','Полностью остановиться и уступить дорогу'],['Senke farten og kjøre videre','Slow down and continue','Снизить скорость и ехать дальше'],['Stanse bare hvis det kommer biler','Stop only if cars are coming','Остановиться, только если есть машины'],['Blinke og kjøre','Flash and go','Мигнуть и ехать']],0,['Stoppskilt betyr at du skal stanse helt og gi vikeplikt.','A stop sign means you must stop completely and give way.','Знак «Стоп» требует полностью остановиться и уступить дорогу.']);
Q('prio',['Hva betyr rødt lys i trafikklyset?','What does a red traffic light mean?','Что означает красный сигнал светофора?'],[['Stans','Stop','Стоп'],['Kjør forsiktig','Proceed with care','Ехать осторожно'],['Kjør hvis det er fritt','Go if the road is clear','Ехать, если свободно'],['Sakk farten','Slow down','Снизить скорость']],0,['Rødt lys betyr at du skal stanse.','Red means you must stop.','Красный означает: остановитесь.']);
Q('prio',['Et utrykningskjøretøy med blålys og sirene kommer bakfra. Hva gjør du?','An emergency vehicle with blue lights and siren approaches from behind. What do you do?','Сзади приближается спецавтомобиль с мигалкой и сиреной. Ваши действия?'],[['Gir plass og stanser om nødvendig','Make room and stop if necessary','Уступаю дорогу, при необходимости останавливаюсь'],['Øker farten','Speed up','Увеличиваю скорость'],['Holder samme fart og posisjon','Keep speed and position','Не меняю скорость и положение'],['Stanser midt i veien','Stop in the middle of the road','Останавливаюсь посреди дороги']],0,['Du skal gi fri vei og om nødvendig stanse.','You must give way and stop if necessary.','Нужно освободить дорогу и при необходимости остановиться.']);
Q('prio',['Du skal svinge til venstre i et kryss. Møtende trafikk skal rett frem. Hvem har vikeplikt?','You are turning left at a junction and oncoming traffic goes straight. Who must give way?','Вы поворачиваете налево, встречный транспорт едет прямо. Кто должен уступить?'],[['Jeg, som svinger til venstre','I, turning left','Я, поворачивающий налево'],['Den møtende trafikken','The oncoming traffic','Встречный транспорт'],['Den som kjører raskest','The fastest driver','Кто едет быстрее'],['Ingen har vikeplikt','Nobody','Никто']],0,['Den som svinger til venstre har vikeplikt for møtende trafikk.','A driver turning left must give way to oncoming traffic.','Поворачивающий налево уступает встречному транспорту.']);
Q('speed',['Hva skjer med bremselengden når farten dobles?','What happens to the braking distance when speed doubles?','Что происходит с тормозным путём при удвоении скорости?'],[['Den dobles','It doubles','Удваивается'],['Den blir omtrent firedoblet','It becomes about four times longer','Становится примерно в четыре раза длиннее'],['Den er uændret','It is unchanged','Не меняется'],['Den halveres','It is halved','Уменьшается вдвое']],1,['Dobbel fart gir omtrent fire ganger så lang bremselengde.','Double the speed means about four times the braking distance.','Двойная скорость даёт примерно в четыре раза больший тормозной путь.']);
Q('speed',['Omtrent hvor langt kjører du på ett sekund i 80 km/t?','About how far do you travel in one second at 80 km/h?','Сколько примерно вы проезжаете за секунду на скорости 80 км/ч?'],['ca. 8 m','ca. 22 m','ca. 50 m','ca. 80 m'],1,['80 km/t er omtrent 22 meter i sekundet.','80 km/h is about 22 metres per second.','80 км/ч — это около 22 метров в секунду.']);
Q('speed',['Hvordan skal du tilpasse farten ved dårlig sikt?','How should you adjust your speed in poor visibility?','Как нужно выбирать скорость при плохой видимости?'],[['Slik at jeg kan stanse på strekningen jeg ser er fri','So I can stop within the distance I can see is clear','Чтобы успеть остановиться на видимом свободном участке'],['Følge fartsgrensen uansett','Follow the speed limit regardless','Держать разрешённую скорость при любых условиях'],['Kjøre tett på bilen foran','Drive close behind the car ahead','Ехать вплотную за машиной впереди'],['Bruke full lysstyrke og øke farten','Use full beam and speed up','Включить дальний свет и ускориться']],0,['Farten må alltid tilpasses sikt og føre.','Speed must always suit visibility and conditions.','Скорость всегда должна соответствовать видимости и условиям.']);
Q('safe',['Kan du ha et bakovervendt barnesete foran hvis passasjerairbagen er på?','May you use a rear-facing child seat in front if the passenger airbag is on?','Можно ли ставить кресло против хода движения спереди при включённой подушке безопасности?'],[['Nei, airbagen må være slått av','No, the airbag must be switched off','Нет, подушку нужно отключить'],['Ja, alltid','Yes, always','Да, всегда'],['Ja, hvis barnet er over 3 år','Yes, if the child is over 3','Да, если ребёнку больше 3 лет'],['Ja, med ekstra belte','Yes, with an extra belt','Да, с дополнительным ремнём']],0,['Airbagen kan skade barnet alvorlig og må være avslått.','The airbag can seriously injure the child and must be off.','Подушка может серьёзно травмировать ребёнка, её нужно отключить.']);
Q('safe',['Du merker at du blir trett under kjøring. Hva bør du gjøre?','You feel tired while driving. What should you do?','Вы чувствуете усталость за рулём. Что делать?'],[['Stoppe og hvile','Stop and rest','Остановиться и отдохнуть'],['Åpne vinduet og kjøre videre','Open the window and keep driving','Открыть окно и ехать дальше'],['Skru opp musikken','Turn up the music','Сделать музыку громче'],['Øke farten for å komme fram','Speed up to arrive sooner','Ускориться, чтобы быстрее доехать']],0,['Trøtthet øker ulykkesrisikoen. Stopp og hvil.','Tiredness raises crash risk. Stop and rest.','Усталость повышает риск аварии. Остановитесь и отдохните.']);
Q('safe',['Legen har skrevet ut ny medisin. Hva bør du gjøre før du kjører?','Your doctor prescribed a new medicine. What should you do before driving?','Врач выписал новое лекарство. Что сделать перед поездкой?'],[['Sjekke om medisinen påvirker kjøreevnen','Check whether it affects driving ability','Проверить, влияет ли оно на способность водить'],['Kjøre som vanlig','Drive as usual','Ехать как обычно'],['Ta dobbel dose','Take a double dose','Принять двойную дозу'],['Drikke kaffe','Drink coffee','Выпить кофе']],0,['Mange medisiner kan svekke reaksjonsevnen. Les pakningsvedlegget og spør legen.','Many medicines reduce reaction time. Read the leaflet and ask your doctor.','Многие лекарства снижают реакцию. Прочитайте инструкцию и спросите врача.']);
Q('safe',['Hva er minste mønsterdybde på vinterdekk?','What is the minimum tread depth on winter tyres?','Какова минимальная глубина протектора зимних шин?'],['1,6 mm','3 mm','4,5 mm','6 mm'],1,['Vinterdekk skal ha minst 3 mm mønsterdybde.','Winter tyres need at least 3 mm of tread.','У зимних шин протектор должен быть не менее 3 мм.']);
Q('safe',['Hvor stor avstand bør du holde til bilen foran i god sikt?','What distance should you keep to the car ahead in good conditions?','Какую дистанцию до машины впереди нужно держать при хорошей видимости?'],[['Minst 3 sekunder','At least 3 seconds','Не менее 3 секунд'],['Ca. 1 sekund','About 1 second','Около 1 секунды'],['Så tett som mulig','As close as possible','Как можно ближе'],['Én billængde','One car length','Одну длину машины']],0,['Hold minst tre sekunders avstand. Øk den ved dårlig føre.','Keep at least three seconds. Increase it in poor conditions.','Держите не менее трёх секунд. При плохих условиях — больше.']);
Q('safe',['Når kan du bruke tåkelys foran?','When may you use front fog lights?','Когда можно включать передние противотуманные фары?'],[['Ved nedsatt sikt på grunn av tåke eller snø','When visibility is reduced by fog or snow','При плохой видимости из-за тумана или снега'],['Alltid i mørket','Always in the dark','Всегда в темноте'],['I tunnel','In tunnels','В тоннелях'],['Når jeg vil bli sett','Whenever I want to be seen','Когда хочу, чтобы меня заметили']],0,['Tåkelys skal kun brukes når sikten er dårlig.','Fog lights are only for poor visibility.','Противотуманные фары используют только при плохой видимости.']);
Q('safe',['Må du ha varseltrekant i bilen?','Must you carry a warning triangle in the car?','Обязательно ли возить в машине знак аварийной остановки?'],[['Ja, den er påbudt','Yes, it is required','Да, он обязателен'],['Nei, det er frivillig','No, it is optional','Нет, это необязательно'],['Bare om vinteren','Only in winter','Только зимой'],['Bare på motorvei','Only on motorways','Только на трассе']],0,['Varseltrekant er påbudt utstyr.','A warning triangle is mandatory equipment.','Знак аварийной остановки — обязательное оборудование.']);
Q('safe',['Hvilket nødnummer ringer du for ambulanse?','Which emergency number do you call for an ambulance?','По какому номеру вызывать скорую помощь?'],['110','112','113','115'],2,['113 er medisinsk nødhjelp, 112 politi og 110 brann.','113 is medical emergency, 112 police and 110 fire.','113 — скорая помощь, 112 — полиция, 110 — пожарные.']);
Q('safe',['Du kommer til en trafikkulykke. Hva er det første du gjør?','You arrive at a traffic accident. What do you do first?','Вы приехали на место аварии. Что делать в первую очередь?'],[['Sikre stedet og varsle nødetatene','Secure the scene and alert emergency services','Обезопасить место и вызвать службы'],['Kjøre videre','Drive on','Ехать дальше'],['Flytte alle skadde','Move everyone injured','Переместить всех пострадавших'],['Ta bilder','Take photos','Провести фотофиксацию']],0,['Sikre stedet, varsle og hjelp de skadde.','Secure the scene, call for help and assist the injured.','Обезопасьте место, вызовите помощь и помогите пострадавшим.']);
Q('safe',['Kan alkohol under promillegrensen påvirke kjøreevnen?','Can alcohol below the legal limit affect driving ability?','Может ли алкоголь ниже допустимого предела влиять на вождение?'],[['Ja, selv små mengder kan svekke oppmerksomheten','Yes, even small amounts can impair attention','Да, даже небольшое количество может ухудшить внимание'],['Nei, aldri','No, never','Нет, никогда'],['Bare hvis du drikker på tom mage','Only if you drink on an empty stomach','Только натощак'],['Bare om natten','Only at night','Только ночью']],0,['Selv små mengder alkohol påvirker reaksjon og dømmekraft.','Even small amounts of alcohol affect reaction and judgment.','Даже малые дозы алкоголя влияют на реакцию и рассудительность.']);

var lang=0,mode='',cur=0,ans={},mist=JSON.parse(localStorage.getItem('tp_m')||'[]'),tm=0,ti=null,z=1;
function geb(id){return document.getElementById(id)}
function init(){
  var savedLang = localStorage.getItem('tp_l');
  if(savedLang!==null) { lang=parseInt(savedLang); }
  geb('th').onclick=function(){this.classList.toggle('open')};
  var dots=document.querySelectorAll('.dot');
  for(var i=0;i<dots.length;i++){
    dots[i].onclick=function(){
      var t=this.getAttribute('data-t');
      if(t) { document.documentElement.setAttribute('data-theme',t); localStorage.setItem('tp_th',t); }
      else { document.documentElement.removeAttribute('data-theme'); localStorage.removeItem('tp_th'); }
      geb('th').classList.remove('open');
    }
  }
  var savedTh=localStorage.getItem('tp_th');
  if(savedTh) document.documentElement.setAttribute('data-theme',savedTh);
  
  geb('zm1').onclick=function(){z=Math.max(0.8,z-0.1);document.querySelector('main').style.zoom=z};
  geb('zm2').onclick=function(){z=Math.min(1.5,z+0.1);document.querySelector('main').style.zoom=z};
  geb('hb').onclick=goMenu;
  document.querySelector('h1').onclick=goMenu;
  goMenu();
}
function goMenu(){
  mode=''; clearInterval(ti);geb('hb').hidden=true;
  geb('sub').innerText=UI[Object.keys(UI)[lang]].sub;
  var html='<div class="row" style="margin-bottom:12px">';
  var keys=Object.keys(LN);
  for(var i=0;i<keys.length;i++){
    html+='<button class="chip'+(lang===i?' sel':'')+'" onclick="lang='+i+';localStorage.setItem(\'tp_l\','+i+');goMenu()">'+LN[keys[i]]+'</button>';
  }
  html+='</div>';
  var u=UI[Object.keys(UI)[lang]];
  html+='<div class="mi" onclick="startPrac()"><div class="ic">📖</div><div><strong>'+u.prac+'</strong><br><small>'+u.pracD+'</small></div></div>';
  html+='<div class="mi" onclick="startExam()"><div class="ic">⏱️</div><div><strong>'+u.exam+'</strong><br><small>'+u.examD+'</small></div></div>';
  html+='<div class="mi" onclick="startMist()"><div class="ic">⚠️</div><div><strong>'+u.mist+' ('+mist.length+')</strong><br><small>'+u.mistD+'</small></div></div>';
  geb('app').innerHTML=html;
}
function startPrac(){mode='prac';cur=0;ans={};renderQ();}
function startExam(){mode='exam';cur=0;ans={};tm=1800;startTimer();renderQ();}
function startMist(){
  if(mist.length===0){alert(UI[Object.keys(UI)[lang]].none);return;}
  mode='mist';cur=0;ans={};renderQ();
}
function startTimer(){
  clearInterval(ti);
  ti=setInterval(function(){
    tm--;
    var el=geb('timer');
    if(el){var m=Math.floor(tm/60),s=tm%60;el.innerText=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;}
    if(tm<=0){clearInterval(ti);finishExam();}
  },1000);
}
function renderQ(){
  var list=getList();
  var item=list[cur];
  var u=UI[Object.keys(UI)[lang]];
  var html='<div class="meta"><span>'+u.q+' '+(cur+1)+' / '+list.length+'</span>';
  if(mode==='exam'){
    var m=Math.floor(tm/60),s=tm%60;
    html+='<span id="timer" style="font-weight:700;color:var(--ac)">'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s+'</span>';
  }
  html+='</div>';
  html+='<div class="bar"><i style="width:'+((cur+1)/list.length*100)+'%"></i></div>';
  
  var qn='<div class="qn">';
  for(var i=0;i<list.length;i++){
    var st='';
    if(ans[i]!==undefined) st=ans[i]===list[i].a?' c':' w';
    if(i===cur) st+=' cur';
    qn+='<button class="qb'+st+'" onclick="cur='+i+';renderQ()">'+(i+1)+'</button>';
  }
  html+=qn+'</div>';
  
  if(item.s) html+='<div class="sign">'+item.s+'</div>';
  html+='<div class="q">'+(Array.isArray(item.q)?item.q[lang]:item.q)+'</div>';
  
  var opts=item.o;
  var answered=(ans[cur]!==undefined);
  for(var i=0;i<opts.length;i++){
    var optText=Array.isArray(opts[i])?opts[i][lang]:opts[i];
    var cls='opt';
    if(answered){
      if(i===item.a) cls+=' ok';
      else if(i===ans[cur]) cls+=' bad';
    }
    html+='<button class="'+cls+'" '+(answered?'disabled':'')+' onclick="answer('+i+')">'+optText+'</button>';
  }
  
  if(answered && item.e){
    html+='<div class="exp">'+(Array.isArray(item.e)?item.e[lang]:item.e)+'</div>';
  }
  
  html+='<div class="nav"><button class="nb" '+(cur===0?'disabled':'')+' onclick="cur--;renderQ()">←</button>';
  if(cur<list.length-1) html+='<button class="btn" onclick="cur++;renderQ()">'+u.next+'</button>';
  else html+='<button class="btn" onclick="finishExam()">'+u.fin+'</button>';
  html+='</div>';
  
  geb('hb').hidden=false;geb('hb').innerText=u.menu;
  geb('app').innerHTML=html;
}
function answer(idx){
  ans[cur]=idx;
  var list=getList();
  var item=list[cur];
  if(idx!==item.a){
    var idStr=item.t+'_'+(Array.isArray(item.q)?item.q[0]:item.q);
    if(mist.indexOf(idStr)===-1){mist.push(idStr);localStorage.setItem('tp_m',JSON.stringify(mist));}
  }
  renderQ();
}
function getList(){
  if(mode==='mist'){
    return D.filter(function(item){
      var idStr=item.t+'_'+(Array.isArray(item.q)?item.q[0]:item.q);
      return mist.indexOf(idStr)!==-1;
    });
  }
  if(mode==='exam'){
    return D.slice(0,20);
  }
  return D;
}
function finishExam(){
  clearInterval(ti);
  var list=getList();
  var correct=0;
  for(var i=0;i<list.length;i++){
    if(ans[i]===list[i].a) correct++;
  }
  var pct=Math.round((correct/list.length)*100);
  var pass=pct>=85;
  var u=UI[Object.keys(UI)[lang]];
  var html='<div class="vc"><div class="vw">'+(pass?u.pass:u.fail)+'</div><div class="vt">'+correct+' / '+list.length+' ('+pct+'%)</div></div>';
  html+='<button class="btn" style="width:100%" onclick="goMenu()">'+u.menu+'</button>';
  geb('hb').hidden=true;
  geb('app').innerHTML=html;
}

document.addEventListener("DOMContentLoaded", init);