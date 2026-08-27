import path from 'path';
import dotenv from 'dotenv';

const envFilePath = path.resolve(__dirname, '..', 'env', '.env.dev');

dotenv.config({ path: envFilePath });

export interface EnvironmentConfig {
  baseUrl: string;
}

export const environment: EnvironmentConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://shop.polymer-project.org',
};
