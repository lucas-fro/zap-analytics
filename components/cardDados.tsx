import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type CardDadosProps = {
    icon: LucideIcon;
    text: string;
    data: string | number | null;
};

export function CardDados({ icon: Icon, text, data }: CardDadosProps) {
    return (
        <Card className="group relative overflow-hidden hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex md:flex-row flex-col md:gap-4 gap-2 items-center relative">
                <div className="bg-primary/15 border border-primary/20 p-2.5 md:p-3 rounded-2xl group-hover:bg-primary/25 group-hover:border-primary/40 transition-colors shrink-0">
                    <Icon className="size-5 md:size-6 text-primary" />
                </div>
                <div className="w-full min-w-0 md:text-start text-center">
                    <span className="block font-bold text-2xl md:text-3xl text-foreground leading-tight truncate">
                        {data ?? "—"}
                    </span>
                    <p className="w-full text-text-secondary text-xs md:text-sm truncate mt-0.5">
                        {text}
                    </p>
                </div>
            </div>
        </Card>
    );
}
