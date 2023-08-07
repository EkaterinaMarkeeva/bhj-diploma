/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
    constructor(...args) {
        super(...args);
    
        this.URL = '/transaction';
    }
}
