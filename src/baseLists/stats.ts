export type TStat = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
export type TStatsValues = Record<TStat, number>  // Числовое значение проверяется в setStatValue() в сторе

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

// Максимальное значение характеристики (в книге игрока — 30)
export const maxStatValue = 30

/** Расчёт модификатора характеристики */
export function getStatModifier(statValue: number): number | undefined {
	if (statValue < 1 || statValue > maxStatValue)
		return undefined

	return Math.ceil((statValue - 11) / 2)
}