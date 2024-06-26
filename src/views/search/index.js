import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";

const  Search = () => {
  const navigate = useNavigate();
  let { name } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(name){
      fetch(`${BASE_URL}/search/${name}`, {method: 'GET'})
      .then((response) => response.json())
      .then((orders) => {
        if(orders.length === 0){
          alert('No se medicamentos con ese nombre');
          navigate('/');
        }else{
          setOrders(orders);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  }, [name]);

  return(
    <div className='d-flex justify-content-center m-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-striped caption-top'>
              <caption>
                <span>Items encontrados</span>
                <button className='btn btn-success float-end' onClick={() => navigate('/')}>Volver al home</button>
              </caption>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Distribuidor</th>
                  <th>Direccion</th>
                  <th>Tipo de medicamento</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
              {orders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.distributor}</td>
                      <td>{order.address}</td>
                      <td>{order.orderTypes.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
