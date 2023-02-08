import { User } from 'src/auth/domain/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('todo')
export class Todo {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column((type) => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
