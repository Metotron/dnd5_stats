<script setup lang="ts">
import { statsList, maxStatValue, getReadableStatName } from '@/misc/statsList'
import { globalEvents, subscribeOnEvent } from '@/misc/globalEvents'
import type { TStats } from '@/misc/statsList'

import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

import { useStatsStore } from '@/stores/statsStore'

type TOptionValue = TStats | '-'  // Тип значения опшена в селекте

const autoLinksValues: Record<number, TStats> = {
	0: 'str',
	1: 'dex',
	2: 'con',
	3: 'int',
	4: 'wis',
	5: 'cha'
}

const props = defineProps({
	// Значение характеристики
	value: {
		type: Number,
		required: true,
		validator: (value: number) => value > 0 && value <= maxStatValue
	},

	// Индекс значения в массиве исходных данных, по нему производится привязка к характеристикам
	valueIndex: {
		type: Number,
		required: true,
		validator: (index: number) => index >= 0 && index < 6
	}
})

const statsStore = useStatsStore()

const statsSelectorNames: Array<TStats> = []
let statName: TStats
for (statName in statsList) {
	statsSelectorNames.push(statName)
}

// Внутреннее числовое значение, может изменяться вручную
const value = ref(0)
value.value = props.value
// Обновление внутреннего значение при изменении props
watch(() => props.value,  newValue => {
	value.value = newValue
})

// Ограничение значения сверху и снизу
watch(value, (newValue, oldValue)  => {
	if (!newValue || newValue < 1 || newValue > maxStatValue) {
		value.value = oldValue
	}
	else {
		// Функция могла бы выкинуть исключение, но условие выше его предотвращает
		statsStore.setGeneratedValue(props.valueIndex, value.value)
	}
})

// Характеристика, с которой будет связано значение value
const selectedStatToLink = ref<TOptionValue>('-')
let unsubscribeFromResetEvent: Function
let unsubscribeFromAutolinksEvent: Function
onMounted(() => {
	statsStore.setGeneratedValue(props.valueIndex, value.value)

	unsubscribeFromResetEvent = subscribeOnEvent(globalEvents.ResetStatsStore, resetSelectToDefault)
	unsubscribeFromAutolinksEvent = subscribeOnEvent(globalEvents.AutoLinkStats, autoLinkStats)
})
onBeforeUnmount(() => {
	unsubscribeFromResetEvent()
	unsubscribeFromAutolinksEvent()
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

// Авторасстановка привязок
function autoLinkStats() {
	selectedStatToLink.value = autoLinksValues[props.valueIndex]
}

// Определение, что характеристика уже распределена
function isCharInUse(charName: TOptionValue): boolean {
	if (charName === '-') {
		return false
	}

	for (const N in statsStore.dataToStatsLinks) {
		if (statsStore.dataToStatsLinks[N] === charName) {
			return true
		}
	}

	return false
}

</script>


<template lang="pug">
.valueLink
	input(v-model.number="value" type="number" min="1" :max="maxStatValue")
	span.arrow →
	select(v-model="selectedStatToLink")
		option -
		option(
			v-for="statName in statsSelectorNames"
			:value="statName"
			:key="(statName)"
			:disabled="isCharInUse(statName)"
		) {{ getReadableStatName(statName) }}
</template>


<style lang="scss" scoped>
.valueLink {
	display: flex;
	margin-top: var(--blockPadding);
}

input { width: 52px; }

.arrow {
	display: inline-block;
	margin: 0 4px;
}

select { width: 100%; }
</style>
