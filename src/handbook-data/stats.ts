/** @description Характеристики персонажа */

export type TStat = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
export const statsArray: TStat[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

type TStatDescription = {
	name: string
	shortName: string
}

export const statsList: Record<TStat, TStatDescription> = {
	str: { name: 'Сила',         shortName: 'сил' },
	dex: { name: 'Ловкость',     shortName: 'лов' },
	con: { name: 'Телосложение', shortName: 'тел' },
	int: { name: 'Интеллект',    shortName: 'инт' },
	wis: { name: 'Мудрость',     shortName: 'мдр' },
	cha: { name: 'Харизма',      shortName: 'хар' },
}

// Максимальное значение характеристики (в книге игрока — 20 для обычных персонажей)
export const maxStatValue = 20

export function isStatValueInRange(statValue: number | undefined): boolean {
	return statValue !== undefined && statValue > 1 && statValue <= maxStatValue
}

/** Расчёт модификатора характеристики */
export function getStatModifier(statValue: number): number {
	if (isStatValueInRange(statValue))
		return Math.floor((statValue - 10) / 2)
	
	throw new Error('Неправильное значение характеристик персонажа')
}