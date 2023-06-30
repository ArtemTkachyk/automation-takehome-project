import { chromium } from "playwright";
import "dotenv/config";
import { Product } from "../types/product";

const searchFunction = (nodes: HTMLElement[]) =>
  nodes.map((node) => ({
    name: node.querySelector("h2 span")?.textContent!,
    price: Number(
      node.querySelector(".a-offscreen")?.textContent?.replace("$", ""),
    ),
    searchTerm: "",
    link: node.querySelector(".a-link-normal")?.getAttribute("href")!,
  }));

export async function lowestsPricesScraper(
  url: string,
  searchTerm: string,
): Promise<Product[]> {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await page.type("#twotabsearchtextbox", searchTerm);
  await page.press("#twotabsearchtextbox", "Enter");

  const urlPage = await page.url();

  await page.waitForSelector(".s-result-item");

  await page.goto(urlPage.replace("&", "&s=price-asc-rank&"));

  await page.waitForSelector(".s-result-item");

  const searchResult = await page.$$eval(".s-result-item", searchFunction);

  await browser.close();

  const products = searchResult.filter(
    (product) => product.price && product.name,
  );
  products.forEach((product) => {
    product.searchTerm = searchTerm;
    product.link = `${url}${product.link}`;
  });

  return products.sort((a, b) => a.price - b.price).slice(0, 3);
}
