<script setup lang="ts">
import { computed } from 'vue'
import { type CharClass, charClasses } from '../misc/charClasses'

import { useCharacterStore } from '../stores/characterStore'

const character = useCharacterStore()

const selectedCharClass = computed<CharClass>({
	get() { return character.charClass },
	set(className) { character.setCharClass(className) }
})
</script>


<template lang="pug">
.pageBlock.charClass
	.blockTitle 🧍 Класс персонажа
	.blockBody
		select(v-model="selectedCharClass")
			option(v-for="(charParams, className) in charClasses" :key="className" :value="className") {{ charParams.name }}
		span.arrow →
		span.hitDice(title="Базовое количество хитпойнтов") HP: {{ character.hitDice }}
</template>


<style lang="scss" scoped>
.blockBody {
	display: grid;
	grid-template-columns: 1fr auto 50px;
	gap: calc(var(--blockPadding) / 2);
	align-items: center;
}

select { width: 100%; }

.arrow {
	display: inline-block;
	margin: 0 4px;
	align-self: stretch;
}

.hitDice {
	color: var(--accentColor);
	font-size: 0.85rem;
}
</style>