import { Locator, Page } from "@playwright/test";

export class SearchField {

    readonly page:Page
    readonly searchFieldSelector = "//input[@id='global-enhancements-search-query']"
    readonly searchField: Locator

    constructor(page:Page) {
        this.page = page
        this.searchField = this.page.locator(this.searchFieldSelector)
    }

    async searchFor(query:string) {
        await this.searchField.clear()
        await this.searchField.fill(query)
        await this.searchField.press("Enter")
        await this.page.waitForLoadState("networkidle")
    }
}