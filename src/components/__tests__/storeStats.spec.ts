import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStatsStore } from '@/stores/stats'

describe('store tests', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('setting value 0', () => {
		const valueIndex = 0
		const store = useStatsStore()
		store.setValueLink(valueIndex, 'str')
		expect(store.dataToStatsLinks[valueIndex]).toEqual('str')

		store.resetStatsLinks()
		expect(store.dataToStatsLinks[valueIndex]).toBeNull()
	})

	it('setting value 4', () => {
		const valueIndex = 4
		const store = useStatsStore()
		store.setValueLink(valueIndex, 'dex')
		expect(store.dataToStatsLinks[valueIndex]).toEqual('dex')

		store.resetStatsLinks()
		expect(store.dataToStatsLinks[valueIndex]).toBeNull()
	})
})