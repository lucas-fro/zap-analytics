import { useState, useMemo } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export function Table({ data }: any) {

  const [filter, setFilter] = useState("Mensagens");

  //Mapeamento entre nome exibido e chave do objeto
  const filterMap: any = {
    "Mensagens": "totalMensagens",
    "Palavras": "totalPalavras",
    "Emojis": "totalEmojis",
    "Mídias": "totalMidias",
  };

  //Ordena dinamicamente com base no filtro selecionado
  const sorted = useMemo(() => {
    const key = filterMap[filter];
    return [...data].sort((a, b) => b[key] - a[key]);
  }, [filter, data]);

  return (
    <section className="flex flex-col gap-4 mt-5 p-4 w-full max-w-[1200px] mx-auto">
      <h1 className="text-foreground font-bold text-3xl">
        Ranking de Participantes
      </h1>

      <div>
        <Card className="p-0 md:p-0">

          <div className="flex justify-end pt-2 pr-2">
            <Select onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filtro</SelectLabel>
                  <SelectItem value="Mensagens">Mensagens</SelectItem>
                  <SelectItem value="Palavras">Palavras</SelectItem>
                  <SelectItem value="Emojis">Emojis</SelectItem>
                  <SelectItem value="Mídias">Mídias</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea>
            <TableUI className="text-lg">
              <TableHeader>
                <TableRow className="border-b-border">
                  <TableHead className="text-center text-white/0">#</TableHead>
                  <TableHead>Nome</TableHead>

                  <TableHead
                    className={cn(
                      filter === "Mensagens"
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Mensagens
                  </TableHead>

                  <TableHead
                    className={cn(
                      filter === "Palavras"
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Palavras
                  </TableHead>

                  <TableHead
                    className={cn(
                      filter === "Emojis"
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Emojis
                  </TableHead>

                  <TableHead
                    className={cn(
                      filter === "Mídias"
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Mídias
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sorted.map((person: any, index: number) => (
                  <TableRow key={person.nome} className="border-b-border">
                    <TableCell className="text-center">
                        {index < 3
                            ? ["🥇", "🥈", "🥉"][index]
                            : `${index + 1}°`}
                    </TableCell>

                    <TableCell>{person.nome}</TableCell>

                    <TableCell
                      className={filter === "Mensagens" ? "font-bold" : "text-muted-foreground"}
                    >
                      {person.totalMensagens}
                    </TableCell>

                    <TableCell
                      className={filter === "Palavras" ? "font-bold" : "text-muted-foreground"}
                    >
                      {person.totalPalavras}
                    </TableCell>

                    <TableCell
                      className={filter === "Emojis" ? "font-bold" : "text-muted-foreground"}
                    >
                      {person.totalEmojis}
                    </TableCell>

                    <TableCell
                      className={filter === "Mídias" ? "font-bold" : "text-muted-foreground"}
                    >
                      {person.totalMidias}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableUI>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Card>
      </div>
    </section>
  );
}
