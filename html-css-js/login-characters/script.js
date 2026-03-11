(function () {
  'use strict';

  const stage = document.getElementById('stage');
  const pwInput = document.getElementById('pwInput');
  const emailInput = document.getElementById('emailInput');
  const togglePw = document.getElementById('togglePw');

  let isPasswordRevealed = false;
  let isTypingPassword = false;

  const eyeIds = ['eyeA1', 'eyeA2', 'eyeB1', 'eyeB2', 'eyeC1', 'eyeC2', 'eyeD1', 'eyeD2'];
  const pupils = eyeIds.map(function (id) { return document.getElementById(id.replace('eye', 'pupil')); });
  const eyes = eyeIds.map(function (id) { return document.getElementById(id); });
  const allEyeEls = document.querySelectorAll('.eye');

  const blushBL = document.getElementById('blushBL');
  const blushBR = document.getElementById('blushBR');
  const mouthA = document.getElementById('mouthA');
  const mouthB = document.getElementById('mouthB');
  const mouthC = document.getElementById('mouthC');
  const mouthD = document.getElementById('mouthD');

  function movePupil(eyeEl, pupilEl, mouseX, mouseY) {
    var rect = eyeEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dx = mouseX - cx;
    var dy = mouseY - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var max = 3.5;
    var nx = dist > 0 ? (dx / dist) * Math.min(dist, max) : 0;
    var ny = dist > 0 ? (dy / dist) * Math.min(dist, max) : 0;
    pupilEl.style.transform = 'translate(calc(-50% + ' + nx + 'px), calc(-50% + ' + ny + 'px))';
  }

  function setMoodNormal() {
    stage.classList.remove('shy', 'scared', 'curious');

    mouthA.style.cssText = 'bottom:20px;left:28px;width:40px;height:14px;border:3px solid rgba(255,255,255,0.7);border-top:none;border-radius:0 0 20px 20px;';
    mouthB.style.cssText = 'bottom:16px;left:28px;width:30px;height:10px;border:3px solid rgba(255,255,255,0.7);border-top:none;border-radius:0 0 15px 15px;';
    mouthC.style.cssText = 'bottom:14px;left:16px;width:22px;border-top:3px solid rgba(255,255,255,0.6);';
    mouthD.style.cssText = 'bottom:18px;left:18px;width:30px;border-top:3px solid rgba(255,255,255,0.6);border-radius:0;';

    blushBL.style.opacity = 0;
    blushBR.style.opacity = 0;

    allEyeEls.forEach(function (e) {
      e.classList.remove('closed');
      e.style.height = '';
      e.style.borderRadius = '';
    });
  }

  function setMoodPassword() {
    stage.classList.remove('shy', 'scared');
    stage.classList.add('curious');

    mouthA.style.cssText = 'bottom:20px;left:28px;width:40px;border-top:3px solid rgba(255,255,255,0.8);height:0;border-bottom:none;border-radius:0;';
    mouthB.style.cssText = 'bottom:16px;left:28px;width:30px;border-top:3px solid rgba(255,255,255,0.7);height:0;border-bottom:none;border-radius:0;';
    mouthC.style.cssText = 'bottom:14px;left:16px;width:22px;border-top:3px solid rgba(255,255,255,0.6);';
    mouthD.style.cssText = 'bottom:18px;left:18px;width:30px;border-top:3px solid rgba(255,255,255,0.6);border-radius:0;';

    allEyeEls.forEach(function (e) {
      e.classList.remove('closed');
      e.style.height = '7px';
      e.style.borderRadius = '50%';
    });

    blushBL.style.opacity = 0;
    blushBR.style.opacity = 0;
  }

  function setMoodRevealed() {
    stage.classList.remove('curious');
    stage.classList.add('shy');

    allEyeEls.forEach(function (e) {
      e.classList.add('closed');
      e.style.height = '3px';
      e.style.borderRadius = '2px';
    });

    mouthB.style.cssText = 'bottom:14px;left:22px;width:40px;height:18px;border:3px solid rgba(255,255,255,0.9);border-top:none;border-radius:0 0 25px 25px;';
    mouthA.style.cssText = 'bottom:20px;left:20px;width:50px;height:18px;border:3px solid rgba(255,255,255,0.9);border-top:none;border-radius:0 0 25px 25px;';
    mouthD.style.cssText = 'bottom:18px;left:14px;width:36px;height:14px;border:3px solid rgba(255,255,255,0.8);border-top:none;border-radius:0 0 20px 20px;';

    blushBL.style.opacity = 1;
    blushBR.style.opacity = 1;
  }

  document.addEventListener('mousemove', function (e) {
    if (isPasswordRevealed) return;
    pupils.forEach(function (p, i) {
      var eyeEl = eyes[i];
      if (eyeEl && p) movePupil(eyeEl, p, e.clientX, e.clientY);
    });
  });

  pwInput.addEventListener('focus', function () {
    isTypingPassword = true;
    if (!isPasswordRevealed) setMoodPassword();
  });

  pwInput.addEventListener('blur', function () {
    if (!isPasswordRevealed && pwInput.value.length === 0) {
      isTypingPassword = false;
      setMoodNormal();
    }
  });

  pwInput.addEventListener('input', function () {
    if (!isPasswordRevealed) setMoodPassword();
  });

  emailInput.addEventListener('focus', function () {
    if (!isPasswordRevealed && !isTypingPassword) setMoodNormal();
  });

  togglePw.addEventListener('click', function () {
    isPasswordRevealed = !isPasswordRevealed;
    pwInput.type = isPasswordRevealed ? 'text' : 'password';
    togglePw.textContent = isPasswordRevealed ? '🙈' : '👁';

    if (isPasswordRevealed) {
      setMoodRevealed();
    } else {
      if (isTypingPassword) setMoodPassword();
      else setMoodNormal();
    }
  });
})();
