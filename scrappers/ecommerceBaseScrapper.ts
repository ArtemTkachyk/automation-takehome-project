import { Product } from "../types/product";

interface EcommerceBaseScrapper {
    getItemsWithLowestPriceBySearchTerm(searchTerm: string, count:number):Promise<Product[]>
}

export default EcommerceBaseScrapper