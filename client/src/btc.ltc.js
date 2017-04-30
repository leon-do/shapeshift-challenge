// this displays the graph

var requestHistoryLTC = new XMLHttpRequest();
requestHistoryLTC.open('GET', '/history/BTC_LTC', true);


requestHistoryLTC.onload = function() {
    if (requestHistoryLTC.status >= 200 && requestHistoryLTC.status < 400) {

        //data for the graph
        var data = JSON.parse(requestHistoryLTC.responseText);


        //building the graph
        Highcharts.chart('btcLtc', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'BTC - LTC'
            },
            subtitle: {
                text: 'Last 100 Exchange Rates'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: ''
                }
            },
            yAxis: {
                title: {
                    text: 'Rate (%)'
                },
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Bittrex',
                data: data.bittrex.reverse().splice(1,100)
            }, {
                name: 'Poloniex',
                data: data.poloniex.reverse().splice(0,100)
            }, {
                name: 'Yobit',
                data: data.yobit.reverse().splice(0,100)
            }]
});
    } else {
        console.log('request error')
    }
};

requestHistoryLTC.send();