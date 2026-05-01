import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCharClassStore } from '../../stores/charClassStore'

describe('Тесты стора классов', () => {
	beforeEach(() => setActivePinia(createPinia()))

	it('Выбор персонажу класса «монах»', () => {
		const store = useCharClassStore()

		// По умолчанию установлен класс fighter
		expect(store.charClass).toEqual('fighter')

		store.setCharClass('monk')
		expect(store.charClass).toEqual('monk')
	})
})