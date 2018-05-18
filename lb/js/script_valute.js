function Download(API, tableId) {
    var XHRequest = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
    var xml = new XHRequest();

    xml.open('GET', API, true);

    xml.onload = function () {
        var xmlv = this.responseXML;
        var p24tb = document.getElementById(tableId).tBodies[0];
        var tempArr = xmlv.getElementsByTagName('exchange');
        for (var i = 0; i < p24tb.rows.length; i++) {
            var tableRow = p24tb.rows[i];
            tableRow.cells[0].innerHTML = tempArr[i].getAttribute('txt');
            tableRow.cells[1].innerHTML = tempArr[i].getAttribute('rate');
            tableRow.cells[2].innerHTML = tempArr[i].getAttribute('cc');
        }
    };

    xml.send();
}
var date = new Date();
date = date.getFullYear().toString() + (date.getMonth()+1) + date.getDate();
var API = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date='+date;
var privatRatesTable = 'p24tb';
Download(API, privatRatesTable);