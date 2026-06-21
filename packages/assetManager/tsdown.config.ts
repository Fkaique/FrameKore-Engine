import {defineConfig} from "tsdown"

export default defineConfig([{
    entry: 'src/index.ts',
exports: true,
    format: 'esm',
    platform: 'browser',
    target: 'ES2024',
    clean: true,
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    minify: true,
    
},
{
    entry: 'src/index.ts',
exports: true,
    format: 'iife',
    platform: 'browser',
    target: 'ES2024',
    globalName: 'Framekore.assetManager',
    outputOptions: {
        globals: {
            "@framekore/core": "Framekore.core",
        }
    },
    outDir: 'dist',
    sourcemap: true,
    minify: true
}])