<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EOrigin, fullOriginsList } from '@/handbook-data/origins'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedOrigin = ref<EOrigin>()
const background = computed({
	get() { return selectedOrigin.value ?? '-' },
	set(origin) { selectedOrigin.value = origin == '-' ? undefined : origin }
})
watch(selectedOrigin, origin => character.origin.value = origin)
</script>


<template lang="pug">
.pageBlock.background
	.blockTitle 🔮 Предыстория
	.blockBody
		select(v-model="background" :disabled="character.locked")
			option -
			option(v-for="origin in fullOriginsList" :key="origin.name" :value="origin.id") {{ origin.name }}
</template>


<style lang="scss" scoped>
select { width: 100%; }
</style>