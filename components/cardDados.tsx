import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type typeDataCard = {
    icon: LucideIcon;
    text: string;
    data: any;
}

export function CardDados({icon : Icon, text, data}: typeDataCard) {
    return (
        <Card>
            <div className="flex md:flex-row flex-col md:gap-4 items-center">
            <div className="bg-primary/30 w-fit h-fit p-2 rounded-4xl">
                <Icon className="size-6 text-primary"/>
            </div>
            <div className="w-full min-w-0">
                <span className="font-bold text-3xl">{data}</span>
                <p className="w-full text-text-secondary md:text-lg text-sm truncate">{text}</p>
            </div>
            </div>
        </Card>
    )
}