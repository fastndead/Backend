"use strict";

window.onload = function(){
	Run = new Run();
};

function Run(){

	this.view = new view();

	this.addPilot = function(pilot, callback){//добавление пилота
        this.requestDB('/pilots/',
            pilot, 'PUT', callback);
	};

	this.addPlane = function(plane, callback){//добавление самолёта
        this.requestDB('/planes/',
            plane, 'PUT', callback);
	};

	this.addFlight = function(flight, callback){//добавление рейса
        this.requestDB('/flights/',
            flight, 'PUT', callback);
	};

	this.removeFlight = function(id, callback){//удаление рейса
        this.requestDB('/flights/' + id["Id"],
            null, 'DELETE', callback);
	};

	this.removePlane = function(id, callback){//удаление самолёта
        this.requestDB('/planes/' + id["Id"],
            null, 'DELETE', callback);
	};

	this.editPlane = function(id, plane, callback){//редактирование самолёта
        this.requestDB('/planes/' + id["Id"],
            plane, 'POST', callback);
	};

	this.editPilot = function(id, pilot, callback){//редактирование пилота
        this.requestDB('/pilots/' + id["Id"],
            pilot, 'POST', callback);
	};

	this.editFlights = function(id, flight, callback){//редактирование рейса
	    console.log(flight);
        this.requestDB('/flights/' + id["Id"],
            flight, 'POST', callback);
	};

	this.getPlanes = function(){//запрос списка самолётов
		return $.get("/planes")
	};

    this.removePilot = function(id, callback) {//удаление пилота
        this.requestDB('/pilots/' + id["Id"], null, 'DELETE', callback);
    };

    this.refreshFlightTable = function(callback){//обновление таблицы рейсов
        return $.get("/flights/")
    };
    this.refreshPlaneTable = function(callback){//обновление таблицы самолётов
        return $.get("/planes/")
    };
    this.refreshPilotTable = function(callback){//обновление таблицы пилотов
        return $.get("/pilots/")
    };

    this.requestDB = function (url, data, type, callback) {//запрос к базе данных
        $.ajax({
            type: type,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function (data) {
            if(data["Err"] === false)
            {//если не произошло ошибки при запросе
                callback();//выполняем Callback функцию
            }
            else{//если произошла ошибка - выводим ошибку
                Run.view.error(data["ErrorText"])
            }
        }).fail(function (msg) {//если не удалось выполнить запрос - выводим ошибку
            view.error(msg)
        });
    };

    this.logOut = function () {//запрос на удаление аутентификации
        $.get({
            type: 'GET',
            url: '/logout',
            async: false
    });
        window.location = "/"
    }
}
