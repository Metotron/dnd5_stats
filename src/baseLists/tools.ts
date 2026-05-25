/** Инструменты */

export enum ETool {
	brewer,   // Инструменты пивовара
	smith,    // Инструменты кузнеца
	masons,   // Инструменты каменщика
	tinkers,  // Инструменты жестянщика

	//TODO Продолжить список
	vehicles, // Транспорт
}

export type TToolCategory = typeof fullToollsCats[number]

type TTool = {
	category: TToolCategory
	name: string
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

export const fullToolsList: Record<ETool, TTool> = {
	[ETool.brewer]: {
		category: 'Инструменты ремесленника',
		name: 'Инструменты пивовара'
	},
	[ETool.smith]: {
		category: 'Инструменты ремесленника',
		name: 'Инструменты кузнеца'
	},
	[ETool.masons]: {
		category: 'Инструменты ремесленника',
		name: 'Инструменты каменщика'
	},
	[ETool.vehicles]: {
		category: 'Транспорт',
		name: 'Транспорт'
	},
	[ETool.tinkers]: {
		category: 'Инструменты ремесленника',
		name: 'Инструменты жестянщика'
	}
}

/** Фильтру инструментов по категории */
export function getToolsByCategory(category: TToolCategory): TTool[] {
	return Object.values(fullToolsList).filter(tool => tool.category === category)
}