import { expect, Locator, Page } from "@playwright/test";

export class ValidSearchResultPage {

    readonly page:Page
    readonly searchResultItemsTitleSelector = "//h3[contains(@class,'v2-listing-card__title')]"

    constructor(page:Page) {
        this.page= page
    }

    async searchResultsListIsVisible() {
        const resultListItemsTitle:Locator = this.page.locator(this.searchResultItemsTitleSelector)
        expect(await resultListItemsTitle.count()).toBeGreaterThan(0)
    }

}