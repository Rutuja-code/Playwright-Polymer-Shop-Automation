import { test, expect } from '../../fixtures/base';

test.describe('Regression suite', () => {
  test('supports mobile viewport navigation and preserves key navigation', async ({
    page,
    homePage,
    headerComponent,
    footerComponent,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'mobile-chromium',
      'Responsive coverage runs on the mobile project only.'
    );
    await homePage.open();
    await homePage.verifyLoaded();
    await headerComponent.verifyVisible();
    await footerComponent.verifyVisible();

    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('shop-app')).toBeVisible();
    await expect(page.locator('shop-app').locator('shop-home')).toBeVisible();
  });
});
