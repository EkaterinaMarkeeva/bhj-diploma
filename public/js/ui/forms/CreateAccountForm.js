/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    let updateAccount = (error, response) => {
      if (response.account) {
        this.element.reset();
        
        App.modals.createAccount.close();
        App.update();
      } else {
        console.log(error);
      }
    }
    
    Account.create(data, updateAccount);
  }
}