import { AuthCredentialsDto } from './../dto/create-auth.dto';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { UserDocument } from 'src/auth/domain/entity/user.schema';
// import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { AuthRepository } from 'src/auth/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/auth/domain/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel('user')
    // private authModel: Model<UserDocument>,
    // private authRepository: AuthRepository,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async signUp(userCredentialsDto: AuthCredentialsDto) {
    const { username, password } = userCredentialsDto;

    const userChecked = await this.userRepository.findOneBy({ username });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    if (userChecked) {
      throw new ConflictException('아이디 중복');
    }
    const result = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    await this.userRepository.save(result);
  }

  async signIn(
    userCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = userCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
