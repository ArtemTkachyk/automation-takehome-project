import { expect, test } from "@jest/globals";
import filterAndSortProducts from "../helpers/filterAndSortProducts";
import { data, result } from "./helpers.data";

test("filterAndSortProducts", async () => {
  const calc = await filterAndSortProducts(data, "taxi", 3);

  expect(calc).toEqual(result);
});
