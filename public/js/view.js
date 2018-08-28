function view(){
	var tempIndex;

	 webix.ui({//форма добавления рейса
            view:"window",
            id:"addFlightWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Введите данные о рейсе:",
            body: {
				view:"form",
                id: "addFlightBody",
				borderless:true,
				elements: [
					{ view:"text", label:'Город отправления', id:"destination1"},
					{ view:"text", label:'Город прибытия', id:"destination2"},
					{ view:"multiselect", separator:", ",id : "pilotSelect", label:"Пилот"},
					{ view:"richselect",id:"planeSelect", label:"Самолёт"},
					{cols:[
						{ view:"button", id:"flightAddBtn", value: "Добавить", click:"Run.view.addFlight"},
						{view: "button", id:"flightEditBtn", value: "Изменить", click:"Run.view.editFlight", hidden:true},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addFlightWin").hide();
								$$("destination1").setValue("");
								$$("destination2").setValue("");
								$$("pilotSelect").setValue("");
								$$("planeSelect").setValue("");

							}
						},
					]}
					
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма добавления пилота
            view:"window",
            id:"addPilotWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Введите данные пилота:",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Имя', id:"firstName"},
						{view:"text", label:'Фамилия', id:"lastName"},
						{view:"button", id:"addPilotBtn", onItemClick:"Run.view.addPilot", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPilotWin").hide();
							}
						},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма справочника пилотов
            view:"window",
            id:"pilotsInfoWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Пилоты",
            body:{
				view:"form",
				borderless:true,
				elements: [
					{cols:[
						{view:"button", value:"Добавить",click:function(){
							Run.view.showWindows("addPilotWin");
						}, fillspace: 1},
						{view:"button", value:"Изменить",click:function(){
								Run.view.editPilot();
						}, fillspace: 1},
						{view:"button", value:"Удалить",click:function(){
							Run.view.removePilot();
						},  fillspace: 1}
					]},
					{view:"datatable",
					id: "pilotsGrid",
					columns:[
						{id: "index", header: "№", fillspace: 1},
						{id: "FirstName", header:"Имя", fillspace: 2, height: 30},
						{id: "LastName", header:"Фамилия", fillspace: 2, height: 30}
					],
					editable: true,
                    editaction:"custom",
                    navigation:true,
                    select:"row",
					scheme:{
			    		$init:function(obj){ obj.index = this.count(); }
					},
					height: 300
					},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("pilotsInfoWin").hide();
							}
						},
					],
					elementsConfig:{
						labelPosition:"top",
					}
				}
        });


	webix.ui({//форма справочника самолётов
            view:"window",
            id:"planesInfoWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Самолёты",
            body:{
				view:"form",
				borderless:true,
				elements: [
					{cols:[
						{view:"button", value:"Добавить", fillspace: 1, click:function(){Run.view.showWindows("addPlaneWin");}},
						{view:"button", value:"Изменить", fillspace: 1, click:function(){Run.view.editPlane();}},
						{view:"button", value:"Удалить",  fillspace: 1,  click:function(){Run.view.removePlane();}},
					]},
					{view:"datatable",
					id: "planesGrid",
					columns:[
						{id: "index", header: "№", fillspace: 1},
						{id: "Name", header:"Имя", fillspace: 2}
					],
					editable: true,
					editaction:"custom",
                    navigation:true,
                    select:"row",
					scheme:{
			    		$init:function(obj){ obj.index = this.count(); }
					},
					height: 300
					},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("planesInfoWin").hide();
							}
						}
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма добавления самолёта
            view:"window",
            id:"addPlaneWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Введите данные самолёта:",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Название', id:"planeNameAdd"},
						{view:"button",id:"addPlaneBtn", onItemClick:"Run.view.addPlane", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPlaneWin").hide();
							}
						},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

    webix.ui({//форма изменения самолёта
            view:"window",
            id:"editPlaneWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Редактирование",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Введите номер самолёта', id:"planeIndexToEdit"},
						{view:"text", label:'Измените название', id:"planeName", hidden: true},
						{cols:[
						{view:"button", click:"Run.view.editPlane", value:"Изменить", fillspace: 1},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
										$$("editPlaneWin").hide();
										$$("planeName").setValue("");
										$$("planeName").hide();
										$$("planeIndexToEdit").show();
									}
								},]}
						]
				},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });


    webix.ui({//форма удаления самолёта
		view: "window",
		id: "removePlaneWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер самолёта:", id:"removePlaneIndex"},
				{cols:[
					{view:"button", id : "removePlaneBtn", label:"Удалить", click:"Run.view.removePlane"},
					{view:"button", value:"Закрыть", click:function(){
									$$("deletePilotWin").hide();
									$$("removePilotIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});	
	webix.ui({//форма удаления рейса
		view: "window",
		id: "removeFlightWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер рейса:", id:"removeFlightIndex"},
				{cols:[
					{view:"button", id : "removeFlightBtn", label:"Удалить", click:"Run.view.removeFlight"},
					{view:"button", value:"Закрыть", click:function(){
									$$("removeFlightWin").hide();
									$$("removeFlightIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});


	this.editFlight = function(){
        var index = $$("grid").getSelectedItem();
        var pilotIndexList =  $$("pilotSelect").getValue().split(', ');
        $(pilotIndexList).each(function (i,val) {
            pilotIndexList[i] = parseInt(pilotIndexList[i], 10)
        })
        let flight = {"IdPlane": $$("planeSelect").getValue(), "IdPilot": pilotIndexList,
            "ArrivalPoint": $$("destination2").getValue(), "DeparturePoint": $$("destination1").getValue()};
        $.ajax({
            type: 'POST',
            url: 'http://localhost:9000/flights/' + index["Id"],
            contentType: 'application/json',
            data: JSON.stringify(flight),
        }).done(function () {
            webix.message("Добавление прошло успешно!");
            Run.view.refreshFlightTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
        });
        $$("addFlightWin").hide();
        $$("destination1").setValue("");
        $$("destination2").setValue("");
        $$("pilotSelect").setValue("");
        $$("planeSelect").setValue("");
	};

	this.showWindows= function(targetWindow){
		$$(targetWindow).show();
	};

	this.addPilot = function(){
        let pilot =  {"FirstName" : $$("firstName").getValue(), "LastName" : $$('lastName').getValue()};
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:9000/pilots',
            contentType: 'application/json',
            data: JSON.stringify(pilot),
        }).done(function () {
            webix.message("Добавление прошло успешно!");
            Run.view.refreshPilotsTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
        });
        $$('firstName').setValue('');
        $$('lastName').setValue('');
        $$("addPilotWin").hide();
	};

	this.addFlight = function(){
		var pilotIndexList =  $$("pilotSelect").getValue().split(', ');
		$(pilotIndexList).each(function (i,val) {
			pilotIndexList[i] = parseInt(pilotIndexList[i], 10)
        })
		let flight = {"IdPlane": $$("planeSelect").getValue(), "IdPilot": pilotIndexList,
			"ArrivalPoint": $$("destination2").getValue(), "DeparturePoint": $$("destination1").getValue()};
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:9000/flights',
            contentType: 'application/json',
            data: JSON.stringify(flight),
        }).done(function () {
            webix.message("Добавление прошло успешно!");
            Run.view.refreshFlightTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
        });
		$$("addFlightWin").hide();
		$$("destination1").setValue("");
		$$("destination2").setValue("");
		$$("pilotSelect").setValue("");
		$$("planeSelect").setValue("");
	};

	this.editPilot = function(){
        item = $$("pilotsGrid").getSelectedItem();
		if(item != undefined){
            Run.view.showWindows("addPilotWin");
            $$("firstName").setValue(item["FirstName"]);
            $$("lastName").setValue(item["LastName"]);
            $$("addPilotBtn").detachEvent("onItemClick", Run.view.addPilot);
            $$("addPilotBtn").attachEvent("onItemClick", Edit);

            function Edit() {
            	let pilot = {"FirstName": $$("firstName").getValue(), "LastName":  $$("lastName").getValue()};
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:9000/pilots/' + item["Id"],
                    contentType: 'application/json',
                    data: JSON.stringify(pilot),
                }).done(function () {
                    webix.message("Добавление прошло успешно!");
                    Run.view.refreshPilotsTable();
                }).fail(function (msg) {
                    webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
                });
                $$("addPilotBtn").detachEvent("onItemClick", Edit);
                $$("addPilotBtn").attachEvent("onItemClick", Run.view.addPilot);
                $$('firstName').setValue('');
                $$('lastName').setValue('');
                $$("addPilotWin").hide();
            }
		}
        else {
        	webix.message({type: "error", text: "Выберите пилота для редактирования!"});
		}
		// 	tempIndex = $$("firstNameEdit").getValue();
		// 	if(!Run.pilotProvider.indexValidator(tempIndex)){
		// 		var message = "Неправильный номер пилота!";
		// 		webix.message({ type:"error", text:message });
		// 		return;
		// 	}
		// 	$$("lastNameEdit").show();
		// 	$$("lastNameEdit").setValue(Run.planeProvider.getByIndex(tempIndex-1));
		// 	$$("lastNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getLastName());
		// 	$$("firstNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getFirstName());
		// 	return;
		// }
		// Run.editPilot($$("firstNameEdit").getValue(), $$("lastNameEdit").getValue(), tempIndex -1);
		// $$("editPilotWin").hide();
		// $$("firstNameEdit").setValue("");
		// $$("lastNameEdit").hide();
		// Run.view.refreshPilotsTable();
	};

	this.addPlane = function(){
		var plane =  {"name" : $$("planeNameAdd").getValue()};
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:9000/planes',
            contentType: 'application/json',
            data: JSON.stringify(plane),
        }).done(function () {
            webix.message("Добавление прошло успешно!");
            Run.view.refreshPlanesTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
        });
		$$("addPlaneWin").hide();
		$$("planeNameAdd").setValue("");
	};

	this.editPlane = function(){
        item = $$("planesGrid").getSelectedItem();
        if(item != undefined){
            Run.view.showWindows("addPlaneWin");
            $$("planeNameAdd").setValue(item["Name"]);
            $$("addPlaneBtn").detachEvent("onItemClick", Run.view.addPlane);
            $$("addPlaneBtn").attachEvent("onItemClick", Edit);

            function Edit() {
                let plane = {"Name": $$("planeNameAdd").getValue()};
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:9000/planes/' + item["Id"],
                    contentType: 'application/json',
                    data: JSON.stringify(plane),
                }).done(function () {
                    webix.message("Добавление прошло успешно!");
                    Run.view.refreshPlanesTable();
                }).fail(function (msg) {
                    webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
                });
                $$("addPlaneBtn").detachEvent("onItemClick", Edit);
                $$("addPlaneBtn").attachEvent("onItemClick", Run.view.addPlane);
                $$('planeNameAdd').setValue('');
                $$("addPlaneWin").hide();
            }
        }
        else {
            webix.message({type: "error", text: "Выберите пилота для редактирования!"});
        }
	};

	this.removePilot = function(){
        var index = $$("pilotsGrid").getSelectedItem();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:9000/pilots/' + index["Id"],
            contentType: 'application/json',
			success: function () {
                webix.message("Удаление прошло успешно!");
                Run.view.refreshPilotsTable();
            }
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так" })
        });
	};

	this.removeFlight = function(){
        var index = $$("grid").getSelectedItem();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:9000/flights/' + index["Id"],
            contentType: 'application/json',
        }).done(function () {
            webix.message("Удаление прошло успешно!");
            Run.view.refreshFlightTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так" })
        });
	};

	this.removePlane = function(){
        var index = $$("planesGrid").getSelectedItem();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:9000/planes/' + index["Id"],
            contentType: 'application/json',
        }).done(function () {
            webix.message("Удаление прошло успешно!");
            Run.view.refreshPlanesTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так" })
        });
	};

	this.refreshPilotsTable = function(){
		$$('pilotsGrid').clearAll();
        webix.ajax("http://localhost:9000/pilots/", function (text, data) {
            $$("pilotsGrid").parse(data.json()["Data"]);
        });
	};

	this.refreshFlightTable = function(){
		$$('grid').clearAll();

        var getReq = $.get('http://localhost:9000/flights/')
			.done(function (data) {
			$$('grid').parse(data["Data"]);
			$$('grid').adjustRowHeight();
		});
	};

	this.refreshPlanesTable = function(){
		$$('planesGrid').clearAll();
        webix.ajax("http://localhost:9000/planes/", function (text, data) {
            $$("planesGrid").parse(data.json()["Data"]);
        });
	};

	this.refreshSelects = function(){
        $.get("http://localhost:9000/planes")
			.done(function (data) {
				let temp =[];
                $(data["Data"]).each(function (i, val) {
                    temp.push({id: val["Id"], value: val["Name"]});
                });
                $$("planeSelect").define("options", temp);
                $$("planeSelect").refresh();
            });
        $.get("http://localhost:9000/pilots")
			.done(function (data) {
                let temp = [];
                $(data["Data"]).each(function (i, val) {
                    temp.push({id: val["Id"], value: val["FirstName"] + " " + val["LastName"]});
                });
                $$("pilotSelect").define("options", temp);
                $$("pilotSelect").refresh();
            });


	}
}

