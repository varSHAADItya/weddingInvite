(function () {
  var opening = document.getElementById('opening');
  var openButton = document.getElementById('openInvitation');
  var audio = document.getElementById('bgMusic');
  var soundToggle = document.getElementById('soundToggle');
  var replay = document.getElementById('replay');

  function playMusic() {
    if (!audio) return;
    audio.volume = .55;
    var result = audio.play();
    if (result && typeof result.catch === 'function') result.catch(function () {});
    soundToggle.textContent = '♫';
    soundToggle.setAttribute('aria-label', 'Pause music');
  }

  function openInvitation() {
    if (!opening || opening.dataset.opened === 'true') return;
    opening.dataset.opened = 'true';
    document.body.classList.remove('is-locked');
    opening.classList.add('is-open');
    playMusic();
    setTimeout(function () { opening.style.display = 'none'; }, 900);
  }

  if (openButton) openButton.addEventListener('click', openInvitation);
  if (soundToggle) soundToggle.addEventListener('click', function () {
    if (!audio || audio.paused) { playMusic(); return; }
    audio.pause();
    soundToggle.textContent = '♪';
    soundToggle.setAttribute('aria-label', 'Play music');
  });
  if (replay) replay.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    opening.style.display = '';
    opening.dataset.opened = 'false';
    opening.classList.remove('is-open');
    document.body.classList.add('is-locked');
    if (audio) audio.pause();
  });

  function revealAll() { document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); }); }
  if (!('IntersectionObserver' in window)) { revealAll(); return; }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
}());

(function () {
  var target = new Date('2026-12-12T18:00:00+05:30').getTime();
  var days = document.getElementById('countDays');
  var hours = document.getElementById('countHours');
  var minutes = document.getElementById('countMinutes');
  var seconds = document.getElementById('countSeconds');
  var caption = document.querySelector('.countdown__caption');
  if (!days || !hours || !minutes || !seconds) return;

  function updateCountdown() {
    var remaining = Math.max(0, target - Date.now());
    var totalSeconds = Math.floor(remaining / 1000);
    days.textContent = String(Math.floor(totalSeconds / 86400));
    hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
    minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
    if (remaining === 0 && caption) caption.textContent = 'The celebration begins!';
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}());
