"use client";

import { useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import {
  EstatisticasPorParticipante,
  Platform,
} from "@/lib/types/types";

type Coluna = {
  key: string;
  accessor: (p: EstatisticasPorParticipante) => number;
};

const COLUNAS_BASE: Coluna[] = [
  { key: "Mensagens", accessor: (p) => p.totalMensagens },
  { key: "Palavras", accessor: (p) => p.totalPalavras },
  { key: "Emojis", accessor: (p) => p.totalEmojis },
  { key: "Mídias", accessor: (p) => p.totalMidias },
];

const COLUNAS_IOS_EXTRA: Coluna[] = [
  { key: "Imagem", accessor: (p) => p.midiasPorTipo?.imagem ?? 0 },
  { key: "Vídeo", accessor: (p) => p.midiasPorTipo?.video ?? 0 },
  { key: "Áudio", accessor: (p) => p.midiasPorTipo?.audio ?? 0 },
  { key: "Figurinha", accessor: (p) => p.midiasPorTipo?.figurinha ?? 0 },
  { key: "GIF", accessor: (p) => p.midiasPorTipo?.gif ?? 0 },
  { key: "Documento", accessor: (p) => p.midiasPorTipo?.documento ?? 0 },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashHue(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

type TableProps = {
  data: EstatisticasPorParticipante[];
  platform: Platform;
};

export function Table({ data, platform }: TableProps) {
  const colunas = useMemo<Coluna[]>(
    () =>
      platform === "ios"
        ? [...COLUNAS_BASE, ...COLUNAS_IOS_EXTRA]
        : COLUNAS_BASE,
    [platform]
  );

  const [filter, setFilter] = useState<string>(colunas[0].key);

  const colunaAtiva = useMemo(
    () => colunas.find((c) => c.key === filter) ?? colunas[0],
    [colunas, filter]
  );

  const sorted = useMemo(() => {
    return [...data].sort(
      (a, b) => colunaAtiva.accessor(b) - colunaAtiva.accessor(a)
    );
  }, [colunaAtiva, data]);

  return (
    <section className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-10 px-5 md:px-10 w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="bg-primary/15 border border-primary/30 size-9 md:size-10 rounded-xl flex items-center justify-center shrink-0">
          <Trophy className="size-4 md:size-5 text-primary" />
        </div>
        <h2 className="text-foreground font-bold text-2xl md:text-3xl">
          Ranking de Participantes
        </h2>
      </div>

      <Card className="p-0 md:p-0 overflow-hidden">
        <div className="flex justify-between items-center px-4 md:px-5 py-3 border-b border-white/10">
          <p className="text-text-secondary text-sm hidden sm:block">
            Ordenado por{" "}
            <span className="text-primary font-medium">{filter}</span>
          </p>
          <Select onValueChange={(v) => setFilter(v)} value={filter}>
            <SelectTrigger className="w-40 sm:w-[180px]">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filtro</SelectLabel>
                {colunas.map((c) => (
                  <SelectItem key={c.key} value={c.key}>
                    {c.key}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea>
          <TableUI className="text-base md:text-lg">
            <TableHeader>
              <TableRow className="border-b-border hover:bg-transparent">
                <TableHead className="text-center w-12">#</TableHead>
                <TableHead>Nome</TableHead>

                {colunas.map((c) => (
                  <TableHead
                    key={c.key}
                    className={cn(
                      "transition-colors whitespace-nowrap",
                      filter === c.key
                        ? "font-bold text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {c.key}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {sorted.map((person, index) => {
                const hue = hashHue(person.nome);
                const initials = getInitials(person.nome);

                return (
                  <TableRow
                    key={person.nome}
                    className="border-b-border hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {index < 3 ? (
                        ["🥇", "🥈", "🥉"][index]
                      ) : (
                        <span className="text-text-secondary">{index + 1}°</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="size-9 rounded-full flex items-center justify-center font-bold text-sm border shrink-0"
                          style={{
                            backgroundColor: `hsl(${hue} 60% 25%)`,
                            borderColor: `hsl(${hue} 60% 40%)`,
                            color: `hsl(${hue} 80% 80%)`,
                          }}
                        >
                          {initials}
                        </div>
                        <span className="font-medium truncate max-w-[150px] md:max-w-none">
                          {person.nome}
                        </span>
                      </div>
                    </TableCell>

                    {colunas.map((c) => (
                      <TableCell
                        key={c.key}
                        className={cn(
                          "transition-colors",
                          filter === c.key
                            ? "font-bold text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {c.accessor(person).toLocaleString("pt-BR")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </TableUI>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </section>
  );
}
