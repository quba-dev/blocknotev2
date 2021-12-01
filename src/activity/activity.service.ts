import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Location } from '../location/location.entity';
import {LocationService} from "../location/location.service";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private locationService: LocationService,
    ) {
  }

  async createActivity(@Body('dto') currentLocation: Location, dto: CreateActivityDto) {
    const {location, day} = dto
    await this.locationService.findLocationByTime(location, day)
    const activity = new Activity()
    Object.assign(activity, dto)
    return await this.activityRepository.save(activity)
  }

  async deleteActivity(id: number) {
    const activity = await this.activityRepository.findOne(id)
    if (!activity) {
      throw new HttpException('activity does not exist', HttpStatus.NOT_FOUND)
    }
    return await this.activityRepository.delete({ id })

  }

  async updateActivity(id: number, dto: CreateActivityDto) {
    const activity = await this.activityRepository.findOne(id)
    if (!activity) {
      throw new HttpException('activity does not exist', HttpStatus.NOT_FOUND)
    }
    Object.assign(activity, dto)
    return await this.activityRepository.save(activity)


  }


}
