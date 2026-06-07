/** @description Оружие */

//TODO Сделать функцию проверки владения оружием конкретным персонажем
//TODO Учесть влияние размера существа на владение оружием

export enum EWeaponClass {
	'simple.melee' = 'weapon.class.simple.melee',
	'simple.ranged' = 'weapon.class.simple.ranged',
	'martial.melee' = 'weapon.class.martial.melee',
	'martial.ranged' = 'weapon.class.martial.ranged',
}

enum EDamageType {
	none,
	bludgeoning,  // Дробящий
	piercing,     // Колющий
	slashing,     // Рубящий
}

export enum EWeapon {
	unarmed = 'weapon.unarmed',         // Безоружный удар

	club = 'weapon.club',               // Дубинка
	dagger = 'weapon.dagger',           // Кинжал
	greatclub = 'weapon.greatclub',     // Палица
	handaxe = 'weapon.handaxe',         // Ручной топор
	javelin = 'weapon.javelin',         // Метательное копьё
	lighthammer = 'weapon.lighthammer', // Лёгкий молот
	mace = 'weapon.mace',               // Булава
	quaterstaff = 'weapon.quaterstaff', // Боевой посох
	sickle = 'weapon.sickle',           // Серп
	spear = 'weapon.spear',             // Копьё

	dart = 'weapon.dart',               // Дротик
	lightcrossbow = 'weapon.lightcrossbow', // Лёгкий арбалет
	shortbow = 'weapon.shortbow',       // Короткий лук
	sling = 'weapon.sling',             // Праща

	battleaxe = 'weapon.battleaxe',     // Боевой топор
	flail = 'weapon.flail',             // Цеп
	glaive = 'weapon.glaive',           // Алебарда
	greataxe = 'weapon.greataxe',       // Секира
	greatsword = 'weapon.greatsword',   // Двуручный меч
	halberd = 'weapon.halberd',         // Алебарда
	lance = 'weapon.lance',             // Длинное копьё
	longsword = 'weapon.longsword',     // Длинный меч
	maul = 'weapon.maul',               // Молот
	morningstar = 'weapon.morningstar', // Моргенштерн
	pike = 'weapon.pike',               // Пика
	rapier = 'weapon.rapier',           // Рапира
	scimitar = 'weapon.scimitar',       // Скимитар
	shortsword = 'weapon.shortsword',   // Короткий меч
	trident = 'weapon.trident',         // Трезубец
	warhammer = 'weapon.warhammer',     // Боевой молот
	warpick = 'weapon.warpick',         // Боевая кирка
	whip = 'weapon.whip',               // Кнут

	blowgun = 'weapon.blowgun',         // Духовая трубка
	handcrossbow = 'weapon.handcrossbow',   // Ручной арбалет
	heavycrossbow = 'weapon.heavycrossbow', // Тяжёлый арбалет
	longbow = 'weapon.longbow',         // Длинный лук
	musket = 'weapon.musket',           // Мушкет
	pistol = 'weapon.pistol',           // Пистоль
}

/** Свойства оружия */
export enum EWeaponProp {
	light,      // Лёгкое
	finesse,    // Фехтовальное
	thrown,     // Метательное
	twohanded,  // Двуручное
	versatile,  // Универсальное
	ammunition, // Боеприпас
	loading,    // Перезарядка
	heavy,      // Тяжёлое
	reach,      // Досягаемость
}

/** Оружейные приёмы */
export enum EWeaponMastery {
	cleave,   // Прорубание
	graze,    // Задевание
	nick,     // Выпад
	push,     // Толкание
	sap,      // Изнурение
	slow,     // Замедление
	topple,   // Опрокидывание
	vex,      // Подавление
}

