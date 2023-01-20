import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pc, PcDocument } from 'src/schemas/pc.schema';
import { Phone, PhoneDocument } from 'src/schemas/phone.schema';
// import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Phone.name) private PhoneModel: Model<PhoneDocument>,
    @InjectModel(Pc.name) private PcModel: Model<PcDocument>,
  ) {}

  // async getAllProducts() {
  //   // to change
  //   return this.PcModel.find();
  // }

  // async getAllPcs() {
  //   return this.PcModel.find();
  // }

  async getProductById(category: string, id: string) {
    if (category === 'pcs') {
      try {
        return this.PcModel.findById(id);
      } catch (error) {
        throw new HttpException(
          'Product does not exists',
          HttpStatus.NOT_FOUND,
        );
      }
    } else if (category === 'phones') {
      return this.PhoneModel.findById(id);
    } else
      throw new HttpException('Category does not exists', HttpStatus.NOT_FOUND);
  }

  async getProductsByCategory(category: string) {
    if (category === 'pcs') {
      return this.PcModel.find();
    }
    if (category === 'phones') {
      return this.PhoneModel.find();
    }
  }
  async search(search: string) {
    const pds = this.PcModel.find({
      name: { $regex: '.*' + search + '.*', $options: 'i' },
    })
      .select('name _id category')
      .limit(5);
    const phs = this.PhoneModel.find({
      name: { $regex: '.*' + search + '.*', $options: 'i' },
    })
      .select('name _id category')
      .limit(5);
    return (await pds).concat(await phs);
  }
}
