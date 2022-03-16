<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRandomValues } from '@/misc/randomValues'
import { useStatsStore } from '@/stores/stats'

import ValueLink from '@/components/ValueLink.vue'

// Сгенерированные значения характеристик
const randomValues = ref<number[]>([])

const statsStore = useStatsStore()
onMounted(() => {
	// Генерация стартовых значений характеристик
	generateRandomValues()
})

// Обновление сгенерированного списка числовых значений и сброс имеющихся привязок
function generateRandomValues(): void {
	randomValues.value = getRandomValues()

	resetStatLinks()
}

// Сброс привязки характеристик к исходным числовым значениям
function resetStatLinks(): void {
	// Вызываем на window событие, которое будут слушать компоненты ValueLink, чтобы сбросить состояние своих селектов
	window.dispatchEvent(new Event('ResetStatsStore'))
}
</script>


<template lang="pug">
.pageBlock.charStats
	.blockTitle
		slot
	.blockBody
		input(type="button" value="🔧 Сгенерировать" @click="generateRandomValues")
		.valuesToStats
			value-link(
				v-for="(value, idx) in randomValues"
				:value="value"
				:value-index="idx"
				:key="idx"
			)
		input(type="button" value="📝 Привязать" :disabled="!statsStore.isAllFieldsLinked")
</template>


<style lang="scss" scoped>
input[type="button"]:not([disabled]) {
	cursor: pointer;
}

.valuesToStats {
	margin-bottom: 1em;
}
</style>
