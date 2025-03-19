import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [768],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
