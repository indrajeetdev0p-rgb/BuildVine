"use client";

import { useState } from "react";

interface UploadResult {
  key: string;
  publicUrl: string;
}

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File): Promise<UploadResult> => {
    setIsUploading(true);
    setProgress(0);

    try {
      // 1. Get presigned URL from our API
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      if (!res.ok) throw new Error("Failed to get upload URL");
      const { signedUrl, key, publicUrl } = await res.json();

      // 2. Upload directly to R2
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("S3 Upload Error:", uploadRes.status, errorText);
        throw new Error("Failed to upload to S3: " + errorText);
      }

      setProgress(100);
      return { key, publicUrl };
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, progress };
}
