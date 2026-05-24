//TODO Сделать функцию проверки владения оружием конкретным персонажем
//TODO Учесть влияние размера существа на владение оружием

export enum EWeaponClass {
	'simpe.melee',
	'simple.ranged',
	'martial.melee',
	'martial.ranged'
}

enum EDamageType {
	none,
	bludgeoning,  // Дробящий
	piercing,     // Колющий
	slashing      // Рубящий

}

export enum EWeapon {
	quaterstaff,   // Боевой посох
	mace,          // Булава
	club,          // Дубинка
	dagger,        // Кинжал
	spear,         // Копьё
	lighthammer,   // Лёгкий молот
	javelin,       // Метательное копьё
	greatclub,     // Палица
	handaxe,       // Ручной топор
	sickle,        // Серп
	unarmed,       // Безоружный удар

	lightcrossbow, // Лёгкий арбалет
	dart,          // Дротик
	shortbow,      // Короткий лук
	sling,         // Праща

	glaive,        // Алебарда
	warpick,       // Боевая кирка
	warhammer,     // Боевой молот
	battleaxe,     // Боевой топор
	halberd,       // Глефа
	greatsword,    // Двуручный меч
	lance,         // Длинное копьё
	longsword,     // Длинный меч
	whip,          // Кнут
	shortsword,    // Короткий меч
	maul,          // Молот
	morningstar,   // Моргенштерн
	pike,          // Пика
	rapier,        // Рапира
	greataxe,      // Секира
	scimitar,      // Скимитар
	trident,       // Трезубец
	flail,         // Цеп

	handcrossbow,  // Ручной арбалет
	heavycrossbow, // Тяжёлый арбалет
	longbow,       // Длинный лук
	blowgun,       // Духовая трубка
	net            // Сеть
}

enum EProp {
	light,      // Лёгкое
	finesse,    // Фехтовальное
	thrown,     // Метательное
	twohanded,  // Двуручное
	versatile,  // Универсальное
	ammunition, // Боеприпас
	loading,    // Перезарядка
	heavy,      // Тяжёлое
	reach,      // Досягаемость
	special,    // Особое
}

type TProp = { prop: EProp.light }
	| { prop: EProp.finesse }
	| { prop: EProp.twohanded }
	| { prop: EProp.loading }
	| { prop: EProp.heavy }
	| { prop: EProp.reach }
	| { prop: EProp.special }
	| {
		prop: EProp.thrown
		normalRange: number  // Нормальная дистанция
		maxRange: number     // Максимальная дистанция
	}
	| {
		prop: EProp.versatile
		damage: number       // Урон при двуручном использовании
	}
	| {
		prop: EProp.ammunition
		normalRange: number  // Нормальная дистанция
		maxRange: number     // Максимальная дистанция
	}


export type TWeapon = {
	id: EWeapon
	group: EWeaponClass      // Класс оружиия
	name: string             // Название
	cost: number             // Стоимость в золотых монетах
	damage: number           // Урон dX
	damageDicesCount: number // Количество дайсов урона: Xd…
	damageType: EDamageType  // Тип урона
	weight: number           // Вес в фунтах
	props: TProp[]           // Свойства
}

export const weaponClassName: Record<EWeaponClass, string> = {
	[EWeaponClass['simpe.melee']]: 'Простое рукопашное',
	[EWeaponClass['simple.ranged']]: 'Простое дальнобойное',
	[EWeaponClass['martial.melee']]: 'Воинское рукопашное',
	[EWeaponClass['martial.ranged']]: 'Воинское дальнобойное'
}

//FIXME Учесть EProp.special при выводе характеристик оружия

