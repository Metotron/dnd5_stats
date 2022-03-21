import { defineStore } from 'pinia'
import { TSkill } from '@/misc/skills'

export const useSkillsStore = defineStore({
	id: 'skills',
	state: (): {
		skillsProficiencies: Record<TSkill, boolean>
	} => ({
		skillsProficiencies: {
			[TSkill.athletics]: false,
			[TSkill.acrobatics]: false,
			[TSkill.sleightOfHand]: false,
			[TSkill.stealth]: false,
			[TSkill.arcana]: false,
			[TSkill.history]: false,
			[TSkill.investigation]: false,
			[TSkill.nature]: false,
			[TSkill.religion]: false,
			[TSkill.animalHandling]: false,
			[TSkill.insight]: false,
			[TSkill.medicine]: false,
			[TSkill.perception]: false,
			[TSkill.survival]: false,
			[TSkill.deception]: false,
			[TSkill.intimidation]: false,
			[TSkill.performance]: false,
			[TSkill.persuasion]: false
		}
	}),

	actions: {
		/**
		 * Установка значения владения навыком
		 * @param {number} skill - Значение навыка из enum TSkill
		 * @param {boolean} value - Состояние владения навыком
		 */
		setSkillProficiency(skill: TSkill, value: boolean) {
			this.skillsProficiencies[skill] = value
		}
	}
})