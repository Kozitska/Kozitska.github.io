Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});

if(!sign) {
  var sign = function(n) { return n/abs(n); };
}

var rad = function(val, unit) {
  var val = val || 0, 
      unit = 'deg';
  
  if(unit === 'deg') { return val*PI/180; }
  if(unit === 'rad') { return val; }
  if(unit === 'turn') { return val*2*PI; }
  if(unit === 'grad') { return val*PI/200; }
};

var deg = function(val, unit) {
  var val = val || 0, 
      unit = 'rad';
  
  if(unit === 'deg') { return val; }
  if(unit === 'rad') { return val*180/PI; }
  if(unit === 'turn') { return val*360; }
  if(unit === 'grad') { return val*9/10; }
};

Node.prototype.setAttrs = function(attr_obj) {
  for(var prop in attr_obj) {
    this.setAttribute(prop, attr_obj[prop]);
  }
};

var target = document.querySelector('g.final'), 
    codebox = document.querySelector('.codebox'),
    sar = document.getElementById('a'), 
    ac = document.querySelectorAll('.ac'), 
    sel1 = '.point.initial', 
    p1 = document.querySelector(sel1), 
    sel2 = '.point.final', 
    p2 = document.querySelector(sel2), 
    cl = document.querySelector('.conn'), 
    arc = document.querySelector('.arc'), 
    α = rad(sar.value), 
    axis = 'X', r = 80;

var tokenize = function(str) {
  var s = "<span class='token token--", 
      m = "'>", e = '</span>', 
      f = ' contenteditable ',
      tt = [ /* token types */
        'property', 'punctuation', 'value', 
        'function', 'argument', 'number', 'unit'
      ], 
      re = /([a-z]+)(\:)\s*([a-zA-Z]+)(\()(-?[0-9]*\.?[0-9]+)([a-z]*)(\))(;)?/;
    
  str = str.replace(re, 
   s + tt[0] + m + '$1' + e + 
   s + tt[1] + m + '$2' + e + ' ' + 
   s + tt[2] + m + 
     s + tt[3] + m + '$3' + e + 
     s + tt[1] + m + '$4' + e + 
     s + tt[4] + m + 
       s + tt[5] + "'" + f + '>$5' + e + 
       s + tt[6] + "'" + f + '>$6' + e + e + 
     s + tt[1] + m + '$7' + e + e + 
   s + tt[1] + m + '$8' + e);
      
  return str;
};

var updateAxis = function() {
  axis = this.id.toUpperCase();
  updateCode();
  updateSVG();
};

var updateAngleVal = function() {
  α = rad(sar.value);
  updateCode();
  updateSVG();
};

var updateCode = function() {
  var valsel = '.token--value', 
      valel = codebox.querySelector(valsel);
    
  valel.textContent = 'skew' + axis + 
    '(' + sar.value + 'deg)';
  
  codebox.innerHTML = tokenize(codebox.textContent);
};

var updateSVG = function() {
  var newval = 'skew' + axis + 
      				 '(' + sar.value + ')', 
      sgn = sign(α), d;
  
  target.setAttribute('transform', newval);
  
  if(target.classList) {
    if(target.classList.contains('dir--x') && 
       axis !== 'X') {
      target.classList.remove('dir--x');
      target.classList.add('dir--y');
    }
    if(target.classList.contains('dir--y') && 
       axis !== 'Y') {
      target.classList.remove('dir--y');
      target.classList.add('dir--x');
    }
  }
  else {
    if((target.className.baseVal.indexOf('x') !== -1 || 
        target.className.animVal.indexOf('x') !== -1) && 
       axis !== 'X') {
      target.className.baseVal = 
        target.className.baseVal.replace('x', 'y');
      target.className.animVal = 
        target.className.animVal.replace('x', 'y');
    }
    if((target.className.baseVal.indexOf('y') !== -1 || 
        target.className.animVal.indexOf('y') !== -1) && 
       axis !== 'Y') {
      target.className.baseVal = 
        target.className.baseVal.replace('y', 'x');
      target.className.animVal = 
        target.className.animVal.replace('y', 'x');
    }
  }
  
  if(axis == 'X' && abs(α) > .01) {
    d = 'M' + r*sin(α) + ' ' + r*cos(α) + 
      'A' + r + ' ' + r + 
      ' 0 0 ' + (sgn + 1)/2 + ' 0 ' + r;
    
    if(abs(α) > PI/12) {
      d += 'L' + sgn*15 + ' ' + (r - 10) + 
        'L' + sgn*10 + ' ' + r + 
        'L' + sgn*15 + ' ' + (r + 10) + 
        'L0 ' + r + 
        'A' + r + ' ' + r + 
        ' 0 0 ' + (-sgn + 1)/2 + ' ' + 
        r*sin(α) + ' ' + r*cos(α);
    }
  }
  if(axis === 'Y' && abs(α) > .01) {
    d = 'M' + r*cos(α) + ' ' + r*sin(α) + 
      'A' + r + ' ' + r + 
      ' 0 0 ' + (-sgn + 1)/2 + ' ' + r + ' 0';
    if(abs(α) > PI/12) {
      d += 'L' + (r - 10) + ' ' + sgn*15 + 
        'L' + r + ' ' + sgn*10 + 
        'L' + (r + 10) + ' ' + sgn*15 + 
        'L' + r + ' 0' + 
        'A' + r + ' ' + r + 
        ' 0 0 ' + (sgn + 1)/2 + ' ' + 
        r*cos(α) + ' ' + r*sin(α);
    }
  }
  
  arc.setAttribute('d', d);
  
  updatePoint();
};

var updatePoint = function() {
  var x, y, a, sgn, d = 'M', 
      r1 = ~~p1.getAttribute('r'), 
      r2 = ~~p2.getAttribute('r');
  
  x = ~~p1.getAttribute('cx');
  y = ~~p1.getAttribute('cy');
  
  if(axis === 'X') {   
    a = round(y*tan(α));
    sgn = sign(a);
    d += (x + sgn*r1) + ' ' + y + 'L';
    
    x += a;
    
    d += (x - sgn*r2) + ' ' + y + 
      'L' + (x - sgn*(r2 + 15)) + ' ' + (y - 10) + 
      'L' + (x - sgn*(r2 + 10)) + ' ' + y + 
      'L' + (x - sgn*(r2 + 15)) + ' ' + (y + 10) + 
      'L' + (x - sgn*r2) + ' ' + y;
        
    p2.setAttrs({'cx': x, 'cy': y});
    cl.setAttribute('d', d);
  }
  if(axis === 'Y') {
    a = round(x*tan(α));
    sgn = sign(a);
    d += x + ' ' + (y + sgn*r1) + 'L';
    
    y += a;
    
    d += x + ' ' + (y - sgn*r2) + 
      'L' + (x - 10) + ' ' + (y - sgn*(r2 + 15)) + 
      'L' + x + ' ' + (y - sgn*(r2 + 10)) + 
      'L' + (x + 10) + ' ' + (y - sgn*(r2 + 15)) + 
      'L' + x + ' ' + (y - sgn*r2);
    
    p2.setAttrs({'cx': x, 'cy': y});
    cl.setAttribute('d', d);
  }
  
  if(cl.getTotalLength() < 75) {
    cl.style.opacity = .001;
  }
  else { cl.style.opacity = .999; }
};

codebox.innerHTML = tokenize(codebox.textContent);

sar.addEventListener('change', updateAngleVal, 
                     false);
sar.addEventListener('input', updateAngleVal, 
                     false);
ac[0].addEventListener('change', updateAxis, 
                     false);
ac[1].addEventListener('change', updateAxis, 
                     false);