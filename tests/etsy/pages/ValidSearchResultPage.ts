import { expect, Locator, Page } from "@playwright/test";
import { SearchResultFilterPanel } from "../components/SearchResultFilterPanel";

export class ValidSearchResultPage {

    readonly page:Page
    readonly searchResultItemsTitleSelector = "//h3[contains(@class,'v2-listing-card__title')]"
    readonly filterTabExpandButtonSelector = "//button[@id='search-filter-button']"
    //readonly applyFilterButtonLocator = 

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
        // TODO: Move to searchFilterPanel
        await this.expandFilterPanel()
        const filterForm = this.page.locator("//div[@class='main-filters']")
        await filterForm.getByText(criteria).click()
        await filterForm.press('Enter')
    }

    containsFreeShippingItemsOnly():boolean {
        // TODO: Implement me
        return true;
    }

}