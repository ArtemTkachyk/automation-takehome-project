import EcommerceBaseScrapper from "./scrappers/ecommerceBaseScrapper";

class Runner {
  private scrapper: EcommerceBaseScrapper;

  constructor(scrapper: EcommerceBaseScrapper) {
    this.scrapper = scrapper;
  }

  async getProductsWithLowestPrice(searchTerm: string, count: number) {
    const result = this.scrapper.getItemsWithLowestPriceBySearchTerm(
      searchTerm,
      count,
    );
    return result;
  }
}

export default Runner;
