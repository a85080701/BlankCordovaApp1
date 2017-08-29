var logined = window.localStorage;
$(document).on('pageshow', '#index', function () {


    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        autoplaySpeed: 1000,
        autoplay: true
    });
    $(".center").slick({
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
    });
           // Your code goes here
    if (logined.getItem("logined") == null)
        $("#member").text("登入")

    else {
        $("#member").text("會員")
    }

    $("#member").click(function () {

        if (logined.getItem("logined") == null)
            location.href = 'Login.html';
        else
            location.href = "My";
        $('#myname').val(logined['name']);
        $('#mysex').val(logined['sex']);
        $("#mydate").val(logined['date']);
        $("#myemail").val(logined['email']);
        $('#mybalance').val(logined['balance']);



    });
    //登出
    $("#btnLogout").click(function () {
        logined.clear();
        $("#member").text("登入")
    });
});

//登入抓取資料

$(document).on('pageshow', '#Login', function () {
    $(document).on('ready', function () {
        $("#btnLogin").click(function () {

            var session = {};
            var email = $('#logEmail').val();
            var pwd = $('#logPwd').val();
            var a = {
                "mode": "login",
                "login": [
                            {
                                "email": email,
                                "pwd": pwd
                            }
                ]
            }
            $.ajax({
                url: "http://localhost/TEST/mobile.ashx",
                type: "POST",
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(a),
                success: function (paa) {
                    if (paa.message == null) {
                        session = paa;
                        session.islogined = true;
                        logined.setItem("name", session.name);
                        logined.setItem('sex', session.sex);
                        logined.setItem('balance', session.balance);
                        logined.setItem('date', session.date);
                        logined.setItem('email', session.email);
                        logined.setItem("logined", 'true');
                        location.href = 'index.html';
                    }

                    else {
                        alert(paa.message);
                        $("#logEmail").val("");
                        $("#logPwd").val('');
                    }
                },
                error: function () { alert('失敗') }
            });

        });
    });
});
