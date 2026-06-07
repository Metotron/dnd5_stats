/** @description Воззвания колдуна */

import type { TBaseSpeciesDescription } from './species'

export enum EWarlockInvocation {
	agonizingblast = 'invocation.agonizingblast',   // Мучительный взрыв
	armorofshadows = 'invocation.armorofshadows',   // Доспехи теней
	ascendantstep = 'invocation.ascendantstep',     // Восходящий шаг
	devilssight = 'invocation.devilssight',         // Дьявольский взгляд
	devouringblade = 'invocation.devouringblade',   // Пожирающий клинок
	eldritchmind = 'invocation.eldritchmind',       // Мистический разум
	eldritchsmite = 'invocation.eldritchsmite',     // Мистическая кара
	eldritchspear = 'invocation.eldritchspear',     // Мистическое копьё
	fiendishvigor = 'invocation.fiendishvigor',     // Мощь исчадия
	gazeoftwominds = 'invocation.gazeoftwominds',   // Взор двух умов
	giftofthedepths = 'invocation.giftofthedepths', // Дар глубин
	giftoftheprotectors = 'invocation.giftoftheprotectors', // Дар защитников
	investment = 'invocation.investment',           // Дар мастера цепи
	lessonsofthefirstonce = 'invocation.lessonsofthefirstonce', // Уроки первородных
	lifedrinker = 'invocation.lifedrinker',         // Пьющий жизнь
	maskofmanyfaces = 'invocation.maskofmanyfaces', // Маска многих лиц
	masterofmyriadforms = 'invocation.masterofmyriadforms', // Мастер бесчисленных обликов
	mistyvisions = 'invocation.mistyvisions',       // Туманные видения
	onewithshadows = 'invocation.onewithshadows',   // Единение с тенями
	otherwordlyleap = 'invocation.otherwordlyeap',  // Потусторонний прыжок
	pactoftheblade = 'invocation.pactoftheblade',   // Договор клинка
	pactofthechain = 'invocation.pactofthechain',   // Договор цепи
	pactofthetome = 'invocation.pactofthetome',     // Договор гримуара
	repellingblast = 'invocation.repellingblast',   // Отталкивающий заряд
	thirstingblade = 'invocation.thirstingblade',   // Жаждущий клинок
	visionsofdistantrealms = 'invocation.visionsofdistantrealms',  // Видения далёких королевств
	whispersofthegrave = 'invocation.whispersofthegrave',  // Могильный шёпот
	witchsight = 'invocation.witchsight',           // Ведьмачий взор
}

export type TWarlockInvocation = {
	id: EWarlockInvocation
	name: string
	prerequisite?: { level: number }
	diff?: Partial<TBaseSpeciesDescription>
	repeatable?: true  // Воззвание можно выбирать несколько раз
}

