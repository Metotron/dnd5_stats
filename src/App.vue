<script setup lang="ts">
import ClassSelector from '@/components/ClassSelector.vue'
import ValuesLinker from '@/components/ValuesLinker.vue'
import CharList from '@/components/CharList.vue'
</script>


<template lang="pug">
header Генерация характеристик персонажа на первом уровне (D&amp;D 5e)
.blocksArea
	class-selector 🧍 Класс персонажа
	values-linker 🎲 Числовые значения
	char-list 📎 Характеристики персонажа
</template>


<style lang="scss" scoped>
html, body {
	margin: 0;
	padding: 0;
	font-size: 16px;
	color: #000;
	background-color: #fff;
}

.blocksArea {
	display: grid;
	grid-template-columns: 270px min(100%, 400px);
	grid-template-areas: "class charlist"
	                     "stats charlist";
	gap: calc(var(--blockPadding) * 2);
	margin-top: 1em;
}

.pageBlock {
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	overflow: hidden;
	box-shadow: 1px 1px 6px 0 rgb(150, 150, 150, 0.1);

	&.charClass { grid-area: class; }
	&.charStats { grid-area: stats; }
	&.charList  { grid-area: charlist; }

	:deep(.blockTitle) {
		background-color: #e2e2e2;
		padding: 4px var(--blockPadding);
	}

	:deep(.blockBody) {
		padding: var(--blockPadding);
	}
}
</style>

<style>
* { box-sizing: border-box; }
input, select { min-height: 26px; }
:root {
	--borderColor: #ccc;
	--blockPadding: 8px;
	--accentColor: #e07014;
}
</style>