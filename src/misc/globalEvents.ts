enum globalEvents {
	ResetStatsStore = 'ResetStatsStore',
	LoadValuesToCharlist = 'LoadValuesToCharlist',
	AutoLinkStats = 'AutoLinkStats'
}

/**
 * Вызов события
 * @param {string} eventName - Имя вызываемого события
 */
function fireEvent(eventName: globalEvents): void {
	window.dispatchEvent(new Event(eventName))
}

export { globalEvents, fireEvent }