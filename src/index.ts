import { useRef, useEffect } from 'react'

const getSingletonDiv = (id: string) => {
    const currentSingleton = document.getElementById(id)
    if (currentSingleton) return currentSingleton
    const newSingleton = document.createElement('div')
    newSingleton.id = id
    newSingleton.style.height = '0px'
    newSingleton.style.overflow = 'hidden'
    document.body.appendChild(newSingleton)
    return newSingleton
}

interface UseResponsiveInputOptions {
    disabled: boolean
    minWidth: number
    extraWidth: number
    fixedValue: string
    onUpdateWidth(width: number): void
}

const useResponsiveInput = (
    options: Partial<UseResponsiveInputOptions> = {},
) => {
    const {
        minWidth = 0,
        extraWidth = 0,
        fixedValue,
        disabled = false,
        onUpdateWidth,
    } = options
    const ref = useRef<HTMLInputElement>(null)
    const observerRef = useRef<MutationObserver | null>(null)

    useEffect(() => {
        const inputElement = ref.current
        if (!inputElement) return
        if (disabled) return
        const updateWidth = () => {
            const singletonDiv = getSingletonDiv('useResponsiveInputContainer')
            const computedStyle = window.getComputedStyle(inputElement)
            const value =
                fixedValue || inputElement.value || inputElement.defaultValue
            const div = document.createElement('div')
            div.style.padding = computedStyle.padding
            div.style.font = computedStyle.font
            div.style.border = computedStyle.border
            div.style.margin = computedStyle.margin
            div.style.visibility = 'hidden'
            div.style.display = 'inline'
            div.style.height = '0px'
            div.style.overflow = 'hidden'
            div.style.whiteSpace = 'pre'
            div.innerHTML = value.split(' ').join('&nbsp') || ''
            singletonDiv.appendChild(div)
            const computedWidth = Math.max(
                div.offsetWidth + extraWidth,
                minWidth,
            )
            onUpdateWidth?.(computedWidth)
            inputElement.style.width = `${computedWidth}px`
            inputElement.style.boxSizing = 'border-box'
            div.remove()
        }
        updateWidth()
        inputElement.addEventListener('input', updateWidth)
        observerRef.current = new MutationObserver(() => updateWidth())
        observerRef.current.observe(inputElement, {
            attributes: true,
            subtree: true,
            childList: true,
            characterData: true,
        })
        return () => {
            observerRef.current?.disconnect()
            inputElement.removeEventListener('input', updateWidth)
        }
    }, [ref, disabled, minWidth, extraWidth, fixedValue, onUpdateWidth])

    return ref
}

export default useResponsiveInput
