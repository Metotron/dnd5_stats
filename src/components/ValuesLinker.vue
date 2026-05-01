<script setup lang="ts">
import { getRandomDiceValues } from '../misc/randomDiceValues'
import { EGlobalEvents, fireEvent } from '../misc/globalEvents'

import { ref, onMounted } from 'vue'
import ValueLink from '../components/ValueLink.vue'

import { useStatsStore } from '../stores/statsStore'

// Сгенерированные значения характеристик
const diceValues = ref<number[]>([])

const statsStore = useStatsStore()

onMounted(() => {
	generateDiceValues()  // Генерация стартовых значений характеристик
})

/** Обновление сгенерированного списка числовых значений и сброс имеющихся привязок */
function generateDiceValues() {
	diceValues.value = getRandomDiceValues()
}

/** Сброс привязки характеристик к исходным числовым значениям */
function resetStatLinks() {
	// Событие слушают ValueLink, чтобы сбросить состояние своих селектов
	fireEvent(EGlobalEvents.ResetStatsStore)
}

/** Загрузка числовых данных в чарлист */
function loadValuesToCharlist() {
	// Событие слушается в компоненте CharList
	fireEvent(EGlobalEvents.LoadValuesToCharlist)
}

/** Автоматическая расстановка привязок */
function autoLink() {
	// Событие слушают компоненты ValueLink и каждый ставит привязку согласно своему valueIndex
	fireEvent(EGlobalEvents.AutoLinkStats)
}
</script>


<template lang="pug">
.pageBlock.charStats
	.blockTitle 🎲 Числовые значения
	.blockBody
		.buttons.asymmetric
			input.fullWidth(type="button" value="🔧 Сгенерировать" title="Сумма 3 наибольших значений на 4 брошенных кубиках (3-18)" @click="generateDiceValues")
			input.short(type="button" value="⤵️" title="Автопривязка" @click="autoLink")
		.valuesToStats
			ValueLink(
				v-for="(value, idx) in diceValues"
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
