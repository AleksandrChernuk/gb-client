import { Container } from '@/components/shared/Container';
import { CustomCard } from '@/components/shared/CustomCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import errorImg from '../../../../public/images/error.webp';

export default async function NotFoundPage() {
  return (
    <Container size="s">
      <CustomCard className=" dark:bg-dark_main flex flex-col items-center gap-4">
        <Image
          src={errorImg}
          placeholder="blur"
          alt="errorImg"
          className="overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]"
        />
        <h1 className="h5 tablet:h1 text-text_prymery">{"errorTitle"}</h1>
        <Button asChild size={"secondary"} variant={"default"}>
          <Link href="/" replace>
            {"mainPageBtn"}
          </Link>
        </Button>
      </CustomCard>
    </Container>
  );
}
