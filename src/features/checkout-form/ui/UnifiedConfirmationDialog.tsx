// 'use client';

// import { useState } from 'react';
// import { useFormContext, useWatch } from 'react-hook-form';
// import { useTranslations } from 'next-intl';
// import { LoaderCircle, TicketX, AlertCircle } from 'lucide-react';
// import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
// import { Button } from '@/shared/ui/button';
// import { Alert, AlertDescription } from '@/shared/ui/alert';
// import { useRouter } from '@/shared/i18n/routing';
// import { useNewOrderResult } from '@/shared/store/useOrderResult';
// import { useTimerStore } from '@/shared/store/useTimer';
// import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
// import { usePaymentConfirm } from '@/features/checkout-form/hooks';
// import useTimer from '@/features/checkout-form/hooks/useTimer';

// type DialogState = 'NONE' | 'NEW_ORDER' | 'OTP' | 'TIMEOUT' | 'ERROR';

// export function UnifiedConfirmationDialog() {
//   const [pin, setPin] = useState('');
//   const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
//   const router = useRouter();

//   const { control } = useFormContext();
//   const paymentType = useWatch({ control, name: 'payment', exact: true });

//   const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
//   const resetInitiateNewOrder = useNewOrderResult((s) => s.resetInitiateNewOrder);
//   const { reset: resetTimer } = useTimerStore();
//   const { open: timerExpired } = useTimer();

//   const {
//     handleCancelOrder,
//     payLoading,
//     smsValidationLoading,
//     handlePayOrder,
//     handleConfirmOrder,
//     handleSMSValidation,
//   } = usePaymentConfirm();

//   // Определяем состояние диалога
//   const getDialogState = (): DialogState => {
//     if (timerExpired) return 'TIMEOUT';
//     if (!initiateNewOrder) return 'NONE';
//     if (initiateNewOrder.status === 'error') return 'ERROR';
//     if (initiateNewOrder.requiresOTP) return 'OTP';
//     return 'NEW_ORDER';
//   };

//   const dialogState = getDialogState();
//   const isOpen = dialogState !== 'NONE';

//   // Обработчики
//   const handleClose = () => {
//     resetTimer();
//     resetInitiateNewOrder();
//     setPin('');
//     router.back();
//   };

//   const handleSubmitOTP = () => {
//     if (pin.length === 6) {
//       handleSMSValidation(pin);
//     }
//   };

//   // Рендер контента в зависимости от состояния
//   const renderContent = () => {
//     switch (dialogState) {
//       case 'TIMEOUT':
//         return <TimeoutContent onClose={handleClose} />;

//       case 'ERROR':
//         return (
//           <ErrorContent
//             error={initiateNewOrder}
//             onClose={handleClose}
//             onRetry={() => {
//               resetInitiateNewOrder();
//               setPin('');
//             }}
//           />
//         );

//       case 'OTP':
//         return (
//           <OTPContent
//             pin={pin}
//             onPinChange={setPin}
//             onSubmit={handleSubmitOTP}
//             onCancel={handleCancelOrder}
//             loading={smsValidationLoading}
//           />
//         );

//       case 'NEW_ORDER':
//         return (
//           <OrderConfirmContent
//             order={initiateNewOrder}
//             paymentType={paymentType}
//             onPay={handlePayOrder}
//             onBook={handleConfirmOrder}
//             onCancel={handleCancelOrder}
//             loading={payLoading}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Dialog open={isOpen}>
//       <DialogContent className="sm:max-w-[512px] mx-auto rounded-2xl gap-4">{renderContent()}</DialogContent>
//     </Dialog>
//   );
// }

// function TimeoutContent({ onClose }: { onClose: () => void }) {
//   const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

//   return (
//     <>
//       <DialogHeader>
//         <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
//           {t('still_online_title')}
//         </DialogTitle>
//         <DialogDescription className="text-base tablet:text-lg text-slate-700 dark:text-slate-200">
//           {t('still_online_description')}
//         </DialogDescription>
//       </DialogHeader>
//       <DialogFooter>
//         <Button variant="default" size="primary" onClick={onClose}>
//           {t('payment_confirm_to_search')}
//         </Button>
//       </DialogFooter>
//     </>
//   );
// }

// function ErrorContent({ error, onClose, onRetry }: { error: any; onClose: () => void; onRetry: () => void }) {
//   const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
//   const isSeatError = error?.message === 'Seat is not available';

//   return (
//     <>
//       <DialogHeader className="gap-3">
//         <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50 flex items-center gap-2">
//           <AlertCircle className="w-6 h-6 text-red-500" />
//           {t('payment_confirm_error_title')}
//         </DialogTitle>
//         <DialogDescription className="text-base text-slate-700 dark:text-slate-200">
//           <div className="space-y-3">
//             <p>{error?.message || t('payment_confirm_error_description')}</p>

