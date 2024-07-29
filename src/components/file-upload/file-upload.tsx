import React, { useRef, useState, type ChangeEvent } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button, Fade, IconButton, LinearProgress, Typography, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import { TransitionGroup } from 'react-transition-group';

import { useLanguage } from '@/contexts/language-context';

import { type ImageInterface } from '../dashboard/add-speaker/interfaces/image.interface';
import UploadIcon from '../icons/upload-icon';
import styles from './file-upload.module.css';

interface FileUploadProps {
  setFiles: (value: File[] | ((prevVar: File[]) => File[])) => void;
  files: File[];
  images: ImageInterface[];
  handleRemoveImage: (photo: ImageInterface) => void;
  handleRemoveAll: () => void;
}

export default function FileUpload(props: FileUploadProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const { setFiles, files, images, handleRemoveImage, handleRemoveAll } = props;

  let size = 0;

  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles: FileList | null = event.target.files;

    if (uploadedFiles) {
      const filesArray: File[] = Array.from(uploadedFiles);

      for (const file of filesArray) {
        size += Number(file.size);
      }

      if (size > 300 * 1024 * 1024) {
        setErrorMessage('File size exceeds the maximum limit of 3000 MB');
      }

      setFiles(filesArray); // Update files state with the array of files
    }
  };

  const handleChoose = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Fade in>
      <Box className={styles.fileUpload}>
        {images.length > 0 && images.length === files.length ? null : (
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={(images.length / files.length) * 100} />
          </Box>
        )}
        <Box className={styles.uploadContainer}>
          <input
            ref={inputRef}
            className={styles.uploadInput}
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".mov,.mp4, .jpeg, .png, .jpg"
            style={{ display: 'none' }}
          />
          <Button variant="contained" onClick={handleChoose} startIcon={<UploadIcon />} className={styles.uploadButton}>
            {renderLanguage('ატვირთვა', 'Upload')}
          </Button>
          {files.length > 0 && (
            <Button
              variant="contained"
              color="warning"
              onClick={handleRemoveAll}
              className={styles.uploadButton}
              sx={{ marginTop: '20px' }}
            >
              {renderLanguage('გასუფთავება მთლიანად', 'Delete All')}
            </Button>
          )}
          {images.length > 0 ? (
            <Box>
              <TransitionGroup className={styles.uploadItems}>
                {images.map((file) => (
                  <Zoom key={file.name}>
                    <Box className={styles.uploadItem}>
                      <Box className={styles.uploadItemActions}>
                        <IconButton
                          onClick={() => {
                            handleRemoveImage(file);
                          }}
                        >
                          <CancelOutlinedIcon style={{ color: 'white' }} />
                        </IconButton>
                      </Box>
                      {file.type.includes('image') ? (
                        <img src={file.url} alt={file.name} className={styles.uploadImage} />
                      ) : (
                        <video className={styles.uploadVideo} controls>
                          <source src={file.url} type={file.type} />
                          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                          <track src="captions_es.vtt" kind="captions" srcLang="es" label="spanish_captions" />
                        </video>
                      )}
                      <Typography className={styles.textElipsis}>{file.name}</Typography>
                    </Box>
                  </Zoom>
                ))}
              </TransitionGroup>
            </Box>
          ) : null}
          <div className="VideoInput_footer">{errorMessage}</div>
        </Box>
      </Box>
    </Fade>
  );
}
