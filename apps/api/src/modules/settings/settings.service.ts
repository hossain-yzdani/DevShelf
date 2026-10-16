import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Setting } from "./entities/setting.entity";
import { Repository } from "typeorm";
import { UpdateSettingDto } from "./dto/update-setting.dto";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
  ) {}

  async findAll(): Promise<Record<string, Setting[]>> {
    const settings = await this.settingRepo.find({
      where: { isVisible: true },
      order: { group: 'ASC', sortOrder: 'ASC' },
    });

    return settings.reduce(
      (acc, setting) => {
        if (!acc[setting.group]) {
          acc[setting.group] = [];
        }
        acc[setting.group].push(setting);
        return acc;
      },
      {} as Record<string, Setting[]>,
    );
  }

  async findByKey(key: string): Promise<Setting> {
    const setting = await this.settingRepo.findOne({ where: { key } });

    if (!setting) {
      throw new NotFoundException(`Setting "${key}" not found`);
    }

    return setting;
  }

  async getValue<T = any>(key: string): Promise<T> {
    const setting = await this.findByKey(key);
    return setting.value as T;
  }

  async update(key: string, dto: UpdateSettingDto): Promise<Setting> {
    const setting = await this.findByKey(key);

    if (!setting.isEditable) {
      throw new BadRequestException(`Setting "${key}" is not editable`);
    }

    Object.assign(setting, dto);
    return this.settingRepo.save(setting);
  }

  async updateMany(settings: Array<{ key: string; value: any }>) {
    const updates = settings.map(async ({ key, value }) => {
      const setting = await this.findByKey(key);
      if (setting.isEditable) {
        setting.value = value;
        await this.settingRepo.save(setting);
      }
    });

    await Promise.all(updates);
    return { message: 'Settings updated successfully' };
  }
}
