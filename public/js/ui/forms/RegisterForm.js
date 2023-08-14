/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    function authorize(err, response) {
      if (response.user) {
        App.setState('user-logged');
        App.modals.register.close();
      } else {
        alert(err);
      }
    }

    User.register(data, authorize);
  }
}