type TProp = { prop: EWeaponProp.light }
	| { prop: EWeaponProp.finesse }
	| { prop: EWeaponProp.twohanded }
	| { prop: EWeaponProp.loading }
	| { prop: EWeaponProp.heavy }
	| { prop: EWeaponProp.reach }
	| {
		prop: EWeaponProp.thrown
		normalRange: number  // Нормальная дистанция
		maxRange: number     // Максимальная дистанция
	}
	| {
		prop: EWeaponProp.versatile
		damage: number       // Урон при двуручном использовании
	}
	| {
		prop: EWeaponProp.ammunition
		normalRange: number  // Нормальная дистанция
		maxRange: number     // Максимальная дистанция
	}


export type TWeapon = {
	id: EWeapon
	group: EWeaponClass      // Класс оружиия
	name: string             // Название
	cost: number             // Стоимость в золотых монетах
	damage: number           // Урон dX
	damageDiceCount: number  // Количество дайсов урона: Xd…
	damageType: EDamageType  // Тип урона
	weight: number           // Вес в фунтах
	props: TProp[]           // Свойства
	mastery: EWeaponMastery  // Оружейный приём

}

export const weaponClasses: { classType: EWeaponClass, name: string }[] = [{
	classType: EWeaponClass['simple.melee'],
	name: 'Простое рукопашное'
}, {
	classType: EWeaponClass['simple.ranged'],
	name: 'Простое дальнобойное'
}, {
	classType: EWeaponClass['martial.melee'],
	name: 'Воинское рукопашное'
}, {
	classType: EWeaponClass['martial.ranged'],
	name: 'Воинское дальнобойное'
}]

export const masteryProperties: { id: EWeaponMastery, name: string, description: string }[] = [{
	id: EWeaponMastery.cleave,
	name: 'Прорубание',
	description: 'Раз в ход, попадая по существу рукопашной атакой, можете атаковать второе существо в 5 фт. от первого и в вашей досягаемости. Не добавляйте модификатор характеристики к урону, если только он не отрицательный',
}, {
	id: EWeaponMastery.graze,
	name: 'Задевание',
	description: 'При промахе по существу можете нанести ему урон, равный модификатору характеристики, которую использовали для атаки',
}, {
	id: EWeaponMastery.nick,
	name: 'Выпад',
	description: 'Раз в ход доп. атаку лёгким оружием можете совершить не бонусным действием, а частью действия {Атака}',
}, {
	id: EWeaponMastery.push,
	name: 'Толкание',
	description: 'Попав по существу, можете оттолкнуть его до 10 фт. от себя, если оно не крупнее размера {Большой}',
}, {
	id: EWeaponMastery.sap,
	name: 'Изнурение',
	description: 'Если вы попали по существу, у него появляется помеха на следующую атаку до начала вашего следующего хода',
}, {
	id: EWeaponMastery.slow,
	name: 'Замедление',
	description: 'Попав по существу и нанеся урон, можете уменьшить его скорость на 10 фт. до начала вашего следующего хода. Замедление от нескольких таких ударов не превышает 10 фт.',
}, {
	id: EWeaponMastery.topple,
	name: 'Опрокидывание',
	description: 'Попав по существу, можете заставить его совершить спасбросок Телосложения (сл. 8 + мод. характеристики, с которой совершалась атака + {profBonus:}). При провале существо получает состояние {Лежащий ничком}',
}, {
	id: EWeaponMastery.vex,
	name: 'Подавление',
	description: 'Попав по существу и нанеся урон, получаете преимущество на следующую атаку по этому существу до конца своего следующего хода',
}]

