export enum EArmor {
	padded,
	leather,
	studdedLeather,
	hide,
	chainShirt,
	scaleMail,
	breastplate,
	halfPlate,
	ringMail,
	chainMail,
	splint,
	plate
}

export enum EArmorClass {
	light,
	medium,
	heavy
}

export type TArmorClassName = 'Лёгкий доспех' | 'Средний доспех' | 'Тяжёлый доспех'
type TArmorClassDescription = Record<number, {
	classType: EArmorClass,
	name: TArmorClassName
}>

export const armorClasses: TArmorClassDescription = {
	0: { classType: EArmorClass.light,  name: 'Лёгкий доспех' },
	1: { classType: EArmorClass.medium, name: 'Средний доспех' },
	2: { classType: EArmorClass.heavy,  name: 'Тяжёлый доспех' }
}


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
},
{
	id: EArmor.leather,
	group: EArmorClass.light,
	putOnTime: 1,
	takeOffTime: 1,
	name: 'Кожаный доспех',
	AC: 11,
	weight: 10,
	cost: 10,
	useDexModifier: true
},
{
	id: EArmor.studdedLeather,
	group: EArmorClass.light,
	putOnTime: 1,
	takeOffTime: 1,
	name: 'Проклёпанная кожа',
	AC: 12,
	weight: 13,
	cost: 45,
	useDexModifier: true
},
{
	id: EArmor.hide,
	group: EArmorClass.medium,
	putOnTime: 5,
	takeOffTime: 1,
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
	putOnTime: 5,
	takeOffTime: 1,
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
	putOnTime: 5,
	takeOffTime: 1,
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
	putOnTime: 5,
	takeOffTime: 1,
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
	putOnTime: 5,
	takeOffTime: 1,
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
	putOnTime: 10,
	takeOffTime: 5,
	name: 'Колечный доспех',
	AC: 14,
	weight: 40,
	cost: 30,
	stealthDisadvantage: true
},
{
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
},
{
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
},
{
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
}]


export enum EShield {
	standard
}
export type TShield = {
	id: EShield
	name: string   // Наименование
	cost: number  // Цена
	AC: number     // Прибавка к классу брони
	weight: number // Масса в фунтах
}
// Щиты
export const shields: TShield[] = [{
	id: EShield.standard,
	name: 'Обычный щит',
	cost: 10,
	AC: 2,
	weight: 6
}]

/** Получение названия класса брони по enum-параметру */
export function getArmorClassName(armorClass?: EArmorClass): TArmorClassName | undefined {
	return Object.values(armorClasses).find(cls => cls.classType === armorClass)?.name
}

/** Получение списка доспехов указанного класса брони */
export function getArmorsOfClass(armorClass: EArmorClass): TArmorDescription[] {
	return fullArmorsList.filter(({ group }) => group === armorClass)
}