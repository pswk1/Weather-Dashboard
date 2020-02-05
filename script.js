let currentDate = new Date();
let formatDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear()
$("#currentDate").html(formatDate);


$(".btns").click(function () {

    let city = "Los Angeles, California"

    if ($(".citySearch").val() !== "") {
        city = $(".citySearch").val();
    }

    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27254921fe98837775faa360d2cb4843`

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                $(".city").append(response.name);
                $(".wind").append("Wind Speed: " + response.wind.speed + " mph & " + response.wind.deg + " degrees");
                $(".humidity").append("Humidity: " + response.main.humidity + "%");
                $(".temp").append("Temperature: " + Math.round((((response.main.temp) - 273.15) * 1.80 + 32)) + " F");
                ((response.main.temp) - 273.15) * 1.80 + 32
            });

    let secondQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=27254921fe98837775faa360d2cb4843`

        $.ajax({
            url: secondQueryURL,
            method: "GET",
        })
            .then(function (response) {
                console.log(response);
                $(".firstDate").append(response.list[0].dt_txt);
                $(".secondDate").append(response.list[7].dt_txt);
                $(".thirdDate").append(response.list[15].dt_txt);
                $(".fourthDate").append(response.list[23].dt_txt);
                $(".fifthDate").append(response.list[31].dt_txt);
                $(".firstTemp").append("Temp: " + Math.round((((response.list[0].main.temp) - 273.15) * 1.80 + 32)) + " F");
                $(".secondTemp").append("Temp: " + Math.round((((response.list[7].main.temp) - 273.15) * 1.80 + 32)) + " F");
                $(".thirdTemp").append("Temp: " + Math.round((((response.list[15].main.temp) - 273.15) * 1.80 + 32)) + " F");
                $(".fourthTemp").append("Temp: " + Math.round((((response.list[23].main.temp) - 273.15) * 1.80 + 32)) + " F");
                $(".fifthTemp").append("Temp: " + Math.round((((response.list[31].main.temp) - 273.15) * 1.80 + 32)) + " F");
                $(".firstHum").append("Humidity: " + response.list[0].main.humidity + "%");
                $(".secondHum").append("Humidity: " + response.list[7].main.humidity + "%");
                $(".thirdHum").append("Humidity: " + response.list[15].main.humidity + "%");
                $(".fourthHum").append("Humidity: " + response.list[23].main.humidity + "%");
                $(".fifthHum").append("Humidity: " + response.list[31].main.humidity + "%");
            });
    
    localStorage.setItem(city, city);   

    function renderHistory (){
        let history = $("<button>");
        history.attr("class", "btns");
        let itemInfo = localStorage.getItem(city)
        history.text(itemInfo)
        $(".historyList").append(history);
    }
    renderHistory();
    emptyInfo();
});




function emptyInfo() {
    $(".city").empty();
    $(".wind").empty();
    $(".humidity").empty();
    $(".temp").empty();

    $(".firstDate").empty();
    $(".secondDate").empty();
    $(".thirdDate").empty();
    $(".fourthDate").empty();
    $(".fifthDate").empty();

    $(".firstTemp").empty();
    $(".secondTemp").empty();
    $(".thirdTemp").empty();
    $(".fourthTemp").empty();
    $(".fifthTemp").empty();

    $(".firstHum").empty();
    $(".secondHum").empty();
    $(".thirdHum").empty();
    $(".fourthHum").empty();
    $(".fifthHum").empty();
}




