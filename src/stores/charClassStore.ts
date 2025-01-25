import { defineStore } from 'pinia'
import { type CharClassID, charClasses } from '../misc/charClasses'

interface TStore {
	charClass: CharClassID
}

export const useCharClassStore = defineStore('charClass', {
	state(): TStore { return {
		charClass: 'fighter'
	}},

	actions: {
		/**
		 * Установка класса персонажа
		 * @param {string} classID - Псевдоним класса
		 */
		setCharClass(classID: CharClassID) {
			this.charClass = classID
		}
	},

	getters: {
		/** Получение значения кости хитов для персонажа */
		charHitDice: state => charClasses[state.charClass].hitDice
	}
})