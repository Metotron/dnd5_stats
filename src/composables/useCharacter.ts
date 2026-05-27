import { computed, reactive, readonly, ref, type ComputedRef } from 'vue'
import { calculateArmorValues, fullArmorsList, fullShieldsList, getArmorClassNameByEnum, type EArmor, type EShield } from '@/handbook-data/armors'
import { ECharClass, fullCharClassesList } from '@/handbook-data/classes'
import { ERace, fullRacesList } from '@/handbook-data/races'
import { ESkill, fullSkillsList } from '@/handbook-data/skills'
import { getStatModifier, maxStatValue, type TStat } from '@/handbook-data/stats'

import { useCharacterStorage } from './useCharacterStorage'

const { findCharacterById, storeCharacter } = useCharacterStorage()

let characterId = 1  // Идентификатор персонажа

export const useCharacter = (id?: number) => {
	if (id) {
		const found = findCharacterById(id)
		if (found)
			return found
		throw new Error(`Не найден персонаж с id ${id}`)
	}

	const newCharacter = new Character(characterId++)
	storeCharacter(newCharacter)

	return newCharacter
}


export class Character {
	constructor(public id: number) {}


	/** Имя */
	#name = ref('Персонаж')
	name = computed({
		get: () => readonly(this.#name),
		set: (name: string) => this.#name.value = name
	})


	/** Значения характеристик */
	#stats = reactive<Record<TStat, number>>({
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10
	})
	get stats() { return this.#stats }
	setStat(stat: TStat, value: number) { this.#stats[stat] = Math.max(1, Math.min(maxStatValue, value)) }

	/** Модификатор для характеристики */
	statModifier(stat: TStat) { return getStatModifier(this.#stats[stat]) }


	/** Надетая броня */
	#armor = ref<EArmor>()
	armor = computed({
		get: () => fullArmorsList.find(armor => armor.id === this.#armor.value),
		set: (armor: EArmor | undefined) => this.#armor.value = armor
	})
	get rawArmorValue(): EArmor | undefined { return this.#armor.value }

	/** Нужно ли персонажу больше силы, чтобы носить выбранную броню */
	get needMoreStrength() {
		return computed(() => this.armor.value !== undefined && this.#stats.str < (this.armor.value.minimumStr ?? 0))
	}


	/** "Надетый" щит */
	#shield = ref<EShield>()
	shield = computed({
		get: () => fullShieldsList.find(shield => shield.id === this.#shield.value),
		set: (shield: EShield | undefined) => this.#shield.value = shield
	})
	get rawShieldValue(): EShield | undefined { return this.#shield.value }

	// Объект со значениями брони
	get armorValues(): { armorClass: string, AC: number } {
		return calculateArmorValues(this.#stats.dex, this.armor.value, this.shield.value)
	}


	/** Раса */
	#race = ref<ERace>(ERace['human.standard'])
	race = computed({
		get: () => fullRacesList.find(r => r.race == this.#race.value)!,
		set: (race: ERace) => this.#race.value = race
	})
	get rawRaceValue(): ERace { return this.#race.value }


	/** Класс персонажа */
	#charClass = ref<ECharClass>(ECharClass.fighter)
	charClass = computed({
		get: () => fullCharClassesList.find(cl => cl.charClass == this.#charClass.value)!,
		set: (charClass: ECharClass) => this.#charClass.value = charClass
	})
	hitDice = computed(() => this.charClass.value.hitDice)
	get rawCharClassValue(): ECharClass { return this.#charClass.value }

	/** Уровень */
	#level = ref(1)
	level = computed({
		get: () => readonly(this.#level),
		set: (level: number) => this.#level.value = Math.max(1, Math.min(20, level))
	})
	/** Бонус мастерства */
	proficiencyBonus = computed(() => Math.floor((this.#level.value - 1) / 4) + 2)


	/** Включенные навыки */
	#proficiencies = ref<Set<ESkill>>(new Set())

	/** Количество установленных навыков */
	get proficienciesCount(): ComputedRef<number> { return computed(() => this.#proficiencies.value.size) }

	/** Установлен ли навык */
	hasProficiency(skill: ESkill): boolean { return this.#proficiencies.value.has(skill) }

	/** Получение численного значения навыка */
	getProficiencyValue(skill: ESkill): number { return 10 + getSkillModifier(skill, this) }

	/** Сброс навыков */
	resetProficiencies() { this.#proficiencies.value.clear() }

	/** Включение-выключение навыка */
	setProficiency(skill: ESkill, value: boolean) { this.#proficiencies.value[value ? 'add' : 'delete'](skill) }


	/** Вдохновение мастера */
	#inspiration = ref(false)
	inspiration = computed({
		get: () => readonly(this.#inspiration),
		set: (inspiration: boolean) => this.#inspiration.value = inspiration
	})
}


/** Модификатор от характеристики, на которой основан навык skillName */
export function getSkillModifier(skillName: ESkill, character: Character): number {
	const statAbbr: TStat = fullSkillsList.find(s => s.skill == skillName)!.statType
	const statValue = character.stats[statAbbr]
	const modifier = statValue > 0 ? Math.ceil((statValue - 11) / 2) : 0
	const bonus = character.hasProficiency(skillName) ? character.proficiencyBonus.value : 0

	return modifier + bonus
}