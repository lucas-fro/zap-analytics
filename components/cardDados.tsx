import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type typeDataCard = {
    icon: LucideIcon;
    text: string;
    data: any;
}

export function CardDados({icon : Icon, text, data}: typeDataCard) {
    return (
        <Card>
            <div className="bg-primary/30 w-fit h-fit p-2 rounded-4xl">
                <Icon className="size-6 text-primary"/>
            </div>
            <div>
                <span className="font-bold text-3xl">{data}</span>
                <p className="text-text-secondary">{text}</p>
            </div>
        </Card>
    )
}