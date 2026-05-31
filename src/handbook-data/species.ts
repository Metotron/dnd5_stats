/** @description Игровые виды */

import { merge } from '@/misc/commonUtils'
import { EArmorClass, EShieldClass } from './armors'
import type { EFeat } from './feats'
import { ESkill } from './skills'
import type { TStat } from './stats'
import { ETool } from './tools'
import { EWeapon, type EWeaponClass } from './weapons'

export enum EBaseSpecies {
	aasimar,
	dragonborn,
	dwarf,
	elf,
	gnome,
	goliath,
	halfling,
	human,
	orc,
	tiefling,
}

export enum ESpecies {
	'aasimar.standard',
	'dragonborn.black',
	'dragonborn.blue',
	'dragonborn.brass',
	'dragonborn.bronze',
	'dragonborn.copper',
	'dragonborn.gold',
	'dragonborn.green',
	'dragonborn.red',
	'dragonborn.silver',
	'dragonborn.white',
	'dwarf.standard',
	'elf.drow',
	'elf.high',
	'elf.wood',
	'gnome.forest',
	'gnome.rock',
	'goliath.cloud',
	'goliath.fire',
	'goliath.frost',
	'goliath.hill',
	'goliath.stone',
	'goliath.storm',
	'halfling.standard',
	'human.standard',
	'orc.standard',
	'tiefling.abyssal',
	'tiefling.chthonic',
	'tiefling.infernal',
}

export enum EDarkvision {
	dv60 = '60',    // на 60 футов
	dv120 = '120',  // на 120 футов
}

type TSpeed = 25 | 30 | 35
type TSize = 'small' | 'medium' | 'none'

export type TBaseSpeciesDescription = {
	name: string
	statsModifiers?: Partial<Record<TStat, number>>[]  // Модификаторы характеристик
	speed: TSpeed                    // Футов в секунду
	size: TSize                      // Размер существа
	darkvision: EDarkvision | false
	languages: string[]
	features?: string[]
	weaponProficiencies?: (EWeapon | EWeaponClass)[]
	armorProficiencies?: (EArmorClass | EShieldClass)[]  // Владение классами доспехов
	toolProficiencies?: ETool[]      // Владение инструментами
	skills?: ESkill[]
	goods?: (string | EWeapon | ETool)[] // Вещи, которые есть у персонажа
	savingThrows?: TStat[]           // Владение спасбросками
	// Из предыстории:
	charsForGrow?: TStat[]           // Характеристики, которые нужно увеличить
	feat?: EFeat                     // Черта
}

