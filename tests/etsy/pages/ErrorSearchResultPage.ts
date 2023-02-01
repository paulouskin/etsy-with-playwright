import { expect, Page } from "@playwright/test";

export class ErrorSearchResultPage {

    readonly page:Page
    readonly errorMessageHeaderText:string = "We couldn't find any results for " 

    constructor(page:Page) {
        this.page = page
    }

    async isVisibleForQuery(query:string) {
        const errorMessageHeader = this.page.getByText(this.errorMessageHeaderText + query)
        await expect(errorMessageHeader).toBeVisible()
    }


}