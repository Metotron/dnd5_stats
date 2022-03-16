<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	//note import { useStatsStore } from './stores/stats'

	import { getRandomValues } from './misc/randomValues'
	import ValueLink from './components/ValueLink.vue'

	// Сгенерированные значения характеристик
	const randomValues = ref<number[]>([])

	//note const stats = useStatsStore()
	onMounted(() => {
		// Генерация стартовых значений характеристик
		generateRandomValues()
	})

	/**
	 * Сброс сгенерированного списка числовых значений
	 */
	function generateRandomValues(): void {
		randomValues.value = getRandomValues()

		resetStatLinks()
	}

	/**
	 * Сброс привязки характеристик к исходным числовым значениям
	 */
	function resetStatLinks(): void {

	}
</script>


<template lang="pug">
header Характеристики персонажа
.pageBlock
	.blockTitle Числовые значения
	.blockBody
		input(type="button" value="🎲 Сгенерировать" @click="generateRandomValues")
		.valuesToStats
			ValueLink(
				v-for="(value, idx) in randomValues"
				:value="value"
				:value-index="idx"
				:key="idx"
			)
		input(type="button" value="🔧 Привязать")
</template>


<style lang="scss" scoped>
html, body {
	margin: 0;
	padding: 0;
	font-size: 16px;
	color: #000;
}

.pageBlock {
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-top: 1em;
	display: inline-block;
	padding-bottom: 8px;

	.blockTitle {
		background-color: #e2e2e2;
		padding: 4px 8px;
	}

	.blockBody {
		padding: 8px;
	}

	input[type="button"] {
		cursor: pointer;
	}

	.valuesToStats {
		margin-bottom: 1em;
	}
}
</style>
<style>
* { box-sizing: border-box; }
</style>