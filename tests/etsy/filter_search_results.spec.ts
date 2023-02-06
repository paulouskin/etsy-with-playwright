import { test, expect } from "@playwright/test"
import { EtsyMainPage } from "./pages/EtsyMainPage"
import { ValidSearchResultPage } from "./pages/ValidSearchResultPage"

let mainPage:EtsyMainPage
let searchResultPage:ValidSearchResultPage
const searchQuery = "leather bag"
const filterOption = ["FREE shipping"]
const filterOptions = ["FREE shipping", "Brown"]

test.describe("Filtering search results", () => {

    test.beforeEach( async ({ page }) => {
        mainPage = new EtsyMainPage(page);
        searchResultPage = new ValidSearchResultPage(page);
        await mainPage.visit()
        await mainPage.searchFor(searchQuery)
        await searchResultPage.searchResultsListIsVisible()
    })

    test("should show only free to ship item for special offers 'FREE shipping' filter", async ({ page }) => {
        
        await searchResultPage.filterBy(filterOption)
        await searchResultPage.containsFilteredResults(filterOption)
    })

    test("should show only brown free to ship item for 'FREE shipping' and 'Brown' filters", async ({ page }) => {
        await searchResultPage.filterBy(filterOptions)
        await searchResultPage.containsFilteredResults(filterOptions)
    })

    test.afterEach( async ({ page }) => {
        await page.close()
    })
})