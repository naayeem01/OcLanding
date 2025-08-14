import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About OushodCloud
        </h2>
        <p className="mt-4 text-xl font-medium text-muted-foreground font-bangla">
          ঔষধক্লাউড কি এবং এটি কাদের জন্য?
        </p>
        <div className="mt-8 text-lg text-foreground space-y-4">
          <p>
            OushodCloud is a state-of-the-art, cloud-based pharmacy management
            and Point-of-Sale (POS) software designed specifically for the needs
            of pharmacy owners, clinic operators, and medicine distributors
            across Bangladesh.
          </p>
          <p className="font-bangla text-muted-foreground">
            আমাদের লক্ষ্য হলো আপনার ফার্মেসির দৈনন্দিন কাজগুলোকে সহজ করে তোলা,
            যাতে আপনি আপনার ব্যবসার প্রসারে আরও বেশি মনোযোগ দিতে পারেন। স্টক
            ম্যানেজমেন্ট থেকে শুরু করে দ্রুত বিলিং এবং دقیق রিপোর্টিং পর্যন্ত,
            ঔষধক্লাউড আপনার বিশ্বস্ত সহযোগী।
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
