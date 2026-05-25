import { merge } from '../misc/commonUtils'
import { EArmorClass } from './armors'
import { ESkill } from './skills'
import type { TStat } from './stats'
import { ETool } from './tools'
import { EWeapon, type EWeaponClass } from './weapons'

export enum EBaseRace {
	dwarf,
	elf,
	halfling,
	human,
	dragonborn,
	gnome,
	halfelf,
	halforc,
	tiefling,
}

export enum ERace {
	'dwarf.hill',
	'dwarf.mountain',
	'elf.high',
	'elf.wood',
	'elf.dark',
	'halfling.lightfoot',
	'halfling.stout',
	'human.standard',
	'human.variant',
	'dragonborn.white',
	'dragonborn.bronze',
	'dragonborn.green',
	'dragonborn.gold',
	'dragonborn.red',
	'dragonborn.brass',
	'dragonborn.copper',
	'dragonborn.silver',
	'dragonborn.blue',
	'dragonborn.black',
	'gnome.forest',
	'gnome.rock',
	'halfelf.standard',
	'halforc.standard',
	'tiefling.standard',
}


type TSpeed = 25 | 30 | 35
type TSize = 'small' | 'medium'

export type TBaseRaceDescription = {
	name: string
	statsModifiers?: Partial<Record<TStat, number>>[]  // Модификаторы характеристик
	speed: TSpeed                    // Футов в секунду
	size: TSize                      // Размер существа
	darkvision: boolean              //TODO Добавить подсказку с описанием тёмного зрения на 60 футов при выводе на страницу
	languages: string[]
	features?: string[]
	weaponProfiencies?: (EWeapon | EWeaponClass)[]
	armorProfiecies?: EArmorClass[]  // Владение классами доспехов
	toolProfiencies?: ETool[]        // Владение инструментами
	skills?: ESkill[]
}

// Базовые расы, без разделения на подвиды. Экспортировать не нужно, потому что использоваться будут только подвиды
const baseRaces: Record<EBaseRace, TBaseRaceDescription> = {
	[EBaseRace.dwarf]: createDescription(true, {
		name: 'Дварф',
		statsModifiers: [{ con: 2 }],
		features: [
			'Сопротивление к урону ядом',
			'Преимущество при спасброске от яда',
			'При проверке Интеллекта (История), связанной с происхождением работы по камню, вы считаетесь владеющим навыком {История}, добавляете к проверке удвоенный бонус мастерства',
		],
		languages: ['Общий', 'Дварфский'],
		weaponProfiencies: [EWeapon.battleaxe, EWeapon.handaxe, EWeapon.lighthammer, EWeapon.warhammer],
		toolProfiencies: [ETool.brewer, ETool.smith, ETool.masons],
	}),
	[EBaseRace.elf]: createDescription(30, true, {
		name: 'Эльф',
		statsModifiers: [{ dex: 2 }],
		skills: [ESkill.perception],
		languages: ['Общий', 'Эльфский'],
		features: [
			'Эльфы не спят, а погружаются в транс',
			'Невозможно магически усыпить',
			'Преимущество при спасброске от очарования',
		],
	}),
	[EBaseRace.halfling]: createDescription({
		name: 'Полурослик',
		statsModifiers: [{ str: 2 }],
		size: 'small',
		languages: ['Общий', 'Язык полуросликов'],
		features: [
			'[Везучий.] Если при броске атаки, проверке характеристики или спасброске выпало «1», вы можете перебросить кость, и должны использовать новый результат',
			'[Храбрый.] Преимущество при спасброске от испуга',
			'[Проворство полуросликов.] Можете проходить сквозь пространство, занятое существами, чей размер больше вашего',
		],
	}),
	[EBaseRace.human]: createDescription(30, {
		name: 'Человек',
		languages: ['Общий', 'Один язык на выбор'],
	}),
	[EBaseRace.dragonborn]: createDescription({
		name: 'Драконорожденный',
		speed: 30,
		statsModifiers: [{ str: 2 }, { cha: 1 }],
		languages: ['Общий', 'Драконий'],
		features: ['[Оружие дыхания.] Можете действием выдохнуть разрушительную энергию']
	}),
	[EBaseRace.gnome]: createDescription(true, {
		name: 'Гном',
		statsModifiers: [{ int: 2 }],
		size: 'small',
		languages: ['Общий', 'Гномий'],
		features: ['Совершаете с преимуществом спасброски Интеллекта, Мудрости и Харизмы против магии']
	}),
	[EBaseRace.halfelf]: createDescription(30, true, {
		name: 'Полуэльф',
		statsModifiers: [{ cha: 2 }],
		languages: ['Общий' ,'Эльфийский' ,'Один язык на выбор'],
		features: [
			'Невозможно магически усыпить',
			'Преимущество при спасброске от очарования',
			'Две любые характеристики увеличиваются на 1',
			'Получаете владение двумя навыками на выбор',
		]
	}),
	[EBaseRace.halforc]: createDescription(30, true, {
		name: 'Полуорк',
		statsModifiers: [{ str: 2 }, { con: 1 }],
		languages: ['Общий', 'Орочий'],
		features: [
			'Владеете навыком {запугивание}',
			'[Непоколебимая стойкость.] Если хиты опустились до нуля, но при этом вы не убиты, вместо этого хиты опускаются до 1. Нельзя использовать эту способность снова, пока не завершите длительный отдых',
			'При совершении критического попадания рукопашной атакой оружием, можете добавить к урону ещё одну кость урона оружия',
		]

	}),
	[EBaseRace.tiefling]: createDescription(30, true, {
		name: 'Тифлинг',
		statsModifiers: [{ cha: 2 }, { int: 1 }],
		languages: ['Общий', 'Инфернальный'],
		features: [
			'Сопротивление к урону огнём',
			'Знаете заклинение {чудотворство}. Его базовая характеристика — Харизма'
		]
	}),
}


