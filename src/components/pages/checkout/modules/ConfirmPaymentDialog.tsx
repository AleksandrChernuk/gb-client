import { Button } from '@/components/ui/button';
// import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useNewOrderResult } from '@/store/useOrderResult';
// import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cancelOrder } from '@/actions/orders.actions';

export default function ConfirmPaymentDialog() {
  //   const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const initiateNewOrder = useNewOrderResult((state) => state.initiateNewOrder);
  const route = useRouter();

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({ providerId: initiateNewOrder?.providerId ?? '' }, initiateNewOrder?.myOrderId ?? '');
      route.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={!!initiateNewOrder}>
      <DialogContent className="sm:max-w-[512px] mx-auto px-5 rounded-2xl gap-6">
        <DialogHeader className="gap-6">
          <DialogTitle className="text-xl lg:text-2xl font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {initiateNewOrder?.status !== 'error' ? 'Підтвердження оплати' : 'Сталася помилка'}
          </DialogTitle>
          <DialogDescription asChild className="text-sm lg:text-lg text-slate-700 dark:text-slate-400">
            {initiateNewOrder?.status !== 'error' ? (
              <p>
                Фінальна вартість:{' '}
                <span className="font-medium">
                  {initiateNewOrder?.amount} {initiateNewOrder?.currency}
                </span>
              </p>
            ) : (
              <p>{initiateNewOrder.message}</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={handleCancelOrder}>
            Скасувати
          </Button>
          <Button variant="default">Придбати</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
