import { useState } from "react";
import ChooseFunctions from "./ChooseFunctions";
import IntegralParams from "./IntegralParams";
import LatexRenderer from "./utils/LatexRenderer";
import { rectangleMethod } from "../integrators/rectangle";
import { trapezoidMethod } from "../integrators/trapezoid";
import { simpsonMethod } from "../integrators/simpson";

const IntegralCalculator = () => {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [epsilon, setEpsilon] = useState("");
  const [method, setMethod] = useState("rectangle_left");

  const [latexReport, setLatexReport] = useState<string[]>([]);

  // Выбор подходящей численной функции
  const getNumericMethod = () => {
    const [main, variant] = method.split("_");
    switch (main) {
      case "rectangle":
        return (f: (x: number) => number, a: number, b: number, eps: number) =>
          rectangleMethod(f, a, b, eps, variant as "left" | "right" | "middle");
      case "trapezoid":
        return trapezoidMethod;
      case "simpson":
        return simpsonMethod;
      default:
        throw new Error("Неизвестный метод");
    }
  };

  // Строка → функция
  const parseFunction = (latex: string): ((x: number) => number) => {
    const map: Record<string, (x: number) => number> = {
      "\\int (-x^3 - x^2 - 2x + 1)\\,dx": (x) =>
        (-1 * x) ** 3 - x ** 2 - 2 * x + 1,
      "\\int (-3x^3 - 5x^2 + 4x - 2)\\,dx": (x) =>
        -3 * x ** 3 - 5 * x ** 2 + 4 * x - 2,
      "\\int (-x^3 - x^2 + x + 3)\\,dx": (x) => (-1 * x) ** 3 - x ** 2 + x + 3,
      "\\int (-2x^3 - 4x^2 + 8x - 4)\\,dx": (x) =>
        -2 * x ** 3 - 4 * x ** 2 + 8 * x - 4,
      "\\int (-2x^3 - 3x^2 + x + 5)\\,dx": (x) =>
        -2 * x ** 3 - 3 * x ** 2 + x + 5,
      "\\int (x^4 - 2x^3 + x - 1)\\,dx": (x) => x ** 4 - 2 * x ** 3 + x - 1,
    };
    return map[latex] ?? (() => 0);
  };

  const calculate = () => {
    if (!selectedFunction) return;

    const f = parseFunction(selectedFunction);
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const epsNum = parseFloat(epsilon);

    const methodFunc = getNumericMethod();
    const { result, n, iterations } = methodFunc(f, aNum, bNum, epsNum);

    // Latexify всё
    const header = `\\textbf{Отчёт о вычислении интеграла}`;
    const integralLatex = `\\int_{${aNum}}^{${bNum}} f(x)\\,dx \\approx ${result.toFixed(6)},\\quad n = ${n}`;
    const iterationLatex = iterations.map(
      (line: string, i: number) =>
        `\\text{${i + 1}. ${line.replace("=", " = ")}}`,
    );

    setLatexReport([
      header,
      ...iterationLatex,
      `\\text{Ответ: } ${integralLatex}`,
    ]);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl">Численное интегрирование</h1>

      <ChooseFunctions
        selectedLatex={selectedFunction}
        onSelect={setSelectedFunction}
      />

      {selectedFunction && (
        <>
          <IntegralParams
            a={a}
            b={b}
            epsilon={epsilon}
            method={method}
            onChangeA={setA}
            onChangeB={setB}
            onChangeEpsilon={setEpsilon}
            onChangeMethod={setMethod}
            onSubmit={calculate}
          />

          {latexReport.length > 0 && (
            <div className="mt-8 p-4 border border-gray-700 rounded bg-gray-900 space-y-2">
              {latexReport.map((latex, i) => (
                <LatexRenderer key={i} latex={latex} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IntegralCalculator;
