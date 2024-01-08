import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class Base {
  // 主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  // 更新时间
  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;
}
