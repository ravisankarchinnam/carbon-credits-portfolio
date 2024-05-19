import { Injectable } from '@nestjs/common';
import { ProjectService } from '../projects/project.service';
import { GeneratePortfolioDto } from './dto/generate-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private projectService: ProjectService) {}

  async generatePortfolio(generatePortfolioDto: GeneratePortfolioDto) {
    const { volume } = generatePortfolioDto;
    const requestedVolume = +volume;
    const projects = await this.projectService.findAll();

    const canDistributeVolume = projects.every(
      (project) =>
        project.offered_volume_in_tons >=
        project.distribution_weight * requestedVolume,
    );

    /*
        if inventory is enough, then allocate the requested volume to each project
        based on its distribution weight
    */
    if (canDistributeVolume) {
      return projects.map((project) => ({
        ...project,
        allowed_volume_in_tons: project.distribution_weight * requestedVolume,
      }));
    } else {
      /*
        otherwise, then allocate the requested volume to each project
        according to the project having lowest inventory
    */
      const totalAllowedCredits = projects.reduce(
        (acc: number, project) =>
          Math.min(
            acc,
            project.offered_volume_in_tons / project.distribution_weight,
          ),
        Number.MAX_SAFE_INTEGER,
      );

      return projects.map((project) => ({
        ...project,
        allowed_volume_in_tons:
          totalAllowedCredits * project.distribution_weight,
      }));
    }
  }
}
