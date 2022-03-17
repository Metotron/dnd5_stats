enum globalEvents {
	ResetStatsStore = 'ResetStatsStore',
	LoadValuesToCharlist = 'LoadValuesToCharlist'
}

/**
 * Вызов события
 */
function fireEvent(eventName: globalEvents): void {
	window.dispatchEvent(new Event(eventName))
}

export { globalEvents, fireEvent }