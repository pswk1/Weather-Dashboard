
$("#searchBtn").click(function () {

    let city = "Los Angeles, California"

    if ($("#citySearch").val() !== "") {
    city = $("#citySearch").val();
    } 

    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27254921fe98837775faa360d2cb4843`
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        console.log(response);
        $(".city").append(response.name);
        $(".wind").append("Wind Speed: " + response.wind.speed + " mph & " + response.wind.deg + " degrees");
        $(".humidity").append("Humidity: " + response.main.humidity + "%");
        $(".temp").append("Temperature (F): " + (((response.main.temp)-273.15) * 1.80 + 32));
        ((response.main.temp)-273.15) * 1.80 + 32
    });
    emptyInfo();
});

function emptyInfo() {
    $(".city").empty();
    $(".wind").empty();
    $(".humidity").empty();
    $(".temp").empty();
}




