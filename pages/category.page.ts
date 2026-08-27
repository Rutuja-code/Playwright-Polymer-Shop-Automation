import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CategoryPage extends BasePage {
  readonly heading: Locator;
  readonly productLinks: Locator;
  readonly productCount: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('shop-app').locator('shop-list').locator('header > h1');
    this.productLinks = page.locator('shop-app').locator('shop-list').locator('ul.grid > li > a');
    this.productCount = page.locator('shop-app').locator('shop-list').locator('header > span');
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
    await this.page.locator(`a[href="${productRoute}"]`).click();
  }
}