export type TRace = {
	baseRace: EBaseRace
	race: ERace,
	diff: Partial<TBaseRaceDescription>
}

/** Список подипов рас для игры */
export const fullRacesList: TRace[] = [
	createRace(EBaseRace.halfelf, ERace['halfelf.standard'], {}),
	createRace(EBaseRace.halforc, ERace['halforc.standard'], {}),
	createRace(EBaseRace.tiefling, ERace['tiefling.standard'], {}),
]

// Дварфы
fullRacesList.push(createRace(EBaseRace.dwarf, ERace['dwarf.mountain'], {
	name: 'Горный дварф',
	statsModifiers: [{ str: 2 }],
	armorProfiecies: [EArmorClass.light, EArmorClass.medium],
}))
fullRacesList.push(createRace(EBaseRace.dwarf, ERace['dwarf.hill'], {
	name: 'Горный дварф',
	statsModifiers: [{ wis: 1 }],
	features: ['[Дварфская выдержка.] Максимум хитов увеличивается на 1 за каждый уровень включая первый'],
}))


// Эльфы
fullRacesList.push(createRace(EBaseRace.elf, ERace['elf.high'], {
	name: 'Высокий эльф',
	statsModifiers: [{ int: 1 }],
	weaponProfiencies: [EWeapon.shortsword, EWeapon.longsword, EWeapon.shortbow, EWeapon.longbow],
	languages: ['Один дополнительный язык на выбор'],
	features: ['Знаете один заговор из списка заклинаний волшебника. Его базовая характеристика — Интеллект'],
}))
fullRacesList.push(createRace(EBaseRace.elf, ERace['elf.wood'], {
	name: 'Лесной эльф',
	statsModifiers: [{ wis: 1 }],
	speed: 35,
	weaponProfiencies: [EWeapon.shortsword, EWeapon.longsword, EWeapon.shortbow, EWeapon.longbow],
	features: [
		'[Маскировка в дикой местности.] Можете предпринять попытку спрятаться, даже если вы слабо заслонены листвой, сильным дождём, снегопадом, туманом или другими природными явлениями'
	],
}))
fullRacesList.push(createRace(EBaseRace.elf, ERace['elf.dark'], {
	name: 'Тёмный эльф',
	statsModifiers: [{ cha: 1 }],
	weaponProfiencies: [EWeapon.rapier, EWeapon.shortsword, EWeapon.handcrossbow],
	features: [
		'Тёмное зрение имеет радиус 120 футов',
		'[Чувствительность к солнцу.] Помеха при броске атаки и проверке Мудрости (Внимательность), основанной на зрении, если вы, цель вашей атаки или изучаемый предмет расположены на прямом солнечном свете',
		'Знаете заклинание {пляшущие огоньки}',
	],
}))


