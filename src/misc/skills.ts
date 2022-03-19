import type { TStats } from "./statsList"

enum TSkill {
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

type TSkillDescription = {
	name: string,
	statType: TStats
}

const skillsList: Record<TSkill, TSkillDescription> = {
	[TSkill.athletics]: {
		name: 'Атлетика',
		statType: 'str'
	},
	[TSkill.acrobatics]: {
		name: 'Акробатика',
		statType: 'dex'
	},
	[TSkill.sleightOfHand]: {
		name: 'Ловкость рук',
		statType: 'dex'
	},
	[TSkill.stealth]: {
		name: 'Скрытность',
		statType: 'dex'
	},
	[TSkill.arcana]: {
		name: 'Магия',
		statType: 'int'
	},
	[TSkill.history]: {
		name: 'История',
		statType: 'int'
	},
	[TSkill.investigation]: {
		name: 'Анализ',
		statType: 'int'
	},
	[TSkill.nature]: {
		name: 'Природа',
		statType: 'int'
	},
	[TSkill.religion]: {
		name: 'Религия',
		statType: 'int'
	},
	[TSkill.animalHandling]: {
		name: 'Уход за животными',
		statType: 'wis'
	},
	[TSkill.insight]: {
		name: 'Проницательность',
		statType: 'wis'
	},
	[TSkill.medicine]: {
		name: 'Медицина',
		statType: 'wis'
	},
	[TSkill.perception]: {
		name: 'Внимательность',
		statType: 'wis'
	},
	[TSkill.survival]: {
		name: 'Выживание',
		statType: 'wis'
	},
	[TSkill.deception]: {
		name: 'Обман',
		statType: 'cha'
	},
	[TSkill.intimidation]: {
		name: 'Запугивание',
		statType: 'cha'
	},
	[TSkill.performance]: {
		name: 'Выступление',
		statType: 'cha'
	},
	[TSkill.persuasion]: {
		name: 'Убеждение',
		statType: 'cha'
	}
}

export type { TSkillDescription }
export { TSkill, skillsList }