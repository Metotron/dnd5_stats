<script setup lang="ts">
import { getWeaponsByClass, weaponClasses, type EWeapon } from '@/handbook-data/weapons'
import { ref } from 'vue'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedWeapon = ref<(EWeapon | '-')[]>(['-'])

function resortSelectedList() {
	if (!selectedWeapon.value.includes('-')) {
		selectedWeapon.value.push('-')
		resetCharacterWeapons()
		return
	}

	// Невыбранное оружие всегда должно быть последним в списке
	const filtered: (EWeapon | '-')[] = selectedWeapon.value.filter(w => w !== '-')
	filtered.push('-')
	selectedWeapon.value = filtered
	resetCharacterWeapons()
}

function resetCharacterWeapons() {
	character.weapons.removeAll()
	selectedWeapon.value.forEach(w => {
		w !== '-' && character.weapons.add(w)
	})
}
</script>


<template lang="pug">
.pageBlock.weapons
	.blockTitle ⚔️ Оружие
	.blockBody
		select(
			v-for="(w, idx) in selectedWeapon"
			v-model="selectedWeapon[idx]"
			:key="w + idx.toString()"
			:class="{ hidden: character.locked && selectedWeapon[idx] == '-' }"
			:disabled="character.locked"
			@change="resortSelectedList")
			option -
			optgroup(v-for="wcl in weaponClasses" :label="wcl.name")
				option(v-for="weapon in getWeaponsByClass(wcl.classType)" :value="weapon.id") {{ weapon.name }}
</template>


<style lang="scss" scoped>
.blockBody {
	display: flex;
	flex-direction: column;
	gap: var(--blockPadding)
}

select { width: 100%; }

.hidden { display: none; }
</style>