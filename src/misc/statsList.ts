export type TStat = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
export type TStatsNames = Record<TStat, string>
export type TStatsValues = Record<TStat, number>  // Числовое значение проверяется в setStatValue() в сторе

export const statsList: TStatsNames = {
	str: 'Сила',
	dex: 'Ловкость',
	con: 'Телосложение',
	int: 'Интеллект',
	wis: 'Мудрость',
	cha: 'Харизма'
}

export const statsShorts: TStatsNames = {
	str: 'сил',
	dex: 'лов',
	con: 'кон',
	int: 'инт',
	wis: 'мдр',
	cha: 'хар'
}

// Максимальное значение характеристики (в книге игрока — 30)
export const maxStatValue = 30


/** Расчёт модификатора характеристики */
export function getStatModifier(statValue: number): number | undefined {
	if (statValue < 1 || statValue > maxStatValue)
		return undefined

	return Math.ceil((statValue - 11) / 2)
}