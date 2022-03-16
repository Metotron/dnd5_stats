/**
 * Генерация значений всех характеристик
 */
function getRandomValues(): number[] {
	const randomValues: number[] = []

	for (let idx = 0; idx < 6; ++idx) {
		randomValues.push(getRandomValue())
	}

	return randomValues
}

/**
 * Генерация одного случайного значения, являющегося суммой трёл лучших значений кубиков из четырёх брошенных
 */
function getRandomValue(): number {
	const values: number[] = []

	// Бросаем 4 кубика
	for (let V = 0; V < 4; ++V) {
		values.push(Math.floor(Math.random() * 6 + 1))
	}

	// Исключаем одно минимальное значение
	const minValue = Math.min(...values)
	const minValueIndex = values.findIndex(V => V == minValue)
	values.splice(minValueIndex, 1)

	return values[0] + values[1] + values[2]
}

export { getRandomValues }