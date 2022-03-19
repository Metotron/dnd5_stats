type TStats = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'

type TStatsList<T extends number | string> = Record<TStats, T>

const statsList: TStatsList<string> = {
	str: 'Сила',
	dex: 'Ловкость',
	con: 'Телосложение',
	int: 'Интеллект',
	wis: 'Мудрость',
	cha: 'Харизма'
}

const statsShorts: TStatsList<string> = {
	str: 'сил',
	dex: 'лов',
	con: 'кон',
	int: 'инт',
	wis: 'мдр',
	cha: 'хар'
}

// Получение читаемого названия характеристики из её кода
function getReadableStatName(statName: TStats): string {
	if (statName in statsList)
		return statsList[statName]

	return statName
}

// Максимальное значение характеристики (в книге игрока — 30)
const maxStatValue = 30

export { statsList, statsShorts, maxStatValue, getReadableStatName }
export type { TStats, TStatsList }