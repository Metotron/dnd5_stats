import { merge } from '../misc/commonUtils'
import { EArmorClass } from './armors'
import { ESkill } from './skills'
import type { TStat } from './stats'
import { ETool } from './tools'

export enum EBaseRace {
	dwarf,
	elf,
	halfling,
	human,
	dragonborn,
	gnome,
	halfelf,
	halforc,
	tiefling
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
	'human.variant'
}


type TSpeed = 25 | 30 | 35
type TSize = 'small' | 'medium'

export type TBaseRaceDescription = {
	name: string
	statsModifiers?: Partial<Record<TStat, number>>[]  // Модификаторы характеристик
	speed: TSpeed                    // Футов в секунду
	size: TSize                      // Размер существа
	darkvision: boolean              //TODO Добавить подсказку с описанием тёмного зраения на 60 футов при выводе на страницу
	languages: string[]
	features?: string[]
	weaponProfiencies?: string[]     //TODO Подставить идентификаторы категорий оружия
	weaponCatProfiencies?: string[]  //FIXME Соединить с weaponProfiencies
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
			'Если вы совершаете проверку Интеллекта (История), связанную с происхождением работы по камню, вы считаетесь владеющим навыком История и добавляете к проверке удвоенный бонус мастерства вместо обычного',
		],
		languages: ['Общий', 'Дварфский'],
		weaponCatProfiencies: ['Боевой топор', 'Ручной топор', 'Лёгкий молот', 'Боевой молот'], //xxx потом заменить на enum
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
			'[Везучий.] Если при броске атаки, проверке характеристики или спасброске у вас выпало «1», вы можете перебросить кость, и должны использовать новый результат',
			'[Храбрый.] Вы совершаете с преимуществом спасброски от испуга',
			'[Проворство полуросликов.] Вы можете проходить сквозь пространство, занятое существами, чей размер больше вашего',
		],
	}),
	[EBaseRace.human]: createDescription(30, {
		name: 'Человек',
		languages: ['Общий', 'Один язык на ваш выбор'],
	}),
	[EBaseRace.dragonborn]: createDescription({
		name: 'Драконорожденный',
	}),
	[EBaseRace.gnome]: createDescription({
		name: 'Гном',
	}),
	[EBaseRace.halfelf]: createDescription({
		name: 'Полуэльф',
	}),
	[EBaseRace.halforc]: createDescription({
		name: 'Полуорк',
	}),
	[EBaseRace.tiefling]: createDescription({
		name: 'Тифлинг',
	}),
}


export type TRace = {
	baseRace: EBaseRace
	race: ERace,
	diff: Partial<TBaseRaceDescription>
}

/** Список подипов рас для игры */
export const fullRacesList: TRace[] = []

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
	weaponCatProfiencies: ['Короткий меч', 'Длинный меч', 'Короткий лук', 'Длинный лук'],
	languages: ['Один дополнительный язык на выбор'],
	features: ['Вы знаете один заговор из списка заклинаний волшебника. Его базовая характеристика — интеллект'],
}))
fullRacesList.push(createRace(EBaseRace.elf, ERace['elf.wood'], {
	name: 'Лесной эльф',
	statsModifiers: [{ wis: 1 }],
	speed: 35,
	weaponCatProfiencies: ['Короткий меч', 'Длинный меч', 'Короткий лук', 'Длинный лук'],
	features: [
		'[Маскировка в дикой местности.] Вы можете предпринять попытку спрятаться, даже если вы слабо заслонены листвой, сильным дождём, снегопадом, туманом или другими природными явлениями'
	],
}))
fullRacesList.push(createRace(EBaseRace.elf, ERace['elf.dark'], {
	name: 'Тёмный эльф',
	statsModifiers: [{ cha: 1 }],
	weaponCatProfiencies: ['Рапира', 'Короткий меч', 'Ручной арбалет'],
	features: [
		'Ваше тёмное зрение имеет радиус 120 футов',
		'[Чувствительность к солнцу.] Вы совершаете с помехой броски атаки и проверки Мудрости (Внимательность), основанные на зрении, если вы, цель вашей атаки или изучаемый предмет расположены на прямом солнечном свете',
		'Вы знаете заклинание {пляшущие огоньки}',
	],
}))


// Полурослики
fullRacesList.push(createRace(EBaseRace.halfling, ERace['halfling.lightfoot'],{
	name: 'Легконогий полурослик',
	statsModifiers: [{ cha: 1 }],
	features: ['[Естественная скрытность.] Вы можете предпринять попытку скрыться даже если заслонены только существом, превосходящими вас в размере как минимум на одну категорию'],
}))
fullRacesList.push(createRace(EBaseRace.halfling, ERace['halfling.stout'], {
	name: 'Коренастый полурослик',
	statsModifiers: [{ con: 1 }],
	features: ['[Устойчивость коренастых.] Вы совершаете с преимуществом спасброски от яда, и вы получаете сопротивление к урону ядом'],
}))


// Люди
fullRacesList.push(createRace(EBaseRace.human, ERace['human.standard'], {
	name: 'Человек',
	features: ['Значения всех ваших характеристик увеличиваются на 1'],
}))
fullRacesList.push(createRace(EBaseRace.human, ERace['human.variant'],{
	name: 'Человек (альт.)',
	features: [
		'Значения двух любых характеристик увеличиваются на 1',
		'Вы получаете владение одним навыком на выбор',
		'Вы получаете одну черту на выбор',
	],
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
		weaponCatProfiencies: [],
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