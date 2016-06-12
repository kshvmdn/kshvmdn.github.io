const lib = {
  json: {
    replacer: function(match, pIndent, pKey, pVal, pEnd) {

      var classes = {
        key: 'json-key',
        val: 'json-value',
        str: 'json-string',
        bool: 'json-bool',
        none: 'json-null'
      };

      var r = pIndent || '';

      if (pKey) {
        r += '<span class=' + classes.key + '>' + pKey.replace(/[": ]/g, '') + '</span>: ';
      }

      if (pVal) {
        var type;

        switch(typeof eval(pVal)) {
          case 'string':
            type = 'str';
            break;
          case 'boolean':
            type = 'bool';
            break;
          case 'object':
            type = 'none';
            break;
          case 'number':
          default:
            type = 'val';
            break;
        }

        if (/(https?:\/\/[^\s]+)/g.test(pVal)) {
          pVal = pVal.slice(1, pVal.length-1);
          pVal = '"<a href=' + pVal + '>' + pVal + '</a>"';
        }

        r += '<span class=' + classes[type] + '>' + pVal + '</span>';
      }

      return r + (pEnd || '');
    },
    prettyPrint: function(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 2)
        .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(jsonLine, lib.json.replacer);
    }
  },
  data: {
    info: {
      name: 'Kashav Madan',
      origin: 'Brampton, ON, Canada',
      age: 18,
      occupation: ['student', 'developer', 'designer']
    },
    education: {
      school: 'University of Toronto',
      major: 'Computer Science',
      expected_graduation: 2019
    },
    projects: [
      {
        name: 'Show Me a Movie',
        description: 'Command line tool for streaming movie torrents.',
        link: 'https://www.npmjs.com/package/show-me-a-movie',
        technology: ['Node.js']
      },
      {
        name: 'Next Ride API',
        description: 'Scraper and API for real-time Brampton Transit bus schedules.',
        link: 'https://github.com/kshvmdn/next-ride-api',
        technology: ['Python', 'Node.js']
      },
      {
        name: 'SEEN IT',
        description: 'Replacement for the deprecated reddit.tv, a web application for viewing videos from /r/videos.',
        link: 'https://github.com/kshvmdn/seen-it',
        technology: ['ReactJS']
      },
      {
        name: 'Tweetbot',
        description: 'Twitter bot for automatically replying to mentions that contain a specific phrase.',
        link: 'https://github.com/kshvmdn/tweetbot',
        technology: ['Python']
      }
    ],
    work: [
      {
        name: 'Ontario Public Service',
        role: 'Junior Developer',
        description: null,
        start: 'May 2016',
        end: null
      }, {
        name: 'Chapsule',
        role: 'Lead Developer',
        description: null,
        start: 'February 2016',
        end: null
      }, {
        name: 'Empower Youth Vision',
        role: 'Technical Lead',
        description: null,
        start: 'May 2015',
        end: 'November 2015'
      }
    ],
  }
};

window.onload = function() {
  for (var k in lib.data) {
    var $el = document.getElementById(k);
    $el.innerHTML = lib.json.prettyPrint(lib.data[k]);
  }

  console.log('hi!');
  console.log('http://github.com/kshvmdn');
};
