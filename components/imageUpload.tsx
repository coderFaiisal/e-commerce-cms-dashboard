/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as LR from '@uploadcare/blocks';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

LR.FileUploaderRegular.shadowStyles = `
  :host lr-simple-btn button {
    width: 150px;
    height: 45px;
  border: 1px solid gray;
  background-color: white;
  }

  :host lr-simple-btn button:hover{
  background-color: #fafafa;
  }
`;

LR.registerBlocks(LR);

type ImageUploadProps = {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  isMultiple?: boolean;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  isMultiple = false,
}) => {
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<LR.OutputFileEntry[]>([]);

  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = (e: any) => {
      if (e.detail) {
        setUploadedFiles([...e.detail.allEntries]);
      }
    };

    ctxProviderRef.current?.addEventListener(
      'common-upload-success',
      handleUpload,
    );

    return () => {
      ctxProviderRef.current?.removeEventListener(
        'common-upload-success',
        handleUpload,
      );
    };
  }, []);

  useEffect(() => {
    const handleDone = () => {
      // const newImageUrls

      uploadedFiles
        .map(file => {
          onChange(file.cdnUrl as string);
          return file.cdnUrl;
        })
        .filter(Boolean) as string[];

      // setImageUrls(prev => [...prev, ...newImageUrls]);

      setUploadedFiles([]);
      ctxProviderRef.current?.uploadCollection.clearAll();
    };

    ctxProviderRef.current?.addEventListener('modal-close', handleDone);

    return () => {
      ctxProviderRef.current?.removeEventListener('modal-close', handleDone);
    };
  }, [uploadedFiles]);

  return (
    <>
      <div className="mt-12 mb-4">
        {(value.length === 0 || isMultiple) && (
          <div>
            <lr-config
              ctx-name="my-uploader"
              pubkey="6e94bf0cc0ee9ed49eeb"
              maxLocalFileSizeBytes={10000000}
              imgOnly={true}
              sourceList="local, url, camera"
              multiple={false}
              useCloudImageEditor={false}
            />
            <lr-file-uploader-regular
              ctx-name="my-uploader"
              css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.38.1/web/lr-file-uploader-regular.min.css`}
              class="my-config"
            />
          </div>
        )}

        <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader" />
      </div>

      {value?.map(url => (
        <div
          key={url}
          className="relative flex items-center gap-2 w-[200px] h-[200px] rounded-md overflow-hidden"
        >
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image src={url} fill className="object-cover" alt="upload image" />
        </div>
      ))}
    </>
  );
};

export default ImageUpload;
