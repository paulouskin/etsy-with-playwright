import {test, expect} from '@playwright/test'
import { EtsyMainPage } from '../../pages/EtsyMainPage'

const host = 'https://www.etsy.com'
const acceptPolicyButtonSelector = "//button[@data-gdpr-single-choice-accept='true']"
const privacyPolicySettingText = 'Privacy Settings'
let mainPage:EtsyMainPage;

test.beforeEach( async ({ page }) => {
    mainPage = new EtsyMainPage(page)
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

    test('default privacy policy should be acceptable @notForCI', async ({ page }) => {
        await mainPage.acceptDefaultPrivacyPolicySettings()
        await mainPage.privacyPolicyModalDissapear()
    })

    test('privacy policy settings should be configurable @notForCI', async ({ page }) => {
        await mainPage.updatePrivacyPolicySettings()
        const privacySettingsModalHeading = page.getByRole('heading').getByText(privacyPolicySettingText)
        await expect(privacySettingsModalHeading).toBeVisible()
    })
})