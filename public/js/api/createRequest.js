/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    const {method, url, data, callback} = options;
    xhr.responseType = "json";

    try {
        if (method === 'GET') {
            xhr.open(method, url + getStringifyData(data));
            xhr.send();
        } else {
            xhr.open(method, url);
            xhr.send(getFormData(data));
        }
    } catch (err) {
        if (callback) callback(err);
    }

    if (callback) {
        try {
            xhr.onload = function() {
                if (String(xhr.status).startsWith(2)) { 
                    callback(xhr.response);
                }
            }
        } catch(err) {
            callback(err);
        }
    }

    function getStringifyData(data) {
        if (data) {
            let strData = '';
            let index = 0;

            for (let key in data) {
                strData += (index > 0 ? '&': '?') + key + '=' + data[key];
            }

            return strData;
        } else {
            return '';
        }
    }

    function getFormData(data) {
        if (data) {
            const formData = new FormData();

            for (let key in data) {
                formData.append(key, data[key]);
            }

            return formData;
        }
    }
};
