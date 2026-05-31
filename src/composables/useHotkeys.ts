import { onUnmounted } from 'vue'

type TControls = 'alt' | 'shift' | 'ctrl'
type THotkeyArgs =
	| [TControls, string, () => void]
    | [TControls, TControls, string, () => void]
	| [TControls, TControls, TControls, string, () => void]

// Все зарегистрированные в приложении хоткеи, чтобы не дублировались между компонентами
const usedHotkeys = new Set<string>()

export const useHotkey = () => {
	// Зарегистрированные в этом компоненте хоткеи, удаляются вместе с демонтированием компонента
	const localComponentHotkeyIds = new Set<string>()

	const abortController = new AbortController
	abortController.signal.addEventListener('abort', () => {
		for (const key of localComponentHotkeyIds.keys())
			usedHotkeys.delete(key)
		localComponentHotkeyIds.clear()
	})

	onUnmounted(() => abortController.abort())

	return (...params: THotkeyArgs) => {
		const hkId = params.slice(0, params.length - 1).join('_')
		if (usedHotkeys.has(hkId))
			throw new Error(`Хоткей ${hkId} уже задействован`)

		localComponentHotkeyIds.add(hkId)
		usedHotkeys.add(hkId)

		hotkey(abortController, ...params)
	}
}

function hotkey( aborter: AbortController, ...params: THotkeyArgs) {
	if (typeof params.at(-1) != 'function')
		throw new Error('Нужно передать функцию, вызываемую по хоткею')

	if (params.length < 3)
		throw new Error('При создании хоткея нужно указать хотя бы одну управляющую клавишу')

	const key = params.at(-2) as string
	if (key.trim().length == 0)
		throw new Error('Не указана клавиша для хоткея')

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