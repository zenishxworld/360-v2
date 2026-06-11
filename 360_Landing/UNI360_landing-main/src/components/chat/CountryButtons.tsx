import { COUNTRIES } from "@/data/countries";

interface CountryButtonsProps {
  onSelect: (countryCode: string) => void;
  disabled?: boolean;
}

/**
 * Inline country selection buttons rendered inside the chat.
 * Clicking a country adds it as a user message and triggers the AI response.
 */
export const CountryButtons = ({ onSelect, disabled }: CountryButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 px-1 pb-2">
      {COUNTRIES.map((country) => (
        <button
          key={country.code}
          onClick={() => onSelect(country.code)}
          disabled={disabled}
          className={`
            flex items-center gap-3 w-full px-4 py-3 rounded-xl
            text-left transition-all duration-200
            border border-gray-200 bg-white
            hover:border-[#2C3539] hover:bg-gray-50 hover:shadow-sm
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3539] focus-visible:ring-offset-2
          `}
        >
          {country.flag ? (
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="w-7 h-5 object-cover rounded flex-shrink-0"
            />
          ) : (
            <span className="w-7 h-5 flex items-center justify-center text-lg flex-shrink-0">
              🌍
            </span>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-800">
              {country.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {country.description}
            </div>
          </div>
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      ))}

      {/* Not Decided Yet option */}
      <button
        onClick={() => onSelect("not-decided")}
        disabled={disabled}
        className={`
          flex items-center gap-3 w-full px-4 py-3 rounded-xl
          text-left transition-all duration-200
          border-2 border-dashed border-amber-300 bg-amber-50/50
          hover:border-amber-500 hover:bg-amber-50
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
        `}
      >
        <span className="w-7 h-5 flex items-center justify-center text-lg flex-shrink-0">
          🤔
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-amber-800">
            Not Decided Yet
          </div>
          <div className="text-xs text-amber-600">
            Let me help you find the right destination
          </div>
        </div>
        <svg
          className="w-4 h-4 text-amber-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
