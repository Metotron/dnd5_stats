import { describe, it, expect, vi } from 'vitest'
import { getRandomDiceValues, discardOneMinimum } from '../../misc/randomDiceValues'

describe('Проверка работы генератора значений кубиков', () => {
	const numbersGenerator = vi.fn()
	numbersGenerator
		.mockReturnValueOnce(8)
		.mockReturnValueOnce(9)
		.mockReturnValueOnce(10)
		.mockReturnValueOnce(1)
		.mockReturnValueOnce(3)
		.mockReturnValue(14)


	it('Удаление одного минимального элемента из массива', () => {
		expect(discardOneMinimum([1, 2, 3, 4])).toEqual([2, 3, 4])
		expect(discardOneMinimum([7, 5, 2, 4])).toEqual([7, 5, 4])
		expect(discardOneMinimum([3, 3, 3, 3])).toEqual([3, 3, 3])
	})


	it('Проверка возможности получения 6 сгенерированных значений', () => {
		expect(getRandomDiceValues(numbersGenerator)).toEqual([8, 9, 10, 1, 3, 14])
	})
})