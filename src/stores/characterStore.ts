/** Характеристики персонажа */

import { defineStore } from 'pinia'
import { ECharClass, getClassDescription } from '../baseLists/classes'
import { ERace } from '../baseLists/races'

export interface ICharacter {
	name: string           // Имя
	race: ERace            // Раса
	charClass: ECharClass  // Класс
	level: number          // Уровень
	inspiration: boolean   // Наличие вдохновения
}

export const useCharacterStore = defineStore('characted', {
	state(): ICharacter { return {
		name: '',
		race: ERace['human.standard'],
		charClass: ECharClass['fighter'],
		level: 1,
		inspiration: false
	}},

	actions: {
		/** Установка имени */
		setName(name: string) { this.name = name },

		/** Установка расы */
		changeRace(race: ERace) {
			this.race = race
		},

		/** Установка класса (мультикласс не поддерживается) */
		setCharClass(charClass: ECharClass) {
			this.charClass = charClass
		},

		/** Увеличение уровня */
		increaseLevel() {
			if (this.level < 20)
				this.level++
		},

		/** Уменьшение уровня */
		decreseLevel() {
			if (this.level > 1)
				this.level--
		},

		/** Выдача вдохновения */
		setInspiration() { this.inspiration = true },

		/** Использование вдохновения */
		useInspiration() { this.inspiration = false }
	},

	getters: {
		/** Актуальный бонус мастерства */
		proficiencyBonus: state => Math.floor((state.level - 1) / 4) + 2,
	}
})