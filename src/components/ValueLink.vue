<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { statsList } from '@/misc/statsList'
import { globalEvents } from '@/misc/globalEvents'
import type { StatsType } from '@/misc/statsList'

import { useStatsStore } from '@/stores/stats'


const props = defineProps({
	// Значение характеристики
	value: {
		type: Number,
		required: true,
		validator: (value: number) => value > 0 && value <= 20
	},

	// Индекс значения в массиве исходных данных, по нему производится привязка к характеристикам
	valueIndex: {
		type: Number,
		required: true,
		validator: (index: number) => index >= 0 && index < 6
	}
})

const statsStore = useStatsStore()

const statsSelectorNames: Array<keyof StatsType<string>> = []
let statName: keyof StatsType<string>
for (statName in statsList) {
	statsSelectorNames.push(statName)
}

// Внутреннее числовое значение, может изменяться вручную
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

// Характеристика, с которой будет связано значение value
const selectedStatToLink = ref<keyof StatsType<string> | '-'>('-')
onMounted(() => {
	window.addEventListener(globalEvents.ResetStatsStore, resetSelectToDefault)
})
onBeforeUnmount(() => {
	window.removeEventListener(globalEvents.ResetStatsStore, resetSelectToDefault)
})
// Сохраняем выбранное значение селекта в стор
watch(selectedStatToLink, newValue => {
	statsStore.setValueLink(props.valueIndex, newValue === '-' ? null : newValue)
})


// Сброс состояния селекта к исходному значению
function resetSelectToDefault() {
	selectedStatToLink.value = '-'
	statsStore.setValueLink(props.valueIndex, null)
}

// Получение читаемого названия характеристики из её кода
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
	select(v-model="selectedStatToLink")
		option -
		option(
			v-for="statName in statsSelectorNames"
			:value="statName"
			:key="(statName)"
		) {{ getReadableStatName(statName) }}
</template>


<style lang="scss" scoped>
.valueLink {
	display: flex;
	margin-top: 8px;
}

input { width: 52px; }

.arrow {
	display: inline-block;
	margin: 0 4px;
}
</style>
