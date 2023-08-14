/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const incomeAccountsList = document.getElementById('income-accounts-list');
    const expenseAccountsList = document.getElementById('expense-accounts-list');
    
    let updateAccountList = (error, response) => {
      if (response.data) {
        const incomeOptions = Array.from(incomeAccountsList.querySelectorAll('option'));
        const expenseOptions = Array.from(expenseAccountsList.querySelectorAll('option'));
        
        clearOptions(incomeOptions);
        clearOptions(expenseOptions);
      
        response.data.forEach(elem => {
          incomeAccountsList.insertAdjacentHTML('beforeend', `<option value="${elem.id}">${elem.name}</option>`);
          expenseAccountsList.insertAdjacentHTML('beforeend', `<option value="${elem.id}">${elem.name}</option>`);
        });
      } else {
        console.log(error);
      }
    }

    Account.list(User.current(), updateAccountList);
    
    function clearOptions(options) {
      options.forEach(elem => elem.remove());
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    let updateTransaction = (error, response) => {
      if (response.success) {
        this.element.reset();
        
        let parent = this.element.closest('.modal');
        
        App.modals[parent.getAttribute('data-modal-id')].close();
        App.update();
      } else {
        console.log(error);
      }
    }
    
    Transaction.create(data, updateTransaction);
  }
}
