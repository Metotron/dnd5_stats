/** @description Объединённые характеристики из всех источников */

import { fullCharClassesList } from '@/handbook-data/charClasses'
import { fullFeatsList } from '@/handbook-data/feats'
import { fullOriginsList } from '@/handbook-data/origins'
import { adjustDescription, baseSpecies, type TBaseSpeciesDescription } from '@/handbook-data/species'
import type { Character } from './useCharacter'

function fullDescription(char: Character) {
	if (char === undefined)
		return {} as TBaseSpeciesDescription

	const speciesDiff = char.species.value?.diff ?? {}
	const classDiff = fullCharClassesList.find(cl => cl.id == char.charClass.value.id)?.diff ?? {}
	const bgDiff = fullOriginsList.find(origin => origin.id == char.origin.value?.id)?.diff ?? {}
	const featDiff = fullFeatsList.find(feat => feat.id == char.feat.value?.id)?.diff ?? {}
	
	const result = adjustDescription(baseSpecies[char.species.value.baseSpecies], speciesDiff, classDiff, bgDiff, featDiff)
	result.weaponProficiencies = [...new Set(result.weaponProficiencies)]
	result.armorProficiencies = [...new Set(result.armorProficiencies)]
	result.toolProficiencies = [...new Set(result.toolProficiencies)]

	return result
}

export const useFullDescription = () => ({
	fullDescription
})