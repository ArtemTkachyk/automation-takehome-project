import { createObjectCsvWriter } from "csv-writer";
import "dotenv/config";
import { Product } from "../types/product";

export async function writeProductsToCSV(products: Product[], path: string) {
  console.log(path);
  const csvWriter = createObjectCsvWriter({
    path,
    header: [
      { id: "name", title: "PRODUCT" },
      { id: "price", title: "PRICE" },
      { id: "searchTerm", title: "SEARCH TERM" },
      { id: "link", title: "LINK" },
    ],
  });

  await csvWriter.writeRecords(products);
}
