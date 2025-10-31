// TransferStationBadge.tsx
import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  isDepartureChangeStations?: boolean;
  isArrivalChangeStations?: boolean;
  changeStationsType?: 'manual' | 'auto';
  transferTime?: string;
};

export default function TransferStationBadge({
  isDepartureChangeStations,
  isArrivalChangeStations,
  changeStationsType,
  transferTime,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  if (!isDepartureChangeStations && !isArrivalChangeStations) {
    return null;
  }

  const isManualTransfer = changeStationsType === 'manual';
  const isAutoTransfer = changeStationsType === 'auto';

  return (
    <div className="flex flex-col gap-1">
      {/* Тип станції */}
      {isDepartureChangeStations && (
        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
          <span>🚏</span>
          <span>{t('arrival_transfer_station')}</span>
        </div>
      )}

      {isArrivalChangeStations && (
        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          <span>🚌</span>
          <span>{t('departure_transfer_station')}</span>
        </div>
      )}

      {/* Тип пересадки */}
      {isManualTransfer && (
        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <span>✓</span>
          <span>{t('organized_transfer')}</span>
        </div>
      )}

      {isAutoTransfer && (
        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
          <span>⚠️</span>
          <span>{t('self_transfer')}</span>
        </div>
      )}

      {/* Час пересадки */}
      {transferTime && (
        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <Clock size={14} />
          <span>
            {t('transfer_time')}: {transferTime}
          </span>
        </div>
      )}
    </div>
  );
}
