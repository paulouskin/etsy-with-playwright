import { expect, Locator, Page } from "@playwright/test";

export class EtsyMainPage {
    readonly acceptPolicyButtonSelector = "//button[@data-gdpr-single-choice-accept='true']"
    readonly searchFieldSelector = "//input[@id='global-enhancements-search-query']"
    readonly searchResultItemsTitleSelector = "//h3[contains(@class,'v2-listing-card__title')]"
    readonly updateSettingsButtonText = 'Update settings'
    readonly searchField: Locator
    readonly acceptPolicyButton:Locator;
    readonly page:Page;

    constructor(page: Page) {
        this.page = page;
        this.searchField = this.page.locator(this.searchFieldSelector)
        this.acceptPolicyButton = this.page.locator(this.acceptPolicyButtonSelector)
    }

    async acceptDefaultPrivacyPolicySettings() {
        await this.acceptPolicyButton.click()
    }

    async updatePrivacyPolicySettings() {
        const updateSettingsButton = this.page.getByText(this.updateSettingsButtonText)
        await updateSettingsButton.click()
    }

   async privacyPolicyModalDissapear() {
        await expect(this.acceptPolicyButton).toBeHidden()
   }

    async searchFor(query: string) {
        await this.searchField.clear()
        await this.searchField.fill(query)
        await this.searchField.press("Enter")
        await this.page.waitForLoadState("networkidle")
    }

    async searchResultsListIsVisible() {
        const resultListItemsTitle:Locator = this.page.locator(this.searchResultItemsTitleSelector)
        expect(await resultListItemsTitle.count()).toBeGreaterThan(0)
    }
}