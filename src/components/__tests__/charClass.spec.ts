import { useCharacter } from '@/composables/useCharacter'
import { useCharacterStorage } from '@/composables/useCharacterStorage'
import { EArmor, EShield } from '@/handbook-data/armors'
import { ECharClass } from '@/handbook-data/charClasses'
import { EFeat } from '@/handbook-data/feats'
import { EOrigin } from '@/handbook-data/origins'
import { ESkill } from '@/handbook-data/skills'
import { EBaseSpecies, ESpecies } from '@/handbook-data/species'
import { maxStatValue } from '@/handbook-data/stats'
import { EWeapon } from '@/handbook-data/weapons'
import settings from '@/settings'
import { beforeEach, describe, expect, test } from 'vitest'
import { unref } from 'vue'

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

	//TODO Замокать объект с типом Storage и посохранять в него, но только когда будет готов формат хранения
})


describe('Класс персонажа корректно обрабатывает установку и получение атрибутов', () => {
	const char = useCharacter()

	expect(char.id).toBeTypeOf('number')


	test('Смена имени', () => {
		char.name.value = 'Валера'
		expect(unref(char.name.value)).toBe('Валера')
	})


	test('Смена брони', () => {
		char.armor.value = EArmor.chainShirt
		expect(unref(char.armor.value?.id)).toBe(EArmor.chainShirt)
		expect(unref(char.armor.value)?.name).toBe('Кольчужная рубаха')

		expect(unref(char.needMoreStrength.value)).toBe(false)
		char.armor.value = EArmor.plate  // Надел латы
		expect(unref(char.needMoreStrength.value)).toBe(true)
	})


	test('Смена характеристик', () => {
		char.setStat('str', -2)
		expect(char.stats.str).toBe(1)

		char.setStat('str', 40)
		expect(char.stats.str).toBe(maxStatValue)

		char.setStat('str', 7)
		expect(char.stats.str).toBe(7)
	})


	test('Взятие / снятие щита', () => {
		expect(unref(char.shield.value)).toBeUndefined()

		char.shield.value = EShield.standard  // Взял щит
		expect(unref(char.shield.value?.AC)).toBe(2)
		expect(unref(char.armorValues.AC)).toBe(20)  // Суммарный КД лат и щита

		char.shield.value = undefined
		expect(unref(char.shield.value)).toBeUndefined()
		expect(unref(char.armorValues.AC)).toBe(18)
	})


	test('Смена вида', () => {
		char.species.value = ESpecies['dragonborn.bronze']
		expect(unref(char.species.value.baseSpecies)).toBe(EBaseSpecies.dragonborn)
	})


	test('Смена класса', () => {
		char.charClass.value = ECharClass['paladin']
		expect(unref(char.charClass.value.name)).toBe('Паладин')
		expect(unref(char.charClass.value.hitDie)).toBe(10)
	})


	test('Смена уровня с проверкой выхода за допустимый диапазон', () => {
		expect(unref(char.level.value)).toBe(1)
		expect(unref(char.proficiencyBonus.value)).toBe(2)

		char.level.value = 0
		expect(unref(char.level.value)).toBe(1)

		char.level.value = 30
		expect(unref(char.level.value)).toBe(20)
		expect(unref(char.proficiencyBonus.value)).toBe(6)

		char.level.value = 5
		expect(unref(char.level.value)).toBe(5)
		expect(unref(char.proficiencyBonus.value)).toBe(3)
	})


	test('Включение/выключение навыков и подсчёт их количества', () => {
		expect(unref(char.skills.count.value)).toBe(0)
		expect(unref(char.skills.enabled(ESkill.deception))).toBe(false)

		char.skills.set(ESkill.deception, true)
		expect(unref(char.skills.enabled(ESkill.deception))).toBe(true)
		expect(unref(char.skills.count.value)).toBe(1)

		char.skills.set(ESkill.intimidation, true)
		expect(unref(char.skills.count.value)).toBe(2)

		char.skills.set(ESkill.intimidation, false)
		expect(unref(char.skills.count.value)).toBe(1)
	})


	test('Бонус мастерства прибавляется к проницательности, если её включить', () => {
		expect(char.skills.getValue(ESkill.insight)).toBe(10)
		char.skills.set(ESkill.insight, true)
		expect(unref(char.skills.enabled(ESkill.insight))).toBe(true)
		expect(char.skills.getValue(ESkill.insight)).toBe(10 + unref(char.proficiencyBonus.value))
	})


	test('Сброс всех навыков', () => {
		char.skills.resetAll()
		expect(unref(char.skills.count.value)).toBe(0)
	})


	test('Установка и снятие вдохновения', () => {
		expect(unref(char.inspiration.value)).toBe(false)

		char.inspiration.value = true
		expect(unref(char.inspiration.value)).toBe(true)

		char.inspiration.value = false
		expect(unref(char.inspiration.value)).toBe(false)
	})


	test('Добавление оружия к вооружению персонажа и удаление из него', () => {
		// Изначально нет вооружения
		expect(char.weapons.list.value.length).toBe(0)

		char.weapons.add(EWeapon.longsword)
		expect(char.weapons.list.value.length).toBe(1)
		expect(unref(char.weapons.list.value[0].name)).toBe('Длинный меч')

		// Добавление двух одинаковых оружий
		char.weapons.add(EWeapon.longsword)
		expect(char.weapons.list.value.length).toBe(2)
		expect(unref(char.weapons.list.value[0].name)).toBe('Длинный меч')
		expect(unref(char.weapons.list.value[1].name)).toBe('Длинный меч')

		char.weapons.add(EWeapon.handaxe)
		expect(char.weapons.list.value.length).toBe(3)

		char.weapons.remove(EWeapon.longsword)
		expect(unref(char.weapons.list.value.length)).toBe(2)
		expect(unref(char.weapons.list.value[0].name)).toBe('Длинный меч')
		expect(unref(char.weapons.list.value[1].name)).toBe('Ручной топор')

		char.weapons.removeAll()
		expect(char.weapons.list.value.length).toBe(0)
	})


	test('Выбор предыстории', () => {
		expect(unref(char.origin.value)).toBeUndefined()

		char.origin.value = EOrigin['acolyte']
		expect(unref(char.origin.value?.name)).toBe('Послушник')

		char.origin.value = undefined
		expect(unref(char.origin.value)).toBeUndefined()
	})


	test('Управление владением спасбросками', () => {
		expect(unref(char.savingThrows.count.value)).toBe(0)
		expect(unref(char.savingThrows.enabled('con'))).toBe(false)

		char.savingThrows.set('con', true)
		expect(unref(char.savingThrows.enabled('con'))).toBe(true)
		expect(unref(char.savingThrows.count.value)).toBe(1)
		expect(char.savingThrows.getAll().includes('con')).toBe(true)

		char.savingThrows.set('dex', true)
		expect(unref(char.savingThrows.enabled('dex'))).toBe(true)
		expect(unref(char.savingThrows.count.value)).toBe(2)
		expect(char.savingThrows.getAll().includes('con') && char.savingThrows.getAll().includes('dex')).toBe(true)

		char.savingThrows.set('con', false)
		expect(unref(char.savingThrows.enabled('con'))).toBe(false)
		expect(unref(char.savingThrows.count.value)).toBe(1)

		char.savingThrows.resetAll()
		expect(unref(char.savingThrows.count.value)).toBe(0)
	})

	test('Управление чертами', () => {
		expect(char.feats.list.value.length).toBe(0)

		char.feats.add(EFeat.crafter)
		char.feats.add(EFeat.skilled)

		expect(char.feats.list.value.find(f => f.id == EFeat.crafter)).not.toBeUndefined()
		expect(char.feats.list.value.find(f => f.id == EFeat.skilled)).not.toBeUndefined()
		expect(char.feats.list.value.length).toBe(2)

		// Не повторяемая черта
		char.feats.add(EFeat.crafter)
		expect(char.feats.list.value.length).toBe(2)

		// Повторяемая черта
		char.feats.add(EFeat.skilled)
		expect(char.feats.list.value.length).toBe(3)
		char.feats.add(EFeat.skilled)
		expect(char.feats.list.value.length).toBe(4)

		// Требует 4-го уровня
		char.feats.add(EFeat.abilityscoreimprovement)
		expect(char.feats.list.value.length).toBe(4)
		char.level.value = 5
		char.feats.add(EFeat.abilityscoreimprovement)
		expect(char.feats.list.value.length).toBe(5)
	})
})