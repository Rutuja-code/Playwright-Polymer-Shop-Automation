import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { CategoryPage } from '../pages/category.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';

export type AppFixtures = {
  homePage: HomePage;
  headerComponent: HeaderComponent;
  footerComponent: FooterComponent;
  categoryPage: CategoryPage;
  productPage: ProductPage;
  cartPage: CartPage;
  loginPage: LoginPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  footerComponent: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
