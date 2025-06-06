import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        vuetify({
            autoImport: true,
            styles: { configFile: 'src/scss/variables.scss' }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {}
        }
    },
    optimizeDeps: {
        exclude: ['vuetify'],
        entries: ['./src/**/*.vue']
    },
    build: {
        rollupOptions: {
            output: {
                sanitizeFileName(name) {
                    const match = DRIVE_LETTER_REGEX.exec(name);
                    const driveLetter = match ? match[0] : '';
                    // substr 是被淘汰語法，因此要改 slice
                    return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '');
                }
            }
        }
    }
});
