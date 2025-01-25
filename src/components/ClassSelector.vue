<script setup lang="ts">
import { ref, watch } from 'vue'
import { type CharClassID, charClasses } from '../misc/charClasses'

import { useCharClassStore } from '../stores/charClassStore'

const classStore = useCharClassStore()
const selectedCharClass = ref<CharClassID>('fighter')
watch(selectedCharClass, newValue => {
	classStore.setCharClass(newValue)
})
</script>

<template lang="pug">
.pageBlock.charClass
	.blockTitle 🧍 Класс персонажа
	.blockBody
		select(v-model="selectedCharClass")
			option(v-for="(dataValue, className) in charClasses" :key="className" :value="className") {{ dataValue.name }}
		span.arrow →
		span.hitDice(title="Базовое количество хитпойнтов") HP: {{ classStore.charHitDice }}
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