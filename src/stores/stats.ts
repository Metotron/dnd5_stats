import { defineStore } from 'pinia'
import type { StatsType } from '@/misc/statsList'

export const useStatsStore = defineStore({
	id: 'stats',
	state: (): { stats: StatsType<number> } => ({
		stats: {
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0
		}
	})
})
