<script setup lang="ts">
import { textMarkToHTML } from '@/misc/textConvert'
import { computed } from 'vue'

import { useCharacter } from '@/composables/useCharacter'
import { useFullDescription } from '@/composables/useFullDescription'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))
const fullDescription = useFullDescription(character)

const goods = computed(() => fullDescription.goods ?? [])


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