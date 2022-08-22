import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

    async fetchAllProducts() {
        const products = ['product1', 'product2', 'product3', 'product4'];
        return products;
    }
}