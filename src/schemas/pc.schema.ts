import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PcDocument = HydratedDocument<Pc>;

@Schema()
export class Pc {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  image: string;
}

export const PcSchema = SchemaFactory.createForClass(Pc);
