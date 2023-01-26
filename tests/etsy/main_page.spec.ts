import {test, expect} from '@playwright/test'

const host = 'https://www.etsy.com'
const acceptPolicyButtonSelector = "//button[@data-gdpr-single-choice-accept='true']"
const updateSettingsButtonText = 'Update settings'
const privacyPolicySettingText = 'Privacy Settings'

test.beforeEach( async ({ page }) => {
    await page.goto(host)
})

test.afterEach( async ({ page }) => {
    await page.close()
})

test.describe('On the main page', () => {
    test('title should contain Etsy', async ({ page }) => {
        const expectedTitle = 'Etsy'
        expect(await page.title()).toContain(expectedTitle)
    })

    test('default privacy policy should be acceptable', async ({ page }) => {
        const acceptPolicyButton = page.locator(acceptPolicyButtonSelector)
        await acceptPolicyButton.click()
        await expect(acceptPolicyButton).toBeHidden()
    })

    test('privacy policy settings should be configurable', async ({ page }) => {
        const updateSettingsButton = page.getByText(updateSettingsButtonText)
        await updateSettingsButton.click()
        const privacySettingsModalHeading = page.getByRole('heading').getByText(privacyPolicySettingText)
        await expect(privacySettingsModalHeading).toBeVisible()
    })
})