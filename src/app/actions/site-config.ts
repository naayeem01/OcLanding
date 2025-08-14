
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

const VideoSectionConfigSchema = z.object({
  isEnabled: z.boolean(),
  videoUrl: z.string().url().or(z.literal('')),
});

const SiteConfigSchema = z.object({
  videoSection: VideoSectionConfigSchema,
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type VideoSectionConfig = z.infer<typeof VideoSectionConfigSchema>;


async function getSiteConfigFromDb(): Promise<SiteConfig> {
  try {
    const result = await query("SELECT config_value FROM site_config WHERE config_key = 'videoSection'", []) as any[];

    if (result.length > 0) {
      return {
        videoSection: VideoSectionConfigSchema.parse(result[0].config_value)
      };
    }
  } catch (error) {
    console.error("Failed to parse site config from DB, returning default.", error);
  }

  // Default config if not found or error
  return {
    videoSection: {
      isEnabled: true,
      videoUrl: 'https://www.youtube.com/embed/6owddgXj2qg',
    },
  };
}

async function saveSiteConfigToDb(config: SiteConfig) {
  const videoConfigValue = JSON.stringify(config.videoSection);
  const upsertQuery = `
    INSERT INTO site_config (config_key, config_value) 
    VALUES ('videoSection', ?)
    ON DUPLICATE KEY UPDATE config_value = ?;
  `;
  await query(upsertQuery, [videoConfigValue, videoConfigValue]);
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return await getSiteConfigFromDb();
}

export async function updateVideoSectionConfig(config: VideoSectionConfig): Promise<{ success: boolean; error?: string }> {
  const validation = VideoSectioneConfigSchema.safeParse(config);
  if (!validation.success) {
    return { success: false, error: 'Invalid configuration provided.' };
  }

  try {
    const currentConfig = await getSiteConfigFromDb();
    currentConfig.videoSection = validation.data;
    await saveSiteConfigToDb(currentConfig);
    
    revalidatePath('/');
    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error updating video section config:', error);
    return { success: false, error: 'Failed to update configuration.' };
  }
}
