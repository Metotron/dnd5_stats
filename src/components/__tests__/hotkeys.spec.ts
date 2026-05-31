import { describe, expect, test } from 'vitest'

import { useHotkey } from '@/composables/useHotkeys'

describe('Проверка работы хоткеев', () => {
	const registerHotkey = useHotkey()
	registerHotkey('alt', 'KeyU', () => {})

	test('Ошибка при назначении повторного хоткея', () => {
		expect(() => registerHotkey('alt', 'KeyU', () => { })).toThrow(Error)
	})
})