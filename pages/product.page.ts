import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly sizeSelect: Locator;
  readonly quantitySelect: Locator;

  constructor(page: Page) {
    super(page);
    const main = page.getByRole('main');
    this.title = main.getByRole('heading', { level: 1 });
    this.price = main.getByText(/^\$\d+\.\d{2}$/).first();
    this.addToCartButton = main.getByRole('button', { name: 'Add this item to cart' });
    this.sizeSelect = main.getByRole('combobox', { name: 'Size' });
    this.quantitySelect = main.getByRole('combobox', { name: 'Quantity' });
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
    await this.quantitySelect.selectOption(quantity);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
