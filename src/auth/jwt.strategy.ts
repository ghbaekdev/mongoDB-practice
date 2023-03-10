import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from './domain/entity/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

//인젝터블 쓰는 이유는 다른곳에서도 사용하기 위해ㅓㅅ
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectModel('user') private authModel: Model<UserDocument>
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {
    // jwtmodule 생성할때의 옵션 그대로 넣어줘야함
    super({
      secretOrKey: '1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 헤더의 bearer토큰에 있는 토큰을 가져와서 시크릿키와 함께 비교.
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
