import { useCharacterStore } from '../stores/characterStore'
import type { ISkillsStore } from '../stores/skillsStore'
import type { IStatsStore } from '../stores/statsStore'
import type { TStat } from './stats'

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
	skill: ESkill
	name: string
	statType: TStat
}

export const fullSkillsList: TSkillDescription[] = [
	{
		skill: ESkill.athletics,
		name: 'Атлетика',
		statType: 'str'
	},
	{
		skill: ESkill.acrobatics,
		name: 'Акробатика',
		statType: 'dex'
	},
	{
		skill: ESkill.sleightOfHand,
		name: 'Ловкость рук',
		statType: 'dex'
	},
	{
		skill: ESkill.stealth,
		name: 'Скрытность',
		statType: 'dex'
	},
	{
		skill: ESkill.arcana,
		name: 'Магия',
		statType: 'int'
	},
	{
		skill: ESkill.history,
		name: 'История',
		statType: 'int'
	},
	{
		skill: ESkill.investigation,
		name: 'Анализ',
		statType: 'int'
	},
	{
		skill: ESkill.nature,
		name: 'Природа',
		statType: 'int'
	},
	{
		skill: ESkill.religion,
		name: 'Религия',
		statType: 'int'
	},
	{
		skill: ESkill.animalHandling,
		name: 'Уход за животными',
		statType: 'wis'
	},
	{
		skill: ESkill.insight,
		name: 'Проницательность',
		statType: 'wis'
	},
	{
		skill: ESkill.medicine,
		name: 'Медицина',
		statType: 'wis'
	},
	{
		skill: ESkill.perception,
		name: 'Внимательность',
		statType: 'wis'
	},
	{
		skill: ESkill.survival,
		name: 'Выживание',
		statType: 'wis'
	},
	{
		skill: ESkill.deception,
		name: 'Обман',
		statType: 'cha'
	},
	{
		skill: ESkill.intimidation,
		name: 'Запугивание',
		statType: 'cha'
	},
	{
		skill: ESkill.performance,
		name: 'Выступление',
		statType: 'cha'
	},
	{
		skill: ESkill.persuasion,
		name: 'Убеждение',
		statType: 'cha'
	}
]

/** Модификатор от характеристики, на которой основан навык skillName */
export function getSkillStatModifier(skillName: ESkill, statsStore: IStatsStore, skillsStore: ISkillsStore): number {
	const character = useCharacterStore()

	const statAbbr: TStat = fullSkillsList.find(s => s.skill == skillName)!.statType
	const statValue = statsStore.stats[statAbbr]
	const modifier = statValue > 0 ? Math.ceil((statValue - 11) / 2) : 0

	const bonus = skillsStore.proficiencies[skillName] ? character.proficiencyBonus : 0
	return modifier + bonus
}

/** К enum можно обратиться по строке и получить число, но оно тоже будет строкой, поэтому его нужно преобразовать */
export function eskillAsNumber(skill: ESkill): ESkill {
	return typeof skill == 'number' ? skill : Number(ESkill[skill]) as ESkill
}