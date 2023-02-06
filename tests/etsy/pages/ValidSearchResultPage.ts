import { expect, Locator, Page } from "@playwright/test";
import { SearchResultFilterPanel } from "../components/SearchResultFilterPanel";

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
        const resultListItemsTitle:Locator = this.page.locator(this.searchResultItemsTitleSelector)
        expect(await resultListItemsTitle.count()).toBeGreaterThan(0)
    }

    private async expandFilterPanel() {
        await this.expandFilterPanelButton.click();
        await this.resultFilterOptionsPanel.isExpanded();
    }

    async filterBySpecialOffers(criteria:string) {
        await this.expandFilterPanel()
        await this.resultFilterOptionsPanel.filterBy(criteria)
    }

    async containsFilteredResults(expectedFilters:string[]) {
        const expectedFiltersLC = expectedFilters.map(f => f.toLowerCase())
        console.log("Expected search result filters: " + expectedFiltersLC)
        await this.page.waitForSelector(this.filterBadgeSelector)
        const getAppliedFilters = await this.page.locator(this.filterBadgeSelector)
            .allTextContents()
        const actualFilters = getAppliedFilters.map(f => f.trim().toLowerCase());
        console.log("Applied search result filters: " + actualFilters)
        const isFiltersPresent = expectedFiltersLC
            .filter(x => actualFilters.includes(x)).length == expectedFilters.length    
        expect(isFiltersPresent).toBeTruthy()
    }

}