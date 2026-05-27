<script setup lang="ts">
import { computed } from 'vue'
import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const combinedFeatures = computed(() => {
	const race = character.race.value

})

//TODO Нужны предыстории
//TODO Внести фичи в классы и тоже взять сюда
</script>


<template lang="pug">
.pageBlock.features
	.blockTitle 🪶 Особенности
	.blockBody
		| Фичи в виде списка
</template>

<style lang="scss" scoped>

</style>