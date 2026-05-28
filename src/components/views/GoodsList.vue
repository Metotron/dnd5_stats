<script setup lang="ts">
import { computed } from 'vue'
import { adjustBaseRace, baseRaces } from '@/handbook-data/races'
import { textMarkToHTML } from '@/misc/textConvert'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const goods = computed(() => {
	if (character.background.value === undefined)
		return []

	const raceDiff = character.race.value?.diff ?? {}
	const bgDiff = character.background.value?.diff ?? {}
	const goods = adjustBaseRace(baseRaces[character.race.value.baseRace], raceDiff, bgDiff).goods
	return goods ?? []
})
</script>

<template lang="pug">
.pageBlock.goodsList(v-if="goods.length")
	.blockTitle 👜 Вещи при себе
	.blockBody
		ul
			li.good(v-for="good in goods" v-html="textMarkToHTML(good)")
</template>

<style lang="scss" scoped>
.pageBlock.goodsList {
	grid-column-end: span 1;
}

.blockBody {
	display: flex;
	flex-direction: column;
	gap: var(--blockPadding);
}

.good {
	font-size: .875rem;

	:deep(em) { color: var(--accentColor); }
}
</style>