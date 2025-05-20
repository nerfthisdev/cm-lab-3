import LatexRenderer from "./utils/LatexRenderer";

const latexList = [
  "\\int (-x^3 - x^2 - 2x + 1)\\,dx",
  "\\int (-3x^3 - 5x^2 + 4x - 2)\\,dx",
  "\\int (-x^3 - x^2 + x + 3)\\,dx",
  "\\int (-2x^3 - 4x^2 + 8x - 4)\\,dx",
  "\\int (x^4 - 2x^3 + x - 1)\\,dx",
];

const ChooseFunctions = ({
  selectedLatex,
  onSelect,
}: {
  selectedLatex: string | null;
  onSelect: (latex: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {latexList.map((latex, idx) => {
        const isActive = latex === selectedLatex;
        return (
          <div
            key={idx}
            onClick={() => onSelect(latex)}
            className={`cursor-pointer border rounded-xl p-4 transition duration-200
              ${
                isActive
                  ? "border-yellow-400 bg-yellow-800"
                  : "border-gray-600 bg-gray-700 hover:bg-gray-600"
              }`}
          >
            <LatexRenderer latex={latex} />
          </div>
        );
      })}
    </div>
  );
};

export default ChooseFunctions;
