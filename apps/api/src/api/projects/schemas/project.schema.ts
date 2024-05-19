import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  _id?: string;

  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  image: string;

  @Prop()
  price_per_ton: number;

  @Prop()
  offered_volume_in_tons: number;

  @Prop()
  distribution_weight: number;

  @Prop()
  supplier_name: string;

  @Prop({ type: Date })
  earliest_delivery: string;

  @Prop()
  description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
