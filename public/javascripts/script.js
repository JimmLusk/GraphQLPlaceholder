
$('.request-btn').on('mouseup', (e) => {
  $('.response').addClass('show');
});

$('.copy-btn').on('mouseup', (e)=>{
  $('.uri-value').select();
  document.execCommand('copy');
  $('.uri-value').blur();
});