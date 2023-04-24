import { Module } from '@nestjs/common'
import { LessonResolver } from './lesson.resolver'
import { LessonService } from './lesson.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from './lesson.entity'
import { StudentsModule } from 'src/student/student.module'

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), StudentsModule],
  providers: [LessonResolver, LessonService]
})
export class LessonModule {}
