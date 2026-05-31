<script setup lang="ts">
import { useCharacter } from '@/composables/useCharacter'
import { fullBackgroundsList } from '@/handbook-data/backgrounds'
import { fullCharClassesList } from '@/handbook-data/classes'
import { adjustDescription, baseSpecies } from '@/handbook-data/species'
import { computed } from 'vue'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const
	combinedDescription = computed(() => {
		const speciesDiff = character.species.value?.diff ?? {}
		const classDiff = fullCharClassesList.find(cl => cl.id == character.charClass.value.id)!.diff ?? {}
		const bgDiff = fullBackgroundsList.find(bg => bg.id === character.background.value?.id)?.diff ?? {}

		return adjustDescription(baseSpecies[character.species.value.baseSpecies], speciesDiff, classDiff, bgDiff)
	})
//TODO Чтобы вписать произвольный язык, нужно хранить языки не просто как строки
// Или же заменять строку на выбранный язык и записывать прямо персонажу
</script>


<template lang="pug">
.pageBlock.languagesList
	.blockTitle 🎏 Владение языками
	.blockBody
		ul
			li.language(v-for="lang in combinedDescription.languages" :key="lang")
				span(v-if="lang == 'Язык на выбор'") [{{ lang }}]
				span(v-else) {{ lang }}
</template>


<style lang="scss" scoped>
.pageBlock.languagesList {
	grid-column: auto / span 1;
}

.language {
	font-size: .875rem;
}
</style>