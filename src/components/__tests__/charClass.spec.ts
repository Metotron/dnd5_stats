import { unref } from 'vue'
import { useCharacter } from '@/composables/useCharacter'
import { useCharacterStorage } from '@/composables/useCharacterStorage'
import { beforeEach, describe, expect, test } from 'vitest'
import settings from '@/settings'
import { EArmor } from '@/handbook-data/armors'

settings.save_load.AUTOSAVE = false  // Нужно, чтобы стор управлялся
settings.save_load.AUTOLOAD = false  // только действиями тестов

const charStorage = useCharacterStorage()

describe('Работа со стором персонажей', () => {
	beforeEach(() => charStorage.charactersStore.length = 0)

	test('При запросе персонажа с несуществующим id выпадает исключение', () => {
		expect(() => useCharacter(1)).toThrow(Error)
	})


	test('Созданные персонажи получают возрастающие id', () => {
		const id1 = useCharacter().id
		const id2 = useCharacter().id
		expect(id2).toBeGreaterThan(id1)
	})


	test('Создаваемые персонажи добавляются в стор', () => {
		expect(charStorage.charactersStore.length).toBe(0)
		useCharacter()
		expect(charStorage.charactersStore.length).toBe(1)
		useCharacter()
		expect(charStorage.charactersStore.length).toBe(2)
	})


	test('Стор можно очистить', () => {
		useCharacter()
		charStorage.clear()
		expect(charStorage.charactersStore.length).toBe(0)
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


describe('Работа класса персонажа', () => {
	test('Класс персонажа корректно обрабатывает установку и получение атрибутов', () => {
		const char = useCharacter()

		expect(char.id).toBeTypeOf('number')

		char.name.value = 'Валера'
		expect(unref(char.name.value)).toBe('Валера')

		char.armor.value = EArmor.chainShirt
		expect(unref(char.rawArmorValue)).toBe(EArmor.chainShirt)
		expect(unref(char.armor.value)?.name).toBe('Кольчужная рубаха')

		char.setStat('str', -2)
		expect(char.stats.str).toBe(1)
		char.setStat('str', 40)
		expect(char.stats.str).toBe(30)
		char.setStat('str', 7)
		expect(char.stats.str).toBe(7)
		expect(unref(char.needMoreStrength.value)).toBe(false)
		char.armor.value = EArmor.plate
		expect(unref(char.needMoreStrength.value)).toBe(true)
	})
})