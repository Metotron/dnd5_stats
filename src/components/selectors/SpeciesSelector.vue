<script setup lang="ts">
import { type ESpecies, EBaseSpecies, subspeciesOf } from '@/handbook-data/species'
import { ref, watch } from 'vue'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedSpecies = ref<ESpecies>(character.species.value.species)
watch(selectedSpecies, species => character.species.value = species)
</script>


<template lang="pug">
.pageBlock.species
	.blockTitle 🐒 Вид
	.blockBody
		select(v-model="selectedSpecies")
			option(v-for="species in subspeciesOf(EBaseSpecies.aasimar)" :value="species.species") {{ species.diff.name }}
			optgroup(label="Голиаф")
				option(v-for="species in subspeciesOf(EBaseSpecies.goliath)" :value="species.species") {{ species.diff.name }}
			optgroup(label="Гном")
				option(v-for="species in subspeciesOf(EBaseSpecies.gnome)" :value="species.species") {{ species.diff.name }}
			option(v-for="species in subspeciesOf(EBaseSpecies.dwarf)" :value="species.species") {{ species.diff.name }}
			optgroup(label="Драконорождённый")
				option(v-for="species in subspeciesOf(EBaseSpecies.dragonborn)" :value="species.species") {{ species.diff.name }}
			option(v-for="species in subspeciesOf(EBaseSpecies.orc)" :value="species.species") {{ species.diff.name }}
			option(v-for="species in subspeciesOf(EBaseSpecies.halfling)" :value="species.species") {{ species.diff.name }}
			optgroup(label="Тифлинг")
				option(v-for="species in subspeciesOf(EBaseSpecies.tiefling)" :value="species.species") {{ species.diff.name }}
			option(v-for="species in subspeciesOf(EBaseSpecies.human)" :value="species.species") {{ species.diff.name }}
			optgroup(label="Эльф")
				option(v-for="species in subspeciesOf(EBaseSpecies.elf)" :value="species.species") {{ species.diff.name }}
</template>


<style lang="scss" scoped>
select { width: 100%; }
</style>