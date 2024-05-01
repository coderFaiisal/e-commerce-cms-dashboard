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
    width: 192px;
    height: 180px;
      
  }
`;

LR.registerBlocks(LR);

type ImageUploadProps = {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
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
    <section>
      <div className="mb-4 flex items-center gap-2">
        {value?.map(url => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
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

          <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader" />
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
