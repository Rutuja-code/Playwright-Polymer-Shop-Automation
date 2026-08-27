import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ROUTES } from '../constants/routes';

export class CartPage extends BasePage {
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;
  readonly cartHeading: Locator;
  readonly quantitySelect: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);
    const main = page.getByRole('main');
    this.cartBadge = page.getByRole('button', { name: /Shopping cart:/ });
    this.checkoutButton = main.getByRole('link', { name: 'Checkout' });
    this.cartHeading = main.getByRole('heading', { name: 'Your Cart' });
    this.quantitySelect = main.getByRole('combobox', { name: 'Change quantity' });
    this.emptyState = main.getByText('is empty.');
  }

  async open() {
    await super.open(ROUTES.cart);
  }

  async verifyLoaded() {
    await super.verifyLoaded();
    await this.cartHeading.waitFor({ state: 'visible' });
  }

  async getCartItemCount() {
    const name = await this.cartBadge.getAttribute('aria-label');
    const match = name?.match(/(\d+) items?/);
    return Number(match?.[1] ?? 0);
  }

  async updateQuantity(quantity: string) {
    await this.quantitySelect.selectOption(quantity);
  }

  async removeItem(productName: string) {
    await this.page.getByRole('button', { name: `Delete item ${productName}` }).click();
  }

  async verifyEmpty() {
    await this.emptyState.waitFor({ state: 'visible' });
  }

  async proceedToCheckoutIfSupported() {
    const visibleCheckout = await this.checkoutButton
      .first()
      .isVisible()
      .catch(() => false);
    if (!visibleCheckout) {
      return false;
    }
    await this.checkoutButton.first().click();
    return true;
  }
}
