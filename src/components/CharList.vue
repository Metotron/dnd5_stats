<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useStatsStore } from '@/stores/stats'
import { useCharClassStore } from '@/stores/charClass'
import { globalEvents } from '@/misc/globalEvents'

const statsStore = useStatsStore()
const charClassStore = useCharClassStore()

onMounted(() => {
	window.addEventListener(globalEvents.LoadValuesToCharlist, loadValuesToCharlist)
})
onBeforeUnmount(() => {
	window.removeEventListener(globalEvents.LoadValuesToCharlist, loadValuesToCharlist)
})

// Загрузка имеющихся значений характеристик
function loadValuesToCharlist() {
	const stats = statsStore.generatedValues
	//TODO дописать применение характеристик к чарлисту
}
</script>

<template lang="pug">
.pageBlock.charList
	.blockTitle
		slot
	.blockBody
		| {{ statsStore.stats }}
		hr
		| {{ charClassStore.charClass }}, {{ charClassStore.charHitDice }}
</template>

<style lang="scss" scoped>
.charList {
	align-self: start;
}
</style>
