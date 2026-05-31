<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { statsArray, type TStat } from '@/handbook-data/stats'
import ValueLink from '@/components/DieToStatLink.vue'
import { getRandomDiceValues, type TDiceValues } from '@/misc/randomDiceValues'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

// Сгенерированные значения (сумма трёх лучших кубиков из четырёх)
const diceValues = ref<TDiceValues>([0, 0, 0, 0, 0, 0])

type TLnk = TStat | undefined
const u = undefined
/** К чему привязаны значения diceValues. Значения в тех же индексах */
const linkedToStat = ref<[TLnk, TLnk, TLnk, TLnk, TLnk, TLnk]>([u, u, u, u, u, u])

watch(linkedToStat, () => {
	// Сперва обнуление привязок → характеристики должны стать десятками
	for (const stat of statsArray)
		character.setStat(stat, 10)

	// Если в linkedToStat есть привязки (не undefined), то в них персонажу передаётся то, что находится в соответствующем индексе diceValues
	for (const idx in linkedToStat.value) {
		if (linkedToStat.value[idx] !== undefined)
			character.setStat(linkedToStat.value[idx], diceValues.value[idx])
	}
}, { deep: true })

function resetLinks() {
	linkedToStat.value = [u, u, u, u, u, u]
}

onMounted(() => {
	//TODO Сделать возможность выбора между генерацией, стандартным набором (15, 14, 13, 12, 10, 8) и закупкой.
	generateDiceValues()  // Генерация стартовых значений характеристик
})

/** Обновление сгенерированного списка числовых значений и сброс имеющихся привязок */
function generateDiceValues() {
	diceValues.value = getRandomDiceValues()
	resetLinks()
}

/** Автоматическая расстановка привязок */
function autoLink() {
	linkedToStat.value[0] = 'str'
	linkedToStat.value[1] = 'dex'
	linkedToStat.value[2] = 'con'
	linkedToStat.value[3] = 'int'
	linkedToStat.value[4] = 'wis'
	linkedToStat.value[5] = 'cha'
}
</script>


<template lang="pug">
.pageBlock.charStats(:class="{ hidden: character.locked }")
	.blockTitle 📜 Числовые значения
	.blockBody
		.buttons.asymmetric
			input.fullWidth(type="button" value="🎲 Перебросить" title="Сумма 3 наибольших значений на 4 брошенных кубиках (3-18)" @click="generateDiceValues")
			input(type="button" value="⤵️" title="Автопривязка" @click="autoLink()")
		.valuesToStats
			value-link(
				v-for="(value, idx) in diceValues"
				:idx
				:value
				:linked="linkedToStat"
				v-model:dievalue.number="diceValues[idx]"
				v-model="linkedToStat[idx]"
				:key="idx"
			)
		.buttons.bottom
			input(type="button" value="♻️ Сбросить" @click="resetLinks()")
</template>


<style lang="scss" scoped>
.hidden { display: none; }

input[type="button"] {
	min-height: 28px;

	&:not([disabled]) { cursor: pointer; }
	&.fullWidth { width: 100%; }
}

.valuesToStats { margin-bottom: var(--blockPadding); }

.buttons {
	display: flex;
	gap: 12px;

	.short { flex-shrink: 0; }

	&.bottom {
		justify-content: flex-end;
	}
}
</style>