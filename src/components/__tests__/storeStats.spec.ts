import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { maxStatValue } from '../../misc/statsList'
import { useStatsStore } from '../../stores/statsStore'

describe('Тесты стора характеристик', () => {
	beforeEach(() => setActivePinia(createPinia()))

	for (let charIdx = 0; charIdx < 6; charIdx++) {
		it(`Привязка характеристики к ${charIdx}-й позиции, сброс характеристик`, () => {
			const store = useStatsStore()
			const linkIndex = charIdx

			expect(store.dataToStatsLinks[linkIndex]).toBeNull()

			store.setValueLink(linkIndex, 'str')
			expect(store.dataToStatsLinks[linkIndex]).toEqual('str')

			store.resetStatsLinks()
			expect(store.dataToStatsLinks[linkIndex]).toBeNull()

		})
		//TODO Проверить store.isAllFieldsLinked
	}

	it('Задание числового значения для одной из сгенерированных характеристик', () => {
		const store = useStatsStore()

		expect(store.generatedValues).toEqual([0, 0, 0, 0, 0, 0])

		store.setGeneratedValue(0, 8)
		expect(store.generatedValues).toEqual([8, 0, 0, 0, 0, 0])

		store.setGeneratedValue(0, maxStatValue)
		expect(store.generatedValues).toEqual([maxStatValue, 0, 0, 0, 0, 0])
	})

	it('Проверка выхода за допустимый диапазон характеристик при сохранении числовых значений', () => {
		const store = useStatsStore()

		expect(() => store.setGeneratedValue(0, maxStatValue + 1)).toThrow()
		expect(() => store.setGeneratedValue(0, -1)).toThrow()
	})

	it('Задание характеристик персонажа', () => {
		const store = useStatsStore()

		expect(store.stats.dex).toEqual(0)

		store.setStatValue('dex', 15)
		expect(store.stats.dex).toEqual(15)
	})

	it('Проверка выхода за допустимые значения при задании характеристик персонажа', () => {
		const store = useStatsStore()

		expect(() => store.setGeneratedValue(6, 1)).toThrow()  // Индекса 6 не существует
		expect(() => store.setValueLink(6, 'str')).toThrow()

		expect(() => store.setStatValue('str', maxStatValue + 1)).toThrow()
		expect(() => store.setStatValue('str', -1)).toThrow()

	})
})