export const fullWeaponsList: TWeapon[] = [
	// Простое рукопашное
	{
		id: EWeapon.club,
		group: EWeaponClass['simple.melee'],
		name: 'Дубинка',
		cost: .1,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: [generateProp(EWeaponProp.light)],
		mastery: EWeaponMastery.slow,
	}, {
		id: EWeapon.dagger,
		group: EWeaponClass['simple.melee'],
		name: 'Кинжал',
		cost: 2,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 1,
		props: [
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.thrown, 20, 60),
		],
		mastery: EWeaponMastery.nick,
	}, {
		id: EWeapon.greatclub,
		group: EWeaponClass['simple.melee'],
		name: 'Палица',
		cost: .2,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 10,
		props: [generateProp(EWeaponProp.twohanded)],
		mastery: EWeaponMastery.push,
	}, {
		id: EWeapon.handaxe,
		group: EWeaponClass['simple.melee'],
		name: 'Ручной топор',
		cost: 5,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 2,
		props: [
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.thrown, 20, 60),
		],
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.javelin,
		group: EWeaponClass['simple.melee'],
		name: 'Метательное копьё',
		cost: .5,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [generateProp(EWeaponProp.thrown, 30, 120)],
		mastery: EWeaponMastery.slow,
	}, {
		id: EWeapon.lighthammer,
		group: EWeaponClass['simple.melee'],
		name: 'Легкий молот',
		cost: 2,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: [
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.thrown, 20, 60),
		],
		mastery: EWeaponMastery.nick,
	}, {
		id: EWeapon.mace,
		group: EWeaponClass['simple.melee'],
		name: 'Булава',
		cost: 5,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 4,
		props: [],
		mastery: EWeaponMastery.sap,
	}, {
		id: EWeapon.quaterstaff,
		group: EWeaponClass['simple.melee'],
		name: 'Боевой посох',
		cost: .2,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 4,
		props: [generateProp(EWeaponProp.versatile, 8)],
		mastery: EWeaponMastery.topple,
	}, {
		id: EWeapon.sickle,
		group: EWeaponClass['simple.melee'],
		name: 'Серп',
		cost: 1,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 2,
		props: [generateProp(EWeaponProp.light)],
		mastery: EWeaponMastery.nick,
	}, {
		id: EWeapon.spear,
		group: EWeaponClass['simple.melee'],
		name: 'Копье',
		cost: 1,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 3,
		props: [
			generateProp(EWeaponProp.versatile, 8),
			generateProp(EWeaponProp.thrown, 20, 60),
		],
		mastery: EWeaponMastery.sap,
	},

	// Простое дальнобойное
	{
		id: EWeapon.dart,
		group: EWeaponClass['simple.ranged'],
		name: 'Дротик',
		cost: .05,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: .25,
		props: [
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.thrown, 20, 60),
		],		
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.lightcrossbow,
		group: EWeaponClass['simple.ranged'],
		name: 'Лёгкий арбалет',
		cost: 25,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 5,
		props: [
			generateProp(EWeaponProp.ammunition, 80, 320),
			generateProp(EWeaponProp.loading),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.slow,
	}, {
		id: EWeapon.shortbow,
		group: EWeaponClass['simple.ranged'],
		name: 'Короткий лук',
		cost: 25,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [
			generateProp(EWeaponProp.ammunition, 80, 320),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.sling,
		group: EWeaponClass['simple.ranged'],
		name: 'Праща',
		cost: .1,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 0,
		props: [generateProp(EWeaponProp.ammunition, 30, 120)],
		mastery: EWeaponMastery.slow,
	},

	// Воинское рукопашное
	{
		id: EWeapon.battleaxe,
		group: EWeaponClass['martial.melee'],
		name: 'Боевой топор',
		cost: 10,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 4,
		props: [generateProp(EWeaponProp.versatile, 10)],
		mastery: EWeaponMastery.topple,
	}, {
		id: EWeapon.flail,
		group: EWeaponClass['martial.melee'],
		name: 'Цеп',
		cost: 10,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: [],
		mastery: EWeaponMastery.sap,
	}, {
		id: EWeapon.glaive,
		group: EWeaponClass['martial.melee'],
		name: 'Алебарда',
		cost: 20,
		damage: 10,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 6,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.graze,
	}, {
		id: EWeapon.greataxe,
		group: EWeaponClass['martial.melee'],
		name: 'Секира',
		cost: 30,
		damage: 12,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 7,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.cleave,
	}, {
		id: EWeapon.greatsword,
		group: EWeaponClass['martial.melee'],
		name: 'Двуручный меч',
		cost: 50,
		damage: 6,
		damageDiceCount: 2,
		damageType: EDamageType.slashing,
		weight: 6,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.graze,
	}, {
		id: EWeapon.halberd,
		group: EWeaponClass['martial.melee'],
		name: 'Глефа',
		cost: 20,
		damage: 10,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 6,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.cleave,
	}, {
		id: EWeapon.lance,
		group: EWeaponClass['martial.melee'],
		name: 'Длинное копьё',
		cost: 10,
		damage: 12,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 6,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),  // Когда не верхом
		],
		mastery: EWeaponMastery.topple,
	}, {
		id: EWeapon.longsword,
		group: EWeaponClass['martial.melee'],
		name: 'Длинный меч',
		cost: 15,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 3,
		props: [generateProp(EWeaponProp.versatile, 10)],
		mastery: EWeaponMastery.sap,
	}, {
		id: EWeapon.maul,
		group: EWeaponClass['martial.melee'],
		name: 'Молот',
		cost: 10,
		damage: 6,
		damageDiceCount: 2,
		damageType: EDamageType.bludgeoning,
		weight: 10,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.topple,
	}, {
		id: EWeapon.morningstar,
		group: EWeaponClass['martial.melee'],
		name: 'Моргенштерн',
		cost: 15,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 4,
		props: [],
		mastery: EWeaponMastery.sap,
	}, {
		id: EWeapon.pike,
		group: EWeaponClass['martial.melee'],
		name: 'Пика',
		cost: 5,
		damage: 10,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 18,
		props: [
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.push,
	}, {
		id: EWeapon.rapier,
		group: EWeaponClass['martial.melee'],
		name: 'Рапира',
		cost: 25,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [generateProp(EWeaponProp.finesse)],
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.scimitar,
		group: EWeaponClass['martial.melee'],
		name: 'Скимитар',
		cost: 25,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 3,
		props: [
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.light),
		],
		mastery: EWeaponMastery.nick,
	}, {
		id: EWeapon.shortsword,
		group: EWeaponClass['martial.melee'],
		name: 'Короткий меч',
		cost: 10,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.light),
		],
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.trident,
		group: EWeaponClass['martial.melee'],
		name: 'Трезубец',
		cost: 5,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 4,
		props: [
			generateProp(EWeaponProp.thrown, 20, 60),
			generateProp(EWeaponProp.versatile, 10),
		],
		mastery: EWeaponMastery.topple,
	}, {
		id: EWeapon.warhammer,
		group: EWeaponClass['martial.melee'],
		name: 'Боевой молот',
		cost: 15,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 5,
		props: [generateProp(EWeaponProp.versatile, 10)],
		mastery: EWeaponMastery.push,
	}, {
		id: EWeapon.warpick,
		group: EWeaponClass['martial.melee'],
		name: 'Боевая кирка',
		cost: 5,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [generateProp(EWeaponProp.versatile, 10)],
		mastery: EWeaponMastery.sap,
	}, {
		id: EWeapon.whip,
		group: EWeaponClass['martial.melee'],
		name: 'Кнут',
		cost: 2,
		damage: 4,
		damageDiceCount: 1,
		damageType: EDamageType.slashing,
		weight: 3,
		props: [
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.reach),
		],
		mastery: EWeaponMastery.slow,
	},

	// Воинское дальнобойное
	{
		id: EWeapon.blowgun,
		group: EWeaponClass['martial.ranged'],
		name: 'Духовая трубка',
		cost: 10,
		damage: 1,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 1,
		props: [
			generateProp(EWeaponProp.ammunition, 25, 100),
			generateProp(EWeaponProp.loading),
		],
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.handcrossbow,
		group: EWeaponClass['martial.ranged'],
		name: 'Ручной арбалет',
		cost: 75,
		damage: 6,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 3,
		props: [
			generateProp(EWeaponProp.ammunition, 30, 120),
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.loading),
		],
		mastery: EWeaponMastery.vex,
	}, {
		id: EWeapon.heavycrossbow,
		group: EWeaponClass['martial.ranged'],
		name: 'Тяжёлый арбалет',
		cost: 50,
		damage: 10,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 18,
		props: [
			generateProp(EWeaponProp.ammunition, 100, 400),
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.loading),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.push,
	}, {
		id: EWeapon.longbow,
		group: EWeaponClass['martial.ranged'],
		name: 'Длинный лук',
		cost: 50,
		damage: 8,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [
			generateProp(EWeaponProp.ammunition, 150, 600),
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.slow,
	}, {
		id: EWeapon.musket,
		group: EWeaponClass['martial.ranged'],
		name: 'Мушкет',
		cost: 500,
		damage: 12,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 10,
		props: [
			generateProp(EWeaponProp.ammunition, 40, 120),
			generateProp(EWeaponProp.loading),
			generateProp(EWeaponProp.twohanded),
		],
		mastery: EWeaponMastery.slow,
	}, {
		id: EWeapon.pistol,
		group: EWeaponClass['martial.ranged'],
		name: 'Пистоль',
		cost: 250,
		damage: 10,
		damageDiceCount: 1,
		damageType: EDamageType.piercing,
		weight: 3,
		props: [
			generateProp(EWeaponProp.ammunition, 30, 90),
			generateProp(EWeaponProp.loading),
		],
		mastery: EWeaponMastery.vex,
	},
] as const

