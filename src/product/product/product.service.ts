import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pc, PcDocument } from 'src/schemas/pc.schema';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    @InjectModel(Pc.name) private PcModel: Model<PcDocument>,
  ) {}

  async getAllProducts() {
    // to change
    return this.PcModel.find();
  }

  async getAllPcs() {
    return this.PcModel.find();
  }

  async getProductById(category: string, id: string) {
    return this.PcModel.findById(id);
  }

  async getProductsByCategory(category: string) {
    if (category === 'pcs') {
      return this.PcModel.find();
    }
  }
}
