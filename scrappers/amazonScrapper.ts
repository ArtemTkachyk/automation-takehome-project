import { Browser, Page } from "playwright";
import { chromium } from "playwright-extra";
import { Product } from "../types/product";
import EcommerceBaseScrapper from "./ecommerceBaseScrapper";
import {
  BASE_URL,
  LOWEST_PRICE_SORT_OPTION,
  RESULT_ITEM_CLASS,
  SEARCH_INBOX_ID,
  SUBMIT_COMMAND,
} from "./amazonScrapperOptions";
import filterAndSortProducts from "../helpers/filterAndSortProducts";

class AmazonScrapper implements EcommerceBaseScrapper {
  private async goToMainPage(
    browser: Browser,
    baseLink: string,
  ): Promise<Page> {
    const page = await browser.newPage();

    await page.goto(baseLink);

    return page;
  }

  private async navigateBySearchTerm(
    page: Page,
    searchTerm: string,
  ): Promise<void> {
    await page.type(SEARCH_INBOX_ID, searchTerm);

    await page.press(SEARCH_INBOX_ID, SUBMIT_COMMAND);
  }

  private async searchByLowestPrice(page: Page): Promise<void> {
    const urlPage = await page.url();

    await page.waitForSelector(RESULT_ITEM_CLASS);

    await page.goto(urlPage.replace("&", LOWEST_PRICE_SORT_OPTION));

    await page.waitForSelector(RESULT_ITEM_CLASS);
  }

  private getProductsFromPage(nodes: HTMLElement[]) {
    return nodes.map((node) => ({
      name: node.querySelector("h2 span")?.textContent!,
      price: Number(
        node.querySelector(".a-offscreen")?.textContent?.replace("$", ""),
      ),
      searchTerm: "",
      link: node.querySelector(".a-link-normal")?.getAttribute("href")!,
    }));
  }

  async getItemsWithLowestPriceBySearchTerm(
    searchTerm: string,
    count: number,
    baseLink?: string,
  ): Promise<Product[]> {
    const stealth = require("puppeteer-extra-plugin-stealth")();

    chromium.use(stealth);

    const browser = await chromium.launch({ headless: true });

    const page = await this.goToMainPage(browser, baseLink || BASE_URL);

    await this.navigateBySearchTerm(page, searchTerm);

    await this.searchByLowestPrice(page);

    const searchResult = await page.$$eval(
      RESULT_ITEM_CLASS,
      this.getProductsFromPage,
    );

    await browser.close();

    return filterAndSortProducts(searchResult, searchTerm, count);
  }
}

export default AmazonScrapper;
