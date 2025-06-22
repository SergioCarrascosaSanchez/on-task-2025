interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "code"
    | "lead"
    | "large"
    | "small"
    | "muted";
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  children,
  as,
  className = "",
  ...props
}) => {
  const variants = {
    h1: {
      element: "h1",
      className:
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
    },
    h2: {
      element: "h2",
      className:
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    },
    h3: {
      element: "h3",
      className: "scroll-m-20 text-2xl font-semibold tracking-tight",
    },
    h4: {
      element: "h4",
      className: "scroll-m-20 text-xl font-semibold tracking-tight",
    },
    p: {
      element: "p",
      className: "leading-7 [&:not(:first-child)]:mt-6",
    },
    blockquote: {
      element: "blockquote",
      className: "mt-6 border-l-2 pl-6 italic",
    },
    code: {
      element: "code",
      className:
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    lead: {
      element: "p",
      className: "text-muted-foreground text-xl",
    },
    large: {
      element: "div",
      className: "text-lg font-semibold",
    },
    small: {
      element: "small",
      className: "text-sm leading-none font-medium",
    },
    muted: {
      element: "p",
      className: "text-muted-foreground text-sm",
    },
  };

  const variantConfig = variants[variant] || variants.p;
  const Element = (as || variantConfig.element) as React.ElementType;
  const finalClassName = `${variantConfig.className} ${className}`.trim();

  return (
    <Element className={finalClassName} {...props}>
      {children}
    </Element>
  );
};
