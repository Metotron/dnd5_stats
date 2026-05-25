<script setup lang="ts">
import { computed } from 'vue'
import { useCharacter } from '@/composables/useCharacter'

const character = useCharacter(1)  //TODO Вместо 1 подставить выбранный пользователем ID

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