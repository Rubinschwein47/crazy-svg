import { defineConfig } from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    esbuildOptions(options) {
        // preserve all comments
        options.keepNames = true;
        options.legalComments = 'inline';
    },
})