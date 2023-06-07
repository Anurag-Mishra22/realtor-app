import { Body, Controller,Param,ParseEnumPipe,Post,UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from "bcryptjs";

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService:AuthService){}

    @Post('/signup/:userType')
    async signup(
        @Body() body:SignupDto,
        @Param('userType',new ParseEnumPipe(UserType)) userType: UserType
    ){
        if(userType !== UserType.BUYER){
            if(!body.productkey){
                throw new UnauthorizedException()
            }

            const validProductkey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

            const isValidProductkey = await bcrypt.compare(validProductkey,body.productkey)

            if(!isValidProductkey){
                throw new UnauthorizedException()
            }
        }

        return this.authService.signup(body,userType);
    }

    @Post("/signin")
  signin(@Body() body:SigninDto){
    return this.authService.signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() {userType,email}:GenerateProductKeyDto) {
    return this.authService.generateProductKey(email,userType)
  }
}
