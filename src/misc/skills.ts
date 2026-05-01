import type { TSkillsStore } from '../stores/skillsStore'
import type { TStatsStore } from '../stores/statsStore'
import type { TStat } from './statsList'

export enum ESkill {
	athletics,
	acrobatics,
	sleightOfHand,
	stealth,
	arcana,
	history,
	investigation,
	nature,
	religion,
	animalHandling,
	insight,
	medicine,
	perception,
	survival,
	deception,
	intimidation,
	performance,
	persuasion
}

export type TSkillDescription = {
	name: string,
	statType: TStat
}

export const fullSkillsList: Record<ESkill, TSkillDescription> = {
	[ESkill.athletics]: {
		name: 'Атлетика',
		statType: 'str'
	},
	[ESkill.acrobatics]: {
		name: 'Акробатика',
		statType: 'dex'
	},
	[ESkill.sleightOfHand]: {
		name: 'Ловкость рук',
		statType: 'dex'
	},
	[ESkill.stealth]: {
		name: 'Скрытность',
		statType: 'dex'
	},
	[ESkill.arcana]: {
		name: 'Магия',
		statType: 'int'
	},
	[ESkill.history]: {
		name: 'История',
		statType: 'int'
	},
	[ESkill.investigation]: {
		name: 'Анализ',
		statType: 'int'
	},
	[ESkill.nature]: {
		name: 'Природа',
		statType: 'int'
	},
	[ESkill.religion]: {
		name: 'Религия',
		statType: 'int'
	},
	[ESkill.animalHandling]: {
		name: 'Уход за животными',
		statType: 'wis'
	},
	[ESkill.insight]: {
		name: 'Проницательность',
		statType: 'wis'
	},
	[ESkill.medicine]: {
		name: 'Медицина',
		statType: 'wis'
	},
	[ESkill.perception]: {
		name: 'Внимательность',
		statType: 'wis'
	},
	[ESkill.survival]: {
		name: 'Выживание',
		statType: 'wis'
	},
	[ESkill.deception]: {
		name: 'Обман',
		statType: 'cha'
	},
	[ESkill.intimidation]: {
		name: 'Запугивание',
		statType: 'cha'
	},
	[ESkill.performance]: {
		name: 'Выступление',
		statType: 'cha'
	},
	[ESkill.persuasion]: {
		name: 'Убеждение',
		statType: 'cha'
	}
}

/** Модификатор от характеристики, на которой основан навык skillName */
export function getSkillStatModifier(skillName: ESkill, statsStore: TStatsStore, skillsStore: TSkillsStore): number {
	const statAbbr: TStat = fullSkillsList[skillName].statType
	const statValue = statsStore.stats[statAbbr]
	const modifier = statValue > 0 ? Math.ceil((statValue - 11) / 2) : 0

	//TODO Двойка — бонус мастерства для первого уровня. Правильнее брать её из характеристик персонажа
	return modifier + (skillsStore.proficiencies[skillName] ? 2 : 0)
}