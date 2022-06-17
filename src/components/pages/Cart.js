import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartRemoveItem, startAlertMessage } from '../../actions'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../api/Functions'
import Order from '../control/Order'
import PreLoader from '../Loader'

function Cart() {
  const cart = useSelector(state => state.productCart);
  const dispatch = useDispatch();

  const handleSum = items => {
    let sum = 0;
    items.forEach(o => sum += o.price * o.count);
    return formatPrice(sum);
  }
  const handleRemoveItem = ({id, title}) => {
    dispatch(cartRemoveItem(id));
    dispatch(startAlertMessage('info', `Товар "${title}" был удален из корзины`))
  }
  return (
    <Fragment>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        { cart.items.length > 0 ?
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            { cart.items.map((o, idx) =>
              <tr key={o.id}>
                <td scope="row">{idx+1}</td>
                <td><Link to={`/products/${o.id}`}>{o.title}</Link></td>
                <td>{o.size}</td>
                <td>{o.count}</td>
                <td>{formatPrice(o.price)} руб.</td>
                <td>{formatPrice(o.price * o.count)} руб.</td>
                <td><button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveItem(o)}>
                    Удалить
                  </button>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{handleSum(cart.items)} руб.</td>
            </tr>
          </tbody>
        </table>
        : <>
            <p>Добавьте товары в корзину, и тогда они появятся здесь :)</p>
            <Link to='/'>Перейти к покупкам</Link>
          </>
        }
      </section>
      <PreLoader loading={cart.loading} />
      { !cart.loading && cart.items.length > 0  && <Order /> }
    </Fragment>
  )
}

export default Cart;
