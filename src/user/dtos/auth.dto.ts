import { UserType } from "@prisma/client";
import {IsString,IsNotEmpty,IsEmail,MinLength,Matches,IsEnum, IsOptional} from "class-validator"



export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @Matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, {
        message:
          'phone must be a valid phone number',
      })
    phone:string;
    
    @IsEmail()
    email:string;
    
    @IsString()
    @MinLength(5)
    password:string;
     
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productkey?: string
}

export class SigninDto {
  @IsEmail()
  email:string;


  @IsString()
  password:string;
}


export class GenerateProductKeyDto {
    @IsEmail()
    email:string

    @IsEnum(UserType)
    userType:UserType

}