// Базовые виды, без разделения на подвиды
export const baseSpecies: Record<EBaseSpecies, TBaseSpeciesDescription> = {
	[EBaseSpecies.aasimar]: createBaseDescription(EDarkvision.dv60,{
		name: 'Аасимар',
		size: 'none',
		features: [
			'Выберите свой размер: маленький или средний',
			'[Небесное сопротивление.] Сопроивление некротическому урону и урону излучением',
			'[Исцеляющие руки.] Раз в день магическим действием, касаясь существа, восстанавливаете ему /*бонус мастерства*/d4 хитов',
			'Знаете заговор {cantrip:Свет}, заклинательная характеристика для него — {Харизма}'
		],
	}),
	[EBaseSpecies.dragonborn]: createBaseDescription(EDarkvision.dv60, {
		name: 'Драконорождённый',
		features: ['[Оружие дыхания.] Можете действием выдохнуть разрушительную энергию: 15 фт. конус или линию в 30 фт. шириной 5 фт. (выбираете форму каждый раз). Существа в этой области проходят проверку Ловкости сложностью 8 + /*мод. Телосложения*/ + /*бонус мастерства*/. При провале получают d10 урона согласно вашему драконьему наследию, а при успехе — половину этого значения. Вы можете использовать эту атаку /*бонус мастерства*/ раз в день']
	}),
	[EBaseSpecies.dwarf]: createBaseDescription(EDarkvision.dv120, {
		name: 'Дварф',
		features: [
			'Сопротивление к урону ядом',
			'Преимущество при спасброске, чтобы избежать или прекратить состояние {Отравленный}',
			'Максимальный запас хитов увеличен на /*уровень*/',
			'Находясь на каменной поверхности или касаясь её, /*бонус мастерства*/ раз в день бонусным действием можно на 10 минут получить {Чувство вибрации} в пределах 60 фт.',
		],
		languages: ['Общий', 'Дварфский'],
		weaponProficiencies: [EWeapon.battleaxe, EWeapon.handaxe, EWeapon.lighthammer, EWeapon.warhammer],
		toolProficiencies: [ETool.brewer, ETool.smith, ETool.masons],
	}),
	[EBaseSpecies.elf]: createBaseDescription(EDarkvision.dv60, {
		name: 'Эльф',
		features: [
			'Эльфы не спят, а погружаются в транс',
			'Невозможно магически усыпить',
			'Преимущество при спасброске от очарования',
		],
	}),
	[EBaseSpecies.gnome]: createBaseDescription(EDarkvision.dv60, {
		name: 'Гном',
		size: 'small',
		features: ['Совершаете с преимуществом спасброски {Интеллекта}, {Мудрости} и {Харизмы}']
	}),
	[EBaseSpecies.goliath]: createBaseDescription(35, {
		name: 'Голиаф',
		features: [
			'Преимущество при проверке характеристик, чтобы избавиться от состояния {Схваченный}',
			'При определении грузоподъёмности считаетесь существом на 1 размер больше'
		],
	}),
	[EBaseSpecies.halfling]: createBaseDescription({
		name: 'Полурослик',
		size: 'small',
		features: [
			'Преимущество при спасброске, чтобы избежать или прекратить состояние {Испуганный}',
			'Можете проходить сквозь пространство, занятое существами, чей размер больше вашего',
			'[Везучий.] Если при броске атаки, проверке характеристики или спасброске выпало «1», вы можете перебросить кость, и должны использовать новый результат',
			'Можете совершить действие {Засада}, даже если скрыты только существом, которое на 1 больше вас',
		],
	}),
	[EBaseSpecies.human]: createBaseDescription({
		name: 'Человек',
		size: 'none',
		features: [
			'Выберите свой размер: маленький или средний',
			'Каждый раз после длительного отдыха получаете {Героическое вдохновение}',
			'Получаете владение одним навыком на выбор',
			'Получаете черту происхождения на выбор'
		],
	}),
	[EBaseSpecies.orc]: createBaseDescription(EDarkvision.dv120, {
		name: 'Орк',
		features: [
			'[Всплеск адреналина.] Бонусным действием можете сделать {Рывок}, при этом получаете /*бонус мастерства*/ временных хитов. Действие доступно /*бонус мастерства*/ раз до отдыха',
			'Раз в день, если ваши хиты опустились до нуля, но вы не убиты, можете поднять их до 1'
		],
	}),
	[EBaseSpecies.tiefling]: createBaseDescription(EDarkvision.dv60, {
		name: 'Тифлинг',
		size: 'none',
		features: [
			'Выберите свой размер: маленький или средний',
			'Выберите заклинательную характеристику: {Интеллект}, {Мудрость} или {Харизма}',
			'Знаете заговор {cantrip: Чудотворство }, его заклинательная характеристика та же, что выбрана для заклинаний',
		]
	}),
}


export type TSpecies = {
	baseSpecies: EBaseSpecies
	species: ESpecies,
	diff: Partial<TBaseSpeciesDescription>
}
// Обёртка для создания объектов типа TSpecies
const mkSpecies = (baseSpeciesE: EBaseSpecies, species: ESpecies, diff?: Partial<TBaseSpeciesDescription>): TSpecies => {
	if (diff === undefined) diff = {}
	if (!diff.name)
		diff.name = baseSpecies[baseSpeciesE].name

	return { baseSpecies: baseSpeciesE, species, diff }
}

