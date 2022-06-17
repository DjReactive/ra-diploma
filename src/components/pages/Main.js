import { Fragment } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Products from '../control/Products'
import Categories from '../control/Categories'

function Main() {
  //const state = useSelector(state => state.searchItems);
  const [category, setCategory] = useState(0);
  return (
    <Fragment>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <Products category={0} url="top-sales" />
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Categories category={category} setCategory={setCategory} />
        <Products category={category} url="items" />
      </section>
    </Fragment>
  )
}

export default Main;
