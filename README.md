# useResponsiveInput

[![npm (tag)](https://img.shields.io/npm/v/react-use-responsive-input?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-use-responsive-input) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-use-responsive-input?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/react-use-responsive-input?style=flat&colorA=000000&colorB=000000)

react-use-responsive-input is a react hook that enables any input component responsive to it's text size.

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
import { useState } from 'react'
import useResponsiveInput from 'react-use-responsive-input'

const ResponsiveInput = () => {
    const [value, setValue] = useState('')
    const responsiveInputRef = useResponsiveInput()

    return (
        <input
            ref={responsiveInputRef}
            className='example'
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}
```
