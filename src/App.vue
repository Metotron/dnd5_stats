<script setup lang="ts">
import ClassSelector from '@/components/ClassSelector.vue'
import ValuesLinker from '@/components/ValuesLinker.vue'
</script>


<template lang="pug">
header Характеристики персонажа
.blocksArea
	class-selector 🧍 Класс персонажа
	values-linker 🎲 Числовые значения
</template>


<style lang="scss" scoped>
html, body {
	margin: 0;
	padding: 0;
	font-size: 16px;
	color: #000;
}

.blocksArea {
	display: grid;
	grid-template-columns: 250px 1fr;
	grid-template-areas: "class charlist"
	                     "stats charlist";
	gap: 10px;
	margin-top: 1em;
}

.pageBlock {
	border: 1px solid #ccc;
	border-radius: 3px;
	padding-bottom: 8px;

	&.charClass { grid-area: class; }
	&.charStats { grid-area: stats; }

	:deep(.blockTitle) {
		background-color: #e2e2e2;
		padding: 4px 8px;
	}

	:deep(.blockBody) {
		padding: 8px;
	}
}
</style>

<style>
* { box-sizing: border-box; }
input, select { min-height: 26px; }
</style>