<script setup lang="ts">
import { computed } from 'vue'
import { adjustDescription, baseSpecies } from '@/handbook-data/species'
import { textMarkToHTML } from '@/misc/textConvert'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const goods = computed(() => {
	if (character.background.value === undefined)
		return []

	const speciesDiff = character.species.value?.diff ?? {}
	// Класс не подразумевает вещей, поэтому тут нет класса
	const bgDiff = character.background.value?.diff ?? {}
	const goods = adjustDescription(baseSpecies[character.species.value.baseSpecies], speciesDiff, bgDiff).goods
	return goods ?? []
})
//TODO Нужна возможность вписывать свои строки
</script>


<template lang="pug">
.pageBlock.goodsList(v-if="goods.length" :class="{ locked: character.locked }")
	.blockTitle 👜 Вещи при себе
	.blockBody
		ul
			li.good(v-for="good in goods" v-html="textMarkToHTML(good)")
</template>


<style lang="scss" scoped>
.pageBlock.goodsList {
	grid-column: auto / span 1;
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