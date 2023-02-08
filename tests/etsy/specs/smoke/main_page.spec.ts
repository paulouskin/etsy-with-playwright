import {test, expect} from '@playwright/test'
import { EtsyMainPage } from '../../pages/EtsyMainPage'

const host = 'https://www.etsy.com'
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
        await mainPage.assertPrivacyPolicyModalDisappear()
    })

    test('privacy policy settings should be configurable @notForCI', async ({ page }) => {
        await mainPage.updatePrivacyPolicySettings()
        await mainPage.assertUpdatePrivacyPolicySettingsModalIsVisible()
    })
})