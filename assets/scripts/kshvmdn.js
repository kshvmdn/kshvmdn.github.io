function fetch(url, cb) {
  var xhr = new XMLHttpRequest;
  xhr.open('get', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var status = xhr.status;

      if (status !== 200) return cb(status);

      try {
        return cb(null, JSON.parse(xhr.responseText));
      } catch (e) {
        return cb(e);
      }
    }
  };
  xhr.send();
}

function replacer(match, indent, key, val, end) {
  var TYPE_CLASSES = {
    key: 'json key',
    val: 'json value',
    str: 'json string',
    bool: 'json boolean',
    none: 'json null'
  };

  var body = '';
  var head = indent || '';
  var tail = end || '';

  if (key) {
    var $key = document.createElement('span');
    $key.setAttribute('class', TYPE_CLASSES.key);
    $key.innerHTML = key.replace(/[": ]/g, '') + ': ';
    body += $key.outerHTML;
  }

  if (val) {
    var type;

    switch (typeof eval(val)) {
      case 'string':
        type = 'str';
        break;
      case 'boolean':
        type = 'bool';
        break;
      case 'number':
        type = 'val';
        break;
      default:
        type = 'none';
        break;
    }

    if (/(https?:\/\/[^\s]+)|.\/assets/g.test(val)) {
      val = val.replace(/"/g, '');

      var $a = document.createElement('a');
      $a.setAttribute('href', val);
      $a.innerHTML = /.\/assets/g.test(val) ? val.substr(val.lastIndexOf('/') + 1) : val;

      val = '"' + $a.outerHTML + '"';
    }

    var $val = document.createElement('span');
    $val.setAttribute('class', TYPE_CLASSES[type]);
    $val.innerHTML = val;
    body += $val.outerHTML;
  }

  return head + body + tail;
}

function prettyPrint(obj) {
  var line = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
  return JSON.stringify(obj, null, 2).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(line, replacer);
}

function loadConsole() {
  fetch('./assets/docs/kshvmdn.json', function(err, res) {
    if (err || !res) {
      document.querySelector('.preload').style.display = 'block';
      document.querySelector('.console').style.display = 'none';
      return false;
    }

    for (var k in res) {
      var $el = document.getElementById(k + '-json');
      $el.innerHTML = prettyPrint(res[k]);
    }

    document.querySelector('.console').style.display = 'block';

    document.querySelector('.close').addEventListener('click', hideConsole, false);
    document.querySelector('.maximize').addEventListener('click', toggleConsole, false);
  });
}

function hideConsole() {
  var isMaximized = document.querySelector('.console').style.maxWidth === '100vw';
  var isShown = document.querySelector('.console').style.display === 'block';

  if (isMaximized) {
    toggleConsole();
  }

  document.querySelector('.preload').style.display = isShown ? 'block' : 'none';
  document.querySelector('.console').style.display = isShown ? 'none' : 'block';
}

function toggleConsole() {
  var $code = document.querySelector('.code');
  var $container = document.querySelector('.container');
  var $console = document.querySelector('.console');
  var $header = document.querySelector('header');
  var $main = document.querySelector('main');

  if ($console.style.display !== 'block' || !$code) {
    return false;
  }

  var elements = [
    { element: $container, selectors: { paddingTop: '10px', paddingBottom: '10px' } },
    { element: $main, selectors: { paddingTop: '0px', paddingBottom: '0px' } },
    { element: $header, selectors: { display: 'none' } },
    { element: $console, selectors: { maxWidth: '100vw' } },
    { element: $code, selectors: { maxHeight: '95vh' } }
  ]

  elements.forEach(function(o) {
    var el = o.element;
    var selectors = o.selectors;

    for (var s in selectors) {
      el.style[s] = el.style[s] === selectors[s] ? '' : selectors[s];
    }
  });
}

(function() {
  window.addEventListener('load', loadConsole);
})();

