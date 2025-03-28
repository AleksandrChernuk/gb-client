'use client';

import { popularRoutersFakeData } from '@/constans/popular-routers.constans';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RoutersItem from './RoutersItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const RoutersDropdownList = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('main');

  const additionalRouters = popularRoutersFakeData.slice(3);

  return (
    <div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0, overflow: 'hidden' },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="grid grid-cols-1 gap-4 mb-0 laptop:grid-cols-3 laptop:gap-8"
          >
            {additionalRouters.map((router) => (
              <div className="w-full" key={router.id}>
                <RoutersItem from={router?.from} to={router?.to} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-right laptop:text-center">
        <Button
          variant={'link'}
          onClick={() => setOpen(!open)}
          className="h-auto p-0 mt-4 text-base font-normal text-white"
        >
          {t('popular_button')}{' '}
        </Button>
      </div>
    </div>
  );
};

export default RoutersDropdownList;
