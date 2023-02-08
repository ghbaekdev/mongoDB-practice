import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;
}
