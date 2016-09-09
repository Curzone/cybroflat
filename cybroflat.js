var admin;          //Сведения о текущем пользователе: 1 - администратор, 0 - User, получаем от "Global.admin_enabled"
var main_password;  //Текущий пароль, получаем от: "Global.master_password"
var password;
var floor;
var user_password;
var current_user;
var ilja_pass;
var olga_pass;
var oleg_pass;

var lbls;
var pT;
var battery_level;
var battery_status;
var battery;
var vacation_state;        // Определяет состояние индикатора режима отпуска


IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("iRidium Server"), function(name,value) {
    switch (name) {
        case "mb1.rw_vacation":
            if (value == 0){
                IR.GetPage("MAIN_HOME").GetItem("vacation_days").Visible = false;
                IR.GetPage("MAIN_HOME").GetItem("show_calendar").Enable = false;
                IR.HidePopup("vacation_days_select");
                vacation_state = 0;
                IR.GetPage("MAIN_HOME").GetItem("vacation_notifier").Value = vacation_state;
            } else {
                IR.GetPage("MAIN_HOME").GetItem("vacation_days").Visible = true;
                IR.GetPage("MAIN_HOME").GetItem("show_calendar").Enable = true;
                if (IR.GetDevice("iRidium Server").GetFeedback("mb1.rw_vacation_days") >= 2){
                    vacation_state = 2;
                } else {
                    vacation_state = 1;
                }
                IR.GetPage("MAIN_HOME").GetItem("vacation_notifier").Value = vacation_state;
            }
            break;
        case "mb3.r_light_sensor":
            IR.GetPage("MAIN_LIGHT").GetItem("outside_sun").Visible = value > 0;
            break;
        case "r_boiler_pressure":
            if (value > 1.6) {
                IR.GetPopup("floor1_safety").GetItem("boiler_pressure_state").GetState(0).TextColor = 0x00FF00FF; //green
            }
            if (value > 1.4 && value <= 1.6) {
                IR.GetPopup("floor1_safety").GetItem("boiler_pressure_state").GetState(0).TextColor = 0xFFFF00FF; //yellow
            } else {
                IR.GetPopup("floor1_safety").GetItem("boiler_pressure_state").GetState(0).TextColor = 0xFF0000FF; //red
            }
            break;
    }
});

IR.AddListener(IR.EVENT_START,0,function()
{
    var test;
    ilja_pass = "12345";
    olga_pass = "54321";
    oleg_pass = "98765";
    IR.SetVariable("Global.user1_pass", ilja_pass);
    IR.SetVariable("Global.user2_pass", olga_pass);
    IR.SetVariable("Global.user3_pass", oleg_pass);
    IR.SetVariable("Global.current_user",4);                                      //при старте гость как пользователь по умолчанию
    IR.GetItem("MAIN_START").GetItem("start_controls").Enable = true;

    scene1 = [];
    IR.SetVariable("Global.servo_manual_floor", 1);
    IR.SetVariable("Global.servo_min_set_floor",1);


    IR.SetVariable("Global.Main_menu", 1);
    IR.SetVariable("Global.Light_menu", 1);
    IR.SetVariable("Global.HVAC_menu", 1);
    IR.SetVariable("Global.APP_menu", 1);
    IR.SetVariable("Global.SEC_menu", 1);
    IR.SetVariable("Global.Settings_menu", 1);

    IR.SetVariable("Global.hvac_floor", 0);

    test = [0, 0, 10, 0, 20, 10, 0, 15, 0, 22, 15, 0, 20, 0, 24, 20, 0, 23, 59, 28, 0, 0, 10, 0, 20, 10, 0, 15, 0, 22, 15, 0, 20, 0, 35, 20, 0, 23, 59, 28];
    IR.SetVariable("Global.test",test);
});
//------------------------------------------------------------------------------------------------

IR.AddListener(IR.EVENT_WORK,0,function() {
    battery_level = IR.GetVariable("System.Battery.Level");
    battery_status = IR.GetVariable("System.Battery.Status");

    if (battery_status==1){
        battery = 5;
    } else {
        if (battery_level>0 && battery_level<=15){battery = 0;}
        else if (battery_level>15 && battery_level<=25){battery = 1;}
        else if (battery_level>25 && battery_level<=50){battery = 2;}
        else if (battery_level>50 && battery_level<=75){battery = 3;}
        else if (battery_level>75 && battery_level<=100){battery = 4;}
    }
    IR.SetVariable("Global.battery", battery);

     lbls = [IR.GetPage("floor1_hvac").GetItem("preset 1"),
            IR.GetPage("floor1_hvac").GetItem("preset 2"),
            IR.GetPage("floor1_hvac").GetItem("preset 3"),
            IR.GetPage("floor1_hvac").GetItem("preset 4"),
            IR.GetPage("floor1_hvac").GetItem("preset 5"),
            IR.GetPage("floor1_hvac").GetItem("preset 6"),
            IR.GetPage("floor1_hvac").GetItem("preset 7"),
            IR.GetPage("floor2_hvac").GetItem("preset 1"),
            IR.GetPage("floor2_hvac").GetItem("preset 2"),
            IR.GetPage("floor2_hvac").GetItem("preset 3"),
            IR.GetPage("floor2_hvac").GetItem("preset 4"),
            IR.GetPage("floor2_hvac").GetItem("preset 5"),
            IR.GetPage("floor3_hvac").GetItem("preset 1"),
            IR.GetPage("floor3_hvac").GetItem("preset 2"),
            IR.GetPage("floor3_hvac").GetItem("preset 3"),
            IR.GetPage("floor3_hvac").GetItem("preset 5"),
            IR.GetPage("floor4_hvac").GetItem("preset 5")];

    pT = [IR.GetPage("floor1_hvac").GetItem("preset 1").Value,
            IR.GetPage("floor1_hvac").GetItem("preset 2").Value,
            IR.GetPage("floor1_hvac").GetItem("preset 3").Value,
            IR.GetPage("floor1_hvac").GetItem("preset 4").Value,
            IR.GetPage("floor1_hvac").GetItem("preset 5").Value,
            IR.GetPage("floor1_hvac").GetItem("preset 6").Value,
            IR.GetPage("floor1_hvac").GetItem("preset 7").Value,
            IR.GetPage("floor2_hvac").GetItem("preset 1").Value,
            IR.GetPage("floor2_hvac").GetItem("preset 2").Value,
            IR.GetPage("floor2_hvac").GetItem("preset 3").Value,
            IR.GetPage("floor2_hvac").GetItem("preset 4").Value,
            IR.GetPage("floor2_hvac").GetItem("preset 5").Value,
            IR.GetPage("floor3_hvac").GetItem("preset 1").Value,
            IR.GetPage("floor3_hvac").GetItem("preset 2").Value,
            IR.GetPage("floor3_hvac").GetItem("preset 3").Value,
            IR.GetPage("floor3_hvac").GetItem("preset 5").Value,
            IR.GetPage("floor4_hvac").GetItem("preset 5").Value];

     for(var i=0; i < pT.length; i++){
        IR.GetPage("floor1_hvac").GetItem("preset 1").Visible = pT[i] >= 0;
     }
});

IR.AddListener(IR.EVENT_EXIT,0,function() {
    IR.SetVariable("Global.current_user",0);
});

function clear_notifications(){
    IR.ClearNotification();
}