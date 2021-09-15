import { useRef, useEffect } from 'react'

interface UseResponsiveInputOptions {}

const useResponsiveInput = (options?: Partial<UseResponsiveInputOptions>) => {
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
        const singletonDiv = document.getElementById(id) || createSingletonDiv()
        const computedStyle = window.getComputedStyle(ref.current)
        const div = document.createElement('div')
        div.style.padding = computedStyle.padding
        div.style.font = computedStyle.font
        div.style.visibility = 'hidden'
        div.style.display = 'inline'
        div.innerHTML = ref.current.value.split(' ').join('&nbsp;') || ''
        singletonDiv.appendChild(div)
        ref.current.style.width = `${div.offsetWidth}px`
        return () => div.remove()
    })
    return ref
}

export default useResponsiveInput
