import { expect, Locator, Page } from "@playwright/test";

export class SearchResultFilterPanel {

    readonly page:Page
    readonly shipToDropdownLocator = "//select[@name='ship_to']"
    readonly shipToDropdown:Locator

    constructor(page: Page) {
        this.page = page
        this.shipToDropdown = page.locator(this.shipToDropdownLocator)
    }

    async isExpanded() {
        await expect(this.shipToDropdown).toBeVisible()
    }
}