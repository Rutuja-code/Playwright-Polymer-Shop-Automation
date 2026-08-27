import { Locator, Page } from '@playwright/test';
import { WaitUtils } from '../utils/waits';

export class HeaderComponent {
  readonly logoLink: Locator;
  readonly cartLink: Locator;
  readonly categoryLinks: Locator;
  readonly categoriesButton: Locator;

  constructor(private readonly page: Page) {
    const navigation = page.getByRole('navigation');
    this.logoLink = navigation.getByRole('link', { name: 'SHOP Home' });
    this.cartLink = navigation.getByRole('link', { name: /Shopping cart:/ });
    this.categoryLinks = navigation.getByRole('link', { name: /Outerwear|T-Shirts/ });
    this.categoriesButton = navigation.getByRole('button', { name: 'Categories' });
  }

  async verifyVisible() {
    const waits = new WaitUtils(this.page);
    await waits.waitForVisible(this.logoLink);
    await waits.waitForVisible(this.cartLink);
  }

  async openHome() {
    await this.logoLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCategoryNames() {
    return this.categoryLinks.allTextContents();
  }

  async openCategory(categoryName: string) {
    await this.categoryLinks.filter({ hasText: categoryName }).click();
  }

  async openConfiguredCategory(categoryName: string) {
    await this.openCategory(categoryName);
  }
}
