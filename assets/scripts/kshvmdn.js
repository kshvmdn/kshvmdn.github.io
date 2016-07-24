var TYPE_CLASSES = {
  key: 'json key',
  val: 'json value',
  str: 'json string',
  bool: 'json boolean',
  none: 'json null'
}

function getJson (url, cb) {
  var xhr = new XMLHttpRequest()

  xhr.open('get', url, true)
  xhr.onreadystatechange = function() {
    var status = void(0)

    if (xhr.readyState === 4) {
      status = xhr.status
      if (status != 200) {
        return cb(status)
      }

      var data = JSON.parse(xhr.responseText)
      cb(null, data)
    }
  }
  xhr.send()
}

function replaceJson (match, indent, key, val, end) {
  var start = indent || ''
  var end = end || ''

  if (key) {
    $key = document.createElement('span')
    $key.setAttribute('class', TYPE_CLASSES.key)
    $key.innerHTML = key.replace(/[": ]/g, '') + ': '

    start += $key.outerHTML
  }

  if (val) {
    var type = void(0)

    switch(typeof eval(val)) {
      case 'string':
        type = 'str'
        break
      case 'boolean':
        type = 'bool'
        break
      case 'number':
        type = 'val'
        break
      default:
        type = 'none'
        break
    }

    if (/(https?:\/\/[^\s]+)|.\/assets/g.test(val)) {
      val = val.replace(/"/g, '')

      var $a = document.createElement('a')
      $a.setAttribute('href', val)
      $a.innerHTML = /.\/assets/g.test(val) ? val.substr(val.lastIndexOf('/') + 1) : val

      val = '"' + $a.outerHTML + '"'
    }

    var $val = document.createElement('span')
    $val.setAttribute('class', TYPE_CLASSES[type])
    $val.innerHTML = val

    start += $val.outerHTML
  }

  return start + end
}

function prettyPrint (obj) {
  var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg
  return JSON.stringify(obj, null, 2).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(jsonLine, replaceJson)
}

window.onload = function () {
  getJson('./assets/docs/kshvmdn.json', function(err, res) {
    if (err || !res) res = {}

    for (var k in res) {
      var $el = document.getElementById(k + '-json')
      $el.innerHTML = prettyPrint(res[k])
    }

    document.querySelector('.console').style.display = 'block'
  })
}