webix.ready(function(){
	webix.debug = true;
		webix.ui({
		rows: [
			{type: "header", template: "Аэропорт", css: {
              											"font-family"	:"'Comfortaa', cursive;",
              											"font-size"		: "20px;",
              											"text-align"	:"center;",
            											"margin-top"	: "15px;",
            											"box-shadow":"0 0 30px rgba(0,0,0,0.5);"}
            },
          
			{ view:"toolbar", elements:[
				{view:"button", value:"Добавить рейс", click: function(){Run.view.showWindows("addFlightWin"); Run.view.refreshSelects(); $$("flightEditBtn").hide(); $$("flightAddBtn").show()},  height: 50},
				{view:"button", value:"Справочник пилотов", click: function(){Run.view.showWindows("pilotsInfoWin"); Run.view.refreshPilotsTable();}, height: 50},
				{view:"button", value:"Справочник самолётов", click: function(){Run.view.showWindows("planesInfoWin"); Run.view.refreshPlanesTable();}, height: 50},
			]},

			{view:"datatable",
			id: "grid",
			columns:[
				{id: "index", header:"№", fillspace: 1},
				{id: "PilotName", header:"Пилот", fillspace: 3},
				{id: "PlaneName", header:"Самолёт", fillspace: 2},
				{id:"DeparturePoint", header:"Из", fillspace: 2},
				{id: "ArrivalPoint", header:"В", fillspace: 2}
			],
			 editable:true,
             editaction:"custom",
             fixedRowHeight:false,
             scrollX:false,
             navigation:true,
                select:"row",
			scheme:{
        	$init:function(obj){ obj.index = this.count(); }
    		},
                on:{
                    "onresize":webix.once(function(){
                        this.adjustRowHeight("PilotName", true);
                    })
                }
			},
			{cols:[ 
				{view:"button",css: "menu", value:"Редактировать",click:function(){if($$("grid").getSelectedItem() != undefined){Run.view.showWindows("addFlightWin");Run.view.refreshSelects(); $$("flightEditBtn").show(); $$("flightAddBtn").hide();}}, height: 50},
				{view:"button",css: "menu", value:"Удалить",click: function(){Run.view.removeFlight()} ,height: 50}
			]},
		]
	});
	Run.view.refreshFlightTable()
});