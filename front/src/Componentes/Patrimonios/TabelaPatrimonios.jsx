import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from './TabelaPatrimonios.module.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function TabelaPatrimonios(){
    const [patrimonio, setPatrimonio] = useState([]);
    const [error, setError] = ("");

    useEffect(() => {
        const fetchPatrimonio = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!");
                return;
            }

            try{
                const response = await axios.get("", {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatrimonio(response.data);
            }catch(error){
                console.log("Erro ao buscar dados: ", error);
                setError("Erro ao buscar dados")
            }
        };

        fetchPatrimonio();
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
            <h1 className={style.titulo}>PATRIMÔNIOS</h1>
            <div className={style.rolagem}>
                <table className={style.tabela}>
                    <thead>
                        <tr className={style.cabecalho}>
                            <th>ID</th>
                            <th>NI</th>
                            <th>DESCRIÇÃO</th>
                            <th>LOCALIZAÇÃO</th>
                        </tr>
                        <tbody>
                            {patrimonio.map((cont) =>(
                                <tr key={cont.id} className={style.linha}>
                                    <td>{cont.id}</td>
                                    <td>{cont.ni}</td>
                                    <td>{cont.descricao}</td>
                                    <td>{cont.localizacao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </thead>
                </table>
            </div>
        </div>
        <Footer />
        </>
    );
}