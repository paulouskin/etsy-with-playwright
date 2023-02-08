import { Page } from "@playwright/test";
import { FilterOption } from "../model/FilterOption";
import { EtsyMainPage } from "../pages/EtsyMainPage";
import { ValidSearchResultPage } from "../pages/ValidSearchResultPage";

export class ShopperActor {
    readonly page:Page
    readonly name:string
    readonly mainPage:EtsyMainPage
    readonly searchResultPage:ValidSearchResultPage

    constructor(name:string, page:Page) {
        this.name = name
        this.page = page
        this.mainPage = new EtsyMainPage(this.page)
        this.searchResultPage = new ValidSearchResultPage(this.page)
    }

    async startsWithShopping() {
        console.log("%s starts shopping", this.name)
        await this.mainPage.visit()
    }

    async searchFor(searchQuery:string) {
        console.log("%s searches for '%s'", this.name, searchQuery )
        await this.mainPage.searchFor(searchQuery)
        await this.searchResultPage.searchResultsListIsVisible()
    }

    async filtersSearchResultsBy(filterOptions:FilterOption[]) {
        console.log("%s filters search results by folowwing criterias:", this.name)
        filterOptions.forEach(o => console.log(">>>> '%s'", o.toString()))
        await this.searchResultPage.filterBy(filterOptions)
    }

    async verifyFilteredResultListFor(filterOptions:FilterOption[]) {
        await this.searchResultPage.containsFilteredResults(filterOptions)
    }

    async finishWithShopping() {
        console.log("%s finishes with today's shopping", this.name)
        await this.page.close()
    }
}