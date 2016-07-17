var json = {
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
      $key = document.createElement('span');
      $key.setAttribute('class', classes.key);
      $key.innerHTML = pKey.replace(/[": ]/g, '') + ': ';

      r += $key.outerHTML;
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

      if (/(https?:\/\/[^\s]+)|.\/assets/g.test(pVal)) {
        pVal = pVal.replace(/"/g, '');

        var $a = document.createElement('a');
        $a.setAttribute('href', pVal);
        $a.innerHTML = /.\/assets/g.test(pVal) ? pVal.substr(pVal.lastIndexOf('/') + 1) : pVal;

        pVal = '"' + $a.outerHTML + '"';
      }

      var $val = document.createElement('span');
      $val.setAttribute('class', classes[type]);
      $val.innerHTML = pVal;

      r += $val.outerHTML;
    }

    return r + (pEnd || '');
  },
  prettyPrint: function(obj) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, json.replacer);
  }
};

var data = {
  meta: {
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
      description: 'Scraper and web API for real-time Brampton Transit bus schedules.',
      link: 'https://github.com/kshvmdn/next-ride-api',
      technology: ['Python', 'Node.js']
    },
    {
      name: 'SEEN IT',
      description: 'Replacement for the deprecated reddit.tv, a web application for streaming videos via /r/videos.',
      link: 'https://github.com/kshvmdn/seen-it',
      technology: ['ReactJS']
    },
    {
      name: 'Tweetbot',
      description: 'Twitter bot for automatically replying to mentions that contain a specific phrase.',
      link: 'https://github.com/kshvmdn/tweetbot',
      technology: ['Python']
    },
    {
      name: 'Border Times',
      description: 'Web API and scraper for Canadian border wait times.',
      link: 'https://github.com/kshvmdn/border-times',
      technology: ['Python (Flask)']
    },
    'https://github.com/kshvmdn?tab=repositories'
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
      start: 'February 2015',
      end: null
    }, {
      name: 'Empower Youth Vision',
      role: 'Technical Lead',
      description: null,
      start: 'May 2015',
      end: 'November 2015'
    },
    'https://linkedin.com/in/kshvmdn'
  ],
  resume: './assets/docs/resume.pdf'
}

window.onload = function() {
  for (var k in data) {
    var $el = document.getElementById(k + '-json');
    $el.innerHTML = json.prettyPrint(data[k]);
  }

  document.querySelector('.console').style.display = 'block';
};
