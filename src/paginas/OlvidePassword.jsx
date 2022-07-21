import { useState } from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {

    const [email, setEmail] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e=>{
        e.preventDefault();

        if(email === ''){
            setAlerta({msg: 'El email es obligatorio', error: true});
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/recuperarPassword', {email});

            console.log(data);
            setAlerta({
                msg: data.msg
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const {msg} = alerta;

    return (
        <>
            <div className='mt-20 md:mt-5 px-5'>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera tu acceso y no pierdas {""}  
                    <span className="text-black">tus pacientes</span>
                </h1>
            </div>

            <div className='mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}

                <form action=""
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            htmlFor="email" 
                            className="uppercase block text-gray-600 text-xl font-bold">
                            Email
                        </label>

                        <input
                            id="email" 
                            type="email" 
                            placeholder="Email de registro" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Enviar Instrucciones"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto transition-all duration-300"/>
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500' 
                        to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link
                        className='block text-center my-5 text-gray-500' 
                        to="/registrar">¿No tienes una cuenta? Registrate</Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword;