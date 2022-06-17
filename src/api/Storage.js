import { compareValues } from './Functions'

export default class Storage {
  constructor(name, defValue = []) {
    this.storage = localStorage;
    this.name = name;

    if (!this.get()) this.set(defValue);
  }

  set(value) {
    this.storage.setItem(this.name, JSON.stringify(value));
  }

  get() {
    const value = this.storage.getItem(this.name);
    return JSON.parse(value);
  }

  add(item) {
    let arr = this.get();
    arr.push(item);
    this.set(arr);
  }

  remove(item) {
    const remArr = this.get().filter(o => !compareValues(o, item));
    this.set(remArr);
    return remArr;
  }

  clear() {
    this.storage.clear();
  }
}
