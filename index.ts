import "dotenv/config";
import fs from "fs";
import { lowestsPricesScraper } from "./helpers/lowestsPricesScraper";
import { writeProductsToCSV } from "./helpers/writeProductsToCSV";

(async function () {
  const searchTerm = process.argv[2];
  fs.mkdirSync(process.env.OUTPUT_DIR!, { recursive: true });
  const products = await lowestsPricesScraper(
    process.env.BASE_URL!,
    searchTerm,
  );
  await writeProductsToCSV(
    products,
    `${process.env.OUTPUT_DIR}/${process.env.OUTPUT_FILE}`,
  );
})().catch(console.error);
