import {expect, Locator, Page} from '@playwright/test';

export class LieferandoSearchResultsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly minimumOrderAmountFilterTenOrLess: Locator;
    readonly sidebarResultCounter: Locator;
    readonly categoryItalian: Locator;
    readonly cuisine: Locator;
    readonly restaurantListHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId("restaurant-list-header");
        this.sidebarResultCounter = page.getByTestId('sidebar-result-counter');
        this.categoryItalian = page.locator("div[aria-label='Select Italian category']");
        this.minimumOrderAmountFilterTenOrLess = page.getByTestId("radio").nth(1);
        this.cuisine = page.getByTestId("cuisine");
        this.restaurantListHeader = page.getByTestId("restaurant-list-header");
    }

    async filterByCategoryItalian() { // it should be generic and pass specific category
        await this.categoryItalian.click();
        await expect(this.page.url()).toContain("italian")
    }

    async verifyItemsAreFilteredWithMinAmount(minAmount: number) {
        var list = await this.page.$$('[data-qa="mov-indicator"] span[data-qa="text"] span')
        for (const element of list) {
            const value = await element.evaluate(node => node.textContent);
            expect(parseInt(value)).toBeLessThanOrEqual(minAmount)
        }
    }

    async verifyItemsAreFilteredWithCuisine(cuisine: string) {
        expect(this.restaurantListHeader).toContainText(cuisine)
    }
}