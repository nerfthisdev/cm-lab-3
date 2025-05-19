import katex from "katex";

const LatexRenderer = ({
  latex,
  isInline = false,
}: {
  latex: string;
  isInline?: boolean;
}) => {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: !isInline,
  });

  return (
    <span
      className="text-white"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ display: isInline ? "inline" : "block" }}
    ></span>
  );
};

export default LatexRenderer;
