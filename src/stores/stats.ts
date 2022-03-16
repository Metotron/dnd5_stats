import { defineStore } from 'pinia'
import type { StatsType } from '@/misc/statsList'

export const useStatsStore = defineStore({
	id: 'stats',
	state: (): {
		stats: StatsType<number>,
		dataToStatsLinks: {
			[index: number]: keyof StatsType<number> | null
		}
	} => ({
		// Значения характеристик, выбранные для использования
		stats: {
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0
		},

		// Привязка элементов исходного массива (по индексу) к конкретной характеристике
		dataToStatsLinks: {
			0: null,
			1: null,
			2: null,
			3: null,
			4: null,
			5: null,
		}
	}),

	actions: {
		// Сброс привязок в null
		resetStatsLinks() {
			for (const idx in this.dataToStatsLinks) {
				this.dataToStatsLinks[idx] = null
			}
		},

		// Установка привязки для числа в позиции с указанным индексом
		setValueLink(position: number, linkTo: keyof StatsType<string> | null) {
			if (position < 0 || position > 5) {
				return 0
			}

			this.dataToStatsLinks[position] = linkTo
		}
	},

	getters: {
		isAllFieldsLinked: state => {
			for (const index in state.dataToStatsLinks) {
				if (state.dataToStatsLinks[index] === null) {
					return false
				}
			}

			return true
		}
	}
})
