
'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const VideoSectionConfigSchema = z.object({
  isEnabled: z.boolean(),
  videoUrl: z.string().url().or(z.literal('')),
});

const SiteConfigSchema = z.object({
  videoSection: VideoSectionConfigSchema,
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type VideoSectionConfig = z.infer<typeof VideoSectionConfigSchema>;

const configFilePath = path.join(process.cwd(), 'data', 'site-config.json');

async function getSiteConfigFromFile(): Promise<SiteConfig> {
  try {
    await fs.access(configFilePath);
    const data = await fs.readFile(configFilePath, 'utf-8');
    return SiteConfigSchema.parse(JSON.parse(data));
  } catch (error) {
    // If the file doesn't exist or is invalid, return a default config
    return {
      videoSection: {
        isEnabled: false,
        videoUrl: '',
      },
    };
  }
}

async function saveSiteConfigToFile(config: SiteConfig) {
  await fs.writeFile(configFilePath, JSON.stringify(config, null, 2), 'utf-8');
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return await getSiteConfigFromFile();
}

export async function updateVideoSectionConfig(config: VideoSectionConfig): Promise<{ success: boolean; error?: string }> {
  const validation = VideoSectionConfigSchema.safeParse(config);
  if (!validation.success) {
    return { success: false, error: 'Invalid configuration provided.' };
  }

  try {
    const currentConfig = await getSiteConfigFromFile();
    currentConfig.videoSection = validation.data;
    await saveSiteConfigToFile(currentConfig);
    
    // Revalidate the homepage to show changes immediately
    revalidatePath('/');
    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error updating video section config:', error);
    return { success: false, error: 'Failed to update configuration.' };
  }
}
