import { Field, ID, InputType } from '@nestjs/graphql'
import { ArrayMinSize, IsUUID, MinLength } from 'class-validator'

@InputType()
export class AssignStudentsToLessonInput {
  @MinLength(1)
  @IsUUID()
  @Field((type) => ID)
  lessonId: string

  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  @MinLength(1, { each: true })
  @Field((type) => [ID])
  studentIds: string[]
}
