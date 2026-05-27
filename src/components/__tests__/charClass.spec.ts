import { useCharacter } from '@/composables/useCharacter'
import { useCharacterStorage } from '@/composables/useCharacterStorage'
import { describe, test, expect, beforeEach } from 'vitest'
import settings from '@/settings'

settings.save_load.AUTOSAVE = false  // Нужно, чтобы стор управлялся
settings.save_load.AUTOLOAD = false  // только действиями тестов

const charStorage = useCharacterStorage()

describe('Работа с персонажами', () => {
	beforeEach(() => charStorage.charactersStore.length = 0)

	test('При запросе персонажа с несуществующим id выпадает исключение', () => {
		expect(() => useCharacter(1)).toThrow(Error)
	})


	test('Созданные персонажи получают возрастающие id', () => {
		const id1 = useCharacter().id
		const id2 = useCharacter().id
		expect(id2).toBeGreaterThan(id1)
	})


	/* test('Класс персонажа корректно обрабатывает установку и получение атрибутов', () => {
		const char = useCharacter()

		expect(char).to
	}) */


	test('Создаваемые персонажи добавляются в стор', () => {
		expect(charStorage.charactersStore.length).toEqual(0)
		useCharacter()
		expect(charStorage.charactersStore.length).toEqual(1)
		useCharacter()
		expect(charStorage.charactersStore.length).toEqual(2)
	})


	test('Стор можно очистить', () => {
		useCharacter()
		charStorage.clear()
		expect(charStorage.charactersStore.length).toEqual(0)
	})


	test('Персонажа можно найти по id', () => {
		const character = useCharacter()
		expect(() => charStorage.findCharacterById(character.id)).toBeDefined()
	})


	test('Персонажа можно удалить из стора по его ID', () => {
		useCharacter()
		const character = useCharacter()
		useCharacter()

		const storeSize = charStorage.charactersStore.length
		charStorage.deleteCharacter(character.id)
		expect(charStorage.charactersStore.length).toBe(storeSize - 1)
	})
})