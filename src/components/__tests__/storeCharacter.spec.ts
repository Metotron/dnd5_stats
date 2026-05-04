import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../stores/characterStore'

describe('Тесты стора персонажа', () => {
	beforeEach(() => setActivePinia(createPinia()))

	it ('Персонаж создаётся с первым уровнем', () => {
		const store = useCharacterStore()
		expect(store.level).toEqual(1)
	})

	it ('Уровень персонажа не должен падать ниже 1', () => {
		const store = useCharacterStore()
		store.decreseLevel()
		// Уровень всё ещё первый
		expect(store.level).toEqual(1)
	})

	it('Уровень персонажа не может быть выше 20', () => {
		const store = useCharacterStore()
		// Двадцать прибавок уровня к изначальному первому
		for (let lv = 1; lv <= 20; lv++)
			store.increaseLevel()
		expect(store.level).toEqual(20)
	})

	it('Выбор персонажу класса «монах»', () => {
		const store = useCharacterStore()

		// По умолчанию установлен класс fighter
		expect(store.charClass).toEqual('fighter')

		store.setCharClass('monk')
		expect(store.charClass).toEqual('monk')
	})
})