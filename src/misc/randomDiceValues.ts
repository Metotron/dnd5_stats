/**
 * Генерация шести значений для дальнейшего распределения по характеристикам
 * @param generator - Генератор значения. Если не передавать, будет использована diceRoller()
 */
function getRandomDiceValues(generator: () => number = diceRoller): number[] {
	return Array(6).fill(0).map(() => generator())
}

/** Генерация одного случайного значения, являющегося суммой трёх лучших значений кубиков из четырёх брошенных */
function diceRoller(): number {
	// Заполняем 4 случайных значения, чтобы затем убрать минимальное
	const values = Array(4).fill(0).map(() => Math.floor(Math.random() * 6 + 1))

	return discardOneMinimum(values).reduce((s, v) => s + v)
}

/** Отбрасывание одного минимального значения */
function discardOneMinimum(values: number[]): number[] {
	const minValue = Math.min(...values)
	const minValueIdx = values.findIndex(V => V == minValue)
	values.splice(minValueIdx, 1)

	return values
}

export { getRandomDiceValues, discardOneMinimum }