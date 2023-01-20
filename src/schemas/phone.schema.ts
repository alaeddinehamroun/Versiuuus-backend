import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhoneDocument = HydratedDocument<Phone>;

@Schema()
export class Phone {
  @Prop({ required: true })
  name: string;
  // @Prop({ required: true })
  // image: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
