import { Controller, Get, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('all')
  async getAll() {
    return this.productService.getAllProducts();
  }

  // @Get('pcs')
  // async getPcs() {
  //   return this.productService.getAllPcs();
  // }

  @Get(':category')
  async getProductsByCategory(@Param('category') category: string) {
    return this.productService.getProductsByCategory(category);
  }

  @Get(':category/:id')
  async getPcById(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return this.productService.getProductById(category, id);
  }

  @Get()
  async search(@Query('search') search: string) {
    return this.productService.search(search);
  }
}
