
function LoadCanvas(){

    var getData = "DailyStats";
    var Data = [];
    

    $.post("./Ajax.php",
    {
      getData: getData
    },
    function(getData,status){
      console.log("Data: " + getData + "\nStatus: " + status);
       var DataCalories = [];
       var DataWeight = [];
    Data = JSON.parse(getData);
    DataCalories = Data[0];
    DataWeight = Data[1];
    console.log(Data[0]);
    
    // Chart 1

    var dataPoints = [];
    var data = [];
    var dataSeries = { type: "line" };
        for (var i = 0; i < DataCalories.length; i++) {
            dataPoints.push({
                x: i,
                y: parseInt(DataCalories[i])
            });
        }
        console.log(dataPoints);

        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);
        console.log(data);
        var options = {
            zoomEnabled: true,
            animationEnabled: true,
            title: {
                text: "Calories"
            },
            axisY: {
                includeZero: true,
                lineThickness: 1
            },
            data: data  // random data
        };
        
        var chart = new CanvasJS.Chart("chartContainer", options);
    chart.render();

    // Chart 2
    var dataPoints = [];
    var data = [];
    var dataSeries = { type: "line" };
        for (var i = 0; i < DataWeight.length; i++) {
            dataPoints.push({
                x: i,
                y: parseInt(DataWeight[i])
            });
        }
        console.log(dataPoints);
        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);

        var options = {
            zoomEnabled: true,
            animationEnabled: true,
            title: {
                text: "Weight"
            },
            axisY: {
                includeZero: true,
                lineThickness: 1
            },
            data: data  // random data
        };
        
        var chart = new CanvasJS.Chart("chartContainer2", options);
    chart.render();


    });
}
    