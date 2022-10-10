import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base : 'https://php72.afk.mk/young_blood/tankica/boxes/boxes2/dist/',
    server: {
        port: 5179,
        hmr: {
            host: 'localhost'

        },
    },
  plugins: [vue()]
})
