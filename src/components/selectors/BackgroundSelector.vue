<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EBackground, fullBackgroundsList } from '@/handbook-data/backgrounds'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedBackground = ref<EBackground>()
const background = computed({
	get() { return selectedBackground.value ?? '-' },
	set(bg) { selectedBackground.value = bg == '-' ? undefined : bg }
})
watch(selectedBackground, bg => character.background.value = bg)
</script>


<template lang="pug">
.pageBlock.background
	.blockTitle 🔮 Предыстория
	.blockBody
		select(v-model="background")
			option -
			option(v-for="bg in fullBackgroundsList" :key="bg.name" :value="bg.id") {{ bg.name }}
</template>


<style lang="scss" scoped>
select { width: 100%; }
</style>