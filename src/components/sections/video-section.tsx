
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

const VideoSection = ({ url }: { url: string }) => {
  // Extract video ID from URL for thumbnail
  let videoId = '';
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    videoId = pathParts[pathParts.length - 1];
  } catch (error) {
    console.error("Invalid video URL for thumbnail:", url);
  }

  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  return (
    <section id="video" className={cn('py-16 sm:py-24 bg-card')}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
            আমাদের সফটওয়্যার সম্পর্কে জানুন
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            একটি সংক্ষিপ্ত ভিডিওর মাধ্যমে আমাদের সফটওয়্যারের কার্যকারিতা দেখুন।
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl"
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="#pricing" className="font-bangla">মূল্য তালিকা দেখুন</Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
