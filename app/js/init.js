requirejs.config({
    baseUrl: 'js/app',
    paths: {
        underscore: '../lib/underscore',
        text: '../lib/text',
        firebase: 'https://www.gstatic.com/firebasejs/4.1.1/firebase'
    },
    shim: {
        firebase: {
            exports: 'firebase'
        }
    },
    config: {
        fb: {
            apiKey: "AIzaSyDumXPwgAs0GHM_DRiUnbZ1i0WrCTagWd8",
            authDomain: "todotest-c2246.firebaseapp.com",
            databaseURL: "https://todotest-c2246.firebaseio.com",
            projectId: "todotest-c2246",
            storageBucket: "todotest-c2246.appspot.com",
            messagingSenderId: "907435582720"
        }
    }
});

requirejs(['app'], function (app) {
    app.init();
});