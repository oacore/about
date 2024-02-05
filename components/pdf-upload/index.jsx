import React, { useState } from 'react'
import { Button } from '@oacore/design'

import text from '../../data/retention.yml'
import uploadSvg from '../../public/images/logos/upload.svg'
import styles from './styles.module.scss'

const FileUpload = () => {
  const [fileError, setFileError] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleClick = () => {
    document.getElementById('fileInput').click()
  }

  const handleFileChange = (event) => {
    event.preventDefault()
    const file = event.target.files[0]

    if (file) {
      if (file.size > 10 * 1024 * 1024)
        setFileError('File size is too big (max 10MB).')
      else if (!file.type.includes('pdf'))
        setFileError('Invalid file format. Please upload a PDF file.')
      else {
        setFileError('')
        setUploadedFileName(file.name)
        // Perform  file upload logic here
        // eslint-disable-next-line no-console
        console.log('File uploaded successfully:', file)
      }
    }
  }

  return (
    <div className={styles.uploadWrapper}>
      <h3 className={styles.uploadTitle}>{text.upload.default.title}</h3>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.innerWrapper}
        onDragOver={handleDragOver}
        onDrop={handleFileChange}
        onClick={handleClick}
      >
        <img
          src={uploadSvg}
          alt="Upload Icon"
          style={{ width: '50px', height: '50px', marginBottom: '10px' }}
        />
        <p className={styles.innerTitle}>{text.upload.default.subTitle}</p>
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <p className={styles.connector}>- OR -</p>
        <Button variant="contained">{text.upload.default.action.title}</Button>
        <p style={{ color: 'red' }}>{fileError}</p>
        {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
      </div>
      <div className={styles.uploadFooter}>
        <span className={styles.footerText}>{text.upload.subInfo.format}</span>
        <span className={styles.footerText}>{text.upload.subInfo.size}</span>
      </div>
    </div>
  )
}

export default FileUpload
