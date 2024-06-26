import { useNavigate } from "react-router-dom";

function NoPage() {
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center mt-3'>
      <div className='card'>
        <div className='card-body align-self-center'>
          <h1 className="text-center">404</h1>
          <h4 className="text-center">Página no encontrada</h4>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger mt-4 ms-3" onClick={() => navigate("/")}>Volver al inicio</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
