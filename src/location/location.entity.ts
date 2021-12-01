import { JoinColumn, Column, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from '../activity/activity.entity';


@Entity()
export class Location{
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique:true})
  address:string

  @Column({default:true})
  isAvailable: boolean;

  @OneToMany(type=>Activity,activity=>activity.location)
  @JoinColumn()
  activities:Activity[]

}