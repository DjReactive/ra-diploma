import { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductShort } from './Product'
import { getUrlLink } from '../../api/Functions'
import PreLoader from '../Loader'
import FetchData from '../../api/FetchData';
import { getItemsRequest, startAlertMessage } from '../../actions'

export default function Products({url, category}) {
  const offsetLen = 6;
  const search = useSelector(state => state.searchItems);
  const state = useSelector(state => state.productsList);
  const [data, setData] = useState({
     items: [], offset: 0, end: false, error: null, load: true, category,
   });
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.loading) return;
    if (category !== data.category) {
      setData(prev => ({...prev, category, items: [], offset: 0, load: true, }))
    } else {
      setData(prev => ({...prev, load: true, }));
    }
    dispatch(getItemsRequest({
        path: `/${url}`, categoryId: category, offset: data.offset, q: search.search,
      }, items => {
        setData(prev => ({ ...prev,
          items: prev.offset > 0 ? prev.items.concat(items) : items,
          end: items < offsetLen,
          load: false,
        }))
      }, error => {
        dispatch(startAlertMessage('danger', error.message));
        setData(prev => ({ ...prev, error: error.message, load: false, }));
      }
    ));
  }, [category, data.offset]);

  useEffect(() => {
    if (state.loading) return;
    setData(prev => ({ ...prev, offset: 0, end: false, items: search.items }));
  }, [search.items]);

  return (
    <Fragment>
      <div className="row">
        {data.items.map(o => <ProductShort key={o.id} item={o} />)}
      </div>
      <PreLoader loading={ data.load || search.loading } />
      <ButtonLoadMore
        setOffset={setData}
        visible={
          !data.load && !data.end && !state.error && data.items.length >= offsetLen
        } />
      {
        data.items.length < 1 && !data.load && !search.loading && !data.error &&
        <p>К сожалению, не удалось найти товары по вашему запросу</p>
      }
      {
        !data.load && data.error &&
        <p>Произошла ошибка на сервере. Попробуйте снова.</p>
      }
    </Fragment>
  )
}

function ButtonLoadMore({visible, setOffset}) {
  const handleClickLoad = () => setOffset(prev => ({...prev, offset: prev.offset + 6 }));
  return (
      <div className="text-center">
      { visible &&
        <button className="btn btn-outline-primary" onClick={handleClickLoad}>
          Загрузить ещё
        </button>
      }
      </div>
  )
}
