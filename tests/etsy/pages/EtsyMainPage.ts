import { Page } from "@playwright/test";

export class EtsyMainPage {
    acceptPolicyButtonSelector = "//button[@data-gdpr-single-choice-accept='true']"
    updateSettingsButtonText = 'Update settings'
    page:Page;

    constructor(page: Page) {
        this.page = page;
    }

    async acceptDefaultPrivacyPolicySettings() {
        const acceptPolicyButton = this.page.locator(this.acceptPolicyButtonSelector)
        await acceptPolicyButton.click()
    }

    async updatePrivacyPolicySettings() {
        const updateSettingsButton = this.page.getByText(this.updateSettingsButtonText)
        await updateSettingsButton.click()
    }

    async searchFor(query: string) {
        //TODO Implement me
    }
}