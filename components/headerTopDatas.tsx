import { Calendar, Users } from "lucide-react"

export function HeaderTopDatas({data, title}: any) { 

    return (
        <header className="bg-background-secondary text-center p-2 border border-white/10">
            <h1 className="text-foreground font-bold">{title}</h1>
            <p className="text-text-secondary flex justify-center gap-2"><Calendar className="size-4 mt-1"/><span>{data.dataInicial}</span> - <span>{data.dataFinal}</span></p>
            <p className="text-text-secondary flex justify-center gap-5"><span className="bg-primary/20 rounded-2xl px-2 pt-0.4 mt-0.5 text-primary text-sm">{data.diasTotais} dias</span> | <span> <Users className="inline size-4 mb-1"/> {data.quantidadeDeMembros} membros</span></p>
        </header>
    )
}