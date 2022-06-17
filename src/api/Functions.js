// Сравнивает на совпадение a и b, не сравнивая свойства, указанные в disable
export function compareValues(a, b, ...disable) {
  for (const key in a) {
    if (!disable.some(o => o === key) && a[key] !== b[key])
      return false;
  }
  return true;
}

// Получает номер в формате '1 000'
export function formatPrice(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

// Получает все параметры из адресной строки и формирует объект
export function getUrlParams() {
  let params = {};
  const urlParams = new URLSearchParams(window.location.search);
  Array.from(urlParams.keys()).forEach(o => {

    const value = urlParams.get(o);
    if (!value)
      return;

    params = { ...params, [o]: value }
  });
  return params;
}

// Формирует из объекта параметров url для перехода
export function getUrlLink(objParams) {
  let arr = [], query = '';
  for (const [key, value] of Object.entries(objParams)) {
    if (value) arr.push(`${key}=${value}`);
  }
  return arr.join('&');
}

export function numberInterval(value, min = 1, max = 10) {
  return Math.max(1, Math.min(10, value));
}
