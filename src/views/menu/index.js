import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  const onSubmitSearch = (e) => {
    e.preventDefault();
    const search = e.target[0].value;
    navigate("/search/" + search, {
      replace: true
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={()=>navigate("/")}>Farmacia</a>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/types" className="nav-link">Tipos</Link>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search" onSubmit={onSubmitSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Buscar por nombre" 
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required/>
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Menu;
