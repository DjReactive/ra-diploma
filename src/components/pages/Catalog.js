import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchChangeValue } from '../../api/Search'
import Products from '../control/Products'
import Categories from '../control/Categories'

function Catalog(props) {
  const state = useSelector(state => state.searchItems);
  const dispatch = useDispatch();
  const [category, setCategory] = useState(0);
  const handleSubmit = evt => evt.preventDefault();
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Поиск"
          onChange={evt => searchChangeValue(evt, dispatch)}
          defaultValue={state.search} />
      </form>
      <Categories
        category={category}
        setCategory={setCategory} />
      <Products
        category={category}
        url="items" />
    </section>
  )
}

export default Catalog;
