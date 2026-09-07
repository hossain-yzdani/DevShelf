import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  async getDashboardData(@Query('days') days: string = '30') {
    const daysNumber = parseInt(days, 10);
    return await this.analyticsService.getDashboardData(daysNumber);
  }

  @Get('stats')
  async getStats(@Query('days') days: string = '30') {
    const daysNumber = parseInt(days, 10);
    return await this.analyticsService.getStats(daysNumber);
  }

  @Get('charts')
  async getChartData(@Query('days') days: string = '30') {
    const daysNumber = parseInt(days, 10);
    return await this.analyticsService.getChartData(daysNumber);
  }

  @Get('recent-activities')
  async getRecentActivities(
    @Query('days') days: string = '30',
    @Query('limit') limit: string = '10',
  ) {
    return await this.analyticsService.getRecentActivities(
      parseInt(days, 10),
      parseInt(limit, 10),
    );
  }

  @Get('popular-resources')
  async getPopularResources(
    @Query('days') days: string = '30',
    @Query('limit') limit: string = '10',
  ) {
    return await this.analyticsService.getPopularResources(
      parseInt(days, 10),
      parseInt(limit, 10),
    );
  }
}
