<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCharacter } from '../composables/useCharacter'
import { ECharClass, fullCharClassesList } from '../baseLists/classes';

const { newCharacter, storeCharacter } = useCharacter()

const character = newCharacter()
storeCharacter(character)
const selectedCharClass = ref(ECharClass.fighter)

watch(selectedCharClass, charClass => character.setClass(charClass))
</script>


<template lang="pug">
.pageBlock.charClass
	.blockTitle 🧍 Класс персонажа
	.blockBody
		select(v-model="selectedCharClass")
			option(v-for="cls in fullCharClassesList" :key="cls.name" :value="cls.charClass") {{ cls.name }}
		span.arrow →
		span.hitDice(title="Базовое количество хитпойнтов") HP: {{ character.charClass.hitDice }}
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