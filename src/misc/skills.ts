import type { TStats } from "./statsList"

enum TSkillEnum {
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

const skillsList: Record<TSkillEnum, TSkillDescription> = {
	[TSkillEnum.athletics]: {
		name: 'Атлетика',
		statType: 'str'
	},
	[TSkillEnum.acrobatics]: {
		name: 'Акробатика',
		statType: 'dex'
	},
	[TSkillEnum.sleightOfHand]: {
		name: 'Ловкость рук',
		statType: 'dex'
	},
	[TSkillEnum.stealth]: {
		name: 'Скрытность',
		statType: 'dex'
	},
	[TSkillEnum.arcana]: {
		name: 'Магия',
		statType: 'int'
	},
	[TSkillEnum.history]: {
		name: 'История',
		statType: 'int'
	},
	[TSkillEnum.investigation]: {
		name: 'Анализ',
		statType: 'int'
	},
	[TSkillEnum.nature]: {
		name: 'Природа',
		statType: 'int'
	},
	[TSkillEnum.religion]: {
		name: 'Религия',
		statType: 'int'
	},
	[TSkillEnum.animalHandling]: {
		name: 'Уход за животными',
		statType: 'wis'
	},
	[TSkillEnum.insight]: {
		name: 'Проницательность',
		statType: 'wis'
	},
	[TSkillEnum.medicine]: {
		name: 'Медицина',
		statType: 'wis'
	},
	[TSkillEnum.perception]: {
		name: 'Внимательность',
		statType: 'wis'
	},
	[TSkillEnum.survival]: {
		name: 'Выживание',
		statType: 'wis'
	},
	[TSkillEnum.deception]: {
		name: 'Обман',
		statType: 'cha'
	},
	[TSkillEnum.intimidation]: {
		name: 'Запугивание',
		statType: 'cha'
	},
	[TSkillEnum.performance]: {
		name: 'Выступление',
		statType: 'cha'
	},
	[TSkillEnum.persuasion]: {
		name: 'Убеждение',
		statType: 'cha'
	}
}

export type { TSkillDescription }
export { TSkillEnum, skillsList }