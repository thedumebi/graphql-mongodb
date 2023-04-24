import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Lesson } from './lesson.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { v4 as uuid } from 'uuid'
import { CreateLessonInput } from './lesson.input'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOneBy({ id })
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find()
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { endDate, name, startDate, students } = createLessonInput
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students
    })

    return this.lessonRepository.save(lesson)
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[]
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId })
    const students = lesson.students || []
    lesson.students = [...students, ...studentIds]

    return this.lessonRepository.save(lesson)
  }
}
