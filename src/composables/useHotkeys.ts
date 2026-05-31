import { onUnmounted } from 'vue'

type TControls = 'alt' | 'shift' | 'ctrl'
type THotkeyArgs =
	| [TControls, string, () => void]
    | [TControls, TControls, string, () => void]
	| [TControls, TControls, TControls, string, () => void]

function hotkey( aborter: AbortController, ...params: THotkeyArgs) {
	if (typeof params.at(-1) != 'function')
		throw new Error('Нужно передать функцию, вызываемую по хоткею')

	if (params.length < 3)	
		throw new Error('При создании хоткея нужно указать хотя бы одну управляющую клавишу')

	const key = params.at(-2)
	const ctrlParams = params.slice(0, params.length - 2)
	const ctrl = ctrlParams.some(k => k == 'ctrl')
	const shift = ctrlParams.some(k => k == 'shift')
	const alt = ctrlParams.some(k => k == 'alt')

	window.addEventListener('keydown', ev => {
		if (ev.code != key) return
		if (ctrl && !ev.ctrlKey) return
		if (shift && !ev.shiftKey) return
		if (alt && !ev.altKey) return

		const callback = params.at(-1)
		if (typeof callback == 'function')
			callback()
	}, { signal: aborter.signal })
}

export const useHotkey = () => {
	const abortController = new AbortController
	
	onUnmounted(() => abortController.abort())

	return {
		registerHotkey: (...params: THotkeyArgs) => hotkey(abortController, ...params),
	}
}