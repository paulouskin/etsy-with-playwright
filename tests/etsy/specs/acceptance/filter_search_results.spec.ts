import { test } from "@playwright/test"
import { ShopperActor } from "../../actors/ShopperActor"
import { FilterOption } from "../../model/FilterOption"

let actor:ShopperActor
const searchQuery = "leather bag"
const filterOption = [
    new FilterOption("Special offers", "FREE shipping")
]
const filterOptions = [
    new FilterOption("Special offers", "FREE shipping"), 
    new FilterOption("Color", "Brown")
]

test.describe("Filtering search results", () => {

    test.beforeEach( async ({ page }) => {
        actor = new ShopperActor("Alex The Shopper", page)
        await actor.startsWithShopping()
        await actor.searchFor(searchQuery)
    })

    test("should show only free to ship item for special offers 'FREE shipping' filter", async ({ page }) => {
        await actor.filtersSearchResultsBy(filterOption)
        await actor.verifyFilteredResultListFor(filterOption)
    })

    test("should show only brown free to ship item for 'FREE shipping' and 'Brown' filters", async ({ page }) => {
        await actor.filtersSearchResultsBy(filterOptions)
        await actor.verifyFilteredResultListFor(filterOptions)
    })

    test.afterEach( async ({ page }) => {
        await actor.finishWithShopping()
    }) 
})