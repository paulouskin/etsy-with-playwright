import { expect, Locator, Page } from "@playwright/test";
import { SearchResultFilterPanel } from "../components/SearchResultFilterPanel";

export class ValidSearchResultPage {

    readonly page:Page
    readonly searchResultItemsTitleSelector = "//h3[contains(@class,'v2-listing-card__title')]"
    readonly filterTabExpandButtonSelector = "//button[@id='search-filter-button']"
    readonly freeShippingBadgeSelector = "//span[contains(@class,'wt-badge--sale-01')]"

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

    async containsFreeShippingItemsOnly() {
        const allItemsCount = await this.page.locator(this.searchResultItemsTitleSelector).count()
        console.log("Items in search result list: %d", allItemsCount)
        const markedItems = await this.page.locator(this.freeShippingBadgeSelector).count()
        await expect(this.page.locator(this.freeShippingBadgeSelector)).toHaveCount(allItemsCount)
    }

}