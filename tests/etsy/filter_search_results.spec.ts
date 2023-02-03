import { test, expect } from "@playwright/test"
import { EtsyMainPage } from "./pages/EtsyMainPage"
import { ValidSearchResultPage } from "./pages/ValidSearchResultPage"

let mainPage:EtsyMainPage
let searchResultPage:ValidSearchResultPage
const searchQuery = "leather bag"
const filterOption = "FREE Shipping"

test.describe("Filtering search results", () => {

    test.beforeEach( async ({ page }) => {
        mainPage = new EtsyMainPage(page);
        searchResultPage = new ValidSearchResultPage(page);
        await mainPage.visit()
        await mainPage.searchFor(searchQuery)
        await searchResultPage.searchResultsListIsVisible()
    })

    test.only("should show only free to ship item for special offers 'FREE shipping'", async ({ page }) => {
        await searchResultPage.filterBySpecialOffers(filterOption)
        expect(searchResultPage.containsFreeShippingItemsOnly()).toBeTruthy()
    })

    test.afterEach( async ({ page }) => {
        await page.close()
    })
})