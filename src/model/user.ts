import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, Min, MinLength } from 'class-validator';

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class User {
  
  @IsInt()
  @IsPositive()
  public id: number = 0;
  
  @IsString()
  @MinLength(2)
  public name: string = '';

  @IsNumber({
    maxDecimalPlaces: 1
  })
  @Min(18)
  @Max(120)
  @IsOptional()
  public age: number = 18;
}