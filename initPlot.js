window.onload = function(){
    getMetadata();
    initPlot();
};

function initPlot(){
    var chart = new Highcharts.chart({
        chart: {
            renderTo: 'mainPlot',
            type: 'scatter',
        },
        title:{
            text:null
        }
    });
    chart.showLoading();
    setTimeout(function(){
        Highcharts.chart('mainPlot', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            tooltip:{
                crosshairs: true
            },
            title:{
                text: null
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Average Sentiment'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: false
            },
            yAxis: {
                title: {
                    text: 'Average Rating'
                },
                gridLineWidth: 0,
                showLastLabel: false
            },
            legend: {
                enabled: false
                // layout: 'vertical',
                // align: 'left',
                // verticalAlign: 'top',
                // x: 100,
                // y: 70,
                // floating: true,
                // backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                // borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: 'Title: {point.title} <br/> Sentiment Score: {point.sentimentValue} <br/> Rating: {point.rating}'
                    }
                }
            },
            series: [{
                data: processChartData(null),
                name: 'Amazon Fashion'
            }]
        })

    }, 3000);

}

//handle the click function to show the modal
function handleClick(){

}