/**
 * Created by deathowl on 12/7/16.
 */
var https      = require('https');
var url        = require('url');
var util       = require('util');
var CheckEvent = require('../../models/checkEvent');
request = require("requestretry");

DEFAULT_TIMEOUT = 10 * 1000;

DEFAULT_MAX_ATTEMPTS = 3;


exports.initWebApp = function(options) {
  var config = options.config.openduty;
  CheckEvent.on('afterInsert', function(checkEvent) {
    apiKey = config.apiKey;
    endpoint = config.server + "/api/create_event";
    checkEvent.findCheck(function(err, check) {
        if (checkEvent.message ==="down") {
            payload = {
                "incident_key": check.name + "/PAGEDOWN",
                "service_key": apiKey,
                "event_type": "trigger",
                "description": checkEvent.message,
                "details": "Site down"
            }

        }
        else if (checkEvent.message === "up") {
            payload = {
                "incident_key": check.name + "/PAGEDOWN",
                "service_key": apiKey,
                "event_type": "resolve",
                "description": checkEvent.message,
                "details": "Site up"
            }

        }
        request({
          method: "POST",
          url: endpoint,
          json:true,
          body: payload,
          timeout: 5000,
          maxAttempts: 3,
          retryDelay: 2000
            });
      });

    });
  console.log('Enabled Openduty plugin');
};