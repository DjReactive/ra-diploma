import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchChangeValue, searchFormSubmit } from '../api/Search'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../img/header-logo.png'

function Header() {
  const state = useSelector(state => state.searchItems);
  const cart = useSelector(state => state.productCart);
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = evt => {
    (hidden || !searchFormSubmit(state.search)) && setHidden(prev => !prev);
  }

  const toCart = () => navigate('/cart');
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <HeaderMenu />
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={handleClick}></div>
                  <div className="header-controls-pic header-controls-cart" onClick={toCart}>
                    {cart.items.length > 0 &&
                      <div className="header-controls-cart-full">{cart.items.length}</div>
                    }
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form"
                  className={"header-controls-search-form form-inline" + (hidden ? " invisible" : "")}
                  onSubmit={evt => searchFormSubmit(
                    state.search, link => navigate(link)
                  )}>
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    onChange={evt => searchChangeValue(evt, dispatch)}
                    defaultValue={state.search} />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function HeaderMenu() {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Главная</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/catalog">Каталог</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">О магазине</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contacts">Контакты</Link>
      </li>
    </ul>
  )
}

export default Header;
