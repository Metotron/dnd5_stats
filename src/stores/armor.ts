import { defineStore } from 'pinia'

export const useArmorStore = defineStore({
	id: 'armor',
	state: (): {
		armorClass: number | null,
		hasDisadvantage: boolean,
		needMoreStrength: boolean
	} => ({
		armorClass: null,
		hasDisadvantage: false,
		needMoreStrength: false
	}),

	actions: {
		/**
		 * Установка класса доспеха
		 * @param {number|null} armorClass - Класс доспеха персонажа
		 */
		setArmorClass(armorClass: number | null) {
			this.armorClass = armorClass
		},

		/**
		 * Установка наличия помехи для скрытности
		 * @param {boolean} hasDisadvantage - Флаг наличия помехи
		 */
		setDisadvantage(hasDisadvantage: boolean) {
			this.hasDisadvantage = hasDisadvantage
		},

		/**
		 * Установка флага необходимости большей силы у персонажа для ношения доспеха
		 * @param {boolean} flag
		 */
		setNeedMoreStrength(flag: boolean) {
			this.needMoreStrength = flag
		}
	}
})