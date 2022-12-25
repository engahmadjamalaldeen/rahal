import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMembershipUserDto } from './dto/create-membership-user-dto';
import { SignInMembershipUserDto } from './dto/signin-membership-user-dto';
import { MembershipUser } from './membership-user.entity';
import { MembershipUserService } from './membership-user.service';

@Controller('membershipUsers')
export class MembershipUserController {
    constructor(private membershipUserService: MembershipUserService){}


    @Get('')
    getCities(): Promise<MembershipUser[]> {
        return this.membershipUserService.getMembershipsUser();
    }

    @Post('/addUser')
    @UsePipes(ValidationPipe)
    addCity(@Body() createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser> {
        return this.membershipUserService.addMembershipUser(createMembershipUserDto);
    }

    @Post('/signin')
    signIn(@Body() signInMembershipUserDto: SignInMembershipUserDto): Promise<{accessToken: string}> {
        return this.membershipUserService.signIn(signInMembershipUserDto);
    }

    @Get('/:id')
    getCityById(@Param('id', ParseIntPipe) id: number): Promise<MembershipUser> {
        return this.membershipUserService.getMembershipUserById(id);
    }

    @Put('/:id')
    editMembershipById(@Param('id', ParseIntPipe) id: number, @Body() createMembershipUserDto: CreateMembershipUserDto): Promise<MembershipUser> {
        return this.membershipUserService.editMembershipUserById(id, createMembershipUserDto);
    }

    @Delete('/:id')
    deleteMembershipById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.membershipUserService.deleteMembershipUserById(id);
    }
}
