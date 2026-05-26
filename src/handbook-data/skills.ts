import type { TStat } from './stats'

export enum ESkill {
	athletics,      // Атлетика
	acrobatics,     // Акробатика
	sleightOfHand,  // Ловкость рук
	stealth,        // Скрытность
	arcana,         // Магия
	history,        // История
	investigation,  // Анализ
	nature,         // Природа
	religion,       // Религия
	animalHandling, // Уход за животными
	insight,        // Проницательность
	medicine,       // Медицина
	perception,     // Внимательность
	survival,       // Выживание
	deception,      // Обман
	intimidation,   // Запугивание
	performance,    // Выступление
	persuasion      // Убеждение
}

export type TSkillDescription = {
	skill: ESkill
	name: string
	statType: TStat
}

export const fullSkillsList: TSkillDescription[] = [{
	skill: ESkill.athletics,
	name: 'Атлетика',
	statType: 'str'
}, {
	skill: ESkill.acrobatics,
	name: 'Акробатика',
	statType: 'dex'
}, {
	skill: ESkill.sleightOfHand,
	name: 'Ловкость рук',
	statType: 'dex'
}, {
	skill: ESkill.stealth,
	name: 'Скрытность',
	statType: 'dex'
}, {
	skill: ESkill.arcana,
	name: 'Магия',
	statType: 'int'
}, {
	skill: ESkill.history,
	name: 'История',
	statType: 'int'
}, {
	skill: ESkill.investigation,
	name: 'Анализ',
	statType: 'int'
}, {
	skill: ESkill.nature,
	name: 'Природа',
	statType: 'int'
}, {
	skill: ESkill.religion,
	name: 'Религия',
	statType: 'int'
}, {
	skill: ESkill.animalHandling,
	name: 'Уход за животными',
	statType: 'wis'
}, {
	skill: ESkill.insight,
	name: 'Проницательность',
	statType: 'wis'
}, {
	skill: ESkill.medicine,
	name: 'Медицина',
	statType: 'wis'
}, {
	skill: ESkill.perception,
	name: 'Внимательность',
	statType: 'wis'
}, {
	skill: ESkill.survival,
	name: 'Выживание',
	statType: 'wis'
}, {
	skill: ESkill.deception,
	name: 'Обман',
	statType: 'cha'
}, {
	skill: ESkill.intimidation,
	name: 'Запугивание',
	statType: 'cha'
}, {
	skill: ESkill.performance,
	name: 'Выступление',
	statType: 'cha'
}, {
	skill: ESkill.persuasion,
	name: 'Убеждение',
	statType: 'cha'
}] as const