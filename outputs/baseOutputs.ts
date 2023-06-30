import { Product } from "../types/product";

interface BaseOutput {
  saveData(data: Product[]): Promise<void>;
}

export default BaseOutput;
