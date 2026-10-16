// src/database/seeds/settings.seed.ts
import { DataSource } from 'typeorm';
import {
  Setting,
  SettingType,
  SettingGroup,
} from '../../modules/settings/entities/setting.entity';

export async function seedSettings(dataSource: DataSource) {
  const settingRepo = dataSource.getRepository(Setting);

  const defaultSettings = [
    // ═══════════════════════════════════════
    // GENERAL
    // ═══════════════════════════════════════
    {
      key: 'site_title',
      name: 'Site Title',
      description: 'The main title shown in the browser tab',
      type: SettingType.TEXT,
      group: SettingGroup.GENERAL,
      value: 'DevShelf',
      defaultValue: 'DevShelf',
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
      value: 'Programming resources library',
      defaultValue: 'Programming resources library',
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

    // ═══════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════
    {
      key: 'seo_keywords',
      name: 'SEO Keywords',
      description: 'Comma-separated keywords for SEO',
      type: SettingType.TEXT,
      group: SettingGroup.SEO,
      value: 'programming, books, resources, devshelf',
      defaultValue: 'programming, books, resources, devshelf',
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'google_analytics_id',
      name: 'Google Analytics ID',
      description: 'Your Google Analytics tracking ID (e.g. G-XXXXXXXXXX)',
      type: SettingType.TEXT,
      group: SettingGroup.SEO,
      value: '',
      defaultValue: '',
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },

    // ═══════════════════════════════════════
    // SOCIAL
    // ═══════════════════════════════════════
    {
      key: 'social_links',
      name: 'Social Links',
      description: 'Links to social media profiles',
      type: SettingType.JSON,
      group: SettingGroup.SOCIAL,
      value: {
        instagram: 'https://instagram.com/devshelf',
        telegram: 'https://t.me/devshelf',
        linkedin: 'https://linkedin.com/company/devshelf',
        github: 'https://github.com/devshelf',
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

    // ═══════════════════════════════════════
    // CONTACT
    // ═══════════════════════════════════════
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
      value: 'info@devshelf.ir',
      defaultValue: 'info@devshelf.ir',
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

    // ═══════════════════════════════════════
    // APPEARANCE
    // ═══════════════════════════════════════
    {
      key: 'site_logo',
      name: 'Site Logo',
      description: 'Main site logo',
      type: SettingType.IMAGE,
      group: SettingGroup.APPEARANCE,
      value: '/logo/devshelf-logo.png',
      defaultValue: '/logo/devshelf-logo.png',
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'primary_color',
      name: 'Primary Color',
      description: 'Main theme color (hex code)',
      type: SettingType.COLOR,
      group: SettingGroup.APPEARANCE,
      value: '#8b5cf6',
      defaultValue: '#8b5cf6',
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },
    {
      key: 'theme',
      name: 'Theme',
      description: 'Site theme mode',
      type: SettingType.TEXT,
      group: SettingGroup.APPEARANCE,
      value: 'dark',
      defaultValue: 'dark',
      isEditable: true,
      isVisible: true,
      sortOrder: 3,
    },
    {
      key: 'font',
      name: 'Font',
      description: 'Site font family',
      type: SettingType.TEXT,
      group: SettingGroup.APPEARANCE,
      value: 'inter',
      defaultValue: 'inter',
      isEditable: true,
      isVisible: true,
      sortOrder: 4,
    },

    // ═══════════════════════════════════════
    // NOTIFICATION
    // ═══════════════════════════════════════
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

    // ═══════════════════════════════════════
    // RESOURCES
    // ═══════════════════════════════════════
    {
      key: 'items_per_page',
      name: 'Items Per Page',
      description: 'Number of items to show per page',
      type: SettingType.NUMBER,
      group: SettingGroup.RESOURCES,
      value: 20,
      defaultValue: 20,
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'show_descriptions',
      name: 'Show Descriptions',
      description: 'Show full descriptions in resource list',
      type: SettingType.BOOLEAN,
      group: SettingGroup.RESOURCES,
      value: true,
      defaultValue: true,
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },
    {
      key: 'allow_downloads',
      name: 'Allow Downloads',
      description: 'Allow users to download resources',
      type: SettingType.BOOLEAN,
      group: SettingGroup.RESOURCES,
      value: true,
      defaultValue: true,
      isEditable: true,
      isVisible: true,
      sortOrder: 3,
    },
    {
      key: 'allow_favorites',
      name: 'Allow Favorites',
      description: 'Allow users to save resources to favorites',
      type: SettingType.BOOLEAN,
      group: SettingGroup.RESOURCES,
      value: true,
      defaultValue: true,
      isEditable: true,
      isVisible: true,
      sortOrder: 4,
    },

    // ═══════════════════════════════════════
    // USERS
    // ═══════════════════════════════════════
    {
      key: 'default_role',
      name: 'Default User Role',
      description: 'Role assigned to new users',
      type: SettingType.TEXT,
      group: SettingGroup.USERS,
      value: 'user',
      defaultValue: 'user',
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'session_timeout',
      name: 'Session Timeout',
      description: 'Session timeout in hours',
      type: SettingType.NUMBER,
      group: SettingGroup.USERS,
      value: 24,
      defaultValue: 24,
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },
    {
      key: 'allow_registration',
      name: 'Allow Registration',
      description: 'Allow new users to register',
      type: SettingType.BOOLEAN,
      group: SettingGroup.USERS,
      value: true,
      defaultValue: true,
      isEditable: true,
      isVisible: true,
      sortOrder: 3,
    },
    {
      key: 'two_factor_auth',
      name: 'Two Factor Authentication',
      description: 'Enable 2FA for admin accounts',
      type: SettingType.BOOLEAN,
      group: SettingGroup.USERS,
      value: false,
      defaultValue: false,
      isEditable: true,
      isVisible: true,
      sortOrder: 4,
    },

    // ═══════════════════════════════════════
    // SECURITY
    // ═══════════════════════════════════════
    {
      key: 'allowed_ips',
      name: 'Allowed IPs',
      description: 'Comma-separated list of allowed IP addresses',
      type: SettingType.TEXT,
      group: SettingGroup.SECURITY,
      value: '',
      defaultValue: '',
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'audit_log',
      name: 'Audit Log',
      description: 'Log all user activities',
      type: SettingType.BOOLEAN,
      group: SettingGroup.SECURITY,
      value: true,
      defaultValue: true,
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },
    {
      key: 'auto_backup',
      name: 'Auto Backup',
      description: 'Daily automatic database backup',
      type: SettingType.BOOLEAN,
      group: SettingGroup.SECURITY,
      value: true,
      defaultValue: true,
      isEditable: true,
      isVisible: true,
      sortOrder: 3,
    },

    // ═══════════════════════════════════════
    // EMAIL
    // ═══════════════════════════════════════
    {
      key: 'smtp_host',
      name: 'SMTP Host',
      description: 'SMTP server host',
      type: SettingType.TEXT,
      group: SettingGroup.EMAIL,
      value: 'smtp.gmail.com',
      defaultValue: 'smtp.gmail.com',
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'smtp_port',
      name: 'SMTP Port',
      description: 'SMTP server port',
      type: SettingType.NUMBER,
      group: SettingGroup.EMAIL,
      value: 587,
      defaultValue: 587,
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },
    {
      key: 'smtp_username',
      name: 'SMTP Username',
      description: 'SMTP authentication username',
      type: SettingType.TEXT,
      group: SettingGroup.EMAIL,
      value: '',
      defaultValue: '',
      isEditable: true,
      isVisible: true,
      sortOrder: 3,
    },
    {
      key: 'smtp_password',
      name: 'SMTP Password',
      description: 'SMTP authentication password',
      type: SettingType.TEXT,
      group: SettingGroup.EMAIL,
      value: '',
      defaultValue: '',
      isEditable: true,
      isVisible: true,
      sortOrder: 4,
    },
    {
      key: 'from_email',
      name: 'From Email',
      description: 'Sender email address',
      type: SettingType.TEXT,
      group: SettingGroup.EMAIL,
      value: 'noreply@devshelf.ir',
      defaultValue: 'noreply@devshelf.ir',
      isEditable: true,
      isVisible: true,
      sortOrder: 5,
    },
    {
      key: 'from_name',
      name: 'From Name',
      description: 'Sender display name',
      type: SettingType.TEXT,
      group: SettingGroup.EMAIL,
      value: 'DevShelf',
      defaultValue: 'DevShelf',
      isEditable: true,
      isVisible: true,
      sortOrder: 6,
    },

    // ═══════════════════════════════════════
    // ADVANCED
    // ═══════════════════════════════════════
    {
      key: 'header_code',
      name: 'Header Code',
      description: 'Custom code injected into site header',
      type: SettingType.TEXT,
      group: SettingGroup.ADVANCED,
      value: '',
      defaultValue: '',
      isEditable: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      key: 'footer_code',
      name: 'Footer Code',
      description: 'Custom code injected into site footer',
      type: SettingType.TEXT,
      group: SettingGroup.ADVANCED,
      value: '',
      defaultValue: '',
      isEditable: true,
      isVisible: true,
      sortOrder: 2,
    },
  ];

  let seededCount = 0;
  let skippedCount = 0;

  for (const settingData of defaultSettings) {
    const exists = await settingRepo.findOne({
      where: { key: settingData.key },
    });

    if (!exists) {
      await settingRepo.save(settingRepo.create(settingData));
      console.log(`✅ Seeded: ${settingData.key}`);
      seededCount++;
    } else {
      console.log(`⏭️  Already exists: ${settingData.key}`);
      skippedCount++;
    }
  }

  console.log(
    `\n🎉 Settings seeding completed! (${seededCount} seeded, ${skippedCount} skipped)`,
  );
}
