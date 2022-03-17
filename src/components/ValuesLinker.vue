<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRandomValues } from '@/misc/randomValues'
import { useStatsStore } from '@/stores/stats'
import { globalEvents, fireEvent } from '@/misc/globalEvents'

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
	// Это событие слушают ValueLink, чтобы сбросить состояние своих селектов
	fireEvent(globalEvents.ResetStatsStore)
}

// Загрузить числовые данные в чарлист
function loadValuesToCharlist(): void {
	// Перенос привязанных значений в чарлист
	fireEvent(globalEvents.LoadValuesToCharlist)
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
		input(
			type="button"
			value="📝 Применить"
			:disabled="!statsStore.isAllFieldsLinked"
			@click="loadValuesToCharlist"
		)
</template>


<style lang="scss" scoped>
input[type="button"]:not([disabled]) {
	cursor: pointer;
}

.valuesToStats {
	margin-bottom: 1em;
}
</style>
