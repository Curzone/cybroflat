function light_click(){
    var floor_menu = IR.GetVariable("Global.light_menu");
    IR.HideAllPopups();
    IR.ShowPopup("floor"+floor_menu.toString()+"_light");
}

function hvac_click(){
    var floor_menu = IR.GetVariable("Global.hvac_menu");
    IR.HideAllPopups();
    IR.ShowPopup("floor"+floor_menu.toString()+"_hvac");
}

function app_click(){
    var floor_menu = IR.GetVariable("Global.app_menu");
    IR.HideAllPopups();
    IR.ShowPopup("floor"+floor_menu.toString()+"_app");
}

function safety_click(){
    var floor_menu = IR.GetVariable("Global.safety_menu");
    IR.HideAllPopups();
    IR.ShowPopup("floor"+floor_menu.toString()+"_safety");
}

function settings_click(){
    var menu = IR.GetVariable("Global.settings_menu");
    IR.HideAllPopups();
    if (menu === 1) {
        IR.ShowPopup("_light_module");
    } else if (menu === 2) {
        IR.ShowPopup("_hvac_module");
    } else if (menu === 3) {
        IR.ShowPopup("_app_module");
    } else if (menu === 4) {
        IR.ShowPopup("_safety_module");
    } else if (menu === 5) {
        IR.ShowPopup("_plc_module");
    } else if (menu === 6) {
        IR.ShowPopup("_general_module");
    } else if (menu === 7) {
        IR.ShowPopup("_weather_module");
    }
}

function rooms_change(){   // HVAC page rooms change
    var current_floor = IR.GetVariable("Global.hvac_menu");
    var current_user = IR.GetVariable("Global.current_user");
    var temp = IR.GetItem("MAIN_HVAC");
    switch (current_floor){
        case 1:
            for (var i=1; i<8; i++) {
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Visible = true;
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Text = floor1_labels[i-1];
            }
            IR.HideAllPopups();
            IR.ShowPopup("floor1_hvac");
            break;

        case 2:
            for (var i=1; i<6; i++) {
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Visible = true;
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Text = floor2_labels[i-1];
            }
            temp.GetItem("room6").Visible = false;
            temp.GetItem("room7").Visible = false;
            IR.HideAllPopups();
            IR.ShowPopup("floor2_hvac");
            break;

        case 3:
            for (var i=1; i<6; i++) {
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Visible = true;
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Text = floor3_labels[i-1];
            }
            temp.GetItem("room6").Visible = false;
            temp.GetItem("room7").Visible = false;
            IR.HideAllPopups();
            IR.ShowPopup("floor3_hvac");
            break;

        case 4:
            for (var i=2; i<8; i++) {
                IR.GetItem("MAIN_HVAC").GetItem("room"+i.toString()).Visible = false;
            }
            temp.GetItem("room1").Visible = true;
            temp.GetItem("room1").Text = "Кухня";
            IR.HideAllPopups();
            IR.ShowPopup("floor4_hvac");
            break;
    }
    for (var i=1; i<8; i++) {
        IR.GetItem("MAIN_HVAC").GetItem("room1").Enable = current_user==="1";
    }
}

function room_click() {
    var floor = IR.GetVariable("Global.hvac_menu");
    var room =  IR.GetVariable("Global.hvac_floor");
    IR.HideAllPopups();
    IR.ShowPopup("hvac_floor"+floor.toString()+"_room"+room.toString());
}
