import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { LessonType } from './lesson.type'
import { LessonService } from './lesson.service'
import { Lesson } from './lesson.entity'
import { CreateLessonInput } from './lesson.input'
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input'
import { StudentService } from '../student/student.service'
import { Student } from 'src/student/student.entity'

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id)
  }

  @Query((returns) => [LessonType])
  lessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons()
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput)
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLesson: AssignStudentsToLessonInput
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLesson
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students || [])
  }
}
