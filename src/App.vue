<script setup lang="ts">
import ValuesLinker from './components/DiceToStatLinker.vue'
import ArmorSelector from './components/selectors/ArmorSelector.vue'
import ClassSelector from './components/selectors/ClassSelector.vue'
import RaceSelector from './components/selectors/RaceSelector.vue'
import SkillsList from './components/selectors/SkillsList.vue'
import CharList from './components/views/CharList.vue'
import FeaturesList from './components/views/FeaturesList.vue'
</script>


<template lang="pug">
header
	h1 Генерация характеристик персонажа на первом уровне (D&amp;D&nbsp;5e)
.blocksArea
	.blockCol.col1
		race-selector
		class-selector
		armor-selector
		values-linker
	.blockCol.col2
		char-list
		features-list
	.blockCol.col3
		skills-list
</template>

<style lang="scss" scoped>
h1 {
	font-size: 1.2em;
	margin: 0 0 1em;
	font-weight: normal;
	text-align: center;
}

.blocksArea {
	--column1Width: 270px;
	--column2Width: 380px;
	--column3Width: 550px;
	width: calc(var(--column1Width) + var(--column2Width) + var(--column3Width) + var(--blockPadding) * 4);
	margin: 0 auto;
	display: grid;
	grid-template-columns: var(--column1Width) var(--column2Width) var(--column3Width);
	gap: var(--blockPadding);
}

.blockCol {
	display: flex;
	flex-direction: column;
	gap: var(--blockPadding);
}

.pageBlock {
	width: 100%;
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	overflow: hidden;
	box-shadow: 1px 1px 6px 0 rgb(150 150 150 / .1);

	:deep(.blockTitle) {
		background-color: #e2e2e2;
		padding: calc(var(--blockPadding) / 2) var(--blockPadding);
	}

	:deep(.blockBody) {
		padding: var(--blockPadding);
	}
}
</style>

<style>
:root {
	--borderColor: #ccc;
	--blockPadding: 8px;
	--accentColor: #e07014;
}

* { box-sizing: border-box; }

html, body {
	margin: 0;
	padding: var(--blockPadding);
	font-size: 16px;
	color: #000;
	background-color: #fff;
	font-family: Droid sans, serif;
}

input, select {
	min-height: 26px;
}
</style>