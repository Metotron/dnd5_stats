/** @description Объединённые характеристики из всех источников */

import { adjustDescription, baseSpecies, type TBaseSpeciesDescription } from '@/handbook-data/species'
import type { Character } from './useCharacter'

function fullDescription(char: Character) {
	if (char === undefined)
		return {} as TBaseSpeciesDescription

	const speciesDiff = char.species.value?.diff ?? {}
	const classDiff = char.charClass.value.diff ?? {}
	const bgDiff = char.origin.value?.diff ?? {}
	const featDiff = char.feats.list.value.map(f => f.diff ?? {})

	//TODO Для класса warlock добавить особенности от warlockInvocations
	
	const result = adjustDescription(baseSpecies[char.species.value.baseSpecies], speciesDiff, classDiff, bgDiff, ...featDiff)
	result.weaponProficiencies = [...new Set(result.weaponProficiencies)]
	result.armorProficiencies = [...new Set(result.armorProficiencies)]
	result.toolProficiencies = [...new Set(result.toolProficiencies)]

	return result
}

export const useFullDescription = () => ({
	fullDescription
})