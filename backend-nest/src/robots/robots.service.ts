import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './entities/robot.entity';

@Injectable()
export class RobotsService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>
  ) { }

  async create(createRobotDto: CreateRobotDto): Promise<Robot> {
    return await this.robotRepository.save(createRobotDto);
  }

  async findAll(): Promise<Robot[]> {
    return await this.robotRepository.find();
  }

  async findOne(id: string) {
    return await this.robotRepository.findOneBy({ id });
  }

  async update(id: string, updateRobotDto: UpdateRobotDto) {
    return await this.robotRepository.update({ id }, updateRobotDto)
  }

  async remove(id: string) {
    return await this.robotRepository.delete({ id });
  }
}