/** Список подвидов для игры */
export const fullSpeciesList: TSpecies[] = [
	mkSpecies(EBaseSpecies.aasimar, ESpecies['aasimar.standard']),
	mkSpecies(EBaseSpecies.dwarf, ESpecies['dwarf.standard']),
	mkSpecies(EBaseSpecies.halfling, ESpecies['halfling.standard']),
	mkSpecies(EBaseSpecies.human, ESpecies['human.standard']),

	// Драконорождённые
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.black'], {
		name: 'Драконорождённый (чёрный дракон)',
		features: ['[Оружие дыхания.] Кислота', 'Сопротивление к урону кислотой']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.blue'], {
		name: 'Драконорождённый (синий дракон)',
		features: ['[Оружие дыхания.] Электричество', 'Сопротивление к урону электричеством']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.brass'], {
		name: 'Драконорождённый (латунный дракон)',
		features: ['[Оружие дыхания.] Огонь', 'Сопротивление к урону огнём']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.bronze'], {
		name: 'Драконорождённый (бронзовый дракон)',
		features: ['[Оружие дыхания.] Электричество', 'Сопротивление к урону электричеством']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.copper'], {
		name: 'Драконорождённый (медный дракон)',
		features: ['[Оружие дыхания.] Кислота', 'Сопротивление к урону кислотой']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.gold'], {
		name: 'Драконорождённый (золотой дракон)',
		features: ['[Оружие дыхания.] Огонь', 'Сопротивление к урону огнём']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.green'], {
		name: 'Драконорождённый (зелёный дракон)',
		features: ['[Оружие дыхания.] Яд', 'Сопротивление к урону ядом']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.red'], {
		name: 'Драконорождённый (красный дракон)',
		features: ['[Оружие дыхания.] Огонь', 'Сопротивление к урону огнём']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.silver'], {
		name: 'Драконорождённый (серебряный дракон)',
		features: ['[Оружие дыхания.] Холод', 'Сопротивление к урону холодом']
	}),
	mkSpecies(EBaseSpecies.dragonborn, ESpecies['dragonborn.white'], {
		name: 'Драконорождённый (белый дракон)',
		features: ['[Оружие дыхания.] Холод', 'Сопротивление к урону холодом']
	}),

	// Эльфы
	mkSpecies(EBaseSpecies.elf, ESpecies['elf.high'], {
		name: 'Высший эльф',
		features: ['Знаете заговор {cantrip:Фокусы}. После продолжительного отдыха можете заменить его на другой заговор из списка волшебника'],
	}),
	mkSpecies(EBaseSpecies.elf, ESpecies['elf.drow'], {
		name: 'Дроу',
		darkvision: EDarkvision.dv120,
		features: ['Знаете заговор {cantrip:Пляшущие огоньки}'],
	}),
	mkSpecies(EBaseSpecies.elf, ESpecies['elf.wood'], {
		name: 'Лесной эльф',
		speed: 35,
		features: ['Знаете заговор {cantrip:Искусство друидов}'],
	}),

	// Гномы
	mkSpecies(EBaseSpecies.gnome, ESpecies['gnome.forest'], {
		name: 'Лесной гном',
		features: ['Знаете заговор {cantrip:Малая иллюзия}, и у вас всегда подготовлено заклинание {spell:Разговор с животными}, которое за день можете накладывать /*бонус мастерства*/ раз, не тратя ячейку заклинаний. Также можете накладывать его, используя любые ячейки заклинаний'],
	}),
	mkSpecies(EBaseSpecies.gnome, ESpecies['gnome.rock'], {
		name: 'Скальный гном',
		features: ['Знаете заговоры {cantrip:Починка} и {cantrip:Фокусы}',
			'Потратив 10 минут, можете наложить заклинание {spell:Фокусы}, чтобы создать крошечное механическое устройство (КД 5, 1 хит), такое как игрушка, зажигалка, музыкальная шкатулка. Создавая его, определите его функцию, выбрав эффект заклинания {spell:Фокусы}, устройство будет производить его, когда его активируют касанием бонусным действием. Если есть опции, то выбираете одну (или зажигать, или тушить огонь). Одновременно можно иметь до 3 устройств, каждое из них разваливается через 8 часов после создания или когда вы его разберёте действием {Использование}'],
	}),

	// Голиафы
	mkSpecies(EBaseSpecies.goliath, ESpecies['goliath.stone'], {
		name: 'Каменный великан',
		features: ['[Выносливость камня.] Когда получаете урон, можете реакцией бросить d12, добавить к результату /*мод. Телосложения*/ и уменьшить урон на полученное значение']
	}),
	mkSpecies(EBaseSpecies.goliath, ESpecies['goliath.frost'], {
		name: 'Ледяной великан',
		features: ['[Морозный холод.] Когда попадаете атакой по цели и наносите урон, можете нанести дополнительно d6 урона холодом и снизить её скоррость на 10 фт. до начала вашего следующего хода']
	}),
	mkSpecies(EBaseSpecies.goliath, ESpecies['goliath.cloud'], {
		name: 'Облачный великан',
		features: ['[Облачный шаг.] Бонусным действием можете телепортироваться на 30 фт. в незанятое место, которое видите']
	}),
	mkSpecies(EBaseSpecies.goliath, ESpecies['goliath.fire'], {
		name: 'Огненный великан',
		features: ['[Огненный ожог.] Когда попадаете атакой по цели и наносите урон, можете нанести дополнительно d10 урона огнём']
	}),
	mkSpecies(EBaseSpecies.goliath, ESpecies['goliath.hill'], {
		name: 'Холмовой великан',
		features: ['[Холмовой толчок.] Когда попадаете атакой по цели размером {Большой} или меньше, можете наложить на неё состояние {Лежащий ничком}']
	}),
	mkSpecies(EBaseSpecies.goliath, ESpecies['goliath.storm'], {
		name: 'Штормовой великан',
		features: ['[Штормовой гром.] Когда получаете урон от существа в 60 фт. от себя, можете реакцией нанести ему d8 урона звуком']
	}),


	// Тифлинги
	mkSpecies(EBaseSpecies.tiefling, ESpecies['tiefling.abyssal'], {
		name: 'Тифлинг (Происхождение бездны)',
		features: [
			'Сопротивление к урону ядом',
			'Знаете заговор {cantrip:Ядовитые брызги}'
		],
	}),
	mkSpecies(EBaseSpecies.tiefling, ESpecies['tiefling.infernal'], {
		name: 'Тифлинг (Инфернальное происхождение)',
		features: [
			'Сопротивление к урону огнём',
			'Знаете заговор {cantrip:Огненный снаряд}'
		],
	}),
	mkSpecies(EBaseSpecies.tiefling, ESpecies['tiefling.chthonic'], {
		name: 'Тифлинг (Хтоническое происхождение)',
		features: [
			'Сопротивление к некротическому урону',
			'Знаете заговор {cantrip:Леденящее прикосновение}',
		],
	}),
]


