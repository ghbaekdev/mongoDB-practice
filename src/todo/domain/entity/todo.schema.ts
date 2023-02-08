import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Todo {
  @Prop()
  name: string;

  //   @Prop()
  //   todoId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
