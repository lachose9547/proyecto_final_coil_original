import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import Logo from '../img/loyoa.jpg'


function Login() {
    const [usuario, setUsuario]=useState('')
    const [password, setPassword]=useState('')
    const [errorU, setErroU]=useState('')
    const [errorP, setErrorP]=useState('')

const validar= () =>{
   
    if(usuario==''){
        setErroU('El nombre de usuario no puede estar vacío.')
    }

     if(password==''){
        setErrorP('La contraseña del usuario no puede estar vacío.')
    }
    if(usuario!= '' && password!= ''){
    
        
        fnDatos();
}

}
     const limpiar = () => {
    setErroU('');
    setErrorP('');
    setUsuario(''); 
    setPassword('');

  };


const fnDatos=()=>{
    fetch("http://localhost:3000/api/usuarios",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: usuario
    })          
  })
      .then(response => response.json())
      .then(data => {
        if(data.datos.length > 0){
          console.log('Datos Encontrados ✅!');
      alert('Datos Encontrados ✅!');
      navigate('/pdf', { state: { usuario: data.datos } });
  

        }else{
          alert('Datos no encontrados ❌!');
        }

        console.log(data.datos[0].usuario);
      })
      .catch(error => console.error(error));
  }

  const navigate = useNavigate();
 

    return (
    <section className="form-contain">
      <header>
        <img src={Logo} alt="Logo de Loyola" className="img-loyola" />
        <h1>Certificados COIL</h1>
      </header>

      <form id="coilForm" className="form_loyola">
        <div className="input-group">
          <div className="input-field" id="nameInput">
            <i className="fa-solid fa-user"></i>
            <input type="text" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            id="username" name="username" placeholder=" Usuario" />
          </div>
          <span className="error-message" id="usernameError">{errorU}</span>
        </div>

      
        <div className="input-group">
          <div className="input-field">
            <i className="fa-solid fa-lock"></i>
            <div className="password-container">
              <input className="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" id="password" name="password" placeholder="Contraseña" />
              <span id="passwordToggle"><i id="eyeIcon" className="fas fa-eye"></i></span>
            </div>
          </div>
          <span className="error-message" id="passwordError">{errorP}</span>
        </div>

        <div className="btn">
          <button type="button" onClick={() => validar()} className="boton1" id="loginButton">Buscar</button>
          <button type="button"onClick={() => limpiar()} className="boton2" id="cancelButton">Cancelar</button>
        </div>
      </form>

      <div id="message" role="status" aria-live="polite"></div>
    </section>
  )
}

export default Login