export const fullWarlockInvocationsList: TWarlockInvocation[] = [{
	id: EWarlockInvocation.agonizingblast,
	name: 'Мучительный взрыв',
	prerequisite: { level: 2 },
	diff: {
		features: ['Выберите один известный заговор колдуна, наносящий урон. К его урону можете добавлять {mod:Харизмы}'],
	},
	repeatable: true,
}, {
	id: EWarlockInvocation.armorofshadows,
	name: 'Доспехи теней',
	diff: {
		features: ['Можете накладывать на себя {spell:Доспехи мага}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.ascendantstep,
	name: 'Восходящий шаг',
	prerequisite: { level: 5 },
	diff: {
		features: ['Можете накладывать на себя заклинание {spell:Левитация}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.devilssight,
	name: 'Дьявольский взгляд',
	prerequisite: { level: 2 },
	diff: {
		features: ['Можете нормально видеть в пределах 120 фт. в {Тусклом свете} и {Тьме}, как магической, так и немагической'],
	},
}, {
	id: EWarlockInvocation.devouringblade,
	name: 'Пожирающий клинок',
	prerequisite: { level: 12 },
	diff: {
		features: ['Дополнительная атака от воззвания {Жаждущий клинок} позволяет совершить 2 атаки вместо 1'],
	},
}, {
	id: EWarlockInvocation.eldritchmind,
	name: 'Мистический разум',
	diff: {
		features: ['Получаете преимущество на спасброски {Телосложения} для поддержания концентрации'],
	},
}, {
	id: EWarlockInvocation.eldritchsmite,
	name: 'Мистическая кара',
	prerequisite: { level: 5 },
	diff: {
		features: ['Раз в ход, попадая по существу своим оружием договора, можете потратить ячейку заклинаний {Магии договора}, чтобы нанести цели дополнительно d8 урона силовым полем, плюс ещё d8 за каждый уровень ячейки, а также наложить на цель состояние {Лежащий ничком}, если её размер не больше {Огромного}'],
	},
}, {
	id: EWarlockInvocation.eldritchspear,
	name: 'Мистическое копьё',
	prerequisite: { level: 2 },
	diff: {
		features: ['Выберите один известный заговор колдуна с дистанцией 10+ фт., наносящий урон. Когда вы его накладываете, то его дальность увеличивается на {level:30:0} фт.'],
	},
	repeatable: true,
}, {
	id: EWarlockInvocation.fiendishvigor,
	name: 'Мощь исчадия',
	prerequisite: { level: 2 },
	diff: {
		features: ['Можете наложить на себя заклинание {spell:Псевдожизнь}, не тратя ячейку заклинания. Когда вы это делаете, не бросайте кость, а получите максимум временных хитов от этой кости'],
	},
}, {
	id: EWarlockInvocation.gazeoftwominds,
	name: 'Взор двух умов',
	prerequisite: { level: 5 },
	diff: {
		features: [
			'Бонусным действием можете коснуться согласного существа, и до конца своего следующего хода воспринимать всё его чувствами. Затем можете продлевать эту связь бонусным действием, если находитесь на одном плане',
			'При восприятии чувствами другого существа вы получаете все эффекты от особых чувств, которыми оно обладает',
			'Если вы в 60 фт. друг от друга, можете накладывать заклинания, как если бы находились в своём пространстве или пространстве этого существа',
		],
	},
}, {
	id: EWarlockInvocation.giftofthedepths,
	name: 'Дар глубин',
	prerequisite: { level: 5 },
	diff: {
		features: ['Можете дышать под водой и получаете скорость плавания равную вашей обычной скорости. Можете один раз после продолжительного отдыха наложить заклинание {spell:Подводное дыхание}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.giftoftheprotectors,
	name: 'Дар защитников',
	prerequisite: { level: 9 },
	diff: {
		features: ['Когда вы призываете {Книгу теней}, в ней появляется новая страница. С вашего разрешения существо может действием записать на ней своё имя. Количество имён — {mod:Харизмы:min1}. Когда хиты существа, чьё имя записано на странице, опускаются до 0, но существо не убито, оно магически получает 1 хит. Если это произошло, больше никто не может восстановить хиты, пока вы не завершите продолжительный отдых. Действием {Магия} вы можете стереть имя со страницы, коснувшись её'],
	},
}, {
	id: EWarlockInvocation.investment,
	name: 'Дар мастера цепи',
	prerequisite: { level: 5 },
	diff: {
		features: [
			'Когда накладываете заклинание {spell:Поиск фамильяра}, вы даруете ему особые эффекты:',
			'1) Фамильяр получает скорость полёта или плавания (на ваш выбор), равную 40 фт.',
			'2) Бонусным действием можете приказать фамильяру совершить действие {Атака}',
			'3) Когда фамильяр наносит дробящий, колющий или рубящий урон, можете указать, что вместо этого он наносит урон некротической энергией или излучением',
			'4) Если фамильяр заставляет существо совершить спасбросок, то его сложность равна сложности спасброска ваших заклинаний',
			'5) Когда фамильяр получает урон, можете реакцией даровать ему сопротивление к этому урону',
		],
	},
}, {
	id: EWarlockInvocation.lessonsofthefirstonce,
	name: 'Уроки первородных',
	prerequisite: { level: 2 },
	diff: {
		features: ['Получите одну черту происхождения'],
	},
	repeatable: true,
}, {
	id: EWarlockInvocation.lifedrinker,
	name: 'Пьющий жизнь',
	prerequisite: { level: 9 },
	diff: {
		features: ['Раз в ход, попадая по существу своим оружием договора, можете нанести дополнительно d6 некротического, психического урона или урона излучением, также можете потратить и бросить одну кость хитов, чтобы восстановить здоровье, равное выпавшему значению + {mod:Телосложения} (минимум 1 хитпойнт)'],
	},
}, {
	id: EWarlockInvocation.maskofmanyfaces,
	name: 'Маска многих лиц',
	prerequisite: { level: 2 },
	diff: {
		features: ['Можете накладывать заклинание {spell:Маскировка}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.masterofmyriadforms,
	name: 'Мастер бесчисленных обликов',
	prerequisite: { level: 5 },
	diff: {
		features: ['Можете накладывать заклинание {spell:Смена обличья}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.mistyvisions,
	name: 'Туманные видения',
	prerequisite: { level: 2 },
	diff: {
		features: ['Можете накладывать заклинание {spell:Безмолвный образ}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.onewithshadows,
	name: 'Единение с тенями',
	prerequisite: { level: 5 },
	diff: {
		features: ['Находясь в {Тусклом свете} или во {Тьме}, можете наложить на себя заклинание {spell:Невидимость}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.otherwordlyleap,
	name: 'Потусторонний прыжок',
	prerequisite: { level: 2 },
	diff: {
		features: ['Можете накладывать на себя заклинание {spell:Прыжок}, не тратя ячейку заклинания'],
	},
}, {
	id: EWarlockInvocation.pactoftheblade,
	name: 'Договор клинка',
	diff: {
		features: [
			'Бонусным действием можете создать оружие договора в своей руке или создать связь с магическим оружием, которого касаетесь. Нельзя создать связь с магическим оружием, на которое кто-то настроен, или если у другого колдуна есть с ним связь. Пока связь не закончится, у вас есть владение этим оружием и можете использовать его для заклинательной фокусировки.',
			'Атакуя оружием, с которым вы связаны, можете использовать {mod:Харизмы} вместо {mod:Силы}, также можете сделать, чтобы оружие вместо нормального наносило некротический, психический урон или урон излучением',
			'Связь с оружием заканчивается, если: 1) вы снова совершаете это бонусное действие; 2) оружие как минимум 1 минуту находится дальше 5 фт. от вас; 3) если вы умерли. Созданное оружие исчезает, если связь прервана'
		],
	},
}, {
	id: EWarlockInvocation.pactofthechain,
	name: 'Договор цепи',
	diff: {
		features: [
			'Вы знаете заклинание {spell:Поиск фамильяра} и можете накладывать его действием {Магия}, не тратя ячейку заклинаний',
			'Накладывая заклинание, можете выбрать для фамильяра обычную форму или одну из специальных: {бес}, {псевдодракон}, {квазит}, {скелет}, {слаад головастик}, {сфинкс чудес}, {спрайт}, {ядовитая змея}.',
			'Совершая действие {Атака}, можете истратить одну из своих атак, чтобы позволить фамильяру атаковать с помощью его реакции',
		],
	},
}, {
	id: EWarlockInvocation.pactofthetome,
	name: 'Договор гримуара',
	diff: {
		features: [
			'После любого отдыха вы создаёте в своей руке книгу. Эта {Книга теней} содержит магию, доступную только вам; можете использовать её для заклинательной фокусировки. Книга исчезает, если вы создаёте другую, или если вы умерли',
			'Когда книга появляется, выберите 3 заговора и 2 заклинания 1 уровня с меткой «ритуал», заклинания должны быть не теми, которые вы уже подготовили. Пока книга рядом с вами, эти заклинания считаются подготовленными и считаются заклинаниями колдуна',
		],
	},
}, {
	id: EWarlockInvocation.repellingblast,
	name: 'Отталкивающий заряд',
	prerequisite: { level: 2 },
	repeatable: true,
	diff: {
		features: ['Выберите один известный вас заговор колдуна, требующий броска атаки. Поражая существо не крупнее {Большого}, можете оттолкнуть его в направлении от себя на 10 фт.'],
	},
}, {
	id: EWarlockInvocation.thirstingblade,
	name: 'Жаждущий клинок',
	prerequisite: { level: 5 },
	diff: {
		features: ['Получаете доп. атаку для своего оружия договора: можете атаковать дважды, совершая действие {Атака} этим оружием'],
	},
}, {
	id: EWarlockInvocation.visionsofdistantrealms,
	name: 'Видения далёких королевств',
	prerequisite: { level: 9 },
	diff: {
		features: ['Можете накладывать заклинание {spell:Магический глаз}, не тратя ячейку заклинаний'],
	},
}, {
	id: EWarlockInvocation.whispersofthegrave,
	name: 'Могильный шёпот',
	prerequisite: { level: 7 },
	diff: {
		features: ['Можете накладывать заклинание {spell:Разговор с мёртвыми}, не тратя ячейку заклинаний'],
	},
}, {
	id: EWarlockInvocation.witchsight,
	name: 'Ведьмачий взор',
	prerequisite: { level: 15 },
	diff: {
		features: ['Вы получаете {Истинное зрение} в пределах 30 фт.'],
	},
}]