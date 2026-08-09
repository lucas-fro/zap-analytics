"use client";

import { CalendarRange } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Periodo } from "@/lib/types/types";

type FiltroPeriodoProps = {
  periodos: Periodo[];
  value: string;
  onChange: (value: string) => void;
};

export function FiltroPeriodo({
  periodos,
  value,
  onChange,
}: FiltroPeriodoProps) {
  // Conversa que cabe num ano só não tem o que recortar.
  if (periodos.length <= 1) return null;

  return (
    <section className="mt-6 md:mt-10 px-5 md:px-10 w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 md:px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary/15 border border-primary/30 size-9 md:size-10 rounded-xl flex items-center justify-center shrink-0">
            <CalendarRange className="size-4 md:size-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-foreground font-medium text-sm md:text-base">
              Período analisado
            </p>
            <p className="text-text-secondary text-xs md:text-sm hidden sm:block">
              Todos os dados abaixo seguem esse recorte
            </p>
          </div>
        </div>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-44 sm:w-[220px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Período</SelectLabel>
              {periodos.map((periodo) => (
                <SelectItem key={periodo.key} value={periodo.key}>
                  {periodo.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
