const IntegralParams = ({
  a,
  b,
  epsilon,
  method,
  onChangeA,
  onChangeB,
  onChangeEpsilon,
  onChangeMethod,
  onSubmit,
}: {
  a: string;
  b: string;
  epsilon: string;
  method: string;
  onChangeA: (val: string) => void;
  onChangeB: (val: string) => void;
  onChangeEpsilon: (val: string) => void;
  onChangeMethod: (val: string) => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <label className="flex flex-col">
          a:
          <input
            type="number"
            value={a}
            onChange={(e) => onChangeA(e.target.value)}
            className="p-2 bg-gray-900 border border-gray-600 rounded text-white"
          />
        </label>

        <label className="flex flex-col">
          b:
          <input
            type="number"
            value={b}
            onChange={(e) => onChangeB(e.target.value)}
            className="p-2 bg-gray-900 border border-gray-600 rounded text-white"
          />
        </label>

        <label className="flex flex-col">
          ε:
          <input
            type="number"
            step="any"
            value={epsilon}
            onChange={(e) => onChangeEpsilon(e.target.value)}
            className="p-2 bg-gray-900 border border-gray-600 rounded text-white"
          />
        </label>

        <label className="flex flex-col">
          Метод:
          <select
            value={method}
            onChange={(e) => onChangeMethod(e.target.value)}
            className="p-2 bg-gray-900 border border-gray-600 rounded text-white"
          >
            <option value="rectangle">Прямоугольники</option>
            <option value="trapezoid">Трапеции</option>
            <option value="simpson">Симпсона</option>
          </select>
        </label>
      </div>

      <button
        onClick={onSubmit}
        className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded"
      >
        Вычислить интеграл
      </button>
    </div>
  );
};

export default IntegralParams;
