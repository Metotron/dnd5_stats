<script setup lang="ts">
import { ref, watch } from 'vue'
import { statsList } from '../misc/statsList'
import type { StatsType } from '../misc/statsList'

import { useStatsStore } from '../stores/stats'


const props = defineProps({
	// Значение характеристики
	value: {
		type: Number,
		validator: (value: number) => value > 0 && value <= 20
	},

	// Индекс значения в массиве исходных данных, по нему производится привязка к характеристикам
	valueIndex: {
		type: Number,
		validator: (index: number) => index >= 0 && index < 6
	}
})

const statsStore = useStatsStore()

const statsSelectorNames: Array<keyof StatsType<string>> = []
let statName: keyof StatsType<string>
for (statName in statsList) {
	statsSelectorNames.push(statName)
}

const value = ref(props.value)
// Обновление внутреннего значение при изменении props
watch(() => props.value,  newValue => {
	value.value = newValue
})

// Ограничение значения сверху и снизу
watch(value, (newValue, oldValue)  => {
	if (!newValue || newValue < 1 || newValue > 20)
		value.value = oldValue
})


/**
 * Получение читаемого названия характеристики из её кода
 */
function getReadableStatName(statName: keyof StatsType<string>): string {
	if (statName in statsList)
		return statsList[statName]

	return statName
}
</script>


<template lang="pug">
.valueLink
	input(v-model.number="value" type="number" min="1" max="20")
	span.arrow →
	select
		option(selected) -
		option(v-for="statName in statsSelectorNames" :value="statName" :key="(statName)") {{ getReadableStatName(statName) }}
</template>


<style lang="scss" scoped>
.valueLink {
	display: flex;
	margin-top: 8px;
}

input { width: 52px; }
input, select { min-height: 26px; }

.arrow {
	display: inline-block;
	margin: 0 4px;
}
</style>
