import { resolve } from 'path'
import { UserConfig, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { name } from './package.json'

export default defineConfig(() => {
    const config: UserConfig = {
        build: {
            lib: {
                name: 'React Use Responsive Input',
                entry: resolve(__dirname, 'src/index.ts'),
                formats: ['es', 'umd'],
                fileName: (format) => `${name}.${format}.js`,
            },
            rollupOptions: {
                external: ['react', 'react/jsx-runtime', 'react-dom'],
                output: {
                    globals: {
                        react: 'React',
                        'react/jsx-runtime': 'react/jsx-runtime',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
            commonjsOptions: {
                include: [/node_modules/],
            },
            outDir: 'dist',
            sourcemap: false,
        },
        plugins: [
            react(),
            eslint(),
            dts({
                insertTypesEntry: true,
            }),
        ],
    }
    return config
})
