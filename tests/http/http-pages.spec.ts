import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import products from '../../data/products.json';

test.describe('HTTP page checks', () => {
  test('returns successful HTML for the homepage', async () => {
    const response = await new ApiClient().get<string>('/');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.body).toContain('<shop-app');
  });

  test('returns successful HTML for a configured product detail page', async () => {
    const response = await new ApiClient().get<string>(products.categories[0].item.route);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.body).toContain('<shop-app');
  });
});
