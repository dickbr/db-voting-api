import { Topic } from '@database/postgres/entities/topic.entity';
import {
 Controller,
 Post,
 Body,
 Get,
 Query,
 Put,
 Param,
} from '@nestjs/common';
import { CreateTopic } from 'core/use-cases/topic/create-topic/create-topic.use-case';
import { ListTopic } from 'core/use-cases/topic/list-topic/list-topic.use-case';
import { UpdateTopic } from 'core/use-cases/topic/update-topic';
import { CreateTopicRequest } from 'dtos';
import { UpdateTopicRequest } from 'dtos/topic/update-topic.request';

@Controller('topics')
export class TopicController {
 constructor(
  private readonly createTopic: CreateTopic,
  private readonly updateTopic: UpdateTopic,
  private readonly listTopic: ListTopic
  
  ) {}

  @Post()
  create(@Body() body: CreateTopicRequest) {
      return this.createTopic.execute(body);
  }

  @Put(':id')
  update(
    @Body() body: UpdateTopicRequest,
    @Param('id') id: string
  ) {
      return this.updateTopic.execute({...body, id});
  }

  @Get()
  list(@Query("session_id") session_id: string): Promise<Topic[]> {
    return this.listTopic.execute(session_id);
 }
}