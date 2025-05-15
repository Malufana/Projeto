import React, { useState, useEffect } from "react";
import style from './Envio.module.css';
import axios from 'axios';

export function Envio(){
    const [files, setFiles] = useState({
        ambientes: null,
        patrimonios: null,
        manutentores: null,
        gestores: null,
        area: null,
    });

    const handleChange = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(files).forEach(key => {
            if(files[key]){
                formData.append(key, files[key]);
            }
        });

        try{
            const response = await axios.post('', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Upload realizado com sucesso!");
            console.log(response.data);
        }catch(error){
            alert("Erro ao enviar arquivos")
            console.log(error);
        }
    };

    return(
        <>
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.uploadForm}>
                <h1>UPLOAD DE ARQUIVOS</h1>

                {['ambientes', 'patrimonios', 'manutentores', 'gestores', 'area'].map((field) => (
                    <div className={style.sectionUpload} key={field}>
                        <label htmlFor={field}>Upload de {field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        <input type="file" name={field} id={field} onChange={handleChange}/>
                    </div>
                ))}

                <button type="submit">ENVIAR</button>
            </form>
        </div>
        </>
    );
}
