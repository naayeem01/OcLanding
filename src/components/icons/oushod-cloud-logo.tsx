import Image from 'next/image';
import type { HTMLAttributes } from 'react';

const OushodCloudLogo = (props: HTMLAttributes<HTMLImageElement>) => (
  <Image
    src="https://oushodcloud.com/public/uploads/25/07/1752687224-974.svg"
    alt="OushodCloud Logo"
    width={170}
    height={40} 
    {...props}
  />
);

export default OushodCloudLogo;
