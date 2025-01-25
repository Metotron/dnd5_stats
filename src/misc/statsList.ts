type TStats = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
type TStatsNames = Record<TStats, string>
type TStatsValues = Record<TStats, number>

const statsList: TStatsNames = {
	str: 'Сила',
	dex: 'Ловкость',
	con: 'Телосложение',
	int: 'Интеллект',
	wis: 'Мудрость',
	cha: 'Харизма'
}

const statsShorts: TStatsNames = {
	str: 'сил',
	dex: 'лов',
	con: 'кон',
	int: 'инт',
	wis: 'мдр',
	cha: 'хар'
}

// Максимальное значение характеристики (в книге игрока — 30)
const maxStatValue = 30

export { statsList, statsShorts, maxStatValue }
export type { TStats, TStatsNames, TStatsValues }