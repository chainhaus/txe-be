import { IsNotEmpty } from 'class-validator';
export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  date: string;
  start_time: string;
  end_time: string;
  location: string;
  enabled: boolean;
  private: boolean;
}
