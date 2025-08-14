
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


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
  const defaultConfig = {
    videoSection: {
      isEnabled: true,
      videoUrl: 'https://www.youtube.com/embed/6owddgXj2qg',
    },
  };

  try {
    const docRef = doc(db, 'siteConfig', 'main');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validate the data from Firestore
      const parsedConfig = SiteConfigSchema.safeParse(data);
      if (parsedConfig.success) {
        return parsedConfig.data;
      }
    }
    // If doc doesn't exist or data is invalid, return default and maybe save it
    await setDoc(docRef, defaultConfig);
    return defaultConfig;
  } catch (error) {
    console.error("Failed to fetch site config from Firestore, returning default.", error);
    return defaultConfig;
  }
}

async function saveSiteConfigToDb(config: SiteConfig) {
  const docRef = doc(db, 'siteConfig', 'main');
  await setDoc(docRef, config, { merge: true });
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return await getSiteConfigFromDb();
}

export async function updateVideoSectionConfig(config: VideoSectionConfig): Promise<{ success: boolean; error?: string }> {
  const validation = VideoSectionConfigSchema.safeParse(config);
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
