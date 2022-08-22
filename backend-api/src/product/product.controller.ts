import { Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { CustomGuard } from '../customGuard/auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}


@Get()
@SetMetadata('roles','admin')
@UseGuards(CustomGuard)
  fetchAllProducts() {
    return this.productService.fetchAllProducts();
  }

}
