'use client';
import classes from "./image-picker.module.css";
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {
    const [image, setImage] = useState(null);
    const imageInput = useRef();
    function handleImagePick(){
        imageInput.current.click();
    }

    function handleImageChange(e){
        const file = e.target.files[0];
        if(!file) {
            setImage(null);
            return
        };
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file);
    }
    return <div className={classes.picker}>
        <label htmlFor="image">{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!image && <p>No image selected</p>}
                {image && <Image src={image} alt={label} fill />}
            </div>
            <input className={classes.input} type="file" id="image" accept="image/png, image/jpeg" name={name} ref={imageInput} onChange={handleImageChange} />
            <button className={classes.button} type="button" onClick={handleImagePick}>Pick and Image</button>
        </div>
    </div>
}