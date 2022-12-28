import type { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        testIdAttribute: 'data-qa',
        baseURL: 'http://coop.apps.symfonycasts.com',
        extraHTTPHeaders: {
            'Authorization': `Bearer 30ab73a088be09f8091649e7be26c6853e483d50`, // insecure, but the fastest solution
        },
    },
};
export default config;