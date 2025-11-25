import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/loyoa.jpg';

function Login() {
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validar = () => {
    setError('');

    if (cedula.trim() === '') {
      setError('El campo cédula no puede estar vacío.');
      return;
    }

    fnDatos();
  };

  const limpiar = () => {
    setError('');
    setCedula('');
  };

  const fnDatos = () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
        //  console.log('✅ Certificados encontrados:', data.user);
          alert('Certificados encontrados ✅');
          navigate('/pdf', { state: { usuario: data.user } });
        } else {
          alert('❌ ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error al conectar con el servidor:', error);
        alert('Error al conectar con el servidor ❌');
      });
  };

  return (
    <section className="form-contain">
      <header>
        <img src={Logo} alt="Logo de Loyola" className="img-loyola" />
        <h1>Certificados COIL-SOIL</h1>
      </header>

      <form id="coilForm" className="form_loyola">
        <div className="input-group">
          <div className="input-field" id="nameInput">
            <i className="fa-solid fa-id-card"></i>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              id="cedula"
              name="cedula"
              placeholder="Cédula sin guiones"
            />
          </div>
          <span className="error-message" id="usernameError">{error}</span>
        </div>

        <div className="btn">
          <button type="button" onClick={validar} className="boton1" id="loginButton">
            Buscar
          </button>
          <button type="button" onClick={limpiar} className="boton2" id="cancelButton">
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
