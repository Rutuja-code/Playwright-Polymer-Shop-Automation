import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../constants/selectors';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly sizeSelect: Locator;
  readonly quantitySelect: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator(SELECTORS.productTitle).first();
    this.price = page.locator('.price');
    this.addToCartButton = page.locator(SELECTORS.addToCartButton);
    this.sizeSelect = page.locator(SELECTORS.sizeSelect);
    this.quantitySelect = page.locator(SELECTORS.quantitySelect);
  }

  async verifyLoaded() {
    await super.verifyLoaded();
    await this.addToCartButton.waitFor({ state: 'visible' });
  }

  async selectSize(size: string) {
    const availableSizes = await this.sizeSelect.locator('option').evaluateAll((options) =>
      options.map((option) => ({
        label: option.textContent?.trim() ?? '',
        value: option.getAttribute('value') ?? '',
      }))
    );
    const requestedSize = availableSizes.find(
      (option) =>
        option.value.toLowerCase() === size.toLowerCase() ||
        option.label.toLowerCase() === size.toLowerCase()
    );
    if (!requestedSize) {
      throw new Error(`Requested product size "${size}" is not available.`);
    }
    await this.sizeSelect.selectOption(requestedSize.value);
  }

  async selectPreferredSize(preferredSize: string = 'M') {
    await this.selectSize(preferredSize);
  }

  async selectQuantity(quantity: string) {
    if (await this.quantitySelect.count()) {
      await this.quantitySelect.selectOption(quantity);
    }
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
