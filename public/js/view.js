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

	this.editFlight = function(){
        let id = $$("grid").getSelectedItem();
        if(id !== undefined){
            Run.view.showWindows("addFlightWin");
            Run.view.refreshSelects();
            $$("destination1").setValue(id["DeparturePoint"]);
            $$("destination2").setValue(id["ArrivalPoint"]);
            $$("pilotSelect").setValue(id["IdPilot"]);
            $$("planeSelect").setValue(id["IdPlane"]);
            $$("addFlightBtn").detachEvent("onItemClick", Run.view.addFlight);
            $$("addFlightBtn").attachEvent("onItemClick", Edit);
            $$("addFlightBtn").setValue("Изменить");


            function Edit() {

                let pilotIdList =  $$("pilotSelect").getValue().split(', ');
                $(pilotIdList).each(function (i) {
                    pilotIdList[i] = parseInt(pilotIdList[i], 10);
					console.log(pilotIdList[i])
                });
                if($$("destination1").getValue().trim(" ") !== "" && $$("destination2").getValue().trim(" ") !== "") {
                    let flight = {
                        "IdPlane": $$("planeSelect").getValue(), "IdPilot": pilotIdList,
                        "ArrivalPoint": $$("destination2").getValue(), "DeparturePoint": $$("destination1").getValue()
                    };
                    Run.editFlights(id, flight, Run.view.refreshFlightTable);
                    $$("addFlightWin").hide();
                    $$("destination1").setValue("");
                    $$("destination2").setValue("");
                    $$("pilotSelect").setValue("");
                    $$("planeSelect").setValue("");
                    $$("addFlightBtn").detachEvent("onItemClick", Edit);
                    $$("addFlightBtn").attachEvent("onItemClick", Run.view.addFlight);
                    $$("addFlightBtn").setValue("Добавить");
                }
                else{
                	Run.view.error("Введите данные полностью!");
                    $$("addFlightBtn").detachEvent("onItemClick", Edit);
                    $$("addFlightBtn").attachEvent("onItemClick", Run.view.addFlight);
				}
            }
        }
        else {
            webix.message({type: "error", text: "Выберите рейс для редактирования!"});
        }
	};

	this.showWindows= function(targetWindow){
		$$(targetWindow).show();
	};

	this.addPilot = function(){
		if($$("firstName").getValue().trim("") !== "" && $$('lastName').getValue().trim("") !== "") {
			let pilot =  {"FirstName" : $$("firstName").getValue(), "LastName" : $$('lastName').getValue()};
			Run.addPilot(pilot, function () {
				Run.view.refreshPilotTable();
				$$('firstName').setValue('');
				$$('lastName').setValue('');
				$$("addPilotWin").hide();
			});
		}
        else{
        	Run.view.error("Введите данные полностью!")
		}

    };

	this.addFlight = function(){
		let pilotIdList =  $$("pilotSelect").getValue().split(', ');
		$(pilotIdList).each(function (i) {
			pilotIdList[i] = parseInt(pilotIdList[i], 10)
        });
		if($$("destination1").getValue().trim(" ") !== "" && $$("destination2").getValue().trim(" ") !== "") {
            let flight = {
                "IdPlane": $$("planeSelect").getValue(), "IdPilot": pilotIdList,
                "ArrivalPoint": $$("destination2").getValue(), "DeparturePoint": $$("destination1").getValue()
            };
            Run.addFlight(flight, function () {
                Run.view.refreshFlightTable();
                $$("addFlightWin").hide();
                $$("destination1").setValue("");
                $$("destination2").setValue("");
                $$("pilotSelect").setValue("");
                $$("planeSelect").setValue("");
            });
        }
        else{
			Run.view.error("Введите данные полностью!")
		}
	};

	this.editPilot = function(){
        let id = $$("pilotsGrid").getSelectedItem();
		if(id !== undefined){
            Run.view.showWindows("addPilotWin");
            $$("firstName").setValue(id["FirstName"]);
            $$("lastName").setValue(id["LastName"]);
            $$("addPilotBtn").detachEvent("onItemClick", Run.view.addPilot);
            $$("addPilotBtn").attachEvent("onItemClick", Edit);

            function Edit() {
                if($$("firstName").getValue().trim("") !== "" && $$('lastName').getValue().trim("") !== "") {
            	let pilot = {"FirstName": $$("firstName").getValue(), "LastName":  $$("lastName").getValue()};
               	Run.editPilot(id, pilot, function () {
               		Run.view.refreshPilotTable();
                    $$("addPilotBtn").detachEvent("onItemClick", Edit);
                    $$("addPilotBtn").attachEvent("onItemClick", Run.view.addPilot);
                    $$('firstName').setValue('');
                    $$('lastName').setValue('');
                    $$("addPilotWin").hide();
                    Run.view.refreshFlightTable();
                });
                }
                else {
                	Run.view.error("Введите данные полностью")
				}
            }
		}
        else {
        	webix.message({type: "error", text: "Выберите пилота для редактирования!"});
		}
	};

	this.addPlane = function(){
		if($$("planeNameAdd").getValue().trim(" ") !== "") {
            let plane = {"name": $$("planeNameAdd").getValue()};
            Run.addPlane(plane, function () {
                Run.view.refreshPlaneTable();
                $$("addPlaneWin").hide();
                $$("planeNameAdd").setValue("");
            });
        }
       	else{
       		Run.view.error("Введите данные полностью");
		}

	};

	this.editPlane = function(){
        let id = $$("planesGrid").getSelectedItem();
        if(id !== undefined){
            Run.view.showWindows("addPlaneWin");
            $$("planeNameAdd").setValue(id["Name"]);
            $$("addPlaneBtn").detachEvent("onItemClick", Run.view.addPlane);
            $$("addPlaneBtn").attachEvent("onItemClick", Edit);
            function Edit() {
            	if($$("planeNameAdd").getValue().trim(" ") !== "")
				{
                let plane = {"Name": $$("planeNameAdd").getValue()};
                Run.editPlane(id, plane, function () {
                	Run.view.refreshPlaneTable();
                    $$("addPlaneBtn").detachEvent("onItemClick", Edit);
                    $$("addPlaneBtn").attachEvent("onItemClick", Run.view.addPlane);
                    $$('planeNameAdd').setValue('');
                    $$("addPlaneWin").hide();
                    Run.view.refreshFlightTable();
                });
                }else{
            		Run.view.error("Введите данные самолёта!")
				}
            }
        }
        else {
            webix.message({type: "error", text: "Выберите самолёт для редактирования!"});
        }
	};

	this.removePilot = function(){
		let id = $$("pilotsGrid").getSelectedItem();
		if (id === undefined)
		{
			this.error("Выберите пилота для удаления!");
			return
		}
		Run.removePilot(id, Run.view.refreshPilotTable);
	};

	this.removeFlight = function(){
		let id = $$("grid").getSelectedItem();
        if (id === undefined)
        {
            this.error("Выберите рейс для удаления!");
            return
        }
		Run.removeFlight(id, Run.view.refreshFlightTable)
	};

	this.removePlane = function(){
        let id = $$("planesGrid").getSelectedItem();
        if (id === undefined)
        {
            this.error("Выберите самолёт для удаления!");
            return
        }
        Run.removePlane(id, Run.view.refreshPlaneTable);
	};

	this.refreshPilotTable = function(){
		Run.refreshPilotTable().done(function (data) {
            $$('pilotsGrid').clearAll();
            $$("pilotsGrid").parse(data["Data"]);
        });

  	};

	this.refreshFlightTable = function(){
        Run.refreshFlightTable().done(function (data) {
            $$('grid').clearAll();
            $$('grid').parse(data["Data"]);
            $$('grid').adjustRowHeight();
		})
	};

	this.refreshPlaneTable = function(){
		Run.refreshPlaneTable().done(function (data) {
            $$('planesGrid').clearAll();
            $$("planesGrid").parse(data["Data"]);
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


	};

	this.error = function(msg){
        webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
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
	Run.view.refreshFlightTable();
    $$("grid").attachEvent("onResize", function(){
        $$('grid').adjustRowHeight();
    });
    $$("addPilotBtn").attachEvent("onItemClick", Run.view.addPilot);
    $$("addPlaneBtn").attachEvent("onItemClick", Run.view.addPlane);
    $$("addFlightBtn").attachEvent("onItemClick", Run.view.addFlight);
});