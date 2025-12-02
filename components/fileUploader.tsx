"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, Archive } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseFile } from "../utils/parse";
import { useDataAnalytics } from "../app/store/useDatasAnalytycs";

export default function FileUploader({ redirectTo }: { redirectTo: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setData = useDataAnalytics((state: any) => state.setData);
  const setTitle = useDataAnalytics((state: any) => state.setTitleMensagens);
  const router = useRouter();

  const isValidFile = (f: File) =>
    f.type === "text/plain" || f.name.endsWith(".zip") || f.name.endsWith(".txt");

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
      const analytics = await parseFile(f);
      setData(analytics);
      setTitle(extractConversationName(f.name));
      router.push(redirectTo);
    } catch (err) {
      console.error("Erro ao processar arquivo:", err);
      setError(err instanceof Error ? err.message : "Erro ao processar arquivo");
      setLoading(false);
      setFile(null);
    }
  };

  function extractConversationName(filename: string): string {
  // Remove extensão (.txt)
  const noExtension = filename.replace(/\.[^/.]+$/, "");

  // Pega tudo depois de "com "
  const match = noExtension.match(/com\s+(.*)$/i);

  // Se achar, retorna o nome, senão retorna string vazia
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
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-xl mx-auto border rounded-xl p-6 bg-[#1f1f23] text-[#fafafa]">
      {!file ? (
        <>
          <div
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer 
              ${isDragging ? "border-green-400 bg-green-400/10" : "border-gray-600"}
            `}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <UploadCloud className="w-10 h-10 mx-auto text-green-400 mb-3" />
            <p className="text-gray-300 mb-4">
              Arraste um arquivo .zip ou .txt aqui
            </p>

            <label className="inline-block px-4 py-2 bg-green-500 text-black font-medium rounded-md cursor-pointer hover:bg-green-400 transition">
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
        <div className="flex flex-col items-center gap-3 py-4">
          {getFileIcon()}
          <p className="font-medium text-center">{file.name}</p>
          {file.size > 0 && (
            <p className="text-sm text-gray-400">
              {formatFileSize(file.size)}
            </p>
          )}
          {loading && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-400">Processando arquivo...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}