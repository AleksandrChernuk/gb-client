import Link from "next/link";
import React from "react";

type TQuestionsItem = {
  title: string;
  text: string;
};

export const QuestionsItem = ({ title, text }: TQuestionsItem) => {
  return (
    <li className="border-b-[1px] border-gray_light dark:border-gray_0">
      <h4 className="mb-2 text-white secondary_2_bolt_text tablet:button_mobile_bolt_text laptop:h3">{title}</h4>

      <p className="mb-4 secondary_text laptop:main_text_body text-gray_0 ">{text}</p>

      <Link className="block mb-6 text-base font-bold underline laptop:text-base text-primary_2" href={"/faq"}>
        {"Learn More >"}
      </Link>
    </li>
  );
};
