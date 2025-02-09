import { questions } from "@/constans/constans.questions";
import { QuestionsItem } from "./QuestionsItem";

export const QuestionsTabletList = () => {
  return (
    <ul className="hidden grid-cols-2 grid-rows-2 gap-6 mb-8 tablet:grid laptop:hidden">
      {questions.slice(0, 4).map((e) => (
        <QuestionsItem key={e.id} title={e.title} text={e.text} />
      ))}
    </ul>
  );
};
