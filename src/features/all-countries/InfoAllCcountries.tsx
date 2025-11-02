const InfoAllCcountries = ({ text }: { text: string }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
      <p className="text-sm tablet:text-base text-slate-700 dark:text-slate-100">{text}</p>
    </div>
  );
};

export default InfoAllCcountries;
