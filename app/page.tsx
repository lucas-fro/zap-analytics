import { Tags } from "../components/tags";
import { CircleCheck, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <section className="h-dvh flex p-25 items-center justify-between gap-10">
        <div className="flex flex-col gap-8 w-[50%] ">
          <h1 className="text-foreground text-6xl font-bold">Descubra tudo sobre suas <span className="text-primary">conversas do WhatsApp</span></h1>
          <p className="text-border text-2xl">Transforme suas conversas em dados fascinantes. Veja quem mais fala, horarios mais ativos, emojis favoritos e muito mais.</p>
          <div className="flex gap-10">
            <Tags icon={CircleCheck} text="sem cadastro"/>
            <Tags icon={Shield} text="Processamento local"/>
            <Tags icon={Zap} text="Resultados instataneos"/>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="bg-red-600 size-80 p-5 ">
          </div>
        </div>
      </section>
    </div>
    
  );
}
