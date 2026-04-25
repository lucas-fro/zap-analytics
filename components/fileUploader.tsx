"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, Archive } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseFile } from "../lib/parse";
import { analyzeAll } from "../lib/analyzeAll";
import { useDataAnalytics } from "../lib/store/useDataAnalytics";

const STAGES = {
  reading: "Lendo arquivo...",
  extracting: "Extraindo mensagens...",
  analyzing: "Analisando conversa...",
} as const;

type Stage = keyof typeof STAGES | null;

// Yield to the browser pra repintar antes do próximo bloco síncrono pesado
const yieldToUI = () => new Promise<void>((r) => setTimeout(r, 0));

export default function FileUploader({ redirectTo }: { redirectTo: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<Stage>(null);
  const [error, setError] = useState<string | null>(null);

  const setData = useDataAnalytics((state) => state.setData);
  const setTitle = useDataAnalytics((state) => state.setTitleMensagens);
  const router = useRouter();

  const isValidFile = (f: File) =>
    f.type === "text/plain" ||
    f.name.endsWith(".zip") ||
    f.name.endsWith(".txt");

  const handleFile = async (f: File | null) => {
    if (!f) return;

    if (!isValidFile(f)) {
      setError("Apenas arquivos .zip ou .txt são permitidos!");
      return;
    }

    setFile(f);
    setLoading(true);
    setError(null);

    try {
      setStage("reading");
      await yieldToUI();

      setStage("extracting");
      await yieldToUI();
      const { platform, mensagens } = await parseFile(f);

      setStage("analyzing");
      await yieldToUI();
      const analytics = analyzeAll({ platform, mensagens });

      setData(analytics);
      setTitle(extractConversationName(f.name));
      router.push(redirectTo);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar arquivo"
      );
      setLoading(false);
      setStage(null);
      setFile(null);
    }
  };

  function extractConversationName(filename: string): string {
    const noExtension = filename.replace(/\.[^/.]+$/, "");
    const match = noExtension.match(/com\s+(.*)$/i);
    return match ? match[1].trim() : "";
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    handleFile(droppedFile || null);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    handleFile(selected);
  };

  const getFileIcon = () => {
    if (!file) return null;
    if (file.name.endsWith(".txt"))
      return <FileText className="w-6 h-6 text-blue-400" />;
    if (file.name.endsWith(".zip"))
      return <Archive className="w-6 h-6 text-yellow-400" />;
  };

  const formatFileSize = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const stageOrder: Stage[] = ["reading", "extracting", "analyzing"];
  const currentStageIndex = stage ? stageOrder.indexOf(stage) : -1;

  return (
    <div className="max-w-xl w-full mx-auto border border-white/10 rounded-2xl p-4 sm:p-6 bg-[#1f1f23] text-[#fafafa] shadow-xl shadow-black/30">
      {!file ? (
        <>
          <div
            className={`
              border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition cursor-pointer
              ${
                isDragging
                  ? "border-green-400 bg-green-400/10"
                  : "border-gray-600 hover:border-green-400/60"
              }
            `}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-green-400 mb-3" />
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Arraste o arquivo .zip ou .txt da sua conversa exportada aqui
            </p>

            <label className="inline-block px-5 py-2.5 bg-green-500 text-black font-semibold rounded-md cursor-pointer hover:bg-green-400 active:scale-[0.98] transition text-sm sm:text-base">
              Selecionar arquivo
              <input
                type="file"
                accept=".zip,.txt"
                onChange={onFileInputChange}
                className="hidden"
              />
            </label>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-md">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 py-4">
          {getFileIcon()}
          <p className="font-medium text-center break-all px-2">{file.name}</p>
          {file.size > 0 && (
            <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
          )}

          {loading && stage && (
            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-300">{STAGES[stage]}</p>
              </div>

              <div className="flex items-center gap-1.5 w-full">
                {stageOrder.map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= currentStageIndex ? "bg-green-400" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
