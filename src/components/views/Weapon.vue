<script setup lang="ts">
import { useCharacter } from '@/composables/useCharacter'
import { damageTypeName, EWeaponProp, type TWeapon } from '@/handbook-data/weapons'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

function weaponDescription(weapon: TWeapon): string {
	const damage = weapon.damage == 0 ? '<i></i>' : `<i>${ weapon.damageDicesCount }d${ weapon.damage }</i>`
	const specialMark = weapon.props.some(p => p.prop == EWeaponProp.special) ? '<i class="special">&gt;</i>' : ''
	const damageType = `<span class="type">${damageTypeName(weapon.damageType)}${specialMark}</span>`

	return weapon.name + `${damage}${damageType}`
}

//TODO Сделать всплывающий элемент для описания special-оружия
</script>


<template lang="pug">
.pageBlock.selectedWeapons(v-if="character.weapons.list.value.length > 0")
	.blockTitle 🏹 Вооружение
	.blockBody
		.weapon(v-for="(weapon, idx) in character.weapons.list.value" :key="weapon.id + '' + idx" v-html="weaponDescription(weapon)")
</template>


<style lang="scss" scoped>
.blockBody {
	display: flex;
	flex-direction: column;
	gap: calc(var(--blockPadding) / 2);
}

:deep(i) { font-style: normal; }

.weapon {
	display: grid;
	grid-template-columns: 2fr 50px 1fr;
	padding-block: calc(var(--blockPadding) / 1.5);
	line-height: 1;
	transition: all .2s;

	&:has(.special) {
		cursor: pointer;

		&:hover {
			background-color: rgb(from #eee r g b / 0.6);

			:deep(.special) {
				color: var(--accentColor);
			}
		}
	}
	
	:deep(> i) {
		color: var(--accentColor);
	}

	:deep(.type) {
		color: #bbb;
		justify-self: end;

		.special {
			color: #000;
			line-height: 1rem;
			margin-left: var(--blockPadding);
			transition: color .2s;
		}
	}
}
</style>