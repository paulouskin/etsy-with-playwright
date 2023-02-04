import { expect, Locator, Page } from "@playwright/test";

export class SearchResultFilterPanel {

    readonly page:Page
    readonly shipToDropdownSelector = "//select[@name='ship_to']"
    readonly mainFiltersDivSelector = "//div[@class='main-filters']"
    readonly shipToDropdown:Locator

    constructor(page: Page) {
        this.page = page
        this.shipToDropdown = page.locator(this.shipToDropdownSelector)
    }

    async isExpanded() {
        await expect(this.shipToDropdown).toBeVisible()
    }

    async filterBy(criteria:string) {
        console.log("Filtering search results by '%s'", criteria)
        const filterForm = this.page.locator(this.mainFiltersDivSelector)
        await filterForm.getByText(criteria).click()
        await filterForm.press('Enter')
    }
}