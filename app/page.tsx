import { Tags } from "../components/tags";
import { Header } from "../components/header";
import { CircleCheck, Shield, Zap } from "lucide-react";
import FileUploader from "../components/fileUploader";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <Header />
      <section className="min-h-dvh flex md:flex-row flex-col gap-5 md:p-10 p-5 items-center w-full">
        <div className="flex-1 grid md:gap-10 gap-5 text-center md:text-left">
          <h1 className="md:mt-5 mt-10 text-foreground md:text-6xl text-4xl font-bold">
            Descubra tudo sobre suas{" "}
            <span className="text-primary">conversas do WhatsApp</span>
          </h1>

          <p className="text-border md:text-2xl text-md">
            Transforme suas conversas em dados fascinantes. Veja quem mais fala,
            horários mais ativos, emojis favoritos e muito mais.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start  md:gap-5 gap-3">
            <Tags icon={CircleCheck} text="sem cadastro" />
            <Tags icon={Shield} text="Processamento local" />
            <Tags icon={Zap} text="Resultados instantâneos" />
          </div>
        </div>

        <div className="flex-1">
          <FileUploader redirectTo="/dashboard" />
        </div>
      </section>
    </div>
  );
}
