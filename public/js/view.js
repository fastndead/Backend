function view(){

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
						{ view:"button", id:"addFlightBtn", value: "Добавить"},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addFlightWin").hide();
								$$("destination1").setValue("");
								$$("destination2").setValue("");
								$$("pilotSelect").setValue("");
								$$("planeSelect").setValue("");
                                $$("addFlightBtn").setValue("Добавить");

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
						{view:"button", id:"addPilotBtn", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPilotWin").hide();
								$$("firstName").setValue("");
								$$("lastName").setValue("");
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
						{view:"button",id:"addPlaneBtn", value:"Добавить", fillspace: 1},
                            {view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
                                    $$("addPlaneWin").hide();
                                    $$("planeNameAdd").setValue("");
                                }
                            },
						]
				},

                ],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	this.showWindows= function(targetWindow){//функция для вывода окон по id
		$$(targetWindow).show();
	};

	this.addPilot = function(){//добавление нового пилота
		if($$("firstName").getValue().trim("") !== "" && $$('lastName').getValue().trim("") !== "") {
			//если данные о пилоте заполнены - создаём экземпляр пилота
			let pilot =  {"FirstName" : $$("firstName").getValue(), "LastName" : $$('lastName').getValue()};
			Run.addPilot(pilot, function () {//передаём в контроллер данные о пилоте и
											//функцию, очищающую поля формы
				Run.view.refreshPilotTable();
				$$('firstName').setValue('');
				$$('lastName').setValue('');
				$$("addPilotWin").hide();
			});
		}
        else{//если поля не заполнены - выводим сообщение об ошибике
        	Run.view.error("Введите данные полностью!")
		}

    };

	this.addFlight = function(){//добавление нового рейса
		let pilotIdList =  $$("pilotSelect").getValue().split(', ');//достаём информацию о рейсе
		$(pilotIdList).each(function (i) {
			pilotIdList[i] = parseInt(pilotIdList[i], 10)
        });
		if($$("destination1").getValue().trim(" ") !== "" && $$("destination2").getValue().trim(" ") !== "") {
			//если информация о рейсе заполнена - создаём новый экземпляр рейса и передаём его в контроллер
            let flight = {
                "IdPlane": $$("planeSelect").getValue(), "IdPilot": pilotIdList,
                "ArrivalPoint": $$("destination2").getValue(), "DeparturePoint": $$("destination1").getValue()
            };
            Run.addFlight(flight, function () {//передаём рейс в контроллер с функцией очистки полей ввода
            									//и обновления таблицы рейсов
                Run.view.refreshFlightTable();
                $$("addFlightWin").hide();
                $$("destination1").setValue("");
                $$("destination2").setValue("");
                $$("pilotSelect").setValue("");
                $$("planeSelect").setValue("");
            });
        }
        else{//если поля не заполнены - вывоим сообщение об ошибке
			Run.view.error("Введите данные полностью!")
		}
	};

	this.addPlane = function(){//добавление нового самолёта
		if($$("planeNameAdd").getValue().trim(" ") !== "") {//если данные о самолёте введены
			//создаём новый экземпляр самолёта
            let plane = {"name": $$("planeNameAdd").getValue()};
            Run.addPlane(plane, function () {//отправляем экземпляр самолёта в контроллер
            	//с функцией обновления таблицы самолётов и очисткой полей
                Run.view.refreshPlaneTable();
                $$("addPlaneWin").hide();
                $$("planeNameAdd").setValue("");
            });
        }
       	else{//если данные не введены - выводим ошибку
       		Run.view.error("Введите данные полностью");
		}

	};

    this.editPilot = function(){//изменение данных пилота
        let id = $$("pilotsGrid").getSelectedItem();//выбираем нужного пилота
        if(id !== undefined){//если пилот выбран
            Run.view.showWindows("addPilotWin");//заполняем поля ввода информацией
                                                //редактируемого рейса
            $$("firstName").setValue(id["FirstName"]);
            $$("lastName").setValue(id["LastName"]);
            $$("addPilotBtn").detachEvent("onItemClick", Run.view.addPilot);
            $$("addPilotBtn").attachEvent("onItemClick", Edit);//меняем событие на кнопке добавления пилота

            function Edit() {//функция редактирования, вызываемая по кнопке редактирования
                if($$("firstName").getValue().trim("") !== "" && $$('lastName').getValue().trim("") !== "") {
                    //если данные о пилоте введены - создаём экземпляр пилота
                    let pilot = {"FirstName": $$("firstName").getValue(), "LastName":  $$("lastName").getValue()};
                    Run.editPilot(id, pilot, function () {//передаём экземпляр пилота в контроллер
                        //с функцией для смены событий на кнопке и очисткой полей
                        Run.view.refreshPilotTable();
                        $$("addPilotBtn").detachEvent("onItemClick", Edit);
                        $$("addPilotBtn").attachEvent("onItemClick", Run.view.addPilot);
                        $$('firstName').setValue('');
                        $$('lastName').setValue('');
                        $$("addPilotWin").hide();
                        Run.view.refreshFlightTable();
                    });
                }
                else {//если данные не введены - выводим ошибку
                    Run.view.error("Введите данные полностью")
                }
            }
        }
        else {//если пилот не выбран - выводим ошибку
            webix.message({type: "error", text: "Выберите пилота для редактирования!"});
        }
    };

    this.editFlight = function(){//изменение информации о самолёте
        let id = $$("grid").getSelectedItem();//Выбор информации о рейсе для редактирования
        if(id !== undefined){//если рейс для редактирования выбран
            Run.view.showWindows("addFlightWin");//открываем форму для редактирования
            Run.view.refreshSelects();//обновляем списки с пилотами и самолётами
            $$("destination1").setValue(id["DeparturePoint"]);//заполняем поля данными для редактирования
            $$("destination2").setValue(id["ArrivalPoint"]);
            $$("pilotSelect").setValue(id["IdPilot"]);
            $$("planeSelect").setValue(id["IdPlane"]);
            $$("addFlightBtn").detachEvent("onItemClick", Run.view.addFlight);
            $$("addFlightBtn").attachEvent("onItemClick", Edit);//добавляем новое событие на кнопку предварительно удалив предыдущее
            $$("addFlightBtn").setValue("Изменить");//меняем значение кнопки с "добавить" на "изменить"


            function Edit() {//вызывается при нажатии кнопки "Изменить"

                let pilotIdList =  $$("pilotSelect").getValue().split(', ');
                $(pilotIdList).each(function (i) {
                    pilotIdList[i] = parseInt(pilotIdList[i], 10);
                    console.log(pilotIdList[i])
                });
                if($$("destination1").getValue().trim(" ") !== "" && $$("destination2").getValue().trim(" ") !== "") {
                    //если данные введены, создаём экземпляр класса
                    let flight = {
                        "IdPlane": $$("planeSelect").getValue(), "IdPilot": pilotIdList,
                        "ArrivalPoint": $$("destination2").getValue(), "DeparturePoint": $$("destination1").getValue()
                    };
                    Run.editFlights(id, flight, Run.view.refreshFlightTable);//отправляем данные в контроллер
                    $$("addFlightWin").hide();//отчистка полей, закрытие формы
                    $$("destination1").setValue("");
                    $$("destination2").setValue("");
                    $$("pilotSelect").setValue("");
                    $$("planeSelect").setValue("");
                    $$("addFlightBtn").detachEvent("onItemClick", Edit);//переключаем события на кнопке в исходное положение
                    $$("addFlightBtn").attachEvent("onItemClick", Run.view.addFlight);
                    $$("addFlightBtn").setValue("Добавить");//меняем надпись на кнопке в исходное состояние
                }
                else{//если поля не заполнены - отмена процесса, возвращение событий в исходное положение
                    Run.view.error("Введите данные полностью!");
                    $$("addFlightBtn").detachEvent("onItemClick", Edit);
                    $$("addFlightBtn").attachEvent("onItemClick", Run.view.addFlight);
                    $$("addFlightBtn").setValue("Добавить");
                }
            }
        }
        else {//если рейс не выбран - выводим сообщение об ошибке
            webix.message({type: "error", text: "Выберите рейс для редактирования!"});
        }
    };

	this.editPlane = function(){//редактирование самолёта
        let id = $$("planesGrid").getSelectedItem();//выбираем ннужный самолёт
        if(id !== undefined){//если самолёт выбран
            Run.view.showWindows("addPlaneWin");//выводим окно для редактирования
            $$("planeNameAdd").setValue(id["Name"]);//заполняем поля данными редактируемого объекта
            $$("addPlaneBtn").detachEvent("onItemClick", Run.view.addPlane);//заменяем события на кнопке добавления
            $$("addPlaneBtn").attachEvent("onItemClick", Edit);

            function Edit() {//функция редактирования, вызываемая по кнопке редактирования
            	if($$("planeNameAdd").getValue().trim(" ") !== "") {
            		//если данные заполнены - создаём новый экземпляр самолёта
                let plane = {"Name": $$("planeNameAdd").getValue()};
                Run.editPlane(id, plane, function () {//отправляем в контролер экземпляр самолёта
                	//и функцию для обратной замены событий на кнопке, обновлении таблицы самолётов и
					//очистки полей для ввода
                	Run.view.refreshPlaneTable();
                    $$("addPlaneBtn").detachEvent("onItemClick", Edit);
                    $$("addPlaneBtn").attachEvent("onItemClick", Run.view.addPlane);
                    $$('planeNameAdd').setValue('');
                    $$("addPlaneWin").hide();
                    Run.view.refreshFlightTable();
                });
                }else{//если данные не введены - выводим ошибку
            		Run.view.error("Введите данные самолёта!")
				}
            }
        }
        else {//если самолёт не выбран - выводим ошибку
            webix.message({type: "error", text: "Выберите самолёт для редактирования!"});
        }
	};

	this.removePilot = function(){//удаление пилота
		let id = $$("pilotsGrid").getSelectedItem();//достаём выбранного пилота
		if (id === undefined)//если пилот не выбран - выводим ошибку
		{
			this.error("Выберите пилота для удаления!");
			return
		}
		Run.removePilot(id, Run.view.refreshPilotTable);//если выбран - передаём номер пилота
														// и функцию  обновления таблицы пилотов в контроллер
	};

	this.removeFlight = function(){//удаление рейса
		let id = $$("grid").getSelectedItem();//достаём выбранный рейс
        if (id === undefined)//если рейс не выбран - выводим ошибку
        {
            this.error("Выберите рейс для удаления!");
            return
        }
		Run.removeFlight(id, Run.view.refreshFlightTable)//если выбран - передаём номер рейса
														// и функцию обновления таблицы рейсов в контроллер
	};

	this.removePlane = function(){//удаление самолёта
        let id = $$("planesGrid").getSelectedItem();//достаём выбранный самолёт
        if (id === undefined)//если самолёт не выбран - выводим ошибку
        {
            this.error("Выберите самолёт для удаления!");
            return
        }
        Run.removePlane(id, Run.view.refreshPlaneTable);//если выбран - передаём номер самолёта
														// и функцию обновления таблицы самолётов в контроллер
	};

	this.refreshPilotTable = function(){//обновление таблицы пилотов
		Run.refreshPilotTable().done(function (data) {//получаем от контроллера данные пилотов
            $$('pilotsGrid').clearAll();//очищаем таблицу пилотов
            $$("pilotsGrid").parse(data["Data"]);//добавляем в таблицу пилотов данные о пилотах
        });

  	};

	this.refreshFlightTable = function(){//обновление таблицы рейсов
        Run.refreshFlightTable().done(function (data) {//получаем от контроллера данные рейсов
            $$('grid').clearAll();//очищаем таблицу рейсов
            $$('grid').parse(data["Data"]);//добавляем в таблицу рейсов данные о рейсах
            $$('grid').adjustRowHeight();//подгоняем высоту столбца таблицы под данные
		})
	};

	this.refreshPlaneTable = function(){//обновление таблицы самолётов
		Run.refreshPlaneTable().done(function (data) {//получаем от контроллера данные самолётов
            $$('planesGrid').clearAll();//очищаем таблицу пилотов
            $$("planesGrid").parse(data["Data"]);//добавляем в таблицу пилотов данные о пилотах
        });
	};

	this.refreshSelects = function(){//обновление полей выбора самолётов и пилотов
        $.get("/planes")//ajax запрос на получение списка самолётов
			.done(function (data) {
				let temp =[];
                $(data["Data"]).each(function (i, val) {
                    temp.push({id: val["Id"], value: val["Name"]});
                });
                $$("planeSelect").define("options", temp);//введение данных в поля выбора самолётов
                $$("planeSelect").refresh();
            });
        $.get("/pilots")//ajax запрос на получение списка пилотов
			.done(function (data) {
                let temp = [];
                $(data["Data"]).each(function (i, val) {
                    temp.push({id: val["Id"], value: val["FirstName"] + " " + val["LastName"]});
                });
                $$("pilotSelect").define("options", temp);//введение данных в поля выбора пилотов
                $$("pilotSelect").refresh();
            });


	};

	this.error = function(msg){//вывод ошибки
        webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
	}
}

