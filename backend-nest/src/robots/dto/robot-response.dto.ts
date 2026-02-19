import { Robot } from "../entities/robot.entity";

export interface RobotResponseDto {
    id: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
}

export namespace RobotResponseDto {
    export function fromRobot(robot: Robot): RobotResponseDto {
        return {
            id: robot.id,
            name: robot.name,
            updatedAt: robot.updatedAt,
            createdAt: robot.createdAt,
        }
    }
}