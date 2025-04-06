/// <reference types="@vitest/browser/matchers" />

import { defineWorkspace } from 'vitest/config'

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: 'vite.config.ts',
    test: {
      browser: {
        enabled: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
          {
            browser: 'chromium',
          },
        ],
      },
    },
  },
])
