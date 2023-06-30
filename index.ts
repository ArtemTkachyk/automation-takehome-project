import "dotenv/config";
import fs from "fs";
import Runner from "./runner";
import AmazonScrapper from "./scrappers/amazonScrapper";
import {
  AMAZON_STRATEGY,
  COUNT_OF_ITEMS_TO_SEARCH,
  DEFAULT_STRATEGY,
} from "./common/constants";
import CsvOutput from "./outputs/csvOutput";

(async function () {
  if (!process.argv[2]) {
    return console.error(
      "\x1b[41m Run script with Search Parametrs as argument!\x1b[0m",
    );
  }
  const searchTerm = process.argv[2];
  const strategy = process.argv[3] || DEFAULT_STRATEGY;
  const countOfItems = +process.argv[4] || COUNT_OF_ITEMS_TO_SEARCH;

  let scrapper: Runner;

  switch (strategy) {
    case AMAZON_STRATEGY: {
      scrapper = new Runner(new AmazonScrapper());
      break;
    }
    default: {
      throw new Error("Scrapper not found!");
    }
  }

  fs.mkdirSync(process.env.OUTPUT_DIR!, { recursive: true });

  const products = await scrapper.getProductsWithLowestPrice(
    searchTerm,
    countOfItems,
  );

  const output = new CsvOutput(
    `${process.env.OUTPUT_DIR}/${searchTerm}_${Date.now()}.csv`,
  );
  await output.saveData(products);
})().catch(console.error);
