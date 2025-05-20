import axios from "axios";
import style from './Inicial.module.css';
import React, { useState } from "react";
import ambiente from '../../assets/LogoAmbiente.png';
import patrimonio from '../../assets/LogoPatrimonio.png';
import manutentor from '../../assets/LogoManutentor.png';
import servico from '../../assets/ServicoOrdem.png';
import upload from '../../assets/upload.png';
import historico from '../../assets/historico.png'
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

export function Inicial(){

    const navigate = useNavigate();

    const uploadNavigate = () =>{
        navigate('/Upload');
    }


    return(
        <>
            <Header/>
            <div className={style.container}>
                <div className={style.containerCards}>
                    <div className={style.cards}>
                        <img src={servico} alt="" />
                        <h3>ORDEM DE SERVIÇO</h3>
                    </div>
                    <div className={style.cards}>
                        <img src={patrimonio} alt="" />
                        <h3>PATRIMÔNIO</h3>
                    </div>
                    <div className={style.cards}>
                        <img src={ambiente} alt="" />
                        <h3>AMBIENTES</h3>
                    </div>
                    <div className={style.cards}>
                        <img src={manutentor} alt="" />
                        <h3>MANUTENTORES</h3>
                    </div>
                    <div className={style.cards}>
                        <img src={historico} alt="" />
                        <h3>HISTÓRICO</h3>
                    </div>
                    <div className={style.cards} onClick={uploadNavigate}>
                        <img src={upload} alt="" />
                        <h3>UPLOAD</h3>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

