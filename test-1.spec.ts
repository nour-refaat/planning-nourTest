import { test, expect } from '@playwright/test';
test('invalid-login', async ({ page }) => {
  await page.goto('http://10.24.105.84:4200/app/users');
  await page.getByPlaceholder('User name or email').click();
  await page.getByPlaceholder('User name or email').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123qwe4');
  await page.getByRole('button', { name: 'Log in' }).click();

  const locator = page.locator('.swal2-title');
  await expect(locator).toHaveText(/Login failed!/);






});
test('valid-login', async ({ page }) => {
  await page.goto('http://10.24.105.84:4200/app/users');
  await page.getByPlaceholder('User name or email').click();
  await page.getByPlaceholder('User name or email').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123qwe');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL(/.*users/);

});

test('duplicate user', async ({ page }) => {
  await page.goto('http://10.24.105.84:4200/app/users');
  
  
  await page.getByPlaceholder('User name or email').click();
  await page.getByPlaceholder('User name or email').fill('admin');
  await page.getByPlaceholder('User name or email').press('Tab');
  await page.getByPlaceholder('Password').fill('123qwe');
  await page.getByPlaceholder('Password').press('Enter');
  page.getByText(' Create New ').click();
  await page.getByLabel('Name', { exact: true }).click();
  await page.getByLabel('Name', { exact: true }).fill('test');
  await page.getByLabel('Surname').click();
  await page.getByLabel('Surname').fill('test');
  await page.getByLabel('Full Name').click();
  await page.getByLabel('Full Name').fill('test2');
  await page.getByLabel('User name').click();
  await page.getByLabel('User name').fill('test.test2');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('123QWEr');
  await page.getByLabel('Confirm password').click();
  await page.getByLabel('Confirm password').fill('123QWEr');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('123QWErt');
  await page.getByLabel('Confirm password').click();
  await page.getByLabel('Confirm password').fill('123QWErt');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('nour@gmail.com');
  await page.getByRole('button', { name: 'Save' }).click();

  const locator = page.locator('.swal2-header');
  await expect(locator).toHaveText(/User name 'test.test2' is already taken./);
});