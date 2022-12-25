import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { SignInCustomerDto } from './dto/signin-customer-dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService){}


    @Get('')
    getCustomers(): Promise<Customer[]> {
        return this.customersService.getCustomers();
    }

    @Get('/homePage/:id')
    getHomePage(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.getHomePage(id);
    }

    @Post('/addCustomer')
    @UsePipes(ValidationPipe)
    addCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customersService.addCustomer(createCustomerDto);
    }

    @Post('/signin')
    signIn(@Body() signInCustomerDto: SignInCustomerDto): Promise<Customer> {
        return this.customersService.signIn(signInCustomerDto);
    }

    @Get('/:id')
    getCustomerById(@Param('id', ParseIntPipe) id: number){
        return this.customersService.getCustomerById(id);
    }

    @Get('/getCustomerByPhone/:phone')
    getCustomerByPhone(@Param('phone') phone: string): Promise<Customer> {
        return this.customersService.getCustomerByPhone(phone);
    }

    @Get('getCustomerReviews/:id')
    getCustomerReviews(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.getCustomerReviews(id);
    }

    @Get('/getCustomerInterests/:id')
    getCustomerInterests(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.getCustomerInterests(id);
    }
}
