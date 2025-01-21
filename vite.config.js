import webfontDownload from 'vite-plugin-webfont-dl'
import { VitePluginRadar } from 'vite-plugin-radar'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        webfontDownload(),
        VitePluginRadar({
            // Google Analytics tag injection
            analytics: {
                enableDev: true,
                id: 'G-FC18865LEX',
            },
        })
    ],
})