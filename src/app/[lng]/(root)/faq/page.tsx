import { permanentRedirect } from 'next/navigation';

type Props = {
  params: Promise<{ lng: string }>;
};

export default async function Faq({ params }: Props) {
  const { lng } = await params;

  permanentRedirect(`/${lng}/faq/bronjuvannja-mists/`);
}
