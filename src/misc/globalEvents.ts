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

/**
 * Подписка на событие с выполнением колбека
 * @param {string} eventName - Имя события
 * @param {Function} callback — Колбек для выполнения
 * @return {Function} Функция для отказа от подписки
 */
function subscribeOnEvent(eventName: globalEvents, callback: () => void): Function {
	window.addEventListener(eventName, callback)

	return () => {
		window.removeEventListener(eventName, callback)
	}
}

export { globalEvents, fireEvent, subscribeOnEvent }

//TODO Реализовать работу хоткеев на кнопках