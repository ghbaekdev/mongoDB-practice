import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './application/dto/create-auth.dto';
import { User } from './domain/entity/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel('user') private authModel: Model<User>) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const isUserChecked = await this.authModel.findOne({ username });
    if (isUserChecked) {
      throw new ConflictException('이미 있는 유저네임이야');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.authModel.create({
      username,
      password: hashedPassword,
    });
  }
}
