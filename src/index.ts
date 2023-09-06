import { useState, useEffect, useRef } from 'react'

interface UseResponsiveInputOptions {
    disabled: boolean
    minWidth: number
    extraWidth: number
}

const useResponsiveInput = (
    options: Partial<UseResponsiveInputOptions> = {},
) => {
    const { minWidth = 0, extraWidth = 0, disabled = false } = options
    const [inputElement, ref] = useState<HTMLInputElement | null>(null)
    const observerRef = useRef<MutationObserver | null>(null)

    useEffect(() => {
        if (!inputElement) return
        const updateWidth = () => {
            const id = 'useResponsiveInputContainer'
            const createSingletonDiv = () => {
                const singletonDiv = document.createElement('div')
                singletonDiv.id = id
                singletonDiv.style.height = '0px'
                singletonDiv.style.overflow = 'hidden'
                document.body.appendChild(singletonDiv)
                return singletonDiv
            }
            const singletonDiv =
                document.getElementById(id) ?? createSingletonDiv()
            const computedStyle = window.getComputedStyle(inputElement)
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
            div.innerHTML = inputElement.value.split(' ').join('&nbsp') || ''
            singletonDiv.appendChild(div)
            if (!disabled) {
                inputElement.style.width = `${Math.max(
                    div.offsetWidth + extraWidth,
                    minWidth,
                )}px`
                inputElement.style.boxSizing = 'border-box'
            }
            div.remove()
        }
        updateWidth()
        inputElement.addEventListener('input', updateWidth)
        observerRef.current = new MutationObserver(() => updateWidth())
        observerRef.current.observe(inputElement, {
            attributes: true,
            attributeFilter: ['value'],
        })
        return () => {
            observerRef.current?.disconnect()
            inputElement.removeEventListener('input', updateWidth)
        }
    }, [inputElement])

    return ref
}

export default useResponsiveInput
