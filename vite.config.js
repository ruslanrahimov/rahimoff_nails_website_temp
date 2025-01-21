import webfontDownload from 'vite-plugin-webfont-dl'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        webfontDownload(),
    ],
})