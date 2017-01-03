var updateCheckState = function(check) {
  var html = '';
  if (typeof check.isUp == 'undefined') {
    if (check.lastTested) {
      // recover from pause
      html += '<span class="label bg-blue bg-font-blue">unknown</span>';
    } else {
      // never tested
      // html += '<span class="label label-important">down</span> <span class="label label-warning">new</span>';
      html += '<span class="label bg-red-mint bg-font-red-mint">down</span><span class="font-red-mint font-lg">new</span>'
    }
  } else {
    var status = {};
    if (check.isPaused) {
      // paused
      status.label = 'bg-blue bg-font-blue';
      status.color = 'font-blue font-lg';
      status.text = 'paused';
      status.date = check.lastTested;
    } else if (check.isUp) {
      // up
      status.label = 'bg-green-jungle bg-font-green-jungle';
      status.color = 'font-green-jungle font-lg';
      status.text = 'up';
      status.date = check.lastChanged;
    } else {
      // down
      status.label = 'bg-red-mint bg-font-red-mint';
      status.color = 'font-red-mint font-lg';
      status.text = 'down';
      status.date = check.lastChanged;
    }
    html += '<span class="label ' + status.label + '">' +  status.text +'</span>'
    html += '<span class="' + status.color + '"> for <span title="' + new Date(status.date) + '">' + moment(status.date).fromNow(true) + '</span></span>';
  }
  $('#check_24h').html(html);
}