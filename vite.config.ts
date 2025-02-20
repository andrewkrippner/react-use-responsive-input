import { resolve } from 'path'
import { UserConfig, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
    const config: UserConfig = {
        build: {
            lib: {
                name: 'React Use Responsive Input',
                entry: resolve(__dirname, 'src/index.ts'),
                formats: ['es', 'cjs'],
                fileName: 'index',
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
            dts({
                insertTypesEntry: true,
            }),
        ],
    }
    return config
})
