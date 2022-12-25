import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { MembershipRepository } from 'src/memberships/membership.repository';
import { JwtStrategy } from './helpers/jwt.strategy';
import { MembershipUserController } from './membership-user.controller';
import { MembershipUserRepository } from './membership-user.repository';
import { MembershipUserService } from './membership-user.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([MembershipRepository, MembershipUserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [MembershipUserController],
  providers: [MembershipUserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class MembershipUserModule {}
