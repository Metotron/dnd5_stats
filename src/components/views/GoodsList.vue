<script setup lang="ts">
import { computed } from 'vue'
import { adjustDescription, baseSpecies } from '@/handbook-data/species'
import { textMarkToHTML } from '@/misc/textConvert'

import { useCharacter } from '@/composables/useCharacter'
import { fullCharClassesList } from '@/handbook-data/charClasses'
import { fullOriginsList } from '@/handbook-data/origins'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const goods = computed(() => {
	if (character.origin.value === undefined)
		return []

	const speciesDiff = character.species.value?.diff ?? {}
	const classDiff = fullCharClassesList.find(cl => cl.id == character.charClass.value.id)!.diff ?? {}
	const bgDiff = fullOriginsList.find(origin => origin.id === character.origin.value?.id)?.diff ?? {}

	const goods = adjustDescription(baseSpecies[character.species.value.baseSpecies], speciesDiff, classDiff, bgDiff).goods
	return goods ?? []
})
//TODO Нужна возможность вписывать свои строки

//TODO Оружие и инструменты вывести по их названию, а по клику на оружие добавлять его в список
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