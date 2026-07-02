const $ = (selector) => document.querySelector(selector);
const screens = {
  intro: $('#intro'), video: $('#videoScreen'), main: $('#mainInvite'), presentes: $('#presentesPage'), manual: $('#manualPage')
};
function show(screen){Object.values(screens).forEach(s=>s.classList.remove('active'));screen.classList.add('active');}
$('.local').href = CONFIG.mapsUrl;
$('.confirmar').href = CONFIG.confirmacaoUrl;
$('.pix').href = CONFIG.pixUrl;
const video = $('#openingVideo');
$('#openEnvelope').addEventListener('click', async () => {
  show(screens.video);
  try { video.currentTime = 0; await video.play(); } catch(e) { $('#skipVideo').textContent = 'Continuar'; }
});
video.addEventListener('ended', () => show(screens.main));
$('#skipVideo').addEventListener('click', () => { video.pause(); show(screens.main); });
document.querySelector('.presentes').addEventListener('click', e => { e.preventDefault(); show(screens.presentes); history.replaceState(null,'','#presentes'); });
document.querySelector('.manual').addEventListener('click', e => { e.preventDefault(); show(screens.manual); history.replaceState(null,'','#manual'); });
document.querySelectorAll('.back').forEach(btn => btn.addEventListener('click', (e) => { if(e.currentTarget.classList.contains('intro-back')){show(screens.intro); history.replaceState(null,'','#');} else {show(screens.main); history.replaceState(null,'','#convite');}}));
window.addEventListener('load', () => { if(location.hash === '#presentes') show(screens.presentes); if(location.hash === '#manual') show(screens.manual); });
