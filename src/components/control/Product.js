import React from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { cartAddItem, startAlertMessage } from '../../actions'
import { formatPrice, numberInterval } from '../../api/Functions'
import FetchData from '../../api/FetchData'
import PreLoader from '../Loader'

const defaultProp = { count: 1, size: null, };

export default function ProductFull() {
  const [item, setItem] = useState({ full: null, load: true, error: null, });
  const [prop, setProp] = useState(defaultProp);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    new Promise((resolve, reject) => resolve(FetchData(`/items/${params.id}`)))
      .then(result => setItem(prev => ({ ...prev, load: false, full: result })))
      .catch(error => {
        dispatch(startAlertMessage('danger',
          `Вознилка ошибка на сервере: ${error.message}`));
        setItem(prev => ({ ...prev, load: false, error: error.message }))
      });
  }, []);
  const handleAddToCart = evt => {
    if (!prop.size) return;
    dispatch(cartAddItem(item.full, prop));
    dispatch(startAlertMessage('success',
      `Добавлено в корзину: "${item.full.title}" (${prop.count} шт)`));
    setProp(defaultProp);
  }
  const handleChangeSize = size =>
    setProp(prev => ({...prev, size: prev.size === size ? null : size, }));
  const handleChange = counter =>
    setProp(prev => ({...prev, count: numberInterval(prev.count + counter)}));
  return (
    <section className="catalog-item">
        <PreLoader loading={item.load} />
        { !item.load && item.full && !item.error &&
        <div className="row">
          <h2 className="text-center">{item.full.title}</h2>
            <div className="col-5">
                <img src={item.full.images[0]}
                    className="img-fluid" alt="" />
            </div>
            <div className="col-7">
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Артикул</td>
                            <td>{item.full.sku}</td>
                        </tr>
                        <tr>
                            <td>Производитель</td>
                            <td>{item.full.manufacturer}</td>
                        </tr>
                        <tr>
                            <td>Цвет</td>
                            <td>{item.full.color}</td>
                        </tr>
                        <tr>
                            <td>Материалы</td>
                            <td>{item.full.material}</td>
                        </tr>
                        <tr>
                            <td>Сезон</td>
                            <td>{item.full.season}</td>
                        </tr>
                        <tr>
                            <td>Повод</td>
                            <td>{item.full.reason}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <p>Размеры в наличии:
                      { item.full.sizes.map(o => o.avalible &&
                        <span key={o.size} className={"catalog-item-size" +
                        (o.size === prop.size ? " selected" : "")}
                        onClick={() => handleChangeSize(o.size)}>
                          {o.size}
                        </span>
                      ) }
                    </p>
                    <p>Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button className="btn btn-secondary"
                          onClick={() => handleChange(-1)}>-</button>
                        <span className="btn btn-outline-primary">{prop.count}</span>
                        <button className="btn btn-secondary"
                          onClick={() => handleChange(1)}>+</button>
                      </span>
                    </p>
                </div>
                <button
                  className="btn btn-danger btn-block btn-lg"
                  onClick={handleAddToCart} disabled={!prop.size && 'disabled'}>
                  В корзину
                </button>
            </div>
        </div>
      }
      { !item.load && !item.full &&
        <p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>
      }
    </section>
  )
}

export function ProductShort({item}) {
  return (
      <div className="col-4">
        <div className="card">
          <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
          <div className="card-body">
            <p className="card-text">{item.title}</p>
            <p className="card-text">{item.price} руб.</p>
            <a href={`/products/${item.id}`} className="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
  );
}
