import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartPurchaseItems, startAlertMessage } from '../../actions'

function Order() {
  const cart = useSelector(state => state.productCart);
  const [form, setForm] = useState({ phone: null, address: null, });
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart.success) dispatch(startAlertMessage('success', 'Заказ был успешно оформлен!'));
    if (cart.error) dispatch(startAlertMessage('danger', cart.error));
  }, [cart.error, cart.success]);

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(cartPurchaseItems({
      owner: {
        phone: form.phone,
        address: form.address,
      },
      items: cart.items,
    }));
  }
  const handleChange = (evt, name) => {
    let value = '';
    switch(name) {
      case 'phone':
        value = evt.target.value.replace(/(^\d{1})(\d{3})(\d{3})(\d{4,7})/, toPhone);
        evt.target.value = value;
        break;
      case 'address':
        value = evt.target.value;
        break;
      default:
        break;
    }
    setForm(prev => ({ ...prev, [name]: value, }));
  }
  function toPhone(match, p1, p2, p3, p4, offset, string) {
    return `+${p1}(${p2})${p3}-${p4}`;
  }
  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone"
              placeholder="Ваш телефон" onChange={evt => handleChange(evt, 'phone')} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address"
              placeholder="Адрес доставки" onChange={evt => handleChange(evt, 'address')}
              minLength="10" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">Оформить</button>
        </form>
      </div>
    </section>
  )
}

export default Order;
