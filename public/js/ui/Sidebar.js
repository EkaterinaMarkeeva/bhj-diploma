/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');

    sidebarToggle.onclick = function() {
      let open = body.className.indexOf('sidebar-open');

      if (open < 0) {
        body.classList.add('sidebar-open');
        body.classList.remove('sidebar-collapse');
      } else {
        body.classList.remove('sidebar-open');
        body.classList.add('sidebar-collapse');
      }
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const btnMenuLogin = document.querySelector('.menu-item_login');
    const btnMenuRegister = document.querySelector('.menu-item_register');
    const btnMenuLogout = document.querySelector('.menu-item_logout');
    
    btnMenuLogin.onclick = function() {
      App.getModal('login').open();
    }

    btnMenuRegister.onclick = function() {
      App.getModal('register').open();
    }
    
    btnMenuLogout.onclick = function() {
      User.logout(() => App.setState('init'));
    }
  }
}
