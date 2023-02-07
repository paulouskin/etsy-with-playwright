import { test } from "@playwright/test"
import { ShopperActor } from "./actors/ShopperActor"

let alexTheShopper:ShopperActor
const searchQuery = "leather bag"
const filterOption = ["FREE shipping"]
const filterOptions = ["FREE shipping", "Brown"]

test.describe("Filtering search results", () => {

    test.beforeEach( async ({ page }) => {
        alexTheShopper = new ShopperActor(page)
        await alexTheShopper.startsWithShopping()
        await alexTheShopper.searchFor(searchQuery)
    })

    test("should show only free to ship item for special offers 'FREE shipping' filter", async ({ page }) => {
        await alexTheShopper.filtersSearchResultsBy(filterOption)
        await alexTheShopper.verifyFilteredResultListFor(filterOption)
    })

    test("should show only brown free to ship item for 'FREE shipping' and 'Brown' filters", async ({ page }) => {
        await alexTheShopper.filtersSearchResultsBy(filterOptions)
        await alexTheShopper.verifyFilteredResultListFor(filterOptions)
    })

    test.afterEach( async ({ page }) => {
        await alexTheShopper.finishWithShopping()
    }) 
})