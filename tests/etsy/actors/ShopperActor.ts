import { Page } from "@playwright/test";
import { EtsyMainPage } from "../pages/EtsyMainPage";
import { ValidSearchResultPage } from "../pages/ValidSearchResultPage";

export class ShopperActor {
    readonly page:Page
    readonly mainPage:EtsyMainPage
    readonly searchResultPage:ValidSearchResultPage

    constructor(page:Page) {
        this.page = page
        this.mainPage = new EtsyMainPage(this.page)
        this.searchResultPage = new ValidSearchResultPage(this.page)
    }

    async startsWithShopping() {
        await this.mainPage.visit()
    }

    async searchFor(searchQuery:string) {
        await this.mainPage.searchFor(searchQuery)
        await this.searchResultPage.searchResultsListIsVisible()
    }

    async filtersSearchResultsBy(filterOptions:string[]) {
        await this.searchResultPage.filterBy(filterOptions)
    }

    async verifyFilteredResultListFor(filterOptions:string[]) {
        await this.searchResultPage.containsFilteredResults(filterOptions)
    }

    async finishWithShopping() {
        await this.page.close()
    }
}