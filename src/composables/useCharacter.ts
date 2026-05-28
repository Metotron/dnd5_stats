import { calculateArmorValues, fullArmorsList, fullShieldsList, type EArmor, type EShield } from '@/handbook-data/armors'
import { ECharClass, fullCharClassesList } from '@/handbook-data/classes'
import { ERace, fullRacesList } from '@/handbook-data/races'
import { ESkill, fullSkillsList } from '@/handbook-data/skills'
import { getStatModifier, maxStatValue, type TStat } from '@/handbook-data/stats'
import { computed, reactive, readonly, ref } from 'vue'

import { fullBackgroundsList, type EBackground } from '@/handbook-data/backgrounds'
import { fullWeaponsList, type EWeapon } from '@/handbook-data/weapons'
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
		get: () => this.#name.value,
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


	/** Предыстория */
	#background = ref<EBackground>()
	background = computed({
		get: () => fullBackgroundsList.find(bg => bg.id == this.#background.value),
		set: (bg: EBackground | undefined) => this.#background.value = bg
	})


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

	get proficiencies() {
		const proficiencies = this.#proficiencies
		const char = this

		return {
			/** Количество установленных навыков */
			count: computed(() => proficiencies.value.size),

			/** Установлен ли навык */
			enabled(skill: ESkill): boolean { return proficiencies.value.has(skill) },

			/** Получение численного значения навыка */
			getValue(skill: ESkill): number { return 10 + getSkillModifier(skill, char) },

			/** Сброс навыков */
			resetAll() { proficiencies.value.clear() },

			/** Включение-выключение навыка */
			set(skill: ESkill, value: boolean) { proficiencies.value[value ? 'add' : 'delete'](skill) },
		}
	}


	/** Вдохновение мастера */
	#inspiration = ref(false)
	inspiration = computed({
		get: () => readonly(this.#inspiration),
		set: (inspiration: boolean) => this.#inspiration.value = inspiration
	})


	/** Вооружение */
	#weapons = ref<EWeapon[]>([])
	get rawWeaponsValue(): EWeapon[] { return this.#weapons.value }
	get weapons() {
		const weapons = this.#weapons

		return {
			list: computed(() => weapons.value.map(w => fullWeaponsList.find(weapon => weapon.id === w)!)),

			/** Добавить оружие к вооружению */
			add(weapon: EWeapon) { weapons.value.push(weapon) },

			/** Убрать одно оружие указанного наименования */
			remove(weapon: EWeapon) {
				const weaponIdx = weapons.value.findIndex(w => w === weapon)
				if (weaponIdx != -1)
					weapons.value.splice(weaponIdx, 1)
			},

			/** Убрать всё оружие */
			removeAll() { weapons.value.splice(0) }
		}
	}
}


/** Модификатор от характеристики, на которой основан навык skillName */
export function getSkillModifier(skillName: ESkill, character: Character): number {
	const statAbbr: TStat = fullSkillsList.find(s => s.skill == skillName)!.statType
	const statValue = character.stats[statAbbr]
	const modifier = statValue > 0 ? Math.ceil((statValue - 11) / 2) : 0
	const bonus = character.proficiencies.enabled(skillName) ? character.proficiencyBonus.value : 0

	return modifier + bonus
}