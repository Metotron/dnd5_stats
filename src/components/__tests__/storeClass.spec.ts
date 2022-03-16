import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCharClassStore } from '@/stores/charClass'

describe('store tests', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('setting character class to monk', () => {
		const store = useCharClassStore()
		// По умолчанию установлен класс fighter
		expect(store.charClass).toEqual('fighter')

		store.setCharClass('monk')
		expect(store.charClass).toEqual('monk')
	})
})