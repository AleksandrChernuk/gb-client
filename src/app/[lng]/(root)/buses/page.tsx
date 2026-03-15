export const dynamic = 'force-dynamic';

import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import ScrollButton from '@/shared/ui/scroll-button';
import { BusesSearchHero } from '@/views/buses-page/BusesSearchHero';
import { BusesDateTabs } from '@/views/buses-page/BusesDateTabs';
import { BusesResults } from '@/views/buses-page/BusesResults';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'buses',
    path: 'buses',
  });
}

export default async function Buses({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-800">
      <BusesSearchHero />
      <BusesDateTabs />
      <BusesResults />
      <ScrollButton />
    </main>
  );
}
