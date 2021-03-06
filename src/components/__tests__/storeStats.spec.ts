import { maxStatValue } from '@/misc/statsList'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStatsStore } from '@/stores/statsStore'

describe('store tests', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})


	it('changing stat value 0', () => {
		const valueIndex = 0
		const store = useStatsStore()

		expect(store.dataToStatsLinks[valueIndex]).toBeNull()

		store.setValueLink(valueIndex, 'str')
		expect(store.dataToStatsLinks[valueIndex]).toEqual('str')

		store.resetStatsLinks()
		expect(store.dataToStatsLinks[valueIndex]).toBeNull()
	})


	it('changing stat value 4', () => {
		const valueIndex = 4
		const store = useStatsStore()

		expect(store.dataToStatsLinks[valueIndex]).toBeNull()

		store.setValueLink(valueIndex, 'dex')
		expect(store.dataToStatsLinks[valueIndex]).toEqual('dex')

		store.resetStatsLinks()
		expect(store.dataToStatsLinks[valueIndex]).toBeNull()
	})


	it('store numeric value to position 0', () => {
		const store = useStatsStore()
		expect(store.generatedValues).toEqual([0, 0, 0, 0, 0, 0])

		store.setGeneratedValue(0, 8)
		expect(store.generatedValues).toEqual([8, 0, 0, 0, 0, 0])

		expect(() => { store.setGeneratedValue(0, maxStatValue + 1) }).toThrowError()
	})


	it('set charlist stats values', () => {
		const store = useStatsStore()
		expect(store.stats.dex).toEqual(0)

		store.setStatValue('dex', 15)
		expect(store.stats.dex).toEqual(15)
	})
})