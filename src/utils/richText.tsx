import DOMPurify from "dompurify";

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
  // Only sanitize on client-side where DOM is available
  const renderedHtml =
    typeof window !== "undefined" ? DOMPurify.sanitize(content) : content;

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default RichText;
