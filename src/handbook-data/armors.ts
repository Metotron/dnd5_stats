/** @description Списки доспехов и щитов */

import { getStatModifier } from './stats'

export enum EArmor {
	padded = 'armor.padded',
	leather = 'armor.leather',
	studdedLeather = 'armor.studdedLeather',
	hide = 'armor.hide',
	chainShirt = 'armor.chainShirt',
	scaleMail = 'armor.scaleMail',
	breastplate = 'armor.breastplate',
	halfPlate = 'armor.halfPlate',
	ringMail = 'armor.ringMail',
	chainMail = 'armor.chainMail',
	splint = 'armor.splint',
	plate = 'armor.plate',
}

export enum EArmorClass {
	light = 'light',
	medium = 'medium',
	heavy = 'heavy',
}

export const armorClassList: { armorClass: EArmorClass, name: string }[] = [{
		armorClass: EArmorClass.light,
		name: 'Лёгкий доспех',
	}, {
		armorClass: EArmorClass.medium,
		name: 'Средний доспех'
	}, {
		armorClass: EArmorClass.heavy,
		name: 'Тяжёлый доспех'
	},
]

export type TArmorDescription = {
	id: EArmor,                  // Идентификатор доспеха
	group: EArmorClass,          // Группа брони (лёгкий, средний, тяжёлый доспех)
	name: string,                // Название на русском
	AC: number,                  // Класс брони
	weight: number,              // Масса в фунтах
	cost: number,                // Стоимость в золотых монетах
	putOnTime: number            // Длительность надевания в минутах
	takeOffTime: number          // Длительность снятия в минутах
	minimumStr?: number,         // Требуемая минимальная сила
	stealthDisadvantage?: true   // Помеха для скрытности
	useDexModifier?: true,       // При true к AC добавляется модификатор ловкости
	maximumDexModifier?: number, // Максимальный модификатор ловкости для прибавки к AC
}

export const fullArmorsList: TArmorDescription[] = [{
	id: EArmor.padded,
	group: EArmorClass.light,
	putOnTime: 1,
	takeOffTime: 1,
	name: 'Стёганый доспех',
	AC: 11,
	weight: 8,
	cost: 5,
	useDexModifier: true,
	stealthDisadvantage: true
}, {
	id: EArmor.leather,
	group: EArmorClass.light,
	putOnTime: 1,
	takeOffTime: 1,
	name: 'Кожаный доспех',
	AC: 11,
	weight: 10,
	cost: 10,
	useDexModifier: true
}, {
	id: EArmor.studdedLeather,
	group: EArmorClass.light,
	putOnTime: 1,
	takeOffTime: 1,
	name: 'Проклёпанная кожа',
	AC: 12,
	weight: 13,
	cost: 45,
	useDexModifier: true
}, {
	id: EArmor.hide,
	group: EArmorClass.medium,
	putOnTime: 5,
	takeOffTime: 1,
	name: 'Шкурный доспех',
	AC: 12,
	weight: 12,
	cost: 10,
	useDexModifier: true,
	maximumDexModifier: 2  // Черта EFeat.mediumarmormaster может увеличивать это значение до 3
}, {
	id: EArmor.chainShirt,
	group: EArmorClass.medium,
	putOnTime: 5,
	takeOffTime: 1,
	name: 'Кольчужная рубаха',
	AC: 13,
	weight: 20,
	cost: 50,
	useDexModifier: true,
	maximumDexModifier: 2  // Черта EFeat.mediumarmormaster может увеличивать это значение до 3
}, {
	id: EArmor.scaleMail,
	group: EArmorClass.medium,
	putOnTime: 5,
	takeOffTime: 1,
	name: 'Чешуйчатый доспех',
	AC: 14,
	weight: 45,
	cost: 50,
	useDexModifier: true,
	maximumDexModifier: 2, // Черта EFeat.mediumarmormaster может увеличивать это значение до 3
	stealthDisadvantage: true
}, {
	id: EArmor.breastplate,
	group: EArmorClass.medium,
	putOnTime: 5,
	takeOffTime: 1,
	name: 'Кираса',
	AC: 14,
	weight: 20,
	cost: 400,
	useDexModifier: true,
	maximumDexModifier: 2  // Черта EFeat.mediumarmormaster может увеличивать это значение до 3
}, {
	id: EArmor.halfPlate,
	group: EArmorClass.medium,
	putOnTime: 5,
	takeOffTime: 1,
	name: 'Полулаты',
	AC: 15,
	weight: 40,
	cost: 750,
	useDexModifier: true,
	stealthDisadvantage: true,
	maximumDexModifier: 2  // Черта EFeat.mediumarmormaster может увеличивать это значение до 3
}, {
	id: EArmor.ringMail,
	group: EArmorClass.heavy,
	putOnTime: 10,
	takeOffTime: 5,
	name: 'Колечный доспех',
	AC: 14,
	weight: 40,
	cost: 30,
	stealthDisadvantage: true
}, {
	id: EArmor.chainMail,
	group: EArmorClass.heavy,
	putOnTime: 10,
	takeOffTime: 5,
	name: 'Кольчуга',
	AC: 16,
	weight: 55,
	cost: 75,
	minimumStr: 13,
	stealthDisadvantage: true
}, {
	id: EArmor.splint,
	group: EArmorClass.heavy,
	putOnTime: 10,
	takeOffTime: 5,
	name: 'Наборный доспех',
	AC: 17,
	weight: 60,
	cost: 200,
	minimumStr: 15,
	stealthDisadvantage: true
}, {
	id: EArmor.plate,
	group: EArmorClass.heavy,
	putOnTime: 10,
	takeOffTime: 5,
	name: 'Латы',
	AC: 18,
	weight: 65,
	cost: 1500,
	minimumStr: 15,
	stealthDisadvantage: true
}] as const


// Чтобы можно было указывать щиты как группу, а не по отдельности
export enum EShieldClass {
	standard = 'standard',
}

export enum EShield {
	standard = 'standard',  // Обычный щит с +2 к КД
}

export type TShield = {
	id: EShield
	class: EShieldClass
	name: string   // Наименование
	cost: number   // Цена
	AC: number     // Прибавка к классу брони
	weight: number // Масса в фунтах
}

// Щиты
export const fullShieldsList: TShield[] = [{
	id: EShield.standard,
	class: EShieldClass.standard,
	name: 'Обычный щит',
	cost: 10,
	AC: 2,
	weight: 6
}] as const

/** Получение названия типа брони по enum */
export function getArmorClassNameByEnum(classEnum: EArmorClass | undefined): string {
	if (classEnum === undefined) return ''
	return armorClassList.find(cl => cl.armorClass === classEnum)!.name
}

/** Получение списка доспехов указанного класса брони */
export function getArmorsOfClass(armorClass: EArmorClass): TArmorDescription[] {
	return fullArmorsList.filter(({ group }) => group === armorClass)
}

/** Расчёт КД персонажа по надетой броне и ловкости */
export function calculateArmorValues(dex: number, armor?: TArmorDescription, shield?: TShield): { armorClass: string, AC: number } {
	const shieldAC = shield?.AC ?? 0
	let dexModifier = getStatModifier(dex)

	if (armor === undefined)
		return {
			armorClass: 'Без доспеха',
			AC: 10 + dexModifier + shieldAC
		}

	if (!armor.useDexModifier)
		dexModifier = 0
	else if (armor.maximumDexModifier)
		dexModifier = Math.min(armor.maximumDexModifier, dexModifier)

	return {
		armorClass: getArmorClassNameByEnum(armor.group),
		AC: armor.AC + shieldAC + dexModifier
	}
}