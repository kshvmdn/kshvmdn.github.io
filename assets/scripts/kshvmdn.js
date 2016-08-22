var TYPES = {
  key: 'json key',
  val: 'json value',
  str: 'json string',
  bool: 'json boolean',
  none: 'json null'
};

function getJson(url, cb) {
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
  var body = '';
  var head = indent || '';
  var tail = end || '';

  if (key) {
    var $key = document.createElement('span');
    $key.setAttribute('class', TYPES.key);
    $key.innerHTML = key.replace(/[": ]/g, '') + ': ';
    body += $key.outerHTML;
  }

  var type;

  if (val) {
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
    $val.setAttribute('class', TYPES[type]);
    $val.innerHTML = val;
    body += $val.outerHTML;
  }

  return head + body + tail;
}

function prettyPrint(obj) {
  var line = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
  return JSON.stringify(obj, null, 2).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(line, replacer);
}

window.onload = function() {
  getJson('./assets/docs/kshvmdn.json', function(err, res) {
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

    document.querySelector('.close').addEventListener('click', Console.toggle);
    document.querySelector('.maximize').addEventListener('click', Console.maximize);
  });
}

function Console() {};

Console.toggle = Console.prototype.toggle = function () {
  var $preload = document.querySelector('.preload');
  var $console = document.querySelector('.console');

  var isConsoleShown = $console.style.display === 'block';
  var isMaximized = $console.style.maxWidth === '100vw';

  if (isMaximized) Console.maximize();

  $preload.style.display = isConsoleShown ? 'block' : 'none';
  $console.style.display = isConsoleShown ? 'none' : 'block';
}

Console.maximize = Console.prototype.maximize = function () {
  var $container = document.querySelector('.container');
  var $main = document.querySelector('main');
  var $header = document.querySelector('header');
  var $console = document.querySelector('.console');
  var $code = document.querySelector('.code');

  if ($console.style.display !== 'block' || !$code) return false;

  var isMaximized = $console.style.maxWidth === '100vw';

  var css = [
    { element: $container, selectors: { paddingTop: '10px', paddingBottom: '10px' } },
    { element: $main, selectors: { paddingTop: 0, paddingBottom: 0 } },
    { element: $header, selectors: { display: 'none' } },
    { element: $console, selectors: { maxWidth: '100vw' } },
    { element: $code, selectors: { maxHeight: '95vh' } }
  ];

  css.forEach(function(opt) {
    for (var selector in opt.selectors) {
      opt.element.style[selector] = isMaximized ? '' : opt.selectors[selector]
    }
  });
}