function generateProp(prop: EWeaponProp.versatile, damage: number): Extract<TProp, { prop: EWeaponProp.versatile }>
function generateProp(prop: EWeaponProp.thrown | EWeaponProp.ammunition, normal: number, max: number): Extract<TProp, { prop: EWeaponProp.thrown }>
function generateProp<P extends EWeaponProp.light | EWeaponProp.finesse | EWeaponProp.twohanded | EWeaponProp.loading | EWeaponProp.heavy | EWeaponProp.reach>(prop: P): Extract<TProp, { prop: P }>
function generateProp(prop: EWeaponProp, ...params: number[]): TProp {
	switch(prop) {
		case EWeaponProp.light:
		case EWeaponProp.finesse:
		case EWeaponProp.twohanded:
		case EWeaponProp.loading:
		case EWeaponProp.heavy:
		case EWeaponProp.reach:
			return { prop }

		case EWeaponProp.thrown:
		case EWeaponProp.ammunition:
			return {
				prop,
				normalRange: <number>params[0] ?? 0,
				maxRange: <number>params[1] ?? 0
			}

		case EWeaponProp.versatile:
			return {
				prop,
				damage: <number>params[0]
			}
	}
}

export function getWeaponsByClass(weaponClass: EWeaponClass): TWeapon[] {
	return fullWeaponsList.filter(w => w.group == weaponClass)
}

export function getWeaponByEnum(weapon: EWeapon): TWeapon {
	return fullWeaponsList.find(w => w.id == weapon)!
}

export function damageTypeName(type: EDamageType): string {
	switch(type) {
		case EDamageType.none: return ''
		case EDamageType.bludgeoning: return 'дробящий'
		case EDamageType.piercing: return 'колющий'
		case EDamageType.slashing: return 'рубящий'
	}
}

export const simpleWeapons: EWeaponClass[] = [EWeaponClass['simple.melee'], EWeaponClass['simple.ranged']]
export const martialWeapons: EWeaponClass[] = [EWeaponClass['martial.melee'], EWeaponClass['martial.ranged']]
export const allWeapons: EWeaponClass[] = [...simpleWeapons, ...martialWeapons]