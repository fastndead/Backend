"use strict";

window.onload = function(){
	Run = new Run();
};

function Run(){

	this.view = new view();

	this.addPilot = function(pilot, callback){
        this.requestDB('http://localhost:9000/pilots/',
            pilot, 'PUT', callback);
	};

	this.addPlane = function(plane, callback){
        this.requestDB('http://localhost:9000/planes/',
            plane, 'PUT', callback);
	};

	this.addFlight = function(flight, callback){
        this.requestDB('http://localhost:9000/flights/',
            flight, 'PUT', callback);
	};

	this.removeFlight = function(id, callback){
        this.requestDB('http://localhost:9000/flights/' + id["Id"],
            null, 'DELETE', callback);
	};

	this.removePlane = function(id, callback){
        this.requestDB('http://localhost:9000/planes/' + id["Id"],
            null, 'DELETE', callback);
	};

	this.editPlane = function(id, plane, callback){
        this.requestDB('http://localhost:9000/planes/' + id["Id"],
            plane, 'POST', callback);
	};

	this.editPilot = function(id, pilot, callback){
        this.requestDB('http://localhost:9000/pilots/' + id["Id"],
            pilot, 'POST', callback);
	};

	this.editFlights = function(id, flight, callback){
	    console.log(flight);
        this.requestDB('http://localhost:9000/flights/' + id["Id"],
            flight, 'POST', callback);
	};

	this.getPlanes = function(){
		return $.get("http://localhost:9000/planes")
	};

    this.removePilot = function(id, callback) {
        this.requestDB('http://localhost:9000/pilots/' + id["Id"], null, 'DELETE', callback);
    };

    this.refreshFlightTable = function(callback){
        return $.get("http://localhost:9000/flights/")
    };
    this.refreshPlaneTable = function(callback){
        return $.get("http://localhost:9000/planes/")
    };
    this.refreshPilotTable = function(callback){
        return $.get("http://localhost:9000/pilots/")
    };

    this.requestDB = function (url, data, type, callback) {
        $.ajax({
            type: type,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function (data) {
            if(data["Err"] === false)
            {
                callback();
            }
            else{
                Run.view.error(data["ErrorText"])
            }
        }).fail(function (msg) {
            view.error(msg)
        });
    };

    this.logOut = function () {
        $.get({
            type: 'GET',
            url: 'http://localhost:9000/logout',
            async: false
    });
        window.location = "http://localhost:9000/"
    }
}
