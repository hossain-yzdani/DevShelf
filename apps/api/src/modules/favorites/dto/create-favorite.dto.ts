import { IsString } from "class-validator";

export class CreateFavoriteDto {
  @IsString()
  username!: string;

  @IsString()
  resourceSlug!: string;
}
