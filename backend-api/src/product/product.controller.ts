import { Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CustomGuard } from '../customGuard/auth.guard';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}


@ApiHeader({
  name: 'x-access-token',
  description: 'Auth token',
})
@Get()
@SetMetadata('roles','admin')
@UseGuards(CustomGuard)
  fetchAllProducts() {
    return this.productService.fetchAllProducts();
  }

}
