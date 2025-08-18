import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/shared/lib/utils";
import { Typography } from "../Typography";

function AvatarBase({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  letters,
  bgClass,
  textClass,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  bgClass: string;
  textClass: string;
  letters: string;
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        bgClass,
        className
      )}
      {...props}
    >
      <Typography variant="small" className={cn("font-bold", textClass)}>
        {letters}
      </Typography>
    </AvatarPrimitive.Fallback>
  );
}

function Avatar({
  className,
  image,
  name,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  image?: string;
  name: string;
}) {
  const { bg, text } = getFallbackColorClasses(name);
  return (
    <AvatarBase className={className} {...props}>
      {image ? (
        <AvatarImage src={image} />
      ) : (
        <AvatarFallback
          letters={getFallbackLetters(name)}
          bgClass={bg}
          textClass={text}
        />
      )}
    </AvatarBase>
  );
}

function getFallbackColorClasses(name: string): { bg: string; text: string } {
  const palette: Array<{ bg: string; text: string }> = [
    { bg: "bg-red-100/80", text: "text-red-800" },
    { bg: "bg-orange-100/80", text: "text-orange-800" },
    { bg: "bg-amber-100/80", text: "text-amber-800" },
    { bg: "bg-green-100/80", text: "text-green-800" },
    { bg: "bg-teal-100/80", text: "text-teal-800" },
    { bg: "bg-blue-100/80", text: "text-blue-800" },
    { bg: "bg-indigo-100/80", text: "text-indigo-800" },
    { bg: "bg-purple-100/80", text: "text-purple-800" },
  ];
  if (!name) return palette[0];
  const code = name.charCodeAt(0) || 0;
  const i = code % palette.length;
  return palette[i];
}

function getFallbackLetters(name: string) {
  const nameArray = name.trim().split(/\s+/).filter(Boolean);
  if (nameArray.length === 0) return "";
  if (nameArray.length === 1) return nameArray[0][0].toUpperCase();
  return `${nameArray[0][0].toUpperCase()}${nameArray[1][0].toUpperCase()}`;
}

export { Avatar };
