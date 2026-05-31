/** @description Объединённые характеристики из всех источников */

import { computed, type ComputedRef } from 'vue'
import { fullCharClassesList } from '@/handbook-data/charClasses'
import { fullOriginsList } from '@/handbook-data/origins'
import { adjustDescription, baseSpecies, type TBaseSpeciesDescription } from '@/handbook-data/species'
import type { Character } from './useCharacter'
import { fullFeatsList } from '@/handbook-data/feats'

export const useFullDescription = (char: Character | undefined): ComputedRef<TBaseSpeciesDescription> => {
	if (char === undefined)
		return computed(() => ({} as TBaseSpeciesDescription))
	
	const speciesDiff = char.species.value?.diff ?? {}
	const classDiff = fullCharClassesList.find(cl => cl.id == char.charClass.value.id)!.diff ?? {}
	const bgDiff = fullOriginsList.find(origin => origin.id == char.origin.value?.id)?.diff ?? {}
	const featDiff = fullFeatsList.find(feat => feat.id == char.feat.value?.id)!.diff ?? {}

	return computed(() => adjustDescription(baseSpecies[char.species.value.baseSpecies], speciesDiff, classDiff, bgDiff, featDiff))
}