"use client";

import React from "react";
import {
  AlertCircleIcon,
  BadgeCheck,
  CircleCheck,
  DownloadIcon,
  ImageIcon,
  Scan,
  ScanHeart,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Tooltips from "./tooltips";
// ou où tu le définis

export type ImageToUpload = {
  id: string;
  file: File;
  preview: string;
  isPrincipale: boolean;
  alt: string;
};

type DropImageUploadProps = {
  value: ImageToUpload[];
  onChange: (images: ImageToUpload[]) => void;
};

export default function DropImageUpload({
  value,
  onChange,
}: DropImageUploadProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 6;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    initialFiles: [], // on enlève les mocks
    maxFiles,
    maxSize,
    multiple: true,
  });

  // Synchroniser `files` du hook avec `value` du parent
  React.useEffect(() => {
    const mapped: ImageToUpload[] = files.map((f, index) => {
      const existing = value.find((img) => img.id === f.id);
      return {
        id: f.id,
        file: f.file,
        preview: f.preview,
        isPrincipale: existing ? existing.isPrincipale : index === 0,
        alt: existing?.alt ?? f.file.name,
      } as ImageToUpload;
    });
    onChange(mapped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const togglePrincipale = (id: string) => {
    const updated = value.map((img) => ({
      ...img,
      isPrincipale: img.id === id, // une seule principale
    }));
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    removeFile(id);
    onChange(value.filter((img) => img.id !== id));
  };

  const handleClear = () => {
    clearFiles();
    onChange([]);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        className="relative flex min-h-52 flex-col items-center not-data-files:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            aria-hidden="true"
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 font-medium text-sm">Drop your images here</p>
          <p className="text-muted-foreground text-xs">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
          </p>
          <Button className="mt-4" onClick={openFileDialog} variant="outline">
            <UploadIcon aria-hidden="true" className="-ms-1 opacity-60" />
            Select images
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((img) => (
            <div
              className="relative flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
              key={img.id}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="aspect-square shrink-0 rounded bg-accent">
                  <img
                    alt={img.alt}
                    className="size-10 rounded-[inherit] object-cover"
                    src={img.preview}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate font-medium text-[13px]">
                    {img.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(img.file.size)}
                  </p>
                </div>
              </div>

              <div>
                <Button
                  aria-label={`Définir comme principale`}
                  className="size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onClick={() => togglePrincipale(img.id)}
                  size="icon"
                  variant="ghost"
                >
                  {img.isPrincipale ? (
                    <Tooltips text={"Image principale"}>
                      <span>
                        <ScanHeart className="size-4 fill-green-500" />
                      </span>
                    </Tooltips>
                  ) : (
                    <Tooltips text={"Definir comme principale"}>
                      <span>
                        <Scan className="size-4" />
                      </span>
                    </Tooltips>
                  )}
                </Button>
                <Button
                  aria-label={`Remove ${img.file.name}`}
                  className="size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onClick={() => removeFile(img.id)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          ))}

          {value.length > 1 && (
            <div>
              <Button onClick={handleClear} size="sm" variant="outline">
                Supprimer toutes les images
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
