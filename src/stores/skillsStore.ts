/** Владение навыками персонажем */

import { defineStore } from 'pinia'
import { TSkillEnum } from '../misc/skills'

interface TStoreType {
	proficiencies: Record<TSkillEnum, boolean>
}

export const useSkillsStore = defineStore('skills', {
	state(): TStoreType { return {
		proficiencies: {
			[TSkillEnum.athletics]: false,
			[TSkillEnum.acrobatics]: false,
			[TSkillEnum.sleightOfHand]: false,
			[TSkillEnum.stealth]: false,
			[TSkillEnum.arcana]: false,
			[TSkillEnum.history]: false,
			[TSkillEnum.investigation]: false,
			[TSkillEnum.nature]: false,
			[TSkillEnum.religion]: false,
			[TSkillEnum.animalHandling]: false,
			[TSkillEnum.insight]: false,
			[TSkillEnum.medicine]: false,
			[TSkillEnum.perception]: false,
			[TSkillEnum.survival]: false,
			[TSkillEnum.deception]: false,
			[TSkillEnum.intimidation]: false,
			[TSkillEnum.performance]: false,
			[TSkillEnum.persuasion]: false
		}
	}},

	actions: {
		/**
		 * Установка значения владения навыком
		 * @param skillId - Условное обозначение навыка
		 * @param value - Состояние владения навыком
		 */
		setProficiency(skillId: TSkillEnum, value: boolean) {
			this.proficiencies[skillId] = value
		}
	}
})