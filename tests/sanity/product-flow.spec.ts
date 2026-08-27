import { test, expect } from '../../fixtures/base';
import { ROUTES } from '../../constants/routes';
import products from '../../data/products.json';

test.describe('Sanity suite', () => {
  test('adds the configured product to cart from the category flow', async ({
    homePage,
    headerComponent,
    categoryPage,
    productPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.verifyLoaded();

    const selectedCategory = products.categories[0];
    await headerComponent.openConfiguredCategory(selectedCategory.name);
    await categoryPage.verifyLoaded();
    await expect(categoryPage.heading).toHaveText(selectedCategory.name);
    await categoryPage.openProduct(selectedCategory.item.route);

    await productPage.verifyLoaded();
    await expect(productPage.title).toHaveText(selectedCategory.item.name);
    await productPage.selectPreferredSize('M');
    await productPage.selectQuantity('2');
    await productPage.addToCart();

    await expect(cartPage.cartBadge).toBeVisible();
    await expect.poll(() => cartPage.getCartItemCount()).toBe(2);
    await expect(homePage.page).toHaveURL(new RegExp(`${ROUTES.detail.replace('/', '')}`));

    await cartPage.open();
    await cartPage.verifyLoaded();
    await cartPage.updateQuantity('3');
    await expect(cartPage.quantitySelect).toHaveValue('3');
    await cartPage.removeItem(selectedCategory.item.name);
    await cartPage.verifyEmpty();
  });

  test('rejects an invalid product route', async ({ categoryPage }) => {
    await expect(categoryPage.openProduct('/invalid/product')).rejects.toThrow(
      'Expected a /detail/ route.'
    );
  });
});
