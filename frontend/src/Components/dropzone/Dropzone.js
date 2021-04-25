import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

function Dropzone() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);

    const modalImageRef = useRef();
    const modalRef = useRef();

    const onDrop = useCallback(acceptedFiles => {
        for (let i = 0; i < acceptedFiles.length; i++) {
            setSelectedFiles(prevArray => [...prevArray, acceptedFiles[i]]);
        }
    }, []);

    useEffect(() => {
        const filteredArray = selectedFiles.reduce((file, current) => {
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            }
            return file;
        }, []);
        setValidFiles([...filteredArray]);
    }, [selectedFiles]);

    const removeFile = name => {
        // find the index of the item
        // remove the item from array

        const validFileIndex = validFiles.findIndex(e => e.name === name);
        validFiles.splice(validFileIndex, 1);
        // update validFiles array
        setValidFiles([...validFiles]);
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);
    };

    const fileType = fileName =>
        fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;

    const openImageModal = file => {
        const reader = new FileReader();
        modalRef.current.style.display = 'block';
        reader.readAsDataURL(file);
        reader.onload = e => {
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        };
    };

    const closeModal = () => {
        modalRef.current.style.display = 'none';
        modalImageRef.current.style.backgroundImage = 'none';
    };

    const uploadFiles = () => {
        const formData = new FormData();

        validFiles.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
    };

    const { isDragActive, getRootProps, getInputProps, isDragReject } = useDropzone({
        onDrop,
        accept: 'image/png, image/jpeg',
        minSize: 0,
    });

    return (
        <>
            <div className="dropzone">
                {validFiles.length ? (
                    <button className="file-upload-btn" onClick={() => uploadFiles()}>
                        Upload Files
                    </button>
                ) : (
                    ''
                )}
                <div className="drop-container" {...getRootProps()}>
                    <input className="file-input" {...getInputProps()} />
                    {!isDragActive && (
                        <div className="drop-message">
                            <div className="upload-icon" />
                            Click here or drop a file to upload!
                        </div>
                    )}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && 'File type not accepted, sorry!'}
                </div>

                <ul className="file-display-container">
                    {validFiles.map((data, i) => (
                        <li className="file-status-bar" key={i}>
                            <div onClick={() => openImageModal(data)}>
                                <div className="file-type-logo" />
                                <div className="file-type">{fileType(data.name)}</div>
                                <span className="file-name">{data.name}</span>
                            </div>
                            <div className="file-remove" onClick={() => removeFile(data.name)}>
                                X
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="modal" ref={modalRef}>
                <div className="overlay" />
                <span className="close" onClick={() => closeModal()}>
                    X
                </span>
                <div className="modal-image" ref={modalImageRef} />
            </div>
        </>
    );
}

export default Dropzone;
