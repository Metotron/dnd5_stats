enum EArmor {
	'padded',
	'leather',
	'studdedLeather',
	'hide',
	'chainShirt',
	'scaleMail',
	'breastplate',
	'halfPlate',
	'ringMail',
	'chainMail',
	'splint',
	'plate'
}

enum EArmorClass {
	'light',
	'medium',
	'heavy'
}

type TArmorClassName = 'Лёгкий доспех' | 'Средний доспех' | 'Тяжёлый доспех'

export const armorClassName: Record<EArmorClass, TArmorClassName> = {
	[EArmorClass.light]: 'Лёгкий доспех',
	[EArmorClass.medium]: 'Средний доспех',
	[EArmorClass.heavy]: 'Тяжёлый доспех'
}

type TArmorDescription = {
	id: EArmor,              // Идентификатор доспеха
	group: EArmorClass,      // Группа брони (лёгкий, средний, тяжёлый доспех)
	className: TArmorClassName,  // Грууппа брони на русском
	name: string,    // Название на русском
	AC: number,      // Класс брони
	weight: number,  // Масса в фунтах
	cost: number,    // Стоимость в золотых монетах
	useDexModifier?: true,
	maximumDexModifier?: number,
	minimumStr?: number,
	stealthDisadvantage?: true
}

export const armorList: TArmorDescription[] = [
	{
		id: EArmor.padded,
		group: EArmorClass.light,
		className: armorClassName[EArmorClass.light],
		name: 'Стёганый доспех',
		AC: 11,
		weight: 8,
		cost: 5,
		useDexModifier: true,
		stealthDisadvantage: true
	},
	{
		id: EArmor.leather,
		group: EArmorClass.light,
		className: armorClassName[EArmorClass.light],
		name: 'Кожаный доспех',
		AC: 11,
		weight: 10,
		cost: 10,
		useDexModifier: true
	},
	{
		id: EArmor.studdedLeather,
		group: EArmorClass.light,
		className: armorClassName[EArmorClass.light],
		name: 'Проклёпанная кожа',
		AC: 12,
		weight: 13,
		cost: 45,
		useDexModifier: true
	},
	{
		id: EArmor.hide,
		group: EArmorClass.medium,
		className: armorClassName[EArmorClass.medium],
		name: 'Шкурный доспех',
		AC: 12,
		weight: 12,
		cost: 10,
		useDexModifier: true,
		maximumDexModifier: 2
	},
	{
		id: EArmor.chainShirt,
		group: EArmorClass.medium,
		className: armorClassName[EArmorClass.medium],
		name: 'Кольчужная рубаха',
		AC: 13,
		weight: 20,
		cost: 50,
		useDexModifier: true,
		maximumDexModifier: 2
	},
	{
		id: EArmor.scaleMail,
		group: EArmorClass.medium,
		className: armorClassName[EArmorClass.medium],
		name: 'Чешуйчатый доспех',
		AC: 14,
		weight: 45,
		cost: 50,
		useDexModifier: true,
		maximumDexModifier: 2,
		stealthDisadvantage: true
	},
	{
		id: EArmor.breastplate,
		group: EArmorClass.medium,
		className: armorClassName[EArmorClass.medium],
		name: 'Кираса',
		AC: 14,
		weight: 20,
		cost: 400,
		useDexModifier: true,
		maximumDexModifier: 2
	},
	{
		id: EArmor.halfPlate,
		group: EArmorClass.medium,
		className: armorClassName[EArmorClass.medium],
		name: 'Полулаты',
		AC: 15,
		weight: 40,
		cost: 750,
		useDexModifier: true,
		stealthDisadvantage: true,
		maximumDexModifier: 2
	},
	{
		id: EArmor.ringMail,
		group: EArmorClass.heavy,
		className: armorClassName[EArmorClass.heavy],
		name: 'Колечный доспех',
		AC: 14,
		weight: 40,
		cost: 30,
		stealthDisadvantage: true
	},
	{
		id: EArmor.chainMail,
		group: EArmorClass.heavy,
		className: armorClassName[EArmorClass.heavy],
		name: 'Кольчуга',
		AC: 16,
		weight: 55,
		cost: 75,
		minimumStr: 13,
		stealthDisadvantage: true
	},
	{
		id: EArmor.splint,
		group: EArmorClass.heavy,
		className: armorClassName[EArmorClass.heavy],
		name: 'Наборный доспех',
		AC: 17,
		weight: 60,
		cost: 200,
		minimumStr: 15,
		stealthDisadvantage: true
	},
	{
		id: EArmor.plate,
		group: EArmorClass.heavy,
		className: armorClassName[EArmorClass.heavy],
		name: 'Латы',
		AC: 18,
		weight: 65,
		cost: 1500,
		minimumStr: 15,
		stealthDisadvantage: true
	}
]

//? Щит понадобится, у него отдельное описание
export const shield = {
	cost: 10,
	AC: 2,  // Это +2 к основному классу брони
	weight: 6
}

export type { EArmor, EArmorClass, TArmorDescription, TArmorClassName }