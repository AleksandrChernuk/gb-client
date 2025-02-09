 import { questions } from "@/constans/constans.questions";
import { QuestionsItem } from "./QuestionsItem";

export const QuestionsMobileList = () => {
  return (
    <ul className="grid grid-cols-1 grid-rows-2 gap-6 mb-8 tablet:hidden laptop:hidden">
      {questions.slice(0, 2).map((e) => (
        <QuestionsItem key={e.id} title={e.title} text={e.text} />
      ))}
    </ul>
  );
};
