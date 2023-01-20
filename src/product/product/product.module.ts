import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { Product, ProductSchema } from 'src/schemas/product.schema';
import { Pc, PcSchema } from 'src/schemas/pc.schema';
import { Phone, PhoneSchema } from 'src/schemas/phone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }]),
    MongooseModule.forFeature([{ name: Pc.name, schema: PcSchema }]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
