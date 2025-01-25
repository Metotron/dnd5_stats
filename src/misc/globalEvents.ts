enum globalEvents {
	ResetStatsStore = 'ResetStatsStore',  // Сброс привязок характеристик
	LoadValuesToCharlist = 'LoadValuesToCharlist',  // Отправка привязанных значений в чарлист
	AutoLinkStats = 'AutoLinkStats'  // Автоматическая расстановка привязок характеристик
}

/** Вызов события
 * @param eventName - Имя вызываемого события
 */
function fireEvent(eventName: globalEvents): void {
	window.dispatchEvent(new Event(eventName))
}

/** Подписка на событие с выполнением колбека
 * @param eventName - Имя события
 * @param callback — Колбек для выполнения
 * @returns Функция для отказа от подписки
 */
function subscribeOnEvent(eventName: globalEvents, callback: () => void): Function {
	window.addEventListener(eventName, callback)

	return () => {
		window.removeEventListener(eventName, callback)
	}
}

export { globalEvents, fireEvent, subscribeOnEvent }

//TODO Реализовать работу хоткеев на кнопках