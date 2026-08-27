import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CategoryPage extends BasePage {
  readonly heading: Locator;
  readonly productLinks: Locator;
  readonly productCount: Locator;

  constructor(page: Page) {
    super(page);
    const main = page.getByRole('main');
    this.heading = main.getByRole('heading', { level: 1 });
    this.productLinks = main.getByRole('list').getByRole('link');
    this.productCount = main.getByText(/\(\d+ items?\)/);
  }

  async open(categoryRoute: string) {
    await super.open(categoryRoute);
  }

  async verifyLoaded() {
    await super.verifyLoaded();
    await this.heading.waitFor({ state: 'visible' });
  }

  async getFirstProductLink() {
    return this.productLinks.first().getAttribute('href');
  }

  async clickFirstProduct() {
    await this.productLinks.first().click();
  }

  async openProduct(productRoute: string) {
    if (!productRoute.startsWith('/detail/')) {
      throw new Error(`Invalid product route: "${productRoute}". Expected a /detail/ route.`);
    }
    await this.page
      .getByRole('link')
      .and(this.page.locator(`[href="${productRoute}"]`))
      .click();
  }
}
