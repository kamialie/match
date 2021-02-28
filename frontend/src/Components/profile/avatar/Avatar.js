import React, {useRef, useEffect, useState} from 'react';
import Tooltip from '../../tooltip/Tooltip';

function Avatar() {
    const fileInputRef = useRef();
    const modalImageRef = useRef();

    const currentAvatar = '../../../images/badmin.jpg';
    const [selectFile, setSelectedFile] = useState(null);

    useEffect(() => {
        modalImageRef.current.style.backgroundImage = `url(${currentAvatar})`;
    }, []);

    const fileInputClicked = () => {
        fileInputRef.current.click();
    };

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        return validTypes.indexOf(file.type) !== -1;
    };

    const fileSelected = () => {
        if (fileInputRef.current.files.length === 1 && validateFile(fileInputRef.current.files[0])) {
            setSelectedFile(fileInputRef.current.files[0]);

            const reader = new FileReader();
            reader.readAsDataURL(fileInputRef.current.files[0]);

            reader.onload = (e) => {
                modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
            };
        }
    };

    const update = () => {
        console.log(selectFile);
    };

    const cancel = () => {
        setSelectedFile(null);
        modalImageRef.current.style.backgroundImage = `url(${currentAvatar})`;
    };

    const onInputClick = (event) => {
        event.target.value = null;
    };

    return (
        <div className='avatar-container'>
            <Tooltip content='Click to change avatar' direction='left'>
                <div className='avatar' ref={modalImageRef} onClick={fileInputClicked} />
            </Tooltip>
            <input
                ref={fileInputRef}
                className='avatar-file-input'
                type='file'
                onChange={fileSelected}
                onClick={onInputClick}
            />
            <div className='avatar-buttons'>
                {!!selectFile && <button type='button' className='btn btn-primary mr-2' onClick={() => update()}>Update avatar</button>}
                {!!selectFile && <button type='button' className='btn btn-danger' onClick={() => cancel()}>Cancel update</button>}
            </div>
        </div>
    );
}

export default Avatar;
