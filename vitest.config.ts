import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**/*.test.ts'],
    },
    resolve: {
        alias: {
            "@constants": path.resolve(__dirname, "./src/constants"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@models": path.resolve(__dirname, "./src/models"),
            "@controllers": path.resolve(__dirname, "./src/controllers"),
            "@services": path.resolve(__dirname, "./src/services"),
        },
    },
});
