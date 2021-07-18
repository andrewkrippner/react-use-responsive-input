import { useRef, useEffect } from 'react'

interface UseResponsiveInputOptions {}

const useResponsiveInput = (options?: Partial<UseResponsiveInputOptions>) => {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const computedStyle = window.getComputedStyle(ref.current)
        const div = document.createElement('div')
        div.id = 'useResponsiveInputReference'
        div.style.padding = computedStyle.padding
        div.style.font = computedStyle.font
        div.style.visibility = 'hidden'
        div.style.display = 'inline'
        div.innerHTML = ref.current.value.split(' ').join('&nbsp;') || ''
        document.body.appendChild(div)
        ref.current.style.width = `${div.offsetWidth}px`
        return div.remove
    })
    return ref
}

export default useResponsiveInput
