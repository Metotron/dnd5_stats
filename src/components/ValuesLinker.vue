<script setup lang="ts">
import { getRandomValues } from '@/misc/randomValues'
import { globalEvents, fireEvent } from '@/misc/globalEvents'

import { ref, onMounted } from 'vue'
import ValueLink from '@/components/ValueLink.vue'

import { useStatsStore } from '@/stores/statsStore'

// Сгенерированные значения характеристик
const randomValues = ref<number[]>([])

const statsStore = useStatsStore()
onMounted(() => {
	// Генерация стартовых значений характеристик
	generateRandomValues()
})

// Обновление сгенерированного списка числовых значений и сброс имеющихся привязок
function generateRandomValues() {
	randomValues.value = getRandomValues()
}

// Сброс привязки характеристик к исходным числовым значениям
function resetStatLinks() {
	// Это событие слушают ValueLink, чтобы сбросить состояние своих селектов
	fireEvent(globalEvents.ResetStatsStore)
}

// Загрузить числовые данные в чарлист
function loadValuesToCharlist() {
	// Событие слушается в компоненте CharList
	fireEvent(globalEvents.LoadValuesToCharlist)
}

// Автоматическая расстановка привязок
function autoLink() {
	// Слушают компоненты ValueLink и каждый ставит привязку согласно своему valueIndex
	fireEvent(globalEvents.AutoLinkStats)
}
</script>


<template lang="pug">
.pageBlock.charStats
	.blockTitle 🎲 Числовые значения
	.blockBody
		.buttons.asymmetric
			input.fullWidth(type="button" value="🔧 Сгенерировать" title="Сумма 3 наибольших значений на 4 брошенных кубиках (3–18)" @click="generateRandomValues")
			input.short(type="button" value="⤵️" title="Автопривязка" @click="autoLink")
		.valuesToStats
			value-link(
				v-for="(value, idx) in randomValues"
				:value="value"
				:value-index="idx"
				:key="idx"
			)
		.buttons
			input(type="button" value="📝 Применить" @click="loadValuesToCharlist" :disabled="!statsStore.isAllFieldsLinked")
			input(type="button" value="♻️ Сбросить" @click="resetStatLinks")
</template>


<style lang="scss" scoped>
input[type="button"] {
	min-height: 28px;

	&:not([disabled]) { cursor: pointer; }
	&.fullWidth { width: 100%; }
}

.valuesToStats { margin-bottom: var(--blockPadding); }

.buttons {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;

	&.asymmetric {
		display: flex;

		.short { flex-shrink: 0; }
	}
}
</style>
