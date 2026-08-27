import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ROUTES } from '../constants/routes';
import { SELECTORS } from '../constants/selectors';

export class LoginPage extends BasePage {
  // Selectors for login page
  readonly usernameInput = this.page.locator(SELECTORS.loginUsername);
  readonly passwordInput = this.page.locator(SELECTORS.loginPassword);
  readonly loginButton = this.page.locator(SELECTORS.loginButton);
  readonly successMessage = this.page.locator(SELECTORS.loginSuccessMessage);
  readonly errorMessage = this.page.locator(SELECTORS.loginErrorMessage);

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage() {
    await this.open(ROUTES.login);
    await this.verifyLoaded();
  }

  /**
   * Enter username in the username field
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password in the password field
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login with provided credentials
   */
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Verify login was successful by checking for success message
   */
  async verifyLoginSuccess() {
    return this.successMessage.filter({ hasText: 'Logged In Successfully' }).isVisible();
  }

  /**
   * Verify login failed by checking for error message
   */
  async verifyLoginError() {
    return this.errorMessage.isVisible();
  }

  /**
   * Get the error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }

  /**
   * Verify page title contains 'login'
   */
  async verifyPageTitle() {
    return this.page.title().then((title) => title.toLowerCase().includes('login'));
  }
}
