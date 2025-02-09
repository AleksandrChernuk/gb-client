type TIconDecrement = {
  disabled: boolean;
};

export const IconIncrement = ({ disabled }: TIconDecrement) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3.33325V12.6666"
        className={`stroke-black_2_for_text dark:stroke-gray_1 ${disabled && "stroke-gray_2_for_body"}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 8H12.6663"
        className={`stroke-black_2_for_text dark:stroke-gray_1 ${disabled && "stroke-gray_2_for_body"}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
