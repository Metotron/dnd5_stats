/** Характеристики надетых на персонажа доспехов */

import { defineStore } from 'pinia'
import { EShield, fullArmorsList, type EArmor } from '@/baseLists/armors'
import { useStatsStore } from './statsStore'

export interface IArmorStore {
	selectedArmor: EArmor | undefined
	shield: EShield | undefined
}

export const useArmorStore = defineStore('armor', {
	state(): IArmorStore { return {
		selectedArmor: undefined,
		shield: undefined
	}},

	actions: {
		setArmor(armor: EArmor | undefined) {
			this.selectedArmor = armor
		},

		setShieldState(shield: EShield | undefined) {
			this.shield = shield
		}
	},

	getters: {
		/** Требуется ли персонажу больше силы, чтобы носить выбранный доспех */
		needMoreStrength: state => {
			if (state.selectedArmor === undefined)
				return false

			const selectedArmor = fullArmorsList.find(({ id }) => id === state.selectedArmor)
			if (selectedArmor?.minimumStr)
				return useStatsStore().stats.str < selectedArmor.minimumStr

			return false
		}
	}
})