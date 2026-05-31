<script setup lang="ts">
/** @description Привязка значения дайса по индексу valueIndex к выбранной характеристике персонажа */

import { nextTick, ref, watch } from 'vue'
import type { TStat } from '@/handbook-data/stats'
type TLnk = TStat | undefined

import { isStatValueInRange, maxStatValue, statsArray, statsList } from '@/handbook-data/stats'
import { useCharacter } from '@/composables/useCharacter'


const props = defineProps<{
	value: number
	linked: [TLnk, TLnk, TLnk, TLnk, TLnk, TLnk]
	idx: number
}>()

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

/** Внутреннее числовое значение, может изменяться вручную */
const dieValue = defineModel<number>('dievalue')
const linkTo = defineModel<TStat | undefined>()

// Ограничение значения сверху и снизу
watch(dieValue, (newValue, oldValue) => {
	dieValue.value = isStatValueInRange(newValue) ? newValue : (oldValue ?? 1)
	if (optionSelected.value != '-' && optionSelected.value !== undefined) {
		const saved = optionSelected.value
		optionSelected.value = '-'
		nextTick(() => optionSelected.value = saved)
	}
})
// Отслеживание автопривязки
watch(() => props.linked, () => {
	optionSelected.value = props.linked[props.idx] === undefined ? '-' : props.linked[props.idx]
}, { deep: true })

const optionSelected = ref<TStat | '-'>()
watch(optionSelected, val => linkTo.value = val == '-' ? undefined : val)
</script>


<template lang="pug">
.valueLink
	input(v-model.number="dieValue" type="number" min="1" :readonly="character.locked" :max="maxStatValue")
	span.arrow →
	select(v-model="optionSelected" :disabled="character.locked")
		option -
		option(
			v-for="stat in statsArray"
			:value="stat"
			:key="stat"
			:disabled="props.linked.includes(stat)"
		) {{ statsList[stat].name }}
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
