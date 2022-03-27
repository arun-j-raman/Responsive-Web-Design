
$(document).ready(function () {
   
    resetTables();


    $("#find").click(function () {
        debugger;
        resetTables();
        var userInput = $('#pininp').val();

        if (isPostOfficeName(userInput))
            getPODetailsByName(userInput);
        else if (isPinCode(userInput))
            getPODetailsByPin(userInput);
        else
            alert("Invalid Input: Please enter a valid pin code or the name of the PO.");
    });


    $("#resetBtn").click(function () {
        debugger;
        resetTables();
        $('#pininp').val('');
    });

});

function isPostOfficeName(inputString) {
    debugger;
    var regexStr = /^[A-Za-z]+$/;
    return regexStr.test(inputString);

}

function isPinCode(inputString) {
    debugger;
    var regexStr = /^[0-9]*$/;
    return regexStr.test(inputString);
}

function resetTables() {

    $('#cLabel').css("visibility", "hidden");
    $('#postoffice').css("visibility", "hidden");
    $('#postoffice2').css("visibility", "hidden");
    $('#postoffice').css("display", "none");
    $('#postoffice2').css("display", "none");
    $('#tbldatarows').empty();
    $('#tbldatarows2').empty();
}


const getPODetailsByPin = async (inputValue) => {
    try {

        console.clear();


        console.log("Pincode " + inputValue);

        const response = await fetch(`https://api.postalpincode.in/pincode/${inputValue}`);


        const weatherData = await response.json();
        console.log(weatherData);



        var obj = JSON.stringify(weatherData);
        const myArr = JSON.parse(obj);

        console.log(myArr[0]["Status"]);

        var poarr = [];

        if (myArr[0]["Status"] != "Error") {
            const nofpo = myArr[0]["PostOffice"].length;
            console.log("Number of post offices found: " + nofpo);
            $('#cLabel').css("visibility", "visible");
            $('#countSpan').text(nofpo);

            $('#postoffice').css("display", "inline-block");
            $('#postoffice').css("visibility", "visible");
            var poobj = myArr[0]["PostOffice"];
            $('#row0').nextAll().remove();
            poobj.forEach(function (element, i) {
                var initstr = "<td>"
                poarr.push(i + 1);
                poarr.push(element.Name);
                poarr.push(element.BranchType);
                poarr.push(element.DeliveryStatus);
                poarr.push(element.Division);
                poarr.push(element.Block);
                poarr.push(element.District);
                poarr.push(element.Region);
                poarr.push(element.Circle);
                poarr.push(element.State);

                var initstr = "<td>"

                poarr.forEach(function (element, j) {
                    initstr = initstr + poarr[j] + "</td><td>"
                });

                initstr = initstr.substring(0, initstr.lastIndexOf("<td>"));

                var tr = document.createElement('tr');
                tr.innerHTML = initstr;
                document.getElementById('tbldatarows').appendChild(tr);

                poarr = [];
            });

        }

        else {
            $('#postoffice').css("visibility", "visible");
            $('#postoffice').css("display", "block");
            initstr = "<td colspan='10'>No record found</td>";
            var tr = document.createElement('tr');
            tr.innerHTML = initstr;
            document.getElementById('tbldatarows').appendChild(tr);
            console.log("No record found");
        }


    }



    catch (error) {
        console.log(error);

    }
}


const getPODetailsByName = async (inputValue) => {
    try {

        console.clear();

        console.log("Pincode " + inputValue);

        const response = await fetch(`https://api.postalpincode.in/postoffice/${inputValue}`);


        const weatherData = await response.json();
        console.log(weatherData);



        var obj = JSON.stringify(weatherData);
        const myArr = JSON.parse(obj);

        console.log(myArr[0]["Status"]);

        var poarr = [];

        if (myArr[0]["Status"] != "Error") {
            const nofpo = myArr[0]["PostOffice"].length;
            $('#postoffice2').css("visibility", "visible");
            $('#postoffice2').css("display", "inline-block");
            console.log("Number of post offices found: " + nofpo);
            $('#cLabel').css("visibility", "visible");
            $('#countSpan').text(nofpo);
            var poobj = myArr[0]["PostOffice"];
            $('#rows00').nextAll().remove();
            poobj.forEach(function (element, i) {
                var initstr = "<td>"
                poarr.push(i + 1);
                poarr.push(element.Name);
                poarr.push(element.BranchType);
                poarr.push(element.DeliveryStatus);
                poarr.push(element.Division);
                poarr.push(element.District);
                poarr.push(element.Region);
                poarr.push(element.Circle);
                poarr.push(element.State);
                poarr.push(element.Pincode);
                var initstr = "<td>"

                poarr.forEach(function (element, j) {
                    initstr = initstr + poarr[j] + "</td><td>"
                });

                initstr = initstr.substring(0, initstr.lastIndexOf("<td>"));

                var tr = document.createElement('tr');
                tr.innerHTML = initstr;
                document.getElementById('tbldatarows2').appendChild(tr);

                poarr = [];
            });

        }

        else {
            $('#postoffice2').css("visibility", "visible");
            $('#postoffice2').css("display", "block");
            initstr = "<td colspan='10'>No record found</td>";
            var tr = document.createElement('tr');
            tr.innerHTML = initstr;
            document.getElementById('tbldatarows2').appendChild(tr);
            console.log("No record found");
        }


    }



    catch (error) {
        console.log(error);

    }
}