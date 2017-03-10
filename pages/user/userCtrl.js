app.controller('userCtrl', function($scope,$location) {
  $scope.user_rank = 1;         
  $scope.controllby = "user";
  $scope.username = "John Smith";
  $scope.email = "test007@test.com";
  $scope.createChart = function(){
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
            responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    
    $scope.displayChart = function(){
    // chart sample
    var flData = [{x: 100, y: 100}, {x: 200, y: 200}, {x: 300, y: 300}];
    var svg = d3.select("flChart").append("svg")
        .attr("width","300px").attr("height","300px");
    svg
    .selectAll("circle").data(flData)
    .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; }) 
    .attr("r", 2.5);

    console.log(svg);
    }

    

});
