import { createObjectCsvWriter } from "csv-writer";
import { Product } from "../types/product";
import BaseOutput from "./baseOutputs";

const COLUMNS = [
  { id: "name", title: "PRODUCT" },
  { id: "price", title: "PRICE" },
  { id: "searchTerm", title: "SEARCH TERM" },
  { id: "link", title: "LINK" },
];

class CsvOutput implements BaseOutput {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async saveData(data: Product[]): Promise<void> {
    const csvWriter = createObjectCsvWriter({
      path: this.path,
      header: COLUMNS,
    });
    return csvWriter.writeRecords(data);
  }
}

export default CsvOutput;
