/** @description Оружие */

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
	special,    // Особое
}

type TProp = { prop: EWeaponProp.light }
	| { prop: EWeaponProp.finesse }
	| { prop: EWeaponProp.twohanded }
	| { prop: EWeaponProp.loading }
	| { prop: EWeaponProp.heavy }
	| { prop: EWeaponProp.reach }
	| { prop: EWeaponProp.special }
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
	damageDicesCount: number // Количество дайсов урона: Xd…
	damageType: EDamageType  // Тип урона
	weight: number           // Вес в фунтах
	props: TProp[]           // Свойства
}

export const weaponClasses: { classType: EWeaponClass, name: string }[] = [{
	classType: EWeaponClass['simpe.melee'],
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
		props: [generateProp(EWeaponProp.versatile, 8)]
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
		props: [generateProp(EWeaponProp.light)]
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
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.thrown, 20, 60),
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
			generateProp(EWeaponProp.versatile, 8),
			generateProp(EWeaponProp.thrown, 20, 60),
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
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.thrown, 20, 60),
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
		props: [generateProp(EWeaponProp.thrown, 30, 120)]
	}, {
		id: EWeapon.greatclub,
		group: EWeaponClass['simpe.melee'],
		name: 'Палица',
		cost: .2,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.bludgeoning,
		weight: 10,
		props: [generateProp(EWeaponProp.twohanded)]
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
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.thrown, 20, 60),
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
		props: [generateProp(EWeaponProp.light)]
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
			generateProp(EWeaponProp.ammunition, 80, 320),
			generateProp(EWeaponProp.loading),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.thrown, 20, 60),
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
			generateProp(EWeaponProp.ammunition, 80, 320),
			generateProp(EWeaponProp.twohanded),
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
		props: [generateProp(EWeaponProp.ammunition, 30, 120)]
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
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),
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
		props: [generateProp(EWeaponProp.versatile, 10)]
	}, {
		id: EWeapon.battleaxe,
		group: EWeaponClass['martial.melee'],
		name: 'Боевой топор',
		cost: 10,
		damage: 8,
		damageDicesCount: 1,
		damageType: EDamageType.slashing,
		weight: 4,
		props: [generateProp(EWeaponProp.versatile, 10)]
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
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.special),
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
		props: [generateProp(EWeaponProp.versatile, 10)]
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
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.reach),
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
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.light),
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
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.reach),
			generateProp(EWeaponProp.twohanded),
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
		props: [generateProp(EWeaponProp.finesse)]
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
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.finesse),
			generateProp(EWeaponProp.light),
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
			generateProp(EWeaponProp.thrown, 20, 60),
			generateProp(EWeaponProp.versatile, 8),
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
			generateProp(EWeaponProp.ammunition, 30, 120),
			generateProp(EWeaponProp.light),
			generateProp(EWeaponProp.loading),
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
			generateProp(EWeaponProp.ammunition, 100, 400),
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.loading),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.ammunition, 150, 600),
			generateProp(EWeaponProp.heavy),
			generateProp(EWeaponProp.twohanded),
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
			generateProp(EWeaponProp.ammunition, 25, 100),
			generateProp(EWeaponProp.loading),
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
			generateProp(EWeaponProp.thrown, 5, 15),
			generateProp(EWeaponProp.special),
		]
	}
] as const

function generateProp(prop: EWeaponProp.versatile, damage: number): Extract<TProp, { prop: EWeaponProp.versatile }>
function generateProp(prop: EWeaponProp.thrown | EWeaponProp.ammunition, normal: number, max: number): Extract<TProp, { prop: EWeaponProp.thrown }>
function generateProp<P extends EWeaponProp.light | EWeaponProp.finesse | EWeaponProp.twohanded | EWeaponProp.loading | EWeaponProp.heavy | EWeaponProp.reach | EWeaponProp.special>(prop: P): Extract<TProp, { prop: P }>
function generateProp(prop: EWeaponProp, ...params: number[]): TProp {
	switch(prop) {
		case EWeaponProp.light:
		case EWeaponProp.finesse:
		case EWeaponProp.twohanded:
		case EWeaponProp.loading:
		case EWeaponProp.heavy:
		case EWeaponProp.reach:
		case EWeaponProp.special:
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

export function getWeaponSpecialDescription(weapon: EWeapon): string | undefined {
	if (![EWeapon.lance, EWeapon.net].includes(weapon))
		return undefined

	switch(weapon) {
		case EWeapon.lance:
			return 'Вы совершаете с помехой атаки длинным копьём по существам, находящимся в пределах 5 футов от вас. Кроме того, если вы не находитесь верхом, длинное копьё используется двумя руками'

		case EWeapon.net:
			return 'Существа Большого и меньшего размеров, по которым попала атака сетью, становятся опутанными, пока не высвободятся. Сеть не оказывает эффекта на бесформенных существ и тех, чей размер Огромный или ещё больше. Существо может действием совершить проверку Силы со Сл 10, чтобы высвободиться самому или освободить другое существо, находящееся в пределах его досягаеости. Причинение сети 5 единиц рубящего урона (КД 10) тоже освобождает существо, не причиняя ему вреда, оканчивая эффект и уничтожая сеть.\n\n\
			Если вы действием, бонусным действием или реакцией совершаете атаку сетью, вы можете совершить только одну атаку, вне зависимости от количества положенных атак.'
	}

	return ''
}