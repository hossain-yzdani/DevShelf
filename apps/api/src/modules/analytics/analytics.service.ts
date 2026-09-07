import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Resource } from '../resources/entities/resource.entity';
import { User } from '../users/entities/user.entity';
import { Download } from '../downloads/entities/download.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Search } from '../searches/entities/search.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepo: Repository<Resource>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Download)
    private downloadRepo: Repository<Download>,
    @InjectRepository(Favorite)
    private favoriteRepo: Repository<Favorite>,
    @InjectRepository(Search)
    private searchRepo: Repository<Search>,
  ) {}

  /**
   * دریافت آمار کلی
   */
  async getStats(days: number) {
    const [totalResources, totalUsers, totalDownloads, totalFavorites] =
      await Promise.all([
        this.resourceRepo.count(),
        this.userRepo.count(),
        this.downloadRepo.count(),
        this.favoriteRepo.count(),
      ]);

    const growth = await this.getGrowth(days);

    return {
      totalResources,
      totalUsers,
      totalDownloads,
      totalFavorites,
      growth,
    };
  }

  /**
   * دریافت داده‌های چارت‌ها (دانلود، رشد کاربران، دسته‌بندی‌ها)
   */
  async getChartData(days: number) {
    // محاسبه تاریخ شروع
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // داده‌های دانلودها
    const downloadsData = await this.downloadRepo
      .createQueryBuilder('download')
      .select("DATE_TRUNC('day', download.downloadedAt) as date")
      .addSelect('COUNT(*) as count')
      .where('download.downloadedAt >= :startDate', { startDate })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    // داده‌های رشد کاربران
    const userGrowthData = await this.userRepo
      .createQueryBuilder('user')
      .select("DATE_TRUNC('day', user.createdAt) as date")
      .addSelect('COUNT(*) as count')
      .where('user.createdAt >= :startDate', { startDate })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    // داده‌های دسته‌بندی‌ها
    const categoryData = await this.resourceRepo
      .createQueryBuilder('resource')
      .leftJoin('resource.category', 'category')
      .select('category.name as category')
      .addSelect('COUNT(*) as count')
      .where('resource.createdAt >= :startDate', { startDate })
      .groupBy('category.name')
      .orderBy('count', 'DESC')
      .getRawMany();

    return {
      downloads: downloadsData,
      userGrowth: userGrowthData,
      categories: categoryData,
    };
  }

  /**
   * دریافت فعالیت‌های اخیر (دانلود، علاقه‌مندی، جستجو)
   */
  async getRecentActivities(days: number, limit: number = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // 1. دریافت دانلودهای اخیر
    const downloads = await this.downloadRepo
      .createQueryBuilder('download')
      .leftJoin('download.user', 'user')
      .leftJoin('download.resource', 'resource')
      .select([
        'download.id as id',
        "'download' as type",
        'user.username as user',
        'resource.name as resource',
        'download.downloadedAt as time',
      ])
      .where('download.downloadedAt >= :startDate', { startDate })
      .orderBy('download.downloadedAt', 'DESC')
      .limit(limit)
      .getRawMany();

    // 2. دریافت علاقه‌مندی‌های اخیر
    const favorites = await this.favoriteRepo
      .createQueryBuilder('favorite')
      .leftJoin('favorite.user', 'user')
      .leftJoin('favorite.resource', 'resource')
      .select([
        'favorite.id as id',
        "'favorite' as type",
        'user.username as user',
        'resource.name as resource',
        'favorite.createdAt as time',
      ])
      .where('favorite.createdAt >= :startDate', { startDate })
      .orderBy('favorite.createdAt', 'DESC')
      .limit(limit)
      .getRawMany();

    // 3. دریافت جستجوهای اخیر
    const searches = await this.searchRepo
      .createQueryBuilder('search')
      .leftJoin('search.user', 'user')
      .select([
        'search.id as id',
        "'search' as type",
        'user.username as user',
        'search.query as resource',
        'search.searchedAt as time',
      ])
      .where('search.searchedAt >= :startDate', { startDate })
      .orderBy('search.searchedAt', 'DESC')
      .limit(limit)
      .getRawMany();

    // 4. ترکیب همه فعالیت‌ها
    const allActivities = [...downloads, ...favorites, ...searches];

    // 5. مرتب‌سازی بر اساس زمان (جدیدترین اول)
    allActivities.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });

    // 6. محدود کردن به تعداد مورد نظر و فرمت‌دهی زمان
    return allActivities.slice(0, limit).map((activity) => ({
      id: activity.id,
      type: activity.type,
      user: activity.user || 'کاربر ناشناس',
      resource: activity.resource || 'مورد نامشخص',
      time: this.formatTime(activity.time),
      timestamp: activity.time,
    }));
  }

  /**
   * دریافت منابع محبوب بر اساس تعداد دانلود
   */
  async getPopularResources(days: number, limit: number = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await this.resourceRepo
      .createQueryBuilder('resource')
      .leftJoin('resource.downloads', 'download')
      .leftJoin('resource.favorites', 'favorite')
      .select([
        'resource.id as id',
        'resource.name as name',
        'resource.author as author',
        'resource.slug as slug',
        'resource.type as type', // ✅ این درست است
        'COUNT(DISTINCT download.id) as downloads',
        'COUNT(DISTINCT favorite.id) as favorites',
      ])
      .where('download.downloadedAt >= :startDate', { startDate })
      .groupBy('resource.id')
      .orderBy('downloads', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * دریافت داده‌های داشبورد کامل (یکجا)
   */
  async getDashboardData(days: number) {
    const [stats, charts, recentActivities, popularResources] =
      await Promise.all([
        this.getStats(days),
        this.getChartData(days),
        this.getRecentActivities(days, 10),
        this.getPopularResources(days, 10),
      ]);

    return {
      stats,
      charts,
      recentActivities,
      popularResources,
    };
  }

  /**
   * محاسبه رشد در بازه‌های زمانی
   */
  private async getGrowth(days: number) {
    const now = new Date();
    const currentPeriodStart = new Date(now.getTime() - days * 86400000);
    const previousPeriodStart = new Date(now.getTime() - days * 2 * 86400000);

    const [prevDownloads, currentDownloads, prevUsers, currentUsers] =
      await Promise.all([
        this.downloadRepo.count({
          where: {
            downloadedAt: Between(previousPeriodStart, currentPeriodStart),
          },
        }),
        this.downloadRepo.count({
          where: {
            downloadedAt: Between(currentPeriodStart, now),
          },
        }),
        this.userRepo.count({
          where: {
            createdAt: Between(previousPeriodStart, currentPeriodStart),
          },
        }),
        this.userRepo.count({
          where: {
            createdAt: Between(currentPeriodStart, now),
          },
        }),
      ]);

    return {
      downloads: this.calculateGrowth(prevDownloads, currentDownloads),
      users: this.calculateGrowth(prevUsers, currentUsers),
    };
  }

  /**
   * محاسبه درصد رشد
   */
  private calculateGrowth(prev: number, current: number): number {
    if (prev === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - prev) / prev) * 100);
  }

  /**
   * فرمت‌دهی زمان به صورت "۵ دقیقه پیش"، "۲ ساعت پیش" و ...
   */
  private formatTime(timestamp: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(timestamp).getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} ثانیه پیش`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} دقیقه پیش`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ساعت پیش`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} روز پیش`;
    }

    return new Date(timestamp).toLocaleDateString('fa-IR');
  }
}
