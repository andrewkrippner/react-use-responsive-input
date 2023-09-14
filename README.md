# useResponsiveInput

[![npm (tag)](https://img.shields.io/npm/v/react-use-responsive-input?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-use-responsive-input) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-use-responsive-input?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/react-use-responsive-input?style=flat&colorA=000000&colorB=000000)

useResponsiveInput is a React hook that makes any input component responsive to it's text's width.

## Installation

#### npm

```bash
npm install react-use-responsive-input
```

#### Yarn

```bash
yarn add react-use-responsive-input
```

<!--


```bash
yarn add react-use-responsive-input

#NPM
npm install react-use-responsive-input
``` -->

## Example

```tsx
import useResponsiveInput from 'react-use-responsive-input'

const ResponsiveInput = ({
    value,
    onChange,
}: {
    value: string
    onChange?(value: string): void
}) => {
    const responsiveInputRef = useResponsiveInput({
        // options
        // disabled: boolean
        // extraWidth: number
        // fixedValue: string
        // minWidth: number
        // onUpdateWidth(width: number): void
    })

    return (
        <input
            ref={responsiveInputRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
        />
    )
}
```
