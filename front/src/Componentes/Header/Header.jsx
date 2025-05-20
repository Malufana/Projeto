import style from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/LogoOrdem.png';
import sigla from '../../assets/sigos.png'

export function Header(){
    const navigate = useNavigate();

    const homeNavigate = () =>{
        navigate('/Home')
    }

    return(
        <header className={style.header}>
            <img src={logo} className={style.logo} onClick={homeNavigate}/>
            <img src={sigla} className={style.sigla} />
        </header>
    );
}