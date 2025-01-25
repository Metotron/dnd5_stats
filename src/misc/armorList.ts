enum TArmorEnum {
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

enum TArmorClassEnum {
	'light',
	'medium',
	'heavy'
}

type TArmorClassName = 'Лёгкий доспех' | 'Средний доспех' | 'Тяжёлый доспех'

const ArmorClassName: Record<TArmorClassEnum, TArmorClassName> = {
	[TArmorClassEnum.light]: 'Лёгкий доспех',
	[TArmorClassEnum.medium]: 'Средний доспех',
	[TArmorClassEnum.heavy]: 'Тяжёлый доспех'
}

type TArmorDescription = {
	id: TArmorEnum,              // Идентификатор доспеха
	group: TArmorClassEnum,      // Группа брони (лёгкий, средний, тяжёлый доспех)
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

const armorList: TArmorDescription[] = [
	{
		id: TArmorEnum.padded,
		group: TArmorClassEnum.light,
		className: ArmorClassName[TArmorClassEnum.light],
		name: 'Стёганый доспех',
		AC: 11,
		weight: 8,
		cost: 5,
		useDexModifier: true,
		stealthDisadvantage: true
	},
	{
		id: TArmorEnum.leather,
		group: TArmorClassEnum.light,
		className: ArmorClassName[TArmorClassEnum.light],
		name: 'Кожаный доспех',
		AC: 11,
		weight: 10,
		cost: 10,
		useDexModifier: true
	},
	{
		id: TArmorEnum.studdedLeather,
		group: TArmorClassEnum.light,
		className: ArmorClassName[TArmorClassEnum.light],
		name: 'Проклёпанная кожа',
		AC: 12,
		weight: 13,
		cost: 45,
		useDexModifier: true
	},
	{
		id: TArmorEnum.hide,
		group: TArmorClassEnum.medium,
		className: ArmorClassName[TArmorClassEnum.medium],
		name: 'Шкурный доспех',
		AC: 12,
		weight: 12,
		cost: 10,
		useDexModifier: true,
		maximumDexModifier: 2
	},
	{
		id: TArmorEnum.chainShirt,
		group: TArmorClassEnum.medium,
		className: ArmorClassName[TArmorClassEnum.medium],
		name: 'Кольчужная рубаха',
		AC: 13,
		weight: 20,
		cost: 50,
		useDexModifier: true,
		maximumDexModifier: 2
	},
	{
		id: TArmorEnum.scaleMail,
		group: TArmorClassEnum.medium,
		className: ArmorClassName[TArmorClassEnum.medium],
		name: 'Чешуйчатый доспех',
		AC: 14,
		weight: 45,
		cost: 50,
		useDexModifier: true,
		maximumDexModifier: 2,
		stealthDisadvantage: true
	},
	{
		id: TArmorEnum.breastplate,
		group: TArmorClassEnum.medium,
		className: ArmorClassName[TArmorClassEnum.medium],
		name: 'Кираса',
		AC: 14,
		weight: 20,
		cost: 400,
		useDexModifier: true,
		maximumDexModifier: 2
	},
	{
		id: TArmorEnum.halfPlate,
		group: TArmorClassEnum.medium,
		className: ArmorClassName[TArmorClassEnum.medium],
		name: 'Полулаты',
		AC: 15,
		weight: 40,
		cost: 750,
		useDexModifier: true,
		stealthDisadvantage: true,
		maximumDexModifier: 2
	},
	{
		id: TArmorEnum.ringMail,
		group: TArmorClassEnum.heavy,
		className: ArmorClassName[TArmorClassEnum.heavy],
		name: 'Колечный доспех',
		AC: 14,
		weight: 40,
		cost: 30,
		stealthDisadvantage: true
	},
	{
		id: TArmorEnum.chainMail,
		group: TArmorClassEnum.heavy,
		className: ArmorClassName[TArmorClassEnum.heavy],
		name: 'Кольчуга',
		AC: 16,
		weight: 55,
		cost: 75,
		minimumStr: 13,
		stealthDisadvantage: true
	},
	{
		id: TArmorEnum.splint,
		group: TArmorClassEnum.heavy,
		className: ArmorClassName[TArmorClassEnum.heavy],
		name: 'Наборный доспех',
		AC: 17,
		weight: 60,
		cost: 200,
		minimumStr: 15,
		stealthDisadvantage: true
	},
	{
		id: TArmorEnum.plate,
		group: TArmorClassEnum.heavy,
		className: ArmorClassName[TArmorClassEnum.heavy],
		name: 'Латы',
		AC: 18,
		weight: 65,
		cost: 1500,
		minimumStr: 15,
		stealthDisadvantage: true
	}
]

//? Щит понадобится, у него отдельное описание
const shield = {
	cost: 10,
	AC: 2,  // Это +2 к основному классу брони
	weight: 6
}

export type { TArmorEnum, TArmorClassEnum, TArmorDescription, TArmorClassName }
export { ArmorClassName, armorList, shield }