/** Генерация описания вида
 * @param arg1 Любой из параметров: скорость (если это число и параметров хотя бы два), тёмное зрение (если первое — скорость), speciesDiffs (если параметров всего два)
 * @param arg2 Наличие тёмного зрения или speciesDiffs, если тёмного зрения нет
 * @param arg3 Характеристики вида, отличающиеся от базовых значений (speciesDiffs)
 */
function createBaseDescription(speed: TSpeed, speciesDiffs: Partial<TBaseSpeciesDescription>): TBaseSpeciesDescription
function createBaseDescription(speed: TSpeed, darkvision: EDarkvision, speciesDiffs: Partial<TBaseSpeciesDescription>): TBaseSpeciesDescription
function createBaseDescription(darkvision: EDarkvision, speciesDiffs: Partial<TBaseSpeciesDescription>): TBaseSpeciesDescription
function createBaseDescription(speed: TSpeed, darkvision: EDarkvision, speciesDiffs: Partial<TBaseSpeciesDescription>): TBaseSpeciesDescription
function createBaseDescription(speciesDiffs: Partial<TBaseSpeciesDescription>): TBaseSpeciesDescription
function createBaseDescription(arg1?: TSpeed | EDarkvision | Partial<TBaseSpeciesDescription>, arg2?: EDarkvision | Partial<TBaseSpeciesDescription>, arg3?: Partial<TBaseSpeciesDescription>): TBaseSpeciesDescription {
	let speciesDiffs: Partial<TBaseSpeciesDescription> = {}
	let speed: TSpeed = 30
	let darkvision: EDarkvision | false = false

	// Первый параметр — скорость
	if (typeof arg1 === 'number') {
		speed = arg1

		// Смотрим, что именно лежит во втором параметре. Тут только два варианта
		if (typeof arg2 === 'string') {
			darkvision = arg2
			speciesDiffs = arg3 ?? {}
		}
		else
			speciesDiffs = arg2 ?? {}
	}
	// Первый параметр — тёмное зрение
	else if (typeof arg1 === 'string') {
		darkvision = arg1
		// Так как скорость не может быть вторым параметром, то второй — это undefined или speciesDiffs
		speciesDiffs = typeof arg2 != 'string' ? arg2 ?? {} : {}
	}
	// Первый параметр — характеристики вида
	else
		speciesDiffs = arg1 ?? {}

	return {
		...makeEmptyDescription(speed, darkvision),
		...speciesDiffs
	}
}

/** Создание пустой заготовки для описания базового вида */
function makeEmptyDescription(speed: TSpeed = 25, darkvision: EDarkvision | false = false): TBaseSpeciesDescription {
	return {
		name: '',
		speed,
		size: 'medium',
		darkvision,
		statsModifiers: [],
		features: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languages: [],
		skills: [],
		goods: [],
		savingThrows: [],
	}
}

/** Добавление дополнительных характеристик к базовым характеристикам вида */
export function adjustDescription(baseDescription: TBaseSpeciesDescription, ...speciesDiffs: Partial<TBaseSpeciesDescription>[]): TBaseSpeciesDescription {
	const result = structuredClone(baseDescription)

	speciesDiffs.forEach(diff => {
		Object.keys(diff).forEach(key => {
			const tkey = key as keyof TBaseSpeciesDescription
			if (!(tkey in result) || typeof result[tkey] === 'undefined')
				return

			// Массивы или объекты объединяем
			if (Array.isArray(result[tkey]) || typeof result[tkey] === 'object')
				//@ts-ignore
				result[tkey] = merge(result[tkey], diff[tkey])

			// Прочие свойства перезаписываем
			else
				//@ts-ignore
				result[tkey] = diff[tkey]
		})
	})

	return result
}

/** Получение списка подвидов для базового вида */
export function subspeciesOf(baseSpecies: EBaseSpecies): TSpecies[] {
	return fullSpeciesList.filter(sp => sp.baseSpecies == baseSpecies)
}