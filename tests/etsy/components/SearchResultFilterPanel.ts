import { expect, Locator, Page } from "@playwright/test";

export class SearchResultFilterPanel {

    readonly page:Page
    readonly shipToDropdownSelector = "//select[@name='ship_to']"
    readonly mainFiltersDivSelector = "//div[@class='main-filters']"
    
    readonly shipToDropdown:Locator
    readonly filterForm:Locator;

    constructor(page: Page) {
        this.page = page
        this.shipToDropdown = page.locator(this.shipToDropdownSelector)
        this.filterForm = this.page.locator(this.mainFiltersDivSelector)
    }

    async isExpanded() {
        await this.page.waitForSelector(this.mainFiltersDivSelector)
        await expect(this.shipToDropdown).toBeVisible()
    }

    async filterBy(criteria:string) {
        console.log("Filtering search results by '%s'", criteria)
        await this.filterForm.getByText(criteria).click()
    }

    async applyFilters() {
        await this.filterForm.press('Enter')
    }
}