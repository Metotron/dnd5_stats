import { maxStatValue } from '../../misc/statsList'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStatsStore } from '../../stores/statsStore'

describe('store tests', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('changing stat link 0', () => {
		const linkIndex = 0
		const store = useStatsStore()

		expect(store.dataToStatsLinks[linkIndex]).toBeNull()

		store.setValueLink(linkIndex, 'str')
		expect(store.dataToStatsLinks[linkIndex]).toEqual('str')

		store.resetStatsLinks()
		expect(store.dataToStatsLinks[linkIndex]).toBeNull()
	})

	it('changing stat value 4', () => {
		const linkIndex = 4
		const store = useStatsStore()

		expect(store.dataToStatsLinks[linkIndex]).toBeNull()

		store.setValueLink(linkIndex, 'dex')
		expect(store.dataToStatsLinks[linkIndex]).toEqual('dex')

		store.resetStatsLinks()
		expect(store.dataToStatsLinks[linkIndex]).toBeNull()

		//TODO Проверить store.isAllFieldsLinked
	})

	it('store raw numeric value to position 0', () => {
		const store = useStatsStore()

		expect(store.generatedValues).toEqual([0, 0, 0, 0, 0, 0])

		store.setGeneratedValue(0, 8)
		expect(store.generatedValues).toEqual([8, 0, 0, 0, 0, 0])

		store.setGeneratedValue(0, maxStatValue)
		expect(store.generatedValues).toEqual([maxStatValue, 0, 0, 0, 0, 0])

		expect(() => { store.setGeneratedValue(0, maxStatValue + 1) }).toThrowError()
	})

	it('set charlist stats values', () => {
		const store = useStatsStore()

		expect(store.stats.dex).toEqual(0)

		store.setStatValue('dex', 15)
		expect(store.stats.dex).toEqual(15)
	})

	it('store value out of the bounds', () => {
		const store = useStatsStore()
		expect(() => { store.setGeneratedValue(6, 1) }).toThrowError()

		expect(() => { store.setValueLink(6, 'str') }).toThrowError()

		expect(() => { store.setStatValue('str', maxStatValue + 1) }).toThrowError()
	})

})