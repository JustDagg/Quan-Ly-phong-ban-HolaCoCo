$(function () {
    var isRememberMe = storage.getRememberMe();
    document.getElementById("rememberMe").checked = isRememberMe;
});

function login() {
    // Get username & password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // validate
    if (!username) {
        showNameErrorMessage("Please input username!");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password!");
        return;
    }


    // validate username 6 -> 30 characters
    if (username.length < 6 || username.length > 50 || password.length < 6 || password.length > 50) {
        // show error message
        showNameErrorMessage("Login fail!");
        return;
    }

    // Call API
    $.ajax({
        url: 'http://localhost:9091/api/v1/login',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (data, textStatus, xhr) {
            // save data to storage
            // https://www.w3schools.com/html/html5_webstorage.asp
            // save remember me
            var isRememberMe = document.getElementById("rememberMe").checked;
            storage.saveRememberMe(isRememberMe);

            // save data
            storage.setItem("ID", data.id);
            storage.setItem("FULL_NAME", data.fullName);
            storage.setItem("USERNAME", username);
            storage.setItem("PASSWORD", password);
            storage.setItem("ROLE", data.role);

            // redirect to home page
            // https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
            window.location.replace("http://127.0.0.1:5500/html/program.html");
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                showNameErrorMessage("Login fail!");
            } else {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}

function showNameErrorMessage(message) {
    document.getElementById("nameErrorMessage").style.display = "block";
    document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
    document.getElementById("nameErrorMessage").style.display = "none";
}

function facebook() {

    $.ajax({
        url: "http://localhost:9091/auth/facebook",
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            window.location.replace("https://www.facebook.com/v2.5/dialog/oauth?client_id=939277063774570&response_type=code&redirect_uri=http://127.0.0.1:5500/html/login.html&scope=email%2Cpublic_profile");
        },
        success: function (data, textStatus, xhr) {

                $.ajax({
                    url: 'http://localhost:8080/callback',
                    type: 'GET',
                    contentType: "application/json",
                    dataType: 'json', // datatype return
                    beforeSend: function (xhr) {

                    },
                    success: function (data, textStatus, xhr) {
                        window.location.replace("http://127.0.0.1:5500/html/program.html");
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                });
            },
    
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}