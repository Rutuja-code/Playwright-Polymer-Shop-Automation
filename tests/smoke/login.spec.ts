import { test } from '../../fixtures/base';

test.describe('Login Tests', () => {
  test.skip(true, 'The Polymer Shop application has no login route or authentication controls.');

  test('supports valid login', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('student', 'Password123');
    await loginPage.verifyLoginSuccess();
  });

  test('reports invalid username and password and stays on login page', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('invaliduser', 'wrongpassword');
    await loginPage.verifyLoginError();
    await loginPage.getErrorMessage();
    await loginPage.verifyPageTitle();
  });

  test('logs in successfully after a failed attempt', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('invaliduser', 'wrongpassword');
    await loginPage.navigateToLoginPage();
    await loginPage.login('student', 'Password123');
    await loginPage.verifyLoginSuccess();
  });
});
