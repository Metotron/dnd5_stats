<script setup lang="ts">
import ValuesLinker from './components/DiceToStatLinker.vue'
import ArmorSelector from './components/selectors/ArmorSelector.vue'
import BackgroundSelector from './components/selectors/BackgroundSelector.vue'
import ClassSelector from './components/selectors/ClassSelector.vue'
import RaceSelector from './components/selectors/RaceSelector.vue'
import WeaponSelector from './components/selectors/WeaponSelector.vue'
import CharList from './components/views/CharList.vue'
import FeaturesList from './components/views/FeaturesList.vue'
import GoodsList from './components/views/GoodsList.vue'
import LanguagesList from './components/views/LanguagesList.vue'
import SkillsList from './components/views/SkillsList.vue'
import Weapon from './components/views/Weapon.vue'

import { useCharacter } from './composables/useCharacter.ts'

//FIXME Временное решение
sessionStorage.clear()
const character = useCharacter()
sessionStorage.setItem('charId', String(character.id))

//FIXME Сделать адаптив
</script>


<template lang="pug">
header
	h1 Генерация характеристик персонажа на первом уровне (D&amp;D&nbsp;5e)
	div.name
		b Имя:
		input(class="textLike" placeholder="Имя персонажа" v-model="character.name.value")

.blocksArea
	.blockCol.col1
		values-linker
		race-selector
		class-selector
		background-selector
		armor-selector
		weapon-selector
	.blockCol.col2
		char-list
		weapon
		features-list
	.blockCol.col3
		skills-list
		languages-list
		goods-list
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
	display: grid;
	grid-template-columns: var(--column1Width) var(--column2Width) var(--column3Width);
	align-items: start;
	gap: var(--blockPadding);
	width: calc(var(--column1Width) + var(--column2Width) + var(--column3Width) + var(--blockPadding) * 4);
	margin: 0 auto;
}

.blockCol {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--blockPadding);
}

.pageBlock {
	grid-column: 1 / -1;
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
	--blockPadding: 8px;
	--borderColor: #ccc;
	--accentColor: #e07014;
	--greyColor: #9d9d9d;
	--highColor: #6c6;
	--lowColor: #e66;
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
	font-family: 'Droid sans', serif;
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

.modifierValue {
	color: var(--accentColor);

	i {
		font-style: normal;
		color: var(--greyColor);
		font-size: .7em;
	}
}
</style>