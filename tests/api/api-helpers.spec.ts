import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import { ROUTES } from '../../constants/routes';
import products from '../../data/products.json';

test.describe('API helper scaffold', () => {
  test('fetches the homepage as successful HTML', async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.get<string>('/');

    expect(response.status).toBe(200);
    expect(response.body).toContain('<html');
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.body).toContain('<shop-app');
  });

  test('fetches the configured product detail route as successful HTML', async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.get<string>(products.categories[0].item.route);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.body).toContain('<shop-app');
    expect(products.categories[0].item.route).toContain(ROUTES.detail);
  });
});
