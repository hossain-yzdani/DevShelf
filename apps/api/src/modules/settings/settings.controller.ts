import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SettingsSeedService } from 'src/seeds/settings.seed';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingsSeedService: SettingsSeedService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all settings (grouped)' })
  @UseGuards(AuthGuard)
  findAll() {
    return this.settingsService.findAll();
  }

  @Get('seed')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Seed default settings (admin only)' })
  async seed() {
    await this.settingsSeedService.seed();
    return { message: 'Settings seeded successfully' };
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get setting by key' })
  @UseGuards(AuthGuard)
  findOne(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  @Patch(':key')
  @ApiOperation({ summary: 'Update setting' })
  @UseGuards(AuthGuard)
  update(@Param('key') key: string, @Body() dto: UpdateSettingDto) {
    return this.settingsService.update(key, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update multiple settings' })
  @UseGuards(AuthGuard)
  updateMany(@Body() body: { settings: Array<{ key: string; value: any }> }) {
    return this.settingsService.updateMany(body.settings);
  }
}
