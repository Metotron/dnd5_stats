/** @description Навыки */

import type { TStat } from './stats'

export enum ESkill {
	athletics      = 'athletics',      // Атлетика
	acrobatics     = 'acrobatics',     // Акробатика
	sleightOfHand  = 'sleightOfHand',  // Ловкость рук
	stealth        = 'stealth',        // Скрытность
	arcana         = 'arcana',         // Аркана
	history        = 'history',        // История
	investigation  = 'investigation',  // Анализ
	nature         = 'nature',         // Природа
	religion       = 'religion',       // Религия
	animalHandling = 'animalHandling', // Уход за животными
	insight        = 'insight',        // Проницательность
	medicine       = 'medicine',       // Медицина
	perception     = 'perception',     // Внимательность
	survival       = 'survival',       // Выживание
	deception      = 'deception',      // Обман
	intimidation   = 'intimidation',   // Запугивание
	performance    = 'performance',    // Выступление
	persuasion     = 'persuasion',     // Убеждение
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
	name: 'Аркана',
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