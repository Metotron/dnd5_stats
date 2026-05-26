<script setup lang="ts">
import { ref, watch } from 'vue'
import { type ERace, baseRaces, EBaseRace, subracecoOfBase } from '@/handbook-data/races'

import { useCharacter } from '@/composables/useCharacter'

const character = useCharacter(1)  //TODO Вместо 1 подставить выбранный пользователем ID

const selectedRace = ref<ERace>(character.race.value.race)
watch(selectedRace, race => character.race.value = race)
</script>


<template lang="pug">
.pageBlock.race
	.blockTitle 🐒 Раса
	.blockBody
		select(v-model="selectedRace")
			optgroup(label="Дварф")
				option(v-for="race in subracecoOfBase(EBaseRace.dwarf)" :value="race.race") {{ race.diff.name }}
			optgroup(label="Эльф")
				option(v-for="race in subracecoOfBase(EBaseRace.elf)" :value="race.race") {{ race.diff.name }}
			optgroup(label="Полурослик")
				option(v-for="race in subracecoOfBase(EBaseRace.halfling)" :value="race.race") {{ race.diff.name }}
			optgroup(label="Человек")
				option(v-for="race in subracecoOfBase(EBaseRace.human)" :value="race.race") {{ race.diff.name }}
			optgroup(label="Драконорожденный")
				option(v-for="race in subracecoOfBase(EBaseRace.dragonborn)" :value="race.race") {{ race.diff.name }}
			optgroup(label="Гном")
				option(v-for="race in subracecoOfBase(EBaseRace.gnome)" :value="race.race") {{ race.diff.name }}
			option(v-for="race in subracecoOfBase(EBaseRace.halfelf)" :value="race.race") {{ baseRaces[race.baseRace].name }}
			option(v-for="race in subracecoOfBase(EBaseRace.halforc)" :value="race.race") {{ baseRaces[race.baseRace].name }}
			option(v-for="race in subracecoOfBase(EBaseRace.tiefling)" :value="race.race") {{ baseRaces[race.baseRace].name }}
</template>


<style lang="scss" scoped>
.blockBody {

}

select {
	max-width: 100%;
}
</style>