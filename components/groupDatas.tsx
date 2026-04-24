import { LucideIcon } from "lucide-react";

type GroupDatasProps = {
  children: React.ReactNode;
  title: string;
  icon?: LucideIcon;
};

export function GroupDatas({ children, title, icon: Icon }: GroupDatasProps) {
  return (
    <section className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-10 px-5 md:px-10 w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="bg-primary/15 border border-primary/30 size-9 md:size-10 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="size-4 md:size-5 text-primary" />
          </div>
        )}
        <h2 className="text-foreground font-bold text-2xl md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {children}
      </div>
    </section>
  );
}