//             {error?.alertMessage && (
//               <Alert variant="destructive" className="text-left">
//                 <AlertDescription>
//                   {error.alertMessage.title && <p className="font-semibold">{error.alertMessage.title}</p>}
//                   {error.alertMessage.description && <p className="text-sm mt-1">{error.alertMessage.description}</p>}
//                 </AlertDescription>
//               </Alert>
//             )}

//             {isSeatError && error?.freeSeats?.length > 0 && (
//               <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
//                 <AlertDescription>
//                   <p className="text-sm font-medium mb-1">{t('available_seats')}:</p>
//                   <p className="text-sm">{error.freeSeats.map((seat: any) => seat.number || seat.id).join(', ')}</p>
//                 </AlertDescription>
//               </Alert>
//             )}
//           </div>
//         </DialogDescription>
//       </DialogHeader>

//       <DialogFooter className="grid gap-3 sm:grid-cols-2">
//         <Button variant="outline" size="primary" onClick={onClose}>
//           {t('payment_confirm_to_search')}
//         </Button>
//         {isSeatError && (
//           <Button variant="default" size="primary" onClick={onRetry}>
//             {t('select_another_seat')}
//           </Button>
//         )}
//       </DialogFooter>
//     </>
//   );
// }

// function OTPContent({
//   pin,
//   onPinChange,
//   onSubmit,
//   onCancel,
//   loading,
// }: {
//   pin: string;
//   onPinChange: (value: string) => void;
//   onSubmit: () => void;
//   onCancel: () => void;
//   loading: boolean;
// }) {
//   const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

//   return (
//     <>
//       <DialogHeader className="gap-3">
//         <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
//           {t('enter_confirmation_code')}
//         </DialogTitle>
//         <DialogDescription className="text-sm text-slate-600 dark:text-slate-400">
//           {t('enter_6_digit_code')}
//         </DialogDescription>
//       </DialogHeader>

//       <InputOTP
//         value={pin}
//         onChange={onPinChange}
//         maxLength={6}
//         pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
//         containerClassName="justify-center my-4"
//         autoFocus
//       >
//         <InputOTPGroup>
//           {[...Array(6)].map((_, i) => (
//             <InputOTPSlot key={i} index={i} />
//           ))}
//         </InputOTPGroup>
//       </InputOTP>

//       <DialogFooter className="grid gap-3 sm:grid-cols-2">
//         <Button variant="outline" size="primary" onClick={onCancel} disabled={loading}>
//           {t('payment_confirm_cancel')} <TicketX />
//         </Button>
//         <Button variant="default" size="primary" onClick={onSubmit} disabled={loading || pin.length < 6}>
//           {loading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book')}
//         </Button>
//       </DialogFooter>
//     </>
//   );
// }

// function OrderConfirmContent({
//   order,
//   paymentType,
//   onPay,
//   onBook,
//   onCancel,
//   loading,
// }: {
//   order: any;
//   paymentType: string;
//   onPay: () => void;
//   onBook: () => void;
//   onCancel: () => void;
//   loading: boolean;
// }) {
//   const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
//   const amount = Math.floor(Number(order?.amount ?? 0));
//   const currency = order?.currency ?? 'UAH';
//   const isBooking = paymentType === 'BOOK';

//   return (
//     <>
//       <DialogHeader className="gap-3">
//         <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
//           {t('payment_confirm_title')}
//         </DialogTitle>
//         <DialogDescription className="text-center space-y-3">
//           <p className="text-base text-slate-700 dark:text-slate-200">{t('payment_confirm_final_amount')}</p>
//           <p className="font-bold text-2xl text-slate-900 dark:text-slate-50">
//             {amount} {currency}
//           </p>

//           {paymentType === 'PAYMENT_AT_BOARDING' && (
//             <Alert className="text-left bg-green-50 dark:bg-green-900/20 border-green-200">
//               <AlertDescription className="text-sm">
//                 <span className="text-red-600 font-bold">*</span> {t('sms_confirmation_notice')}
//               </AlertDescription>
//             </Alert>
//           )}

//           {order?.alertMessage && (
//             <Alert className="text-left">
//               <AlertDescription>
//                 {order.alertMessage.title && <p className="font-semibold text-sm">{order.alertMessage.title}</p>}
//                 {order.alertMessage.description && <p className="text-sm mt-1">{order.alertMessage.description}</p>}
//               </AlertDescription>
//             </Alert>
//           )}
//         </DialogDescription>
//       </DialogHeader>

//       <DialogFooter className="grid gap-3 sm:grid-cols-2">
//         <Button variant="outline" size="primary" onClick={onCancel} disabled={loading}>
//           {t('payment_confirm_cancel')} <TicketX />
//         </Button>

//         <Button
//           variant="default"
//           size="primary"
//           onClick={isBooking ? onBook : onPay}
//           disabled={loading}
//           className="text-white"
//         >
//           {loading ? (
//             <LoaderCircle className="animate-spin" />
//           ) : isBooking ? (
//             t('payment_confirm_pay')
//           ) : (
//             t('payment_confirm_book')
//           )}
//         </Button>
//       </DialogFooter>
//     </>
//   );
// }
