/**
 * Генерация шести значений для дальнейшего распределения по характеристикам
 * @param {function} generator - Функция — генератор значения. Если не передавать, будет использована diceRoller
 */
function getRandomValues(generator: () => number = diceRoller): number[] {
	const randomValues: number[] = []
	for (let idx = 0; idx < 6; ++idx) {
		randomValues.push(generator())
	}

	return randomValues
}

/**
 * Генерация одного случайного значения, являющегося суммой трёл лучших значений кубиков из четырёх брошенных
 */
function diceRoller(): number {
	let values: number[] = []

	// Бросаем 4 кубика
	for (let dice = 0; dice < 4; ++dice) {
		values.push(Math.floor(Math.random() * 6 + 1))
	}

	values = discardOneMinimum(values)

	return values[0] + values[1] + values[2]
}

/**
 * Отбрасывание одного минимального значения
 * @param {number[]} values - Исходный массив
 * @return {number[]} Копия массива без одного минимального значения
 */
function discardOneMinimum(values: number[]): number[] {
	const valuesLocalCopy = [...values]
	const minValue = Math.min(...valuesLocalCopy)
	const minValueIndex = valuesLocalCopy.findIndex(V => V == minValue)
	valuesLocalCopy.splice(minValueIndex, 1)

	return valuesLocalCopy
}

export { getRandomValues, discardOneMinimum }