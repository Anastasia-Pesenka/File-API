define(['module', 'firebase', 'radio'],
    function (module, firebase, radio) {
        return {
            init: function () {
                firebase.initializeApp(module.config());
                this.authenticated = firebase.auth().currentUser || null;
                this.setupEvents();
            },

            setupEvents: function () {
                firebase.auth().onAuthStateChanged(function(user) {
                    this.setCurrentUser(user);
                    if (user) {
                        var ref = firebase.database().ref('users/' + user.uid + '/tasks/');
                        ref.on('value', function(snapshot) {
                            radio.trigger('tasksGot', snapshot.val());
                        });

                    } else {

                    }
                }.bind(this));
            },

            setCurrentUser: function (value) {
                this.authenticated = value;

                radio.trigger('auth/changed', value);
            },

            getCurrentUser: function () {
                return this.authenticated;
            },

            signInGoogle: function () {
                var provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider)
                    .then(function (result) {
                        var user = result.user;
                        console.log('Successfully authenticated!' + user.displayName);

                    }.bind(this))
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.error(errorCode + errorMessage);
                    });
            },
            signOut: function () {
                firebase.auth().signOut()
                    .then(function () {
                        console.log('Successfully sign out!');
                    }.bind(this))
                    .catch(function (error) {
                        console.error(error.message);
                    });
            },
            saveTask : function (id, data) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/tasks/' + id).set(data);
            },
            saveImg : function (file) {
                var storage = firebase.storage();
                var storageRef = storage.ref();
                var imagesRef = storageRef.child('images');
                var uploudImg = imagesRef.child('nastya.jpg').put(file);
            }
        }
    });