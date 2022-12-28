import {test, expect} from '@playwright/test';
import {LieferandoMainPage} from "./pageObjects/lieferando-main-page";
import {LieferandoSearchResultsPage} from "./pageObjects/lieferando-search-results-page";

const address = "Carl-Spindler-Straße 13, 12555 Berlin"

test.use({extraHTTPHeaders: {}});
test('Verify restaurants are filtered as expected by selected option', async ({page}) => {
  const lieferandoMainPage = new LieferandoMainPage(page);
  await lieferandoMainPage.goto();
  await lieferandoMainPage.getStarted();
  await lieferandoMainPage.searchAddress(address);
  await lieferandoMainPage.selectFirstSuggestionFromDropdown();
  const lieferandoSearchPage = new LieferandoSearchResultsPage(page);
  await lieferandoSearchPage.minimumOrderAmountFilterTenOrLess.click();
  await expect(page.url()).toContain("minimumOrderValue=1000");
  await lieferandoSearchPage.verifyItemsAreFilteredWithMinAmount(10);
});

test('Verify restaurants are filtered with selected category', async ({page}) => {
  const lieferandoMainPage = new LieferandoMainPage(page);
  await lieferandoMainPage.goto();
  await lieferandoMainPage.getStarted();
  await lieferandoMainPage.searchAddress(address);
  await lieferandoMainPage.selectFirstSuggestionFromDropdown();
  const lieferandoSearchPage = new LieferandoSearchResultsPage(page);
  await lieferandoSearchPage.filterByCategoryItalian();
  await lieferandoSearchPage.verifyItemsAreFilteredWithCuisine("Italian")
  await expect(lieferandoSearchPage.cuisine.first()).toHaveText("Italian");
});