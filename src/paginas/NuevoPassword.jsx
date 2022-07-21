import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    //Leer valores de la URL
    const params = useParams();
    const {token} = params;

    useEffect(()=>{
        const comprobarToken = async ()=>{
            try {
                await clienteAxios(`/veterinarios/recuperarPassword/${token}`);
                setAlerta({
                    msg: 'Coloca tu Nuevo Password'
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace', 
                    error: true
                });
            }
        }

        comprobarToken();
    }, []);

    const handleSubmit = async e=>{
        e.preventDefault();

        if(password.length < 8){
            setAlerta({
                msg: 'El password debe contener al menos 8 caracteres',
                error: true
            });
            return;
        }

        try {
            const url = `/veterinarios/recuperarPassword/${token}`;
            const {data} = await clienteAxios.post(url, {password});

            setAlerta({
                msg: data.msg
            });

            setPasswordModificado(true);

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
                    Reestablece tu password y no Pierdas Acceso {""}  
                    <span className="text-black">tus pacientes</span>
                </h1>
            </div>

            <div className='mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (
                    <>
                        <form action=""
                            onSubmit={handleSubmit}
                        >
                            <div className="my-5">
                                <label 
                                    htmlFor="password" 
                                    className="uppercase block text-gray-600 text-xl font-bold">
                                    Nuevo Password
                                </label>

                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="Tu nuevo password" 
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={password}
                                    onChange={e => setPassword(e.target.value) }      
                                />
                            </div>

                            <input 
                                type="submit" 
                                value="Reestablecer Password"
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto transition-all duration-300"/>
                        </form>

                        
                    </>
                )}

                {passwordModificado && 
                    <Link
                    className='block text-center my-5 text-gray-500' 
                    to="/">Iniciar Sesión</Link>
                }
                
            </div>
        </>
    )
}

export default NuevoPassword;