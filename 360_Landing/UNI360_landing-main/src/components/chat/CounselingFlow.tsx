import { getCounselingQuestion } from "@/data/countries";
import type { CounselingStep } from "@/types/chat";

interface CounselingFlowProps {
  step: CounselingStep;
  onAnswer: (step: CounselingStep, value: string, label: string) => void;
  disabled?: boolean;
}

/**
 * Inline counseling flow buttons rendered inside the chat.
 * Shows the available options for the current counseling question.
 */
export const CounselingFlow = ({
  step,
  onAnswer,
  disabled,
}: CounselingFlowProps) => {
  const question = getCounselingQuestion(step);
  if (!question) return null;

  return (
    <div className="flex flex-col gap-1.5 px-1 pb-2">
      {question.options.map((option) => (
        <button
          key={option.value}
          onClick={() => onAnswer(step, option.value, option.label)}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 rounded-xl text-left
            transition-all duration-200
            border border-gray-200 bg-white
            hover:border-[#2C3539] hover:bg-gray-50 hover:shadow-sm
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3539] focus-visible:ring-offset-2
          `}
        >
          <span className="text-sm font-medium text-gray-700">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};
