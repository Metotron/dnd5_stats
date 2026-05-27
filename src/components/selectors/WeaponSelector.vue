<script setup lang="ts">
import { getWeaponsByClass, weaponClasses, type EWeapon } from '@/handbook-data/weapons'
import { ref } from 'vue'

const selectedWeapon = ref<(EWeapon | '-')[]>(['-'])

function resortSelectedList() {
	if (!selectedWeapon.value.some(weapon => weapon == '-')) {
		selectedWeapon.value.push('-')
		return
	}

	const filtered: (EWeapon | '-')[] = selectedWeapon.value.filter(weapon => weapon !== '-')
	filtered.push('-')
	selectedWeapon.value = filtered
}
</script>

<template lang="pug">
.pageBlock.weapons
	.blockTitle ⚔️ Оружие
	.blockBody
		select(v-for="(w, idx) in selectedWeapon" v-model="selectedWeapon[idx]" :key="idx" @change="resortSelectedList")
			option -
			optgroup(v-for="wcl in weaponClasses" :label="wcl.name")
				option(v-for="weapon in getWeaponsByClass(wcl.classType)" :value="weapon.id") {{ weapon.name }}
</template>

<style lang="scss" scoped>

</style>