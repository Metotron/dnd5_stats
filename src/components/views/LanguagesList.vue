<script setup lang="ts">
import { useCharacter } from '@/composables/useCharacter'
import { useFullDescription } from '@/composables/useFullDescription'
import { computed } from 'vue'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))
const { fullDescription } = useFullDescription()

const languages = computed(() => fullDescription(character).languages ?? [])

//TODO Чтобы вписать произвольный язык, нужно хранить языки не просто как строки
// Или же заменять строку на выбранный язык и записывать прямо персонажу
</script>


<template lang="pug">
.pageBlock.languagesList(v-if="languages.length > 0" :class="{ locked: character.locked }")
	.blockTitle 🎏 Владение языками
	.blockBody
		ul
			li.language(v-for="lang in languages" :key="lang")
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