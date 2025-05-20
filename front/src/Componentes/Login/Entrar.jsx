import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from './Entrar.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import user from '../../assets/user.png'

export function Entrar(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    //console.log("USERNAME: ", username);
    //console.log("PASSWORD: ", password);

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/token/",
                {
                    username: username,
                    password: password
                }
            )
            const token = response.data.access;
            localStorage.setItem('token', token);
            console.log(token);
            navigate('/Home');
        }catch(error){
            console.log("Erro no login", error.response || error.message || error);
            if(error.response){
                console.log("Erro: ", error.response.data);
                console.log("Status: ", error.response.status);
                alert("Erro: " + JSON.stringify(error.response.data));
            } else{
                console.log("Erro genérico: ", error.message);
                alert("Erro inesperado!");
            }
            
        }
    }

    return(
        <>
            <Header />
            <div className={style.container}>
                <div className={style.containerLogin}>
                    <img src={user} className={style.userImg} />
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p className={style.registrar}>
                        Não tem conta? <Link className={style.registroLink}>Cadastre-se</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );

}
