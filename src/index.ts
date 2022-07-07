import { useRef, useEffect } from 'react'

interface UseResponsiveInputOptions {
    minWidth: number
    extraWidth: number
}

const useResponsiveInput = (
    options: Partial<UseResponsiveInputOptions> = {}
) => {
    const { minWidth = 0, extraWidth = 0 } = options

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const id = 'useResponsiveInputContainer'
        const createSingletonDiv = () => {
            const singletonDiv = document.createElement('div')
            singletonDiv.id = id
            singletonDiv.style.height = '0px'
            singletonDiv.style.overflow = 'hidden'
            document.body.appendChild(singletonDiv)
            return singletonDiv
        }
        const singletonDiv = document.getElementById(id) ?? createSingletonDiv()
        const computedStyle = window.getComputedStyle(ref.current)
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
        div.innerHTML = ref.current.value.split(' ').join('&nbsp') || ''
        singletonDiv.appendChild(div)
        ref.current.style.width = `${Math.max(
            div.offsetWidth + extraWidth,
            minWidth
        )}px`
        ref.current.style.boxSizing = 'border-box'
        return () => div.remove()
    }, [ref.current?.value])

    return ref
}

export default useResponsiveInput
