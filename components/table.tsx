import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "./ui/card";

export function Table({ data }: any) {
  
  const sorted = [...data].sort(
    (a, b) => b.totalMensagens - a.totalMensagens
  );

  return (
    <section className="flex flex-col gap-4 mt-5 p-4 w-full max-w-[1200px] mx-auto">
      <h1 className="text-foreground font-bold text-3xl">
        Ranking de Participantes
      </h1>

      <div>
        <Card className="p-0 md:p-0">
          <ScrollArea>
            <TableUI>
              <TableHeader>
                <TableRow className="border-b-border">
                  <TableHead>#</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Mensagens</TableHead>
                  <TableHead>Palavras</TableHead>
                  <TableHead>Emojis</TableHead>
                  <TableHead>Mídias</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sorted.map((person: any, index: number) => (
                  <TableRow key={person.nome} className="border-b-border">
                    <TableCell>{index + 1}°</TableCell>
                    <TableCell>{person.nome}</TableCell>
                    <TableCell>{person.totalMensagens}</TableCell>
                    <TableCell>{person.totalPalavras}</TableCell>
                    <TableCell>{person.totalEmojis}</TableCell>
                    <TableCell>{person.totalMidias}</TableCell>
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
