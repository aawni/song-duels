function Delete(e){
  e.preventDefault();
  var challenge_key = $("#challenge_key").val();
  $.post("/deletechallenge", {"challenge_key": challenge_key}, function(data){
      window.location.href = "/challenges";
  });
}

$(document).ready(
  function() {
    $('#delete_form').on("submit", Delete)
    $(".big_btn").hover(function(){
    $(this).css("background", "#fcb888");
    }, function(){
    $(this).css("background", "white");
  });
});
