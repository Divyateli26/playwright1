// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testMatch: '**/*.js',
  testDir: './tests',

  /* Reporter Configuration - यहाँ बदलाव किया गया है */
  reporter: [
    ['list'],
    ['html', { 
      outputFolder: 'playwright-report', 
      open: 'never',
      // यह सेटिंग टेस्ट डेटा और सभी एसेट्स को index.html के अंदर ही एम्बेड कर देती है
      attachments: true 
    }]
  ],

  /* Shared settings for all the projects below. */
  use: {
    /* Jenkins/CI के लिए Content Security Policy को बायपास करना */
    bypassCSP: true, 

    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 2000,
    },
    viewport: null,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      }
    },
  ],
});
