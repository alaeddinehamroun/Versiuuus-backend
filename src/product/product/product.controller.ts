import { Controller, Get, Param } from '@nestjs/common';
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
}
