import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting, SettingType, SettingGroup } from '../modules/settings/entities/setting.entity';

@Injectable()
export class SettingsSeedService {
  private readonly logger = new Logger(SettingsSeedService.name);

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,
  ) {}

  async seed(): Promise<void> {
    const defaultSettings = this.getDefaultSettings();

    for (const settingData of defaultSettings) {
      const exists = await this.settingRepo.findOne({
        where: { key: settingData.key },
      });

      if (!exists) {
        await this.settingRepo.save(this.settingRepo.create(settingData));
        this.logger.log(`✅ Seeded: ${settingData.key}`);
      } else {
        this.logger.log(`⏭️  Already exists: ${settingData.key}`);
      }
    }

    this.logger.log('🎉 Settings seeding completed!');
  }

  private getDefaultSettings() {
    return [
      // ─── General ───
      {
        key: 'site_title',
        name: 'Site Title',
        description: 'The main title shown in the browser tab',
        type: SettingType.TEXT,
        group: SettingGroup.GENERAL,
        value: 'Qweb Agency',
        defaultValue: 'Qweb Agency',
        isEditable: true,
        isVisible: true,
        sortOrder: 1,
      },
      {
        key: 'site_description',
        name: 'Site Description',
        description: 'Meta description for SEO',
        type: SettingType.TEXT,
        group: SettingGroup.GENERAL,
        value: 'Digital Marketing Agency',
        defaultValue: 'Digital Marketing Agency',
        isEditable: true,
        isVisible: true,
        sortOrder: 2,
      },
      {
        key: 'maintenance_mode',
        name: 'Maintenance Mode',
        description: 'Enable to put the site in maintenance mode',
        type: SettingType.BOOLEAN,
        group: SettingGroup.GENERAL,
        value: false,
        defaultValue: false,
        isEditable: true,
        isVisible: true,
        sortOrder: 3,
      },

      // ─── SEO ───
      {
        key: 'seo_keywords',
        name: 'SEO Keywords',
        description: 'Comma-separated keywords for SEO',
        type: SettingType.TEXT,
        group: SettingGroup.SEO,
        value: 'seo, marketing, digital',
        defaultValue: 'seo, marketing, digital',
        isEditable: true,
        isVisible: true,
        sortOrder: 1,
      },
      {
        key: 'google_analytics_id',
        name: 'Google Analytics ID',
        description: 'Your Google Analytics tracking ID',
        type: SettingType.TEXT,
        group: SettingGroup.SEO,
        value: '',
        defaultValue: '',
        isEditable: true,
        isVisible: true,
        sortOrder: 2,
      },

      // ─── Social ───
      {
        key: 'social_links',
        name: 'Social Links',
        description: 'Links to social media profiles',
        type: SettingType.JSON,
        group: SettingGroup.SOCIAL,
        value: {
          instagram: 'https://instagram.com/qweb',
          telegram: 'https://t.me/qweb',
          linkedin: 'https://linkedin.com/company/qweb',
          github: 'https://github.com/Qweb-Agency',
        },
        defaultValue: {
          instagram: '',
          telegram: '',
          linkedin: '',
          github: '',
        },
        isEditable: true,
        isVisible: true,
        sortOrder: 1,
      },

      // ─── Contact ───
      {
        key: 'contact_phone',
        name: 'Contact Phone',
        description: 'Main contact phone number',
        type: SettingType.TEXT,
        group: SettingGroup.CONTACT,
        value: '021-12345678',
        defaultValue: '021-12345678',
        isEditable: true,
        isVisible: true,
        sortOrder: 1,
      },
      {
        key: 'contact_email',
        name: 'Contact Email',
        description: 'Main contact email address',
        type: SettingType.TEXT,
        group: SettingGroup.CONTACT,
        value: 'info@qweb.ir',
        defaultValue: 'info@qweb.ir',
        isEditable: true,
        isVisible: true,
        sortOrder: 2,
      },
      {
        key: 'contact_address',
        name: 'Contact Address',
        description: 'Physical address',
        type: SettingType.TEXT,
        group: SettingGroup.CONTACT,
        value: 'Isfahan, Iran',
        defaultValue: 'Isfahan, Iran',
        isEditable: true,
        isVisible: true,
        sortOrder: 3,
      },

      // ─── Appearance ───
      {
        key: 'site_logo',
        name: 'Site Logo',
        description: 'Main site logo',
        type: SettingType.IMAGE,
        group: SettingGroup.APPEARANCE,
        value: '/logo/qweb-logo.png',
        defaultValue: '/logo/qweb-logo.png',
        isEditable: true,
        isVisible: true,
        sortOrder: 1,
      },
      {
        key: 'primary_color',
        name: 'Primary Color',
        description: 'Main theme color',
        type: SettingType.COLOR,
        group: SettingGroup.APPEARANCE,
        value: '#5b21b6',
        defaultValue: '#5b21b6',
        isEditable: true,
        isVisible: true,
        sortOrder: 2,
      },

      // ─── Notification ───
      {
        key: 'email_notifications',
        name: 'Email Notifications',
        description: 'Enable email notifications for new orders',
        type: SettingType.BOOLEAN,
        group: SettingGroup.NOTIFICATION,
        value: true,
        defaultValue: true,
        isEditable: true,
        isVisible: true,
        sortOrder: 1,
      },
      {
        key: 'telegram_notifications',
        name: 'Telegram Notifications',
        description: 'Enable Telegram notifications for new orders',
        type: SettingType.BOOLEAN,
        group: SettingGroup.NOTIFICATION,
        value: true,
        defaultValue: true,
        isEditable: true,
        isVisible: true,
        sortOrder: 2,
      },
    ];
  }
}
