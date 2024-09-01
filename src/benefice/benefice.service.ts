import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Course } from '../entities/Course';
import { Achat } from '../entities/Achat';
import { Vente } from '../entities/Vente';

@Injectable()
export class BeneficeService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(Achat)
    private readonly achatRepository: EntityRepository<Achat>,
    @InjectRepository(Vente)
    private readonly venteRepository: EntityRepository<Vente>
  ) {}

  async calculerBeneficeAllCourse() {
    const courses = await this.courseRepository.findAll();
    const coursesPromises = courses.map(
      async (e) => await this.calculerBeneficeCourse(e.id)
    );
    return Promise.all(coursesPromises);
  }

  async calculerBeneficeCourse(courseId: string) {
    const achats = await this.achatRepository.findAll({
      where: {
        course: courseId
      }
    });

    const achatVentes = [];
    for (const achat of achats) {
      const ventes = await this.venteRepository.findAll({
        where: {
          achat: achat
        }
      });
      const beneficeAchat = this.calculerBeneficeAchat(achat, ventes);
      achatVentes.push({
        achat: achat,
        benefice: beneficeAchat
      });
    }

    const beneficeTotal = achatVentes.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.benefice;
    }, 0);

    return {
      benefice: beneficeTotal,
      course: courseId
    };
  }

  calculerBeneficeAchat(achat: Achat, ventes: Vente[]) {
    const totalAchat = achat.prix * achat.stock;
    const totalVente = ventes.reduce((a, b) => a + b.prix * b.stock, 0);
    return totalVente - totalAchat;
  }
}
