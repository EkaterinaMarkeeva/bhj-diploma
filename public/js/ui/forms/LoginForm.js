/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    function authorize(err, response) {
      if (response.user) {
        App.setState('user-logged');
        App.modals.login.close();
      } else {
        alert(err);
      }
    }

    User.login(data, authorize);
  }
}
