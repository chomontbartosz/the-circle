import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { ACCEPTED_IMAGE_TYPES } from "../constants";
import { convertFileToUrl } from "../lib/utils";

// Wspólna logika wyboru zdjęcia (post i avatar): drag & drop, podgląd, przekazanie pliku do formularza.
export default function useImageDropzone(
  fieldChange: (files: File[]) => void,
  initialUrl = ""
) {
  const [fileUrl, setFileUrl] = useState(initialUrl);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    onDrop: (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
  });

  return { fileUrl, getRootProps, getInputProps };
}
