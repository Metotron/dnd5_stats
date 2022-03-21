<script setup lang="ts">
import ClassSelector from "@/components/ClassSelector.vue"
import ValuesLinker from "@/components/ValuesLinker.vue"
import CharList from "@/components/CharList.vue"
import ArmorSelector from "@/components/ArmorSelector.vue"
import Skills from "@/components/Skills.vue"
</script>

<template lang="pug">
header
	h1 Генерация характеристик персонажа на первом уровне (D&amp;D&nbsp;5e)
.blocksArea
	class-selector
	armor-selector
	values-linker
	char-list
	skills
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
	grid-template:
		"class charlist skills" auto
		"armor charlist skills" auto
		"stats charlist skills" 1fr
		/ var(--column1Width) var(--column2Width) var(--column3Width);
	gap: calc(var(--blockPadding) * 2);
	margin-top: 1em;
	align-items: start;

	@media (max-width: 1280px) {
		--column3Width: 280px;
	}

	@media (max-width: 994px) {
		width: calc(var(--column1Width) + var(--column2Width) + var(--blockPadding) * 2);
		grid-template-columns: --var(column1Width) --var(column2Width);
		grid-template-areas:
			"class charlist"
			"armor charlist"
			"stats charlist"
			"skills skills";
	}

	@media (max-width: 700px) {
		--column2Width: 280px;
	}

	@media (max-width: 600px) {
		width: 100%;
		grid-template-columns: 100%;
		grid-template-areas: "class" "stats" "charlist" "skills";
	}
}

.pageBlock {
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	overflow: hidden;
	box-shadow: 1px 1px 6px 0 rgb(150, 150, 150, 0.1);

	&.charClass { grid-area: class; }
	&.armor     { grid-area: armor; }
	&.charStats { grid-area: stats; }
	&.charList  { grid-area: charlist; }
	&.skills    { grid-area: skills; }

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

:root {
	--borderColor: #ccc;
	--blockPadding: 8px;
	--accentColor: #e07014;
}
</style>