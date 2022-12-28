import {expect, Locator, Page} from '@playwright/test';

export class LieferandoMainPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly searchInput: Locator;
    readonly dropdownItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('find-restaurants-section-hero-heading-time-to-order');
        this.searchInput = page.getByTestId('location-panel-search-input-address-element');
        this.dropdownItem = page.getByTestId('location-panel-results-item-element');
    }

    async goto() {
        await this.page.goto('https://www.lieferando.de/en');
    }

    async getStarted() {
        await expect(this.pageTitle).toBeVisible();
    }

    async searchAddress(address: string) {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.type(address);
    }

    async selectFirstSuggestionFromDropdown() {
        await expect(this.dropdownItem).toBeVisible();
        await this.dropdownItem.first().click();
    }
}