import DOMPurify from "isomorphic-dompurify";

interface RichTextProps {
  content: string;
  className?: string;
  as?: "div" | "span" | "p" | "article" | "li";
}

const RichText = ({
  content,
  className,
  as: Component = "div",
}: RichTextProps) => {
  const renderedHtml = DOMPurify.sanitize(content);

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default RichText;
