<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCharacter } from '@/composables/useCharacter'
import { ECharClass, fullCharClassesList } from '@/handbook-data/classes';

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedCharClass = ref(ECharClass.fighter)

watch(selectedCharClass, charClass => character.charClass.value = charClass)
</script>


<template lang="pug">
.pageBlock.charClass
	.blockTitle 👷 Класс
	.blockBody
		select(v-model="selectedCharClass")
			option(v-for="cls in fullCharClassesList" :key="cls.name" :value="cls.id") {{ cls.name }}
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
	font-size: .85rem;
}
</style>