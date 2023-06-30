import { Product } from "../types/product";
import { BASE_URL } from "../scrappers/amazonScrapperOptions";

export default async function filterAndSortProducts(
  searchResult: Product[],
  searchTerm: string,
  count: number,
) {
  const products = searchResult.filter(
    (product) => product.price && product.name,
  );

  products.forEach((product) => {
    product.searchTerm = searchTerm;
    product.link = `${BASE_URL}${product.link}`;
  });

  return products.sort((a, b) => a.price - b.price).slice(0, count);
}
