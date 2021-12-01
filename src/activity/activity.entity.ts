import {
  JoinColumn,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  BeforeUpdate,
} from 'typeorm';
import { Location } from '../location/location.entity';


@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  start_date: Date

  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  updatedAt: Date

  @BeforeUpdate()
  updateTimestamp(){
    this.updatedAt= new Date()
  }

  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  end_date:Date

  @Column({unique:true})
  name:string

  @Column()
  description:string

  @ManyToOne(type=>Location,location=>location.activities,{eager:true})
  @JoinColumn()
  location:Location
}