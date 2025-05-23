import React, { useState, useEffect } from "react";
import style from './Envio.module.css';
import axios from 'axios';
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";


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

    function getCookie(name){
        let cookieValue  = null;
        if(document.cookie && document.cookie !== ""){
            const cookies = document.cookie.split(";");
            for(let cookie of cookies){
                cookie = cookie.trim();
                if(cookie.substring(0, name.length + 1) === (name + '=')){
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/csrf/', { withCredentials: true })
            .then(() => console.log('CSRF Token set'))
            .catch(err => console.log('Erro ao obter CSRF token', err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const csrftoken = getCookie('csrftoken');

        Object.keys(files).forEach(key => {
            if(files[key]){
                formData.append(key, files[key]);
            }
        });

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrftoken
                },
                withCredentials: true
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
        <Header />
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.uploadForm} method="POST">
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
        <Footer />
        </>
    );
}