/** Характеристики надетых на персонажа доспехов */

import { defineStore } from 'pinia'
import { armorList, type TArmorEnum } from '../misc/armorList'
import { useStatsStore } from './statsStore'

interface TStore {
	selectedArmor: TArmorEnum | null
}

export const useArmorStore = defineStore('armor', {
	state(): TStore { return {
		selectedArmor: null
	}},

	actions: {
		setArmor(armor: TArmorEnum | null) {
			this.selectedArmor = armor
		}
	},

	getters: {
		/** Требуется ли персонажу больше силы, чтобы носить выбранный доспех */
		isNeedMoreStrength: state => {
			if (state.selectedArmor === null)
				return false

			const selectedArmor = armorList.find(({ id }) => id === state.selectedArmor)
			if (selectedArmor?.minimumStr)
				return useStatsStore().stats.str < selectedArmor.minimumStr

			return false
		}
	}
})