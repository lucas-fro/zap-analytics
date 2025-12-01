"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, Archive } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseFile } from "../utils/parse";

export default function FileUploader({ redirectTo }: { redirectTo: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isValidFile = (f: File) =>
    f.type === "text/plain" || f.name.endsWith(".zip") || f.name.endsWith(".txt");

  const handleFile = async (f: File | null) => {
    if (!f) return;

    if (!isValidFile(f)) {
      alert("Apenas arquivos .zip ou .txt são permitidos!");
      return;
    }

    setFile(f);
    setLoading(true);

    await parseFile(f); 

    //router.push(redirectTo);
  };

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
      ) : (
        <div className="flex flex-col items-center gap-3 py-4">
          {getFileIcon()}
          <p className="font-medium text-center">{file.name}</p>
          {file.size > 0 && (
            <p className="text-sm text-gray-400">
              {formatFileSize(file.size)}
            </p>
          )}
          <p className="text-sm text-gray-400">
            {loading ? "Processando arquivo..." : ""}
          </p>
        </div>
      )}
    </div>
  );
}
