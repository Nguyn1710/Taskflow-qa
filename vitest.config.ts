import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment: jsdom lets us test DOM code in Node.js
    environment: 'jsdom',
    
    // Glob pattern for test files
    include: [
      'src/**/*.test.ts',
      'src/**/*.test.js',
      'test/**/*.test.js',   // ← thêm dòng này
      'test/**/*.test.ts',
    ],
    // Coverage options (we'll use this later)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
      ]
    },
    
    // Globals: no need to import describe/it/expect
    globals: true,
    
    // Watch mode settings
    watch: false,
  },
});