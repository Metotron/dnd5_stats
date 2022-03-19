import { defineStore } from 'pinia'
import { maxStatValue } from '@/misc/statsList'
import type { TStats, TStatsList } from '@/misc/statsList'

export const useStatsStore = defineStore({
	id: 'stats',
	state: (): {
		generatedValues: number[],
		stats: TStatsList<number>,
		dataToStatsLinks: {
			[index: number]: TStats | null
		}
	} => ({
		// Сгенерированные значения
		generatedValues: [0, 0, 0, 0, 0, 0],

		// Значения характеристик, выбранные для использования в чарлисте
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
		/**
		 * Сброс привязок в null
		 */
		resetStatsLinks() {
			for (const idx in this.dataToStatsLinks) {
				this.dataToStatsLinks[idx] = null
			}
		},

		/**
		 * Установка значений харатеристик в чарлисте
		 * @param {string} stat - псевдоним характеристики
		 * @param {number} value - числовое значение характеристики
		 */
		setStatValue(stat: TStats, value: number) {
			this.stats[stat] = value
		},

		/**
		 * Установка привязки для числа в позиции с указанным индексом
		 * @param {number} position - Индекс устанавливаемой привязки
		 * @param {string|null} linkTo - Псевдоним характеристики
		 */
		setValueLink(position: number, linkTo: TStats | null) {
			if (position < 0 || position > 5) {
				return 0
			}

			this.dataToStatsLinks[position] = linkTo
		},

		/**
		 * Сохранение сырых значений после генерации
		 * @param {number} index - индекс сохраняемого значения
		 * @param {number} value - сохраняемое значение в пределах от 1 до maxStatValue (по умолчанию 20)
		 */
		setGeneratedValue(index: number, value: number) {
			if (value < 1 || value > maxStatValue) {
				throw 'Некорректное сохраняемое значение. Характеристика должна быть в пределах от 1 до 20';
			}

			this.generatedValues[index] = value
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
