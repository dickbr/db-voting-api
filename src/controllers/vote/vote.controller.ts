import {
 Controller,
 Post,
 Body,
} from '@nestjs/common';
import { CreateVote } from 'core/use-cases/vote/create-vote/create-vote.use-case';
import { CreateVoteRequest } from 'dtos';

@Controller('votes')
export class VoteController {
 constructor(private readonly createVote: CreateVote) {}

 @Post()
 create(@Body() body: CreateVoteRequest) {
    return this.createVote.execute(body);
 }
}