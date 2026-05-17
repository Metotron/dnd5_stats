/** Владение навыками персонажем */

import { defineStore } from 'pinia'
import { ESkill } from '../misc/skills'

export interface ISkillsStore {
	proficiencies: Record<ESkill, boolean>
}

export const useSkillsStore = defineStore('skills', {
	state(): ISkillsStore { return {
		proficiencies: {
			[ESkill.athletics]:      false,
			[ESkill.acrobatics]:     false,
			[ESkill.sleightOfHand]:  false,
			[ESkill.stealth]:        false,
			[ESkill.arcana]:         false,
			[ESkill.history]:        false,
			[ESkill.investigation]:  false,
			[ESkill.nature]:         false,
			[ESkill.religion]:       false,
			[ESkill.animalHandling]: false,
			[ESkill.insight]:        false,
			[ESkill.medicine]:       false,
			[ESkill.perception]:     false,
			[ESkill.survival]:       false,
			[ESkill.deception]:      false,
			[ESkill.intimidation]:   false,
			[ESkill.performance]:    false,
			[ESkill.persuasion]:     false
		}
	}},

	actions: {
		/** Установка значения владения навыком
		 * @param skillId - Условное обозначение навыка
		 * @param value - Состояние владения навыком
		 */
		setProficiency(skillId: ESkill, value: boolean) {
			this.proficiencies[skillId] = value
		},

		/** Сброс владения навыками */
		resetProficiencies() {
			for (const prof in this.proficiencies)
				this.proficiencies[prof as unknown as ESkill] = false
		}
	}
})