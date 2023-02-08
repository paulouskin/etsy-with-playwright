import { expect, Locator, Page } from "@playwright/test";
import { FilterOption } from "../model/FilterOption";

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
        console.log("Verify search result filter panel have been expanded")
        await this.page.waitForSelector(this.mainFiltersDivSelector)
        await expect(this.shipToDropdown).toBeVisible()
    }

    async filterBy(criteria:FilterOption) {
        console.log("Filtering search results by '%s'", criteria.toString())
        switch (criteria.category.toLowerCase()){
            case "special offers":
            case "color": 
                await this.filterForm.getByText(criteria.option).click()
                break
            default: throw Error("Wrong search result filter option")
        }
    }

    async applyFilters() {
        await this.filterForm.press('Enter')
    }
}