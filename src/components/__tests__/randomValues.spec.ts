import { describe, it, expect, vi } from 'vitest'
import { getRandomValues, discardOneMinimum } from '@/misc/randomValues'

describe('random dice values generator', () => {
	const numbersGenerator = vi.fn()
	numbersGenerator
		.mockReturnValueOnce(8)
		.mockReturnValueOnce(9)
		.mockReturnValueOnce(10)
		.mockReturnValueOnce(1)
		.mockReturnValueOnce(3)
		.mockReturnValue(14)

	it('take maximum 3 of 4', () => {
		expect(discardOneMinimum([1, 2, 3, 4])).toEqual([2, 3, 4])
		expect(discardOneMinimum([7, 5, 2, 4])).toEqual([7, 5, 4])
		expect(discardOneMinimum([3, 3, 3, 3])).toEqual([3, 3, 3])
	})

	it('correct combination of 6 values', () => {
		expect(getRandomValues(numbersGenerator)).toEqual([8, 9, 10, 1, 3, 14])
	})
})
