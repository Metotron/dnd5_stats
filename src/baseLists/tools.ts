/** Инструменты */

export enum ETool {
	brewer,          // Инструменты пивовара
	smith,           // Инструменты кузнеца
	masons,          // Инструменты каменщика
	tinkers,         // Инструменты жестянщика
	alchemists,      // Инструменты алхимика
	calligraphers,   // Инструменты каллиграфа
	carpenters,      // Инструменты плотника
	cartographers,   // Инструменты картографа
	cobblers,        // Инструменты сапожника
	cooks,           // Инструменты повара
	glassblowers,    // Инструменты стеклодува
	jewelers,        // Инструменты ювелира
	leatherworkers,  // Инструменты кожевника
	painters,        // Инструменты художника
	weavers,         // Инструменты ткача
	woodcarvers,     // Инструменты резчика по дереву
	disguise,        // Набор для грима
	forgery,         // Набор для фальсификации
	dice,            // Кости
	dragonchess,     // Драконьи шахматы
	playingcard,     // Карты
	threedragonante, // Ставка трёх драконов
	herbalism,       // Набор травника
	drum,            // Барабан
	viol,            // Виола
	bagpipes,        // Волынка
	lyre,            // Лира
	lute,            // Лютня
	horn,            // Рожок
	panflute,        // Свирель
	flute,           // Флейта
	dulcimer,        // Цимбалы
	shawm,           // Шалмей
	navigators,      // Инструменты навигатора
	poisoners,       // Инструменты отравителя
	thieves,         // Воровские инструменты
	vehicles,        // Транспорт
}

//TODO Добавить таблицы для транспорта

export type TToolCategory = typeof fullToollsCats[number]

type TTool = {
	id: ETool,
	category: TToolCategory
	name: string
	cost: number   // Цена в золотых монетах
	weight: number // Вес в фунтах
}

const fullToollsCats = [
	'Воровские инструменты',
	'Игровой набор',
	'Инструменты навигатора',
	'Инструменты отравителя',
	'Инструменты ремесленника',
	'Музыкальные инструменты',
	'Набор для грима',
	'Набор для фальсификации',
	'Набор травника',
	'Транспорт',
] as const

export const fullToolsList: TTool[] = [{
	id: ETool.brewer,
	category: 'Инструменты ремесленника',
	name: 'Инструменты пивовара',
	cost: 20,
	weight: 9,
}, {
	id: ETool.smith,
	category: 'Инструменты ремесленника',
	name: 'Инструменты кузнеца',
	cost: 20,
	weight: 8,
}, {
	id: ETool.masons,
	category: 'Инструменты ремесленника',
	name: 'Инструменты каменщика',
	cost: 10,
	weight: 8,
}, {
	id: ETool.tinkers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты жестянщика',
	cost: 50,
	weight: 10,
}, {
	id: ETool.alchemists,
	category: 'Инструменты ремесленника',
	name: 'Инструменты алхимика',
	cost: 50,
	weight: 8,
}, {
	id: ETool.calligraphers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты каллиграфа',
	cost: 10,
	weight: 5,
}, {
	id: ETool.carpenters,
	category: 'Инструменты ремесленника',
	name: 'Инструменты плотника',
	cost: 8,
	weight: 6,
}, {
	id: ETool.cartographers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты картографа',
	cost: 15,
	weight: 6,
}, {
	id: ETool.cobblers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты сапожника',
	cost: 5,
	weight: 5,
}, {
	id: ETool.cooks,
	category: 'Инструменты ремесленника',
	name: 'Инструменты повара',
	cost: 1,
	weight: 8,
}, {
	id: ETool.glassblowers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты стеклодува',
	cost: 30,
	weight: 5,
}, {
	id: ETool.jewelers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты ювелира',
	cost: 25,
	weight: 2,
}, {
	id: ETool.leatherworkers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты кожевника',
	cost: 5,
	weight: 5,
}, {
	id: ETool.painters,
	category: 'Инструменты ремесленника',
	name: 'Инструменты художника',
	cost: 10,
	weight: 5,
}, {
	id: ETool.weavers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты ткача',
	cost: 1,
	weight: 5,
}, {
	id: ETool.woodcarvers,
	category: 'Инструменты ремесленника',
	name: 'Инструменты резчика по дереву',
	cost: 1,
	weight: 5,
}, {
	id: ETool.disguise,
	category: 'Набор для грима',
	name: 'Набор для грима',
	cost: 25,
	weight: 3,
}, {
	id: ETool.forgery,
	category: 'Набор для фальсификации',
	name: 'Набор для фальсификации',
	cost: 15,
	weight: 5,
}, {
	id: ETool.dice,
	category: 'Игровой набор',
	name: 'Кости',
	cost: .1,
	weight: 0,
}, {
	id: ETool.dragonchess,
	category: 'Игровой набор',
	name: 'Драконьи шахматы',
	cost: 1,
	weight: .5,
}, {
	id: ETool.playingcard,
	category: 'Игровой набор',
	name: 'Карты',
	cost: .5,
	weight: 0,
}, {
	id: ETool.threedragonante,
	category: 'Игровой набор',
	name: 'Ставка трёх драконов',
	cost: 1,
	weight: 0,
}, {
	id: ETool.herbalism,
	category: 'Набор травника',
	name: 'Набор травника',
	cost: 5,
	weight: 3,
}, {
	id: ETool.drum,
	category: 'Музыкальные инструменты',
	name: 'Барабан',
	cost: 6,
	weight: 3,
}, {
	id: ETool.viol,
	category: 'Музыкальные инструменты',
	name: 'Виола',
	cost: 30,
	weight: 1,
}, {
	id: ETool.bagpipes,
	category: 'Музыкальные инструменты',
	name: 'Волынка',
	cost: 30,
	weight: 6,
}, {
	id: ETool.lyre,
	category: 'Музыкальные инструменты',
	name: 'Лира',
	cost: 30,
	weight: 2,
}, {
	id: ETool.lute,
	category: 'Музыкальные инструменты',
	name: 'Лютня',
	cost: 35,
	weight: 2,
}, {
	id: ETool.horn,
	category: 'Музыкальные инструменты',
	name: 'Рожок',
	cost: 3,
	weight: 2,
}, {
	id: ETool.panflute,
	category: 'Музыкальные инструменты',
	name: 'Свирель',
	cost: 12,
	weight: 2,
}, {
	id: ETool.flute,
	category: 'Музыкальные инструменты',
	name: 'Флейта',
	cost: 2,
	weight: 1,
}, {
	id: ETool.dulcimer,
	category: 'Музыкальные инструменты',
	name: 'Цимбалы',
	cost: 25,
	weight: 10,
}, {
	id: ETool.shawm,
	category: 'Музыкальные инструменты',
	name: 'Шалмей',
	cost: 2,
	weight: 1,
}, {
	id: ETool.navigators,
	category: 'Инструменты навигатора',
	name: 'Инструменты навигатора',
	cost: 25,
	weight: 2,
}, {
	id: ETool.poisoners,
	category: 'Инструменты отравителя',
	name: 'Инструменты отравителя',
	cost: 50,
	weight: 2,
}, {
	id: ETool.thieves,
	category: 'Воровские инструменты',
	name: 'Воровские инструменты',
	cost: 25,
	weight: 1,
}, {
	id: ETool.vehicles,
	category: 'Транспорт',
	name: 'Транспорт',
	cost: 0,
	weight: 0,
}] as const

/** Фильтру инструментов по категории */
export function getToolsByCategory(category: TToolCategory): TTool[] {
	return Object.values(fullToolsList).filter(tool => tool.category === category)
}