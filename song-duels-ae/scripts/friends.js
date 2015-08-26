
//friends
function VerifyFriend(e){
  e.preventDefault();
  var friend_nickname = $("#friend_nickname_jquery").val();
  if (friend_nickname == "")
    {
      $("#friend_error").text("Please provide a nickname!");
      $("#friend_error").fadeIn(1000);
      $("#friend_error").fadeOut(3000);
      return false;
    }
  else
    {
      return VerifyNoRepeat(friend_nickname);
    }
}
//friends
function VerifyNoRepeat(friend_nickname){
  $.post("/friends", {"friend_nickname": friend_nickname}, function(data){
    if (data.repeat)
    {
      $("#friend_error").text("You are already friends with them!");
      $("#friend_error").fadeIn(1000);
      $("#friend_error").fadeOut(3000);
    }
    else if (data.is_self)
    {
      $("#friend_error").text("You can't add yourself stupid!");
      $("#friend_error").fadeIn(1000);
      $("#friend_error").fadeOut(3000);
    }
    else if (!data.is_valid)
    {
      $("#friend_error").text("That nickname doesn't exist!");
      $("#friend_error").fadeIn(1000);
      $("#friend_error").fadeOut(3000);
    }
    else {
      window.location.href = "/friends";
      }

  });
}
//friends
function ShowAddFriends() {
  $("#add_friends_form").fadeIn(0);
  $("#show_add_friends").fadeOut(0);
  return false;
}
//friends
function NotifyDelete(e){
  e.preventDefault();
  var delete_friend_id = $("#delete_friend_id").val();
  $.post("/deletefriend", {"delete_friend_id": delete_friend_id}, function(data){
      alert("You are no longer friends with " + data.friend_nickname + "!" )
      window.location.href = "/friends";
  });
}

function ResponseYes(e) {
  e.preventDefault();
  var id_requested = $("#id_requested").val();
  $.post("/respond", {"id_requested": id_requested,"response":"yes"}, function(data){
    window.location.href = "/friends";
  });
}

function ResponseNo(e) {
  e.preventDefault();
  var id_requested = $("#id_requested").val();
  $.post("/respond", {"id_requested": id_requested,"response":"no"}, function(data){
    window.location.href = "/friends";
  });
}
//all
$(document).ready(
  function() {
    $('#show_add_friends').on('submit', ShowAddFriends)
    $('#add_friends_form').on('submit', VerifyFriend)
    $('#delete').on('submit', NotifyDelete)
    $('#response_no_form').on('submit', ResponseNo)
    $('#response_yes_form').on('submit', ResponseYes)
    $(".big_btn").hover(function(){
    $(this).css("background", "#fcb888");
    }, function(){
    $(this).css("background", "white");
  });
});
