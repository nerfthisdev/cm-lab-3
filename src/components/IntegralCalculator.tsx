import { useState } from "react";
import ChooseFunctions from "./ChooseFunctions";
import katex from "katex";
import IntegralParams from "./IntegralParams";

const IntegralCalculator = () => {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [epsilon, setEpsilon] = useState("");
  const [method, setMethod] = useState("rectangle");

  const handleSubmit = () => {
    console.log("Формула:", selectedFunction);
    console.log("a =", a);
    console.log("b =", b);
    console.log("ε =", epsilon);
    console.log("Метод:", method);
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
          <div>
            <h2 className="text-lg mb-2">Вы выбрали:</h2>
            <div className="border border-gray-600 rounded-lg p-4 bg-gray-700 inline-block">
              <span
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(selectedFunction, {
                    throwOnError: false,
                    displayMode: true,
                  }),
                }}
              />
            </div>
          </div>

          <IntegralParams
            a={a}
            b={b}
            epsilon={epsilon}
            method={method}
            onChangeA={setA}
            onChangeB={setB}
            onChangeEpsilon={setEpsilon}
            onChangeMethod={setMethod}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default IntegralCalculator;