// Полурослики
fullRacesList.push(createRace(EBaseRace.halfling, ERace['halfling.lightfoot'],{
	name: 'Легконогий полурослик',
	statsModifiers: [{ cha: 1 }],
	features: ['[Естественная скрытность.] Можете предпринять попытку скрыться даже если заслонены только существом, превосходящими вас в размере как минимум на одну категорию'],
}))
fullRacesList.push(createRace(EBaseRace.halfling, ERace['halfling.stout'], {
	name: 'Коренастый полурослик',
	statsModifiers: [{ con: 1 }],
	features: ['[Устойчивость коренастых.] Преимущество при спасброске от яда. Сопротивление к урону ядом'],
}))


// Люди
fullRacesList.push(createRace(EBaseRace.human, ERace['human.standard'], {
	name: 'Человек',
	features: ['Значения всех характеристик увеличиваются на 1'],
}))
fullRacesList.push(createRace(EBaseRace.human, ERace['human.variant'],{
	name: 'Человек (альт.)',
	features: [
		'Значения двух любых характеристик увеличиваются на 1',
		'Владение одним навыком на выбор',
		'Одна черта на выбор',
	],
}))


// Драконорожденные
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.white'], {
	name: 'Драконорожденный (белый дракон)',
	features: [
		'[Оружие дыхания.] Холод: 15-фт. конус (спас. Тел.)',
		'Сопротивление к урону холодом',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.bronze'], {
	name: 'Драконорожденный (бронзовый дракон)',
	features: [
		'[Оружие дыхания.] Электричество: линия 5 на 30 фт. (спас. Лов.)',
		'Сопротивление к урону электричеством',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.green'], {
	name: 'Драконорожденный (зелёный дракон)',
	features: [
		'[Оружие дыхания.] Яд: 15-фт. конус (спас. Тел.)',
		'Сопротивление к урону ядом',
	]
}))

fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.gold'], {
	name: 'Драконорожденный (золотой дракон)',
	features: [
		'[Оружие дыхания.] Огонь: 15-фт. конус (спас. Лов.)',
		'Сопротивление к урону огнём',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.red'], {
	name: 'Драконорожденный ( дракон)',
	features: [
		'[Оружие дыхания.] Огонь: 15-фт. конус (спас. Лов.)',
		'Сопротивление к урону огнём',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.brass'], {
	name: 'Драконорожденный (латунный дракон)',
	features: [
		'[Оружие дыхания.] Огонь: линия 5 на 30 фт. (спас. Лов.)',
		'Сопротивление к урону огнём',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.copper'], {
	name: 'Драконорожденный (медный дракон)',
	features: [
		'[Оружие дыхания.] Кислота: линия 5 на 30 фт. (спас. Лов.)',
		'Сопротивление к урону кислотой',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.silver'], {
	name: 'Драконорожденный (серебряный дракон)',
	features: [
		'[Оружие дыхания.] Холод: 15-фт. конус (спас. Тел.)',
		'Сопротивление к урону холодом',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.blue'], {
	name: 'Драконорожденный (синий дракон)',
	features: [
		'[Оружие дыхания.] Электричество: линия 5 на 30 фт. (спас. Лов.)',
		'Сопротивление к урону электричеством',
	]
}))
fullRacesList.push(createRace(EBaseRace.dragonborn, ERace['dragonborn.black'], {
	name: 'Драконорожденный (чёрный дракон)',
	features: [
		'[Оружие дыхания.] Кислота: линия 5 на 30 фт. (спас. Лов.)',
		'Сопротивление к урону кислотой',
	]
}))

// Гномы
fullRacesList.push(createRace(EBaseRace.gnome, ERace['gnome.forest'], {
	name: 'Лесной гном',
	statsModifiers: [{ dex: 1 }],
	features: [
		'[Природная иллюзия.] Знаете заклинание {малая иллюзия}. Его базовая характеристика — Интеллект',
		'С помощью звуков и жестов вы можете передавать простые понятия Маленьким или ещё меньшим зверям',
	]
}))
fullRacesList.push(createRace(EBaseRace.gnome, ERace['gnome.rock'], {
	name: 'Скальный гном',
	statsModifiers: [{ con: 1 }],
	toolProfiencies: [ETool.tinkers],
	features: [
		'При совершении проверки Интеллекта (История) применительно к магическому, алхимическому или технологическому объекту, вы можете добавить к проверке удвоенный бонус мастерства вместо обычного',
		'С помощью инструментов жестянщика, потратив час времени и материалы на сумму 10 зм, можно создать Крошечное механическое устройство (КД 5, 1 хит) из списка: [Заводная игрушка, Зажигалка, Музыкальная шкатулка]. Оно перестаёт работать через 24 часа (если не потратить час на поддержание его работы). Вы можете действием разобрать его, тогда можно получить обратно использованные материалы. Одновременно можно иметь не более трёх таких устройств'
	]
}))


/** Генерация описания расы
 * @param arg1 Любой из параметров: скорость (если это число и параметров хотя бы два), тёмное зрение (если первое — скорость), raceDiffs (если параметров всего два)
 * @param arg2 Наличие тёмного зрения или raceDiffs, если тёмного зрения нет
 * @param arg3 Характеристики расы, отличающиеся от базовых значений (raceDiffs)
 */
function createDescription(speed: TSpeed, raceDiffs: Partial<TBaseRaceDescription>): TBaseRaceDescription
function createDescription(speed: TSpeed, darkvision: boolean, raceDiffs: Partial<TBaseRaceDescription>): TBaseRaceDescription
function createDescription(darkvision: boolean, raceDiffs: Partial<TBaseRaceDescription>): TBaseRaceDescription
function createDescription(speed: TSpeed, darkvision: boolean, raceDiffs: Partial<TBaseRaceDescription>): TBaseRaceDescription
function createDescription(raceDiffs: Partial<TBaseRaceDescription>): TBaseRaceDescription
function createDescription(arg1?: TSpeed | boolean | Partial<TBaseRaceDescription>, arg2?: boolean | Partial<TBaseRaceDescription>, arg3?: Partial<TBaseRaceDescription>): TBaseRaceDescription {
	let raceDiffs: Partial<TBaseRaceDescription> = {}
	let speed: TSpeed = 25
	let darkvision = false

	// Первый параметр — скорость
	if (typeof arg1 === 'number') {
		speed = arg1

		// Смотрим, что именно лежит во втором параметре. Тут только два варианта
		if (typeof arg2 === 'boolean') {
			darkvision = arg2
			raceDiffs = arg3 ?? {}
		}
		else
			raceDiffs = arg2 ?? {}
	}
	// Первый параметр — тёмное зрение
	else if (typeof arg1 === 'boolean') {
		darkvision = arg1
		// Так как скорость не может быть вторым параметром, то второй — это undefined или raceDiffs
		raceDiffs = typeof arg2 != 'boolean' ? arg2 ?? {} : {}
	}
	// Первый параметр — характеристики расы
	else
		raceDiffs = arg1 ?? {}

	return {
		...makeEmptyDescription(speed, darkvision),
		...raceDiffs
	}
}

/** Создание пустой заготовки для описания базовой расы */
function makeEmptyDescription(speed: TSpeed = 25, darkvision = false): TBaseRaceDescription {
	return {
		name: '',
		speed,
		size: 'medium',
		darkvision,
		statsModifiers: [],
		features: [],
		weaponProfiencies: [],
		toolProfiencies: [],
		languages: [],
		skills: []
	}
}

/** Создание объекта для описания подтипа расы
 * @param baseRace Базовая раса
 * @param race Подтип базовой расы
 * @param diff Добавления/изменения в базовых характеристиках расы. Применяется через adjustBaseRace
 * @return
 */
function createRace(baseRace: EBaseRace, race: ERace, diff: Partial<TBaseRaceDescription>): TRace {
	if (fullRacesList.find(r => r.race == race))
		throw new Error(`Раса ${race} уже добавлена`)

	return { baseRace, race, diff }
}

/** Добавление дополнительных характеристик к базовым характеристикам расы */
function adjustBaseRace(baseRace: EBaseRace, raceDiffs: Partial<TBaseRaceDescription>): TBaseRaceDescription {
	const result = baseRaces[baseRace]

	Object.keys(raceDiffs).forEach(key => {
		const tkey = key as keyof TBaseRaceDescription
		if (!(tkey in result) || typeof result[tkey] === 'undefined')
			return

		// Массивы или объекты объединяем
		if (Array.isArray(result[tkey]) || typeof result[tkey] === 'object')
			//@ts-ignore
			result[tkey] = merge(result[tkey], raceDiffs[tkey])

		// Прочие свойства перезаписываем
		else
			//@ts-ignore
			result[tkey] = raceDiffs[tkey]
	})

	return result
}