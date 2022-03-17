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

export { statsList }
export type { TStats, TStatsList }