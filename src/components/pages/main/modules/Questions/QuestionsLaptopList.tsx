import { questions } from "@/constans/constans.questions";
import { QuestionsItem } from "./QuestionsItem";

export const QuestionsLaptopList = () => {
  return (
    <ul className="hidden grid-cols-3 grid-rows-2 gap-6 mb-8 tablet:hidden laptop:grid">
      {questions.map((e) => (
        <QuestionsItem key={e.id} title={e.title} text={e.text} />
      ))}
    </ul>
  );
};
