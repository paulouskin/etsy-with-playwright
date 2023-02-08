import { expect, Locator, Page } from "@playwright/test";
import { SearchResultFilterPanel } from "../components/SearchResultFilterPanel";
import { FilterOption } from "../model/FilterOption";

export class ValidSearchResultPage {

    readonly page:Page
    readonly searchResultItemsTitleSelector = "//h3[contains(@class,'v2-listing-card__title')]"
    readonly filterTabExpandButtonSelector = "//button[@id='search-filter-button']"
    readonly freeShippingBadgeSelector = "//span[contains(@class,'wt-badge--sale-01')]"
    readonly filterBadgeSelector = "//div[@data-active-filters]/ul/li";

    readonly specialOffersSectionHeader = "Special offers"

    readonly expandFilterPanelButton:Locator
    readonly applyFilterButton:Locator
    readonly resultFilterOptionsPanel:SearchResultFilterPanel

    constructor(page:Page) {
        this.page= page
        this.expandFilterPanelButton = page.locator(this.filterTabExpandButtonSelector)
        this.resultFilterOptionsPanel = new SearchResultFilterPanel(page)
    }

    async searchResultsListIsVisible() {
        console.log("Verify search result list is visible")
        const resultListItemsTitle:Locator = this.page.locator(this.searchResultItemsTitleSelector)
        expect(await resultListItemsTitle.count()).toBeGreaterThan(0)
    }

    private async expandFilterPanel() {
        console.log("Expand search result filter panel")
        await this.expandFilterPanelButton.click();
        await this.resultFilterOptionsPanel.isExpanded();
    }

    async filterBy(criterias:FilterOption[]) {
        await this.expandFilterPanel()
        for (const criteria of criterias) {
            await this.resultFilterOptionsPanel.filterBy(criteria)
        }
        await this.resultFilterOptionsPanel.applyFilters() 
    }

    async assertPageContainsResultsFilteredBy(expectedFilters:FilterOption[]) {
        console.log("Verify filter(s) applied to search result")
        const expectedFiltersLC = expectedFilters.map(f => f.option.toLowerCase())
        console.log("Expected search result filters: " + expectedFiltersLC)
        await this.waitForFilteredResults()
        const getAppliedFiltersText = await this.page.locator(this.filterBadgeSelector)
            .allTextContents()
        const actualFiltersText = getAppliedFiltersText.map(f => f.trim().toLowerCase());
        console.log("Applied search result filters: " + actualFiltersText)
        const isFiltersPresent = expectedFiltersLC
            .filter(x => actualFiltersText.includes(x)).length == expectedFilters.length    
        expect(isFiltersPresent).toBeTruthy()
    }

    private async waitForFilteredResults() {
        await this.page.waitForSelector(this.filterBadgeSelector)
    } 

}