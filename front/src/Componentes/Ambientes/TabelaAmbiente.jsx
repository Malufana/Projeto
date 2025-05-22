import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from '../Patrimonios/TabelaPatrimonios.module.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function TabelaAmbientes(){
    const [ambiente, setAmbiente] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAmbiente = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!");
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/ambientes/", {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAmbiente(response.data);
            }catch(error){
                console.log("Erro ao buscar dados: ", error);
                setError("Erro ao buscar dados")
            }
        };

        fetchAmbiente();
    }, []);

    if(error){
        return <div>
            {error && (
                <div className={style.cardErro}>
                    <h2>ERRO</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    }

    return(
        <>
        <Header />
        <div>
            <h1 className={style.titulo}>AMBIENTES</h1>
            <div className={style.rolagem}>
                <table className={style.tabela}>
                    <thead>
                        <tr className={style.cabecalho}>
                            <th>ID</th>
                            <th>SIG</th>
                            <th>DESCRIÇÃO</th>
                            <th>RESPONSÁVEL</th>
                        </tr>
                    </thead>    
                    <tbody>
                        {ambiente.map((cont) =>(
                            <tr key={cont.id} className={style.linha}>
                                <td>{cont.id}</td>
                                <td>{cont.sig}</td>
                                <td>{cont.descricao}</td>
                                <td>{cont.responsavel}</td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
        <Footer />
        </>
    );
}