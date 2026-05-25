export enum EGlobalEvents {
	TEMPDemo = 'tmpDemo'
}

/** Вызов события
 * @param eventName - Имя вызываемого события
 */
export function fireEvent(eventName: EGlobalEvents): void {
	window.dispatchEvent(new Event(eventName))
}

/** Подписка на событие с выполнением колбека
 * @param eventName - Имя события
 * @param callback — Колбек для выполнения
 * @param controller - AbortController для отвязки слушателя
 */
export function subscribeOnEvent(eventName: EGlobalEvents, callback: () => void, controller: AbortController) {
	window.addEventListener(eventName, callback, { signal: controller.signal })
}