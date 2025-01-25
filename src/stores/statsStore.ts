/** Характеристики персонажа */

import { defineStore } from 'pinia'
import { maxStatValue } from '../misc/statsList'
import type { TStats, TStatsValues } from '../misc/statsList'

interface TStore {
	generatedValues: number[],
	stats: TStatsValues,
	dataToStatsLinks: Record<number, TStats | null>
}

const valuesCount = 6

export const useStatsStore = defineStore('stats', {
	state(): TStore { return {
		/** Сгенерированные значения */
		generatedValues: Array(valuesCount).fill(0),

		/** Числовые значения характеристик персонажа */
		stats: {
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0
		},

		/** Привязка элементов generatedValues к конкретной характеристике персонажа в stats */
		dataToStatsLinks: {
			0: null,
			1: null,
			2: null,
			3: null,
			4: null,
			5: null,
		}
	}},

	actions: {
		/** Сброс привязок */
		resetStatsLinks() {
			for (const idx in this.dataToStatsLinks)
				this.dataToStatsLinks[idx] = null
		},

		/** Установка значений харатеристик в чарлисте
		 * @param stat - Псевдоним характеристики
		 * @param value - Числовое значение
		 */
		setStatValue(stat: TStats, value: number) {
			if (value > maxStatValue)
				throw `Некорректное сохраняемое значение. Характеристика должна быть в пределах от 1 до ${maxStatValue}`;

			this.stats[stat] = value
		},

		/** Установка привязки для элемента в массиве сгенерированных номеров
		 * @param linkIdx - Индекс устанавливаемой привязки
		 * @param linkTo - Псевдоним характеристики
		 */
		setValueLink(linkIdx: number, linkTo: TStats | null) {
			if (linkIdx < 0 || linkIdx >= Object.keys(this.dataToStatsLinks).length)
				throw 'Некорректное значение индекса привязки'

			this.dataToStatsLinks[linkIdx] = linkTo
		},

		/** Сохранение сырых значений после генерации
		 * @param elementIdx - Индекс сохраняемого значения
		 * @param value - Сохраняемое значение
		 */
		setGeneratedValue(elementIdx: number, value: number) {
			if (elementIdx < 0 || elementIdx >= valuesCount)
				throw 'Некорректное значение индекса массива'

			if (value < 1 || value > maxStatValue)
				throw `Некорректное сохраняемое значение. Характеристика должна быть в пределах от 1 до ${maxStatValue}`;

			this.generatedValues[elementIdx] = value
		}
	},

	getters: {
		/** Всем ли характеристикам персонажа заданы значения */
		isAllFieldsLinked: state => {
			return !Object.values(state.dataToStatsLinks).some(link => link === null)
		}
	}
})
