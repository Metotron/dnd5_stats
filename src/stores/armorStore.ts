/** Характеристики надетых на персонажа доспехов */

import { defineStore } from 'pinia'
import { fullArmorsList, type EArmor } from '../misc/armorList'
import { useStatsStore } from './statsStore'

export interface TArmorStore {
	selectedArmor: EArmor | null
}

export const useArmorStore = defineStore('armor', {
	state(): TArmorStore { return {
		selectedArmor: null
	}},

	actions: {
		setArmor(armor: EArmor | null) {
			this.selectedArmor = armor
		}
	},

	getters: {
		/** Требуется ли персонажу больше силы, чтобы носить выбранный доспех */
		isNeedMoreStrength: state => {
			if (state.selectedArmor === null)
				return false

			const selectedArmor = fullArmorsList.find(({ id }) => id === state.selectedArmor)
			if (selectedArmor?.minimumStr)
				return useStatsStore().stats.str < selectedArmor.minimumStr

			return false
		}
	}
})