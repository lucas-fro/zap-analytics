import { type LucideIcon } from "lucide-react";

interface IconTextProps {
  icon: LucideIcon;     // tipo do ícone
  text: string;         // texto a exibir
}

export function Tags({ icon: Icon, text}: IconTextProps) {
  return (
    <div className="flex items-center gap-2 min-w-fit justify-center">
      <Icon className="size-5 text-primary mt-1" />
      <span className="text-border">{text}</span>
    </div>
  );
}
