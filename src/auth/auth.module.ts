import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from './domain/entity/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { User } from './domain/entity/user.entity';
import { MongoRepository } from 'typeorm';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    JwtModule.register({
      secret: '1234',
      signOptions: {
        expiresIn: 60 * 60 * 60,
      },
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy, MongoRepository],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