webix.ready(function(){//основная форма
	webix.debug = true;
		webix.ui({

		rows: [
			{type: "header", template: "Аэропорт", css: {
              											"font-family"	:"'Comfortaa', cursive;",
              											"font-size"		: "20px;",
              											"text-align"	:"center;",
            											"margin-top"	: "15px;",
            											"box-shadow":"0 0 30px rgba(0,0,0,0.5);"},
            },
          
			{ view:"toolbar", elements:[
                    {view:"button", value:"Редактировать рейс",click:function(){Run.view.editFlight();}, height: 50},
                    {view:"button", value:"Удалить рейс",click: function(){Run.view.removeFlight()} ,height: 50},
                    {view:"button", value:"Добавить рейс", click: function(){Run.view.showWindows("addFlightWin"); Run.view.refreshSelects();},  height: 50},
                    {view:"button", value:"Справочник пилотов", click: function(){Run.view.showWindows("pilotsInfoWin"); Run.view.refreshPilotTable();}, height: 50},
                    {view:"button", value:"Справочник самолётов", click: function(){Run.view.showWindows("planesInfoWin"); Run.view.refreshPlaneTable();}, height: 50},
                    {view:"button",  css:"button_danger", value:"LOG OUT",click:function(){Run.logOut();}, height: 50},
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
		]
	});
	Run.view.refreshFlightTable();//обновление таблицы рейсов
	//блок добавления событий на кнопки при инициализации приложения
    $$("grid").attachEvent("onResize", function(){
        $$('grid').adjustRowHeight();
    });
    $$("addPilotBtn").attachEvent("onItemClick", Run.view.addPilot);
    $$("addPlaneBtn").attachEvent("onItemClick", Run.view.addPlane);
    $$("addFlightBtn").attachEvent("onItemClick", Run.view.addFlight);
});