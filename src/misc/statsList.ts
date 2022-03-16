type StatsType<T> = {
	str: T,
	dex: T,
	con: T,
	int: T,
	wis: T,
	cha: T
}

const statsList: StatsType<string> = {
	str: 'Сила',
	dex: 'Ловкость',
	con: 'Телосложение',
	int: 'Интеллект',
	wis: 'Мудрость',
	cha: 'Харизма'
}

export { statsList }
export type { StatsType }