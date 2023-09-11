import { expect, test, jest } from "@jest/globals";
import AmazonScrapper from "../scrappers/amazonScrapper";
import { result } from "./scrappers.data";

test("fully check", async () => {
  const scrapper = new AmazonScrapper();

  const calc = await scrapper.getItemsWithLowestPriceBySearchTerm(
    "apple watch",
    3,
    "file://D:/Work/automation-takehome-project/tests/Amazon.html",
  );

  expect(calc).toEqual(result);
}, 20000);
