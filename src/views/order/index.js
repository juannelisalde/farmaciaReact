import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../../constants";

const Order = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [distributor, setDistributor] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [distributors, setDistributors] = useState(["Cofarma","Empsephar","Cemefar"]);
  
  useEffect(() => {
    if(id){
      fetch(`${BASE_URL}/${id}`, {method: 'GET'})
        .then((response) => response.json())
        .then((order) => {
          if(order.status === 404){
            alert('No se encontró el pedido');
            navigate('/');
          }else{
            setName(order.name);
            setQuantity(order.quantity);
            setDistributor(order.distributor);
            setAddress(order.address);
            setType(order.type);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:9000/farmacia/tipos', {method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickSave = (e) => {
    e.preventDefault();
    
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        quantity: quantity,
        distributor: distributor,
        address: address,
        type: type
      })
    }).then((data) => {
      if(data.status !== 200){
        alert('Error al crear el pedido');
      }else{
        alert('Pedido creado');
        navigate('/');
      }
    })
    .catch((err) => {
      console.log("hola2", err);
    });
  };

  const onClickUpdate = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        quantity: quantity,
        distributor: distributor,
        address: address,
        type: type
      })
    }).then((data) => {
      if(data.status !== 200){
        alert('Error al actualizar el pedido');
      }else{
        alert('Pedido actualizado');
        navigate('/');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className='d-flex justify-content-center mt-3'>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={id ? onClickUpdate : onClickSave}>
            {
              id 
              ?
                <div className='row mb-2'>
                  <label>id 
                    <input 
                      className='form-control' 
                      type="text" 
                      value={id} 
                      disabled/>
                  </label>
                </div>
              : ""
            }
            <div className='row mb-2'>
              <label>Nombre 
                <input 
                  className='form-control' 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required/>
              </label>
            </div>
            <div className='row mb-2'>
              <label>Tipo 
                <select 
                  className='form-control' 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required>
                  <option value="" disabled>Seleccione...</option>
                  {
                    types.map((type) => {
                      return <option key={type.id} value={type.id}>{type.type}</option>
                    })
                  }
                </select>
              </label>
            </div>
            <div className='row mb-2'>
              <label>Cantidad 
                <input 
                  className='form-control' 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                  min={1}
                  max={1000}
                  required/>
              </label>
            </div>
            <div className='mb-2'>
              <div>
                <label>Distribuidor</label>
              </div>
              {
                distributors.map((item) => {
                  return (
                    <div className="form-check form-check-inline" key={item}>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="inlineRadioOptions" 
                        id="inlineRadio1" 
                        value={item} 
                        checked={item === distributor} 
                        onChange={(e) => setDistributor(e.target.value)} 
                        required/>
                      <label className="form-check-label">{item}</label>
                    </div>
                  );
                })
              }
            </div>
            <div className='row mb-2'>
              <label>Dirección 
                <textarea 
                  className='form-control' 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={200}
                  required></textarea>
              </label>
            </div>
            {
              id 
              ? <button type="submit" className='btn btn-primary'>Editar</button>
              : <button type="submit" className='btn btn-primary'>Crear</button>
            }
            <button type="button" className='btn btn-danger float-end' onClick={() => navigate('/')}>Volver</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
