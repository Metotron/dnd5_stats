import { defineStore } from 'pinia'
import { charClasses } from '@/misc/charClasses'
import type { CharClassID } from '@/misc/charClasses'

export const useCharClassStore = defineStore({
	id: 'charClass',
	state: (): { charClass: CharClassID } => ({
		charClass: 'fighter'
	}),

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
		charHitDice: state => charClasses[state.charClass].hitDice
	}
})