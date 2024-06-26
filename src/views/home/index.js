import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const  Home = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/`, {method: 'GET'})
      .then((response) => response.json())
      .then((orders) => {
        setOrders(orders);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteOrder = (id) => {
    const question = window.confirm('¿Está seguro de eliminar el pedido?');
    
    if(!question) return;

    fetch(`${BASE_URL}/${id}`, {method: 'DELETE'})
      .then((data) => {
        const newOrders = orders.filter((order) => order.id !== id);
        setOrders(newOrders);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return(
    <div className='d-flex justify-content-center m-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-striped caption-top'>
              <caption>
                <span>Listado de pedidos a la farmacia</span>
                <button className='btn btn-success float-end' onClick={() => navigate('/order')}>Crear pedido</button>
              </caption>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Distribuidor</th>
                  <th>Direccion</th>
                  <th>Tipo de medicamento</th>
                  <th>Opciones</th>
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
                      <td>
                        <div className='btn-group' role='group' aria-label='Basic example'>
                          <button className='btn btn-sm btn-primary' onClick={() => navigate(`/order/${order.id}`)}>Editar</button>
                          <button className='btn btn-sm btn-danger' onClick={() => deleteOrder(order.id)}>Eliminar</button>
                        </div>
                      </td>
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

export default Home;
