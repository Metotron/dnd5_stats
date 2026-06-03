<script setup lang="ts">
import { ref } from 'vue'

import { useCharacter } from '@/composables/useCharacter'
import { EFeatType, featsByType, type EFeat } from '@/handbook-data/feats'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedFeat = ref<(EFeat | '-')[]>(['-'])

function resortSelectedList() {
	if (!selectedFeat.value.includes('-')) {
		selectedFeat.value.push('-')
		resetCharacterFeats()
		return
	}

	// Невыбранное оружие всегда должно быть последним в списке
	const filtered: (EFeat | '-')[] = selectedFeat.value.filter(w => w !== '-')
	filtered.push('-')
	selectedFeat.value = filtered
	resetCharacterFeats()
}

function resetCharacterFeats() {
	character.weapons.removeAll()
	selectedFeat.value.forEach(f => {
		f !== '-' && character.feats.add(f)
	})
}
</script>


<template lang="pug">
.pageBlock.feats
.blockTitle ⚡ Черты
.blockBody
	select(
		v-for="(w, idx) in selectedFeat"
		v-model="selectedFeat[idx]"
		:key="w + idx.toString()"
		:class="{ hidden: character.locked && selectedFeat[idx] == '-' }"
		:disabled="character.locked"
		@change="resortSelectedList")
		option -
		option(v-for="feat in featsByType(EFeatType.origin)" :value="feat.id") {{ feat.name }}
		option(v-for="feat in featsByType(EFeatType.general)" :value="feat.id") {{ feat.name }}
		option(v-for="feat in featsByType(EFeatType.fightingstyle)" :value="feat.id") {{ feat.name }}
</template>


<style lang="scss" scoped>
.blockBody {
	display: flex;
	flex-direction: column;
	gap: var(--blockPadding)
}

select { width: 100%; }

.hidden {
	display: none;
}
</style>