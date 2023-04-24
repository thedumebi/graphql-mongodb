import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { LessonModule } from './lesson/lesson.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from './lesson/lesson.entity'
import { StudentsModule } from './student/student.module'
import { Student } from './student/student.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    LessonModule,
    StudentsModule
  ]
})
export class AppModule {}
