type Props = {
  count: number;
};

export const PassCount = ({ count }: Props) => {
  return (
    <div className='w-[10%] small_text text-text_prymery_color hidden tablet:flex items-center gap-px justify-self-center mr-2 text-nowrap'>
      {/* <IconPassCount /> */}
      <span>{count} місць</span>
    </div>
  );
};
