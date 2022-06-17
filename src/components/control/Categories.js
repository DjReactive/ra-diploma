import { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FetchData from '../../api/FetchData';
import { categoriesRequest } from '../../actions'

export default function Categories({category, setCategory}) {
  const catList = useSelector(state => state.categoriesList);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoriesRequest('/categories'))
  }, []);
  useEffect(() => {
    if (catList.loading || !catList.categories) return;

    if (catList.categories.length > 0)
      setCat([{ id: 0, title: 'Все', }, ...catList.categories]);
  }, [catList.categories]);
  const handleClick = id => setCategory(id);
  return (
    <Fragment>
      <ul className="catalog-categories nav justify-content-center">
        { cat.map(o =>
            <li className="nav-item" key={o.id}>
              <a className={"nav-link" + (category === o.id ? " active" : "")}
                onClick={() => handleClick(o.id)}>{o.title}
              </a>
            </li>
          )
        }
      </ul>
      { !catList.loading && catList.error && <p> Вознилка ошибка при загрзке категорий...</p> }
    </Fragment>
  )
}
