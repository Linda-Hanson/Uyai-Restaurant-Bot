const moment = require('moment')

function formatMessages(username,text){
      return {
        username : username,
        text : text,
        time: moment().format('h:mm a'),
      }
};


module.exports =formatMessages