export class FilterOption {

    readonly category:string
    readonly option:string

    constructor(category:string, option:string) {
        this.category = category
        this.option = option
    }

    toString():string {
        return this.category + " : " + this.option
    }
}