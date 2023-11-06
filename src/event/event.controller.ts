import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const data = await this.eventService.create(createEventDto);
    return new EventEntity(data);
  }

  @Get()
  findAll(@Query() params: { private?: boolean }) {
    const query: { where?: object } = {};
    if (typeof params.private === 'string') {
      query.where = {
        private: params.private,
      };
    }
    return this.eventService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  @Put('disable/:id')
  disable(@Param('id') id: string) {
    return this.eventService.update(+id, { enabled: false });
  }

  @Put('enable/:id')
  enable(@Param('id') id: string) {
    return this.eventService.update(+id, { enabled: true });
  }
}
