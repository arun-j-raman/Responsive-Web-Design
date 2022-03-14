$(document).ready(function() {
    $('#vol').val(8);
    var output = document.getElementById('lenDisp');
    output.innerHTML = $('#vol').val();
    var strength = document.getElementById('strenDisp');
    strength.innerText = "Medium";
    strength.style.color = "orange";
    $("#CopiedMessage").css("display","none");

});

let password = "";

function generatePassword() {
   
    password = "";    
    let length = $('#vol').val();
    let chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^7*()`;
    let n = chars.length;
    for (var i = 0; i < length; ++i) {
        password += chars.charAt(Math.floor(Math.random() * n));
    }
    $('#password').val(password);

}

function copyText() {
    
    var passVal = $('#password').val();
    if (passVal != "") {
        navigator.clipboard.writeText(password);
        $("#CopiedMessage").text("Copied to clipboard!");
        $("#CopiedMessage").css("color","green");
        $("#CopiedMessage").css("display","block");
        $("#CopiedMessage").fadeOut(5000);
        
    }
    else {
        navigator.clipboard.writeText("");
        $("#CopiedMessage").text("Nothing to copy!");
        $("#CopiedMessage").css("color","black");
        $("#CopiedMessage").css("display","block");
        $("#CopiedMessage").fadeOut(5000);
    }
}

function resetField() {
    $('#password').val('');
    $('#vol').val(8);
    var output = document.getElementById('lenDisp');
    output.innerText = $('#vol').val();
    var strength = document.getElementById('strenDisp');
    strength.innerText = "Medium";
    strength.style.color = "orange";
    $("#CopiedMessage").css("display","none");

}

function sliderFunc()
{
    var slider = $('#vol').val();
    var output = document.getElementById('lenDisp');
    var strength = document.getElementById('strenDisp');
    output.innerHTML = slider;

    if(slider < 8)
    {
     strength.innerText = "Weak";
     strength.style.color = "red";
    }
    else if(slider >= 8 && slider < 12)
    {
     strength.innerText = "Medium";
     strength.style.color = "orange";
    }
    else if(slider >= 12 && slider < 18)
    {
     strength.innerText = "Strong";
     strength.style.color = "green";
    }
    else
    {
     strength.innerText = "Very Strong";
     strength.style.color = "blue";
    }

}


