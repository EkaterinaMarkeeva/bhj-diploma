/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('TransactionsPage constructor error');
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const btnRemoveAccount = document.querySelector('.remove-account');
    const btnsTransactionRemove = Array.from(document.querySelectorAll('.transaction__remove'));
    
    btnRemoveAccount.onclick = () => {
      this.removeAccount();
    }
    
    btnsTransactionRemove.forEach(elem => elem.onclick = () => {
      this.removeTransaction(elem.getAttribute('data-id'));
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      let result = confirm('Вы действительно хотите удалить счёт?');
      let updateApp = (error, response) => {
        if (response) {
          App.updateWidgets();
          App.updateForms();
        } else {
          console.log(error);
        }
      }

      if (result) {
        Account.remove({'id': this.lastOptions.account_id}, updateApp);
        this.clear();
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (this.lastOptions) {
      let result = confirm('Вы действительно хотите удалить эту транзакцию?');
      let updateTransaction = (error, response) => {
        if (response) {
          App.update();
        } else {
          console.log(error);
        }
      }

      if (result) {
        Transaction.remove({id}, updateTransaction);
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      let updateViewAccount = (error, response) => {
        if (response.data) {
          this.clear();
          this.renderTitle(response.data.name);
          this.lastOptions = options;
        } else {
          console.log(error);
        }
      }

      let updateView = (error, response) => {
        if (response.data) {
          for (let elem of response.data) {
            this.renderTransactions(elem);
          }
        } else {
          console.log(error);
        }
      };

      Account.get(options.account_id, updateViewAccount);
      Transaction.list(options, updateView);
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const contentTitle = document.querySelector('.content-title');

    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    if (!date) {
      return '';
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    let updateDate = new Date(date);
    updateDate = updateDate.toLocaleString("ru", options);
    return updateDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    if (!item || item.length === 0) {
      const transactions = Array.from(document.querySelectorAll('.transaction'));
      transactions.forEach(elem => elem.remove());
      return;
    }
    
    const content = document.querySelector('.content');
    let date = this.formatDate(item.created_at);

    content.insertAdjacentHTML("beforeend", `<div class="transaction transaction_${item.type} row"><div class="col-md-7 transaction__details"><div class="transaction__icon"><span class="fa fa-money fa-2x"></span></div><div class="transaction__info"><h4 class="transaction__title">${item.name}</h4><div class="transaction__date">${date}</div></div></div><div class="col-md-3"><div class="transaction__summ">${item.sum}<span class="currency">₽</span></div></div><div class="col-md-2 transaction__controls"><button class="btn btn-danger transaction__remove" data-id="${item.id}"><i class="fa fa-trash"></i></button></div></div>`);
    this.registerEvents();
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    this.getTransactionHTML(data);
  }
}
