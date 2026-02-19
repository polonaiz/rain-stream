import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('robot')
@Index('IX_ROBOT_ID', ['id'], { unique: true })
export class Robot {
    @PrimaryGeneratedColumn('rowid')
    rowid: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: Date

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date
}
