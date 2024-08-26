import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Course } from '../entities/Course';
import { Achat } from '../entities/Achat';

@Injectable()
export class BeneficeService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(Achat)
    private readonly achatRepository: EntityRepository<Achat>
  ) {}

  async calculerAllBenefice() {
    const courses = await this.courseRepository.findAll();
    const coursesPromises = courses.map(
      async (e) => await this.calculerBenefice(e.id)
    );
    return Promise.all(coursesPromises);
  }

  async calculerBenefice(courseId: string) {
    const achats = await this.achatRepository.find({
      course: courseId
    });

    return {
      benefice: 0,
      course: courseId,
      achats: achats
    };
  }
}