export const fullWeaponsList: TWeapon[] = [
	// Простое рукопашное
	{
		id: EWeapon.quaterstaff,
		group: EWeaponClass['simpe.melee'],
		name: 'Боевой посох',
		cost: .2,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 4,
		props: [generateProp(EProp.versatile, 8)]
	}, {
		id: EWeapon.mace,
		group: EWeaponClass['simpe.melee'],
		name: 'Булава',
		cost: 5,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 4,
		props: []
	}, {
		id: EWeapon.club,
		group: EWeaponClass['simpe.melee'],
		name: 'Дубинка',
		cost: .1,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: [generateProp(EProp.light)]
	}, {
		id: EWeapon.dagger,
		group: EWeaponClass['simpe.melee'],
		name: 'Кинжал',
		cost: 2,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 1,
		props: [
			generateProp(EProp.light),
			generateProp(EProp.finesse),
			generateProp(EProp.thrown, 20, 60),
		]
	}, {
		id: EWeapon.spear,
		group: EWeaponClass['simpe.melee'],
		name: 'Копье',
		cost: 1,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 3,
		props: [
			generateProp(EProp.versatile, 8),
			generateProp(EProp.thrown, 20, 60),
		]
	}, {
		id: EWeapon.lighthammer,
		group: EWeaponClass['simpe.melee'],
		name: 'Легкий молот',
		cost: 2,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: [
			generateProp(EProp.light),
			generateProp(EProp.thrown, 20, 60),
		]
	}, {
		id: EWeapon.javelin,
		group: EWeaponClass['simpe.melee'],
		name: 'Метательное копьё',
		cost: .5,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [generateProp(EProp.thrown, 30, 120)]
	}, {
		id: EWeapon.greatclub,
		group: EWeaponClass['simpe.melee'],
		name: 'Палица',
		cost: .2,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 10,
		props: [generateProp(EProp.twohanded)]
	}, {
		id: EWeapon.handaxe,
		group: EWeaponClass['simpe.melee'],
		name: 'Ручной топор',
		cost: 5,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 2,
		props: [
			generateProp(EProp.light),
			generateProp(EProp.thrown, 20, 60),
		]
	}, {
		id: EWeapon.sickle,
		group: EWeaponClass['simpe.melee'],
		name: 'Серп',
		cost: 1,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 2,
		props: [generateProp(EProp.light)]
	},

	// Простое дальнобойное
	{
		id: EWeapon.lightcrossbow,
		group: EWeaponClass['simple.ranged'],
		name: 'Лёгкий арбалет',
		cost: 25,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 5,
		props: [
			generateProp(EProp.ammunition, 80, 320),
			generateProp(EProp.loading),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.dart,
		group: EWeaponClass['simple.ranged'],
		name: 'Дротик',
		cost: .05,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: .25,
		props: [
			generateProp(EProp.finesse),
			generateProp(EProp.thrown, 20, 60),
		]
	}, {
		id: EWeapon.shortbow,
		group: EWeaponClass['simple.ranged'],
		name: 'Короткий лук',
		cost: 25,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [
			generateProp(EProp.ammunition, 80, 320),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.sling,
		group: EWeaponClass['simple.ranged'],
		name: 'Праща',
		cost: .1,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 0,
		props: [generateProp(EProp.ammunition, 30, 120)]
	},

	// Воинское рукопашное
	{
		id: EWeapon.glaive,
		group: EWeaponClass['martial.melee'],
		name: 'Алебарда',
		cost: 20,
		damage: 10,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 6,
		props: [
			generateProp(EProp.heavy),
			generateProp(EProp.reach),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.warpick,
		group: EWeaponClass['martial.melee'],
		name: 'Боевая кирка',
		cost: 5,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: []
	}, {
		id: EWeapon.warhammer,
		group: EWeaponClass['martial.melee'],
		name: 'Боевой молот',
		cost: 15,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: [generateProp(EProp.versatile, 10)]
	}, {
		id: EWeapon.battleaxe,
		group: EWeaponClass['martial.melee'],
		name: 'Боевой топор',
		cost: 10,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 4,
		props: [generateProp(EProp.versatile, 10)]
	}, {
		id: EWeapon.halberd,
		group: EWeaponClass['martial.melee'],
		name: 'Глефа',
		cost: 20,
		damage: 10,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 6,
		props: [
			generateProp(EProp.heavy),
			generateProp(EProp.reach),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.greatsword,
		group: EWeaponClass['martial.melee'],
		name: 'Двуручный меч',
		cost: 50,
		damage: 6,
		damageDicesCount: 2,
		damageType: EDamageType.slashing,
		weight: 6,
		props: [
			generateProp(EProp.heavy),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.lance,
		group: EWeaponClass['martial.melee'],
		name: 'Длинное копьё',
		cost: 10,
		damage: 12,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 6,
		props: [
			generateProp(EProp.reach),
			generateProp(EProp.special),
		]
	},
	{
		id: EWeapon.longsword,
		group: EWeaponClass['martial.melee'],
		name: 'Длинный меч',
		cost: 15,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 3,
		props: [generateProp(EProp.versatile, 10)]
	},
	{
		id: EWeapon.whip,
		group: EWeaponClass['martial.melee'],
		name: 'Кнут',
		cost: 2,
		damage: 4,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 3,
		props: [
			generateProp(EProp.finesse),
			generateProp(EProp.reach),
		]
	},
	{
		id: EWeapon.shortsword,
		group: EWeaponClass['martial.melee'],
		name: 'Короткий меч',
		cost: 10,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [
			generateProp(EProp.finesse),
			generateProp(EProp.light),
		]
	},
	{
		id: EWeapon.maul,
		group: EWeaponClass['martial.melee'],
		name: 'Молот',
		cost: 10,
		damage: 6,
		damageDicesCount: 2,
		damageType: EDamageType.bludgeoning,
		weight: 10,
		props: [
			generateProp(EProp.heavy),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.morningstar,
		group: EWeaponClass['martial.melee'],
		name: 'Моргенштерн',
		cost: 15,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 4,
		props: []
	}, {
		id: EWeapon.pike,
		group: EWeaponClass['martial.melee'],
		name: 'Пика',
		cost: 5,
		damage: 10,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 18,
		props: [
			generateProp(EProp.heavy),
			generateProp(EProp.reach),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.rapier,
		group: EWeaponClass['martial.melee'],
		name: 'Рапира',
		cost: 25,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [generateProp(EProp.finesse)]
	}, {
		id: EWeapon.greataxe,
		group: EWeaponClass['martial.melee'],
		name: 'Секира',
		cost: 30,
		damage: 12,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 7,
		props: [
			generateProp(EProp.heavy),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.scimitar,
		group: EWeaponClass['martial.melee'],
		name: 'Скимитар',
		cost: 25,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 3,
		props: [
			generateProp(EProp.finesse),
			generateProp(EProp.light),
		]
	}, {
		id: EWeapon.trident,
		group: EWeaponClass['martial.melee'],
		name: 'Трезубец',
		cost: 5,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 4,
		props: [
			generateProp(EProp.thrown, 20, 60),
			generateProp(EProp.versatile, 8),
		]
	}, {
		id: EWeapon.flail,
		group: EWeaponClass['martial.melee'],
		name: 'Цеп',
		cost: 10,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 2,
		props: []
	},

	// Воинское дальнобойное
	{
		id: EWeapon.handcrossbow,
		group: EWeaponClass['martial.ranged'],
		name: 'Ручной арбалет',
		cost: 75,
		damage: 6,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 3,
		props: [
			generateProp(EProp.ammunition, 30, 120),
			generateProp(EProp.light),
			generateProp(EProp.loading),
		]
	}, {
		id: EWeapon.heavycrossbow,
		group: EWeaponClass['martial.ranged'],
		name: 'Тяжёлый арбалет',
		cost: 50,
		damage: 10,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 18,
		props: [
			generateProp(EProp.ammunition, 100, 400),
			generateProp(EProp.heavy),
			generateProp(EProp.loading),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.longbow,
		group: EWeaponClass['martial.ranged'],
		name: 'Длинный лук',
		cost: 50,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 2,
		props: [
			generateProp(EProp.ammunition, 150, 600),
			generateProp(EProp.heavy),
			generateProp(EProp.twohanded),
		]
	}, {
		id: EWeapon.blowgun,
		group: EWeaponClass['martial.ranged'],
		name: 'Духовая трубка',
		cost: 10,
		damage: 1,
		damageDicesCount: 1,
		damageType: EDamageType.piercing,
		weight: 1,
		props: [
			generateProp(EProp.ammunition, 25, 100),
			generateProp(EProp.loading),
		]
	},  {
		id: EWeapon.net,
		group: EWeaponClass['martial.ranged'],
		name: 'Сеть',
		cost: 1,
		damage: 0,
		damageDicesCount: 1,
		damageType: EDamageType.none,
		weight: 3,
		props: [
			generateProp(EProp.thrown, 5, 15),
			generateProp(EProp.special),
		]
	},
]

function generateProp(prop: EProp.versatile, damage: number): Extract<TProp, { prop: EProp.versatile }>
function generateProp(prop: EProp.thrown | EProp.ammunition, normal: number, max: number): Extract<TProp, { prop: EProp.thrown }>
function generateProp<P extends EProp.light | EProp.finesse | EProp.twohanded | EProp.loading | EProp.heavy | EProp.reach | EProp.special>(prop: P): Extract<TProp, { prop: P }>
function generateProp(prop: EProp, ...params: number[]): TProp {
	switch (prop) {
		case EProp.light:
		case EProp.finesse:
		case EProp.twohanded:
		case EProp.loading:
		case EProp.heavy:
		case EProp.reach:
		case EProp.special:
			return { prop }

		case EProp.thrown:
		case EProp.ammunition:
			return {
				prop,
				normalRange: <number>params[0] ?? 0,
				maxRange: <number>params[1] ?? 0
			}

		case EProp.versatile:
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