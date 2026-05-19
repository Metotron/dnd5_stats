/** Характеристики персонажа */

import { defineStore } from 'pinia'
import { charClasses, type CharClass } from '../misc/charClasses'

export interface ICharacter {
	name: string            // Имя
	race: unknown           // Раса  //TODO сделать расы со всеми их характеристиками
	charClass: CharClass    // Класс
	level: number           // Уровень
	inspiration: boolean    // Наличие вдохновения
}

export const useCharacterStore = defineStore('characted', {
	state(): ICharacter { return {
		name: '',
		race: 'Расы ещё не добавлены',
		charClass: 'fighter',
		level: 1,
		inspiration: false
	}},

	actions: {
		/** Установка имени */
		setName(name: string) { this.name = name },

		/** Установка расы */
		changeRace(race: unknown) {
			this.race = race
		},

		/** Установка класса (мультикласс не поддерживается) */
		setCharClass(className: CharClass) {
			this.charClass = className
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

		/** Кость хитов (зависит от класса) */
		hitDice: state => charClasses[state.charClass].hitDice
	}
})