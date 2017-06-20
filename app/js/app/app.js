define(['fb', 'radio', 'modules/menu', 'modules/toDoList', 'modules/settings'],
    function (fb, radio, menu, toDo, settings) {
        return {
            init: function () {
                fb.init();
                menu.init();
                toDo.init();
                settings.init();
            }
        };
    });