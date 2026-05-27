<script setup lang="ts">
import ValuesLinker from './components/DiceToStatLinker.vue'
import ArmorSelector from './components/selectors/ArmorSelector.vue'
import ClassSelector from './components/selectors/ClassSelector.vue'
import RaceSelector from './components/selectors/RaceSelector.vue'
import SkillsList from './components/selectors/SkillsList.vue'
import WeaponSelector from './components/selectors/WeaponSelector.vue'
import CharList from './components/views/CharList.vue'
import FeaturesList from './components/views/FeaturesList.vue'
import Weapon from './components/views/Weapon.vue'

import { useCharacter } from './composables/useCharacter.ts'

//FIXME Временное решение
sessionStorage.clear()
const character = useCharacter()
sessionStorage.setItem('charId', String(character.id))
</script>


<template lang="pug">
header
	h1 Генерация характеристик персонажа на первом уровне (D&amp;D&nbsp;5e)
	div.name
		b Имя:
		input(class="textLike" placeholder="Имя персонажа" v-model="character.name.value")

.blocksArea
	.blockCol.col1
		race-selector
		class-selector
		armor-selector
		weapon-selector
		values-linker
	.blockCol.col2
		char-list
		weapon
		features-list
	.blockCol.col3
		skills-list
</template>

<style lang="scss" scoped>
header {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--blockPadding);
	margin-bottom: 1em;

	.name {
		display: flex;
		align-items: center;
		gap: 8px;
	}
}

h1 {
	font-size: 1.2em;
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

* {
	box-sizing: border-box;
	caret-color: var(--accentColor);
}

::selection {
	background-color: var(--accentColor);
	color: #fff;
}

html, body {
	margin: 0;
	padding: var(--blockPadding);
	font-size: 16px;
	color: #000;
	background-color: #fff;
	font-family: Droid sans, serif;
}

h1, h2, h3, h4, h5, h6, ul, li {
	padding: 0;
	margin: 0;
}

ul {
	padding-left: 1em;

	li + li {
		margin-top: 1em;
	}
}

input, select {
	min-height: 26px;
	font-family: inherit;
	font-size: 1rem;
	line-height: 1.2;
}

input.textLike {
	flex: 0 1 220px;
	width: 220px;
	min-width: 0;
	appearance: none;
	border: 0;
	border-radius: 1px;
	padding: 0;

	&:focus-visible, &:focus {
		outline: 2px solid rgb(from var(--accentColor) r g b / .3);
	}
}

option, optgroup {
	font-size: .875rem;
}
</style>