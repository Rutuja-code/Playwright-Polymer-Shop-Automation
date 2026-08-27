import { test, expect } from '../../fixtures/base';

test.describe('Smoke suite', () => {
  test('loads the home page and validates the main navigation', async ({
    homePage,
    headerComponent,
    footerComponent,
  }) => {
    await homePage.open();
    await homePage.verifyLoaded();
    await headerComponent.verifyVisible();
    await footerComponent.verifyVisible();

    await expect(homePage.page).toHaveURL(/\/$/);
    await expect(homePage.page).toHaveTitle('Home - SHOP');
  });

  test('opens the mens outerwear category from the home page', async ({
    homePage,
    categoryPage,
    headerComponent,
  }) => {
    await homePage.open();
    await homePage.verifyLoaded();
    await headerComponent.verifyVisible();

    await headerComponent.openCategory("Men's Outerwear");
    await categoryPage.verifyLoaded();

    await expect(categoryPage.heading).toContainText("Men's Outerwear");
  });
});
