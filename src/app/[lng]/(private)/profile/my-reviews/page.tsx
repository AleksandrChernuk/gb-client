export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ReviewsPage from '@/components/modules/profile/reviews';

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const Reviews = async () => {
  return <ReviewsPage />;
};

export default Reviews;
