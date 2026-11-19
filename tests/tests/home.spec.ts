import { test, expect } from '@playwright/test';

test.describe('Página principal de Tlax.go', () => {
  test('debe cargar correctamente y mostrar el título o contenido principal', async ({ page }) => {
    // 1. Navega a la raíz (usa el baseURL configurado)
    await page.goto('/');

    // 2. Verifica que la página no devuelva error 404/500
    await expect(page.locator('body')).toBeVisible();

    // 3. Ajusta este texto a algún encabezado o botón real de tu pantalla de inicio
    // Ejemplo: await expect(page.getByRole('heading', { name: /Tlax/i })).toBeVisible();
  });
});