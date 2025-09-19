export const S = {
  card: 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs p-4 tablet:p-5',

  header: 'flex gap-2 flex-row items-center justify-between',
  headerLeft: 'flex items-center gap-3 min-w-0',
  avatar: 'flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700',
  payerValue: 'truncate text-base tablet:text-xl font-medium text-slate-800 dark:text-slate-50',

  headerRight: 'flex items-end md:items-center gap-6 flex-wrap',
  amountValue: 'text-lg laptop:text-xl font-semibold text-slate-900 dark:text-white',

  divider: 'my-4 h-px w-full bg-slate-200 dark:bg-slate-700',

  refundCard: 'grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 border border-green-300 dark:border-green-100 rounded-2xl',
  label: 'text-xs tracking-wide dark:text-green-600 text-green-300',
  value: 'mt-1 text-base font-medium text-slate-800 dark:text-slate-50',

  metaValueRow: 'mt-1 flex items-center gap-2 text-base font-medium text-slate-800 dark:text-slate-50',

  contactsGrid: 'grid grid-cols-1 sm:grid-cols-3 gap-4',

  detailsWrap: 'flex justify-end',
  detailsBtn:
    'flex items-center self-end gap-px p-2 text-green-300 dark:text-green-100 underline cursor-pointer text-[12px] font-bold tracking-normal leading-[18px] text-nowrap transition-all duration-200',
  chevron: 'transition-transform duration-200 dark:stroke-green-100 stroke-green-300',

  collapse: 'overflow-hidden transition-all duration-300 ease-in-out',
  collapseOpen: 'max-h-[4000px] opacity-100',
  collapseClosed: 'max-h-0 opacity-0',
};
