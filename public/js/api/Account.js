/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  constructor(...args) {
    super(...args);

    this.URL = '/account';
  }
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    createRequest({
      method: 'GET', 
      url: this.URL + '/' + id, 
      callback
    });
  }
}
