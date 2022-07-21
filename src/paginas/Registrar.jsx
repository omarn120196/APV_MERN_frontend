import { useState } from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repertirPassword, setrepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        const inputsFormulario = [nombre, email, password, repertirPassword];

        if(inputsFormulario.includes('')){

            setAlerta({msg: 'Hay campos vacios', error: true});
            return;
        }

        if(password !== repertirPassword){
            setAlerta({msg: 'Los password no son iguales', error: true});
            return;
        }

        if(password.length < 8){
            setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
            return;
        }

        setAlerta({});

        //Crear el usuario en la Api
        try {
            const datos = {nombre, email, password};

            await clienteAxios.post(`/veterinarios`, datos);
            setAlerta({
                msg: 'Creado Correctamente, revisa tu Email',
                error: false
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
                    Crea tu cuenta y Administra {""}  
                    <span className="text-black">tus pacientes</span>
                </h1>
            </div>

            <div className='mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}

                <form 
                    action=""
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            htmlFor="nombre" 
                            className="uppercase block text-gray-600 text-xl font-bold">
                            Nombre
                        </label>

                        <input
                            id="nombre" 
                            type="text" 
                            placeholder="Tu nombre" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value) }    
                        />
                            
                    </div>
                    
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
                            onChange={e => setEmail(e.target.value) }      
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            htmlFor="password" 
                            className="uppercase block text-gray-600 text-xl font-bold">
                            Password
                        </label>

                        <input 
                            id="password"
                            type="password" 
                            placeholder="Tu password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value) }      
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            htmlFor="repetir-password" 
                            className="uppercase block text-gray-600 text-xl font-bold">
                            Repetir password
                        </label>

                        <input 
                            id="repetir-password"
                            type="password" 
                            placeholder="Repite tu password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repertirPassword}
                            onChange={e => setrepetirPassword(e.target.value) }      
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto transition-all duration-300"/>
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500' 
                        to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link 
                        className='block text-center my-5 text-gray-500' 
                        to="/recuperar-password">Olvide  mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar;