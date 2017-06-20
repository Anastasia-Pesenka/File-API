define(['underscore', 'radio', 'text!templates/settings.html', 'fb'],
    function (_, radio, settingstmpl, fb) {
    return {
        init : function () {
            this.template = _.template(settingstmpl);
            this.el = document.querySelector('.settings');
            this.setupEvents();
        },
        render: function () {
            var user = arguments[0] || fb.getCurrentUser();
            this.el.innerHTML = this.template({
                user: user
            });
        },
        setupEvents: function () {
            radio.on('auth/changed', this.changeAuth.bind(this));
            this.el.addEventListener("change", this.handleFiles.bind(this))
            
        },
        changeAuth: function (user) {
            this.render(user);
        },
        handleFiles : function (e) {
            var fileList = e.target.files;
            fb.saveImg(fileList[0]);
        }
    }
});