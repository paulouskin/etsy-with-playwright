import { expect, Locator, Page } from "@playwright/test";
import { SearchField } from "../components/SearchField";

export class EtsyMainPage {
    readonly host = "https://www.etsy.com"
    readonly acceptPolicyButtonSelector = "//button[@data-gdpr-single-choice-accept='true']"
    readonly updateSettingsButtonText = 'Update settings'
    readonly privacyPolicySettingText = 'Privacy Settings'
    readonly acceptPolicyButton:Locator;
    readonly page:Page;
    readonly searchFieldComponent:SearchField

    constructor(page: Page) {
        this.page = page;
        this.acceptPolicyButton = this.page.locator(this.acceptPolicyButtonSelector)
        this.searchFieldComponent = new SearchField(page)
    }

    async visit() {
        console.log("Visiting '%s'", this.host)
        await this.page.goto(this.host);
        if (!process.env.CI) {
            await this.acceptDefaultPrivacyPolicySettings()
            await this.assertPrivacyPolicyModalDisappear()
        }
    }

    async acceptDefaultPrivacyPolicySettings() {
        console.log("Accepting default settings for privacy policy")
        await this.acceptPolicyButton.click()
    }

    async updatePrivacyPolicySettings() {
        console.log("Updating privacy policy settings")
        const updateSettingsButton = this.page.getByText(this.updateSettingsButtonText)
        await updateSettingsButton.click()
    }

   async assertPrivacyPolicyModalDisappear() {
        console.log("Verify privacy policy modal disappear")
        await expect(this.acceptPolicyButton).toBeHidden()
   }

    async searchFor(query: string) {
        console.log("Start searching for '%s'", query)
        await this.searchFieldComponent.searchFor(query)
    }

    async assertUpdatePrivacyPolicySettingsModalIsVisible() {
        console.log("Verify update privacy policy settings modal visibility")
        const privacySettingsModalHeading = this.page.getByRole('heading').getByText(this.privacyPolicySettingText)
        await expect(privacySettingsModalHeading).toBeVisible()
    }
}