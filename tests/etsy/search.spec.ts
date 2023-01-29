import { test, expect, Page} from '@playwright/test'
import { EtsyMainPage } from './pages/EtsyMainPage';

const host = "https://etsy.com"
const validQuery = "leather bag"
const invalidQuery = "fjsiyfdsd768dfsjdjfksd867?>><>"
let mainPage:EtsyMainPage;

test.beforeEach( async ({ page }) => {
    mainPage = new EtsyMainPage(page)
    await page.goto(host)
    await mainPage.acceptDefaultPrivacyPolicySettings()
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test.describe("Successful search ", () => {
    test("should show a list with results", async ({ page }) => {
        await mainPage.searchFor(validQuery)
        // Implement me
    })
})

