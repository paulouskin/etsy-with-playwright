import { test, expect, Page} from '@playwright/test'
import { ErrorSearchResultPage } from './pages/ErrorSearchResultPage';
import { EtsyMainPage } from './pages/EtsyMainPage';
import { ValidSearchResultPage } from './pages/ValidSearchResultPage';

const host = "https://etsy.com"
const validQuery = "leather bag"
const invalidQuery = "fjsiyfdsd768dfsjdjfksd867?>><>"
let mainPage:EtsyMainPage
let searchResultPage:ValidSearchResultPage
let errorSearchResultPage:ErrorSearchResultPage

test.beforeEach( async ({ page }) => {
    mainPage = new EtsyMainPage(page)
    searchResultPage = new ValidSearchResultPage(page)
    errorSearchResultPage = new ErrorSearchResultPage(page)
    await mainPage.visit()
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test.describe("Successful search ", () => {
    test("should have query in the page title", async ({ page }) => {
        await mainPage.searchFor(validQuery)
        expect((await page.title()).toLowerCase()).toContain(validQuery)
    })

    test("should show a list with results", async ({ page }) => {
        await mainPage.searchFor(validQuery)
        await searchResultPage.searchResultsListIsVisible()
    })
})

test.describe("Search with invalid query", () => {
    test("should result to error result page", async ({ page }) => {
       await mainPage.searchFor(invalidQuery)
       await errorSearchResultPage.isVisibleForQuery(invalidQuery)
    })
})

