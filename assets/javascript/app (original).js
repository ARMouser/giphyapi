$("#submit").click(capture)
$("#clear").click(clear)

function clear(){
  $("#search").val("")
}

var giflist = ["buffy", "charmed", "battlestar galactica"]

for (var i = 0; i < giflist.length; i++) {
	buttoncreate(giflist[i])
}

function capture(event){
	event.preventDefault()
	var newc = $("#search").val().trim()
	buttoncreate(newc)
	$("#search").val("")
}

function buttoncreate(newb){
	var button = $("<button>")
	button.text(newb)
	button.attr("id", newb)
	button.attr("class", "gifb")
	$(".buttons").append(button)
}

$(document).on("click", ".gifb", gif)

function gif(){
	var search = $(this).attr("id")
	var queryurl = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
          url: queryurl,
          method: "GET"
        })
      .done(function(response){
      	var result = response.data
        console.log(result)
      	for (var i = 0; i < result.length; i++) {
      		var gifdiv = $("<div>")
          var copbut = $("<button>Copy Link</button>")
          copbut.attr("id", "copbut")
          copbut.attr("url", result[i].bitly_url)
      		var ptag = $("<p>").text("Rating: " + result[i].rating)
          ptag.append(copbut)
      		var tvimg = $("<img>")
      		tvimg.attr("src", result[i].images.fixed_height_still.url)
          tvimg.attr("class", "giff")
          tvimg.attr("state", "still")
          tvimg.attr("stillurl", result[i].images.fixed_height_still.url)
          tvimg.attr("activeurl", result[i].images.fixed_height.url)
      		gifdiv.append(tvimg)
      		gifdiv.prepend(ptag)
      		$(".gifs").prepend(gifdiv)
      	}
      })
}

$(document).on("click", ".giff", action)

function action(){
  var state = $(this).attr("state")
  var animate = $(this).attr("activeurl")
  var still = $(this).attr("stillurl")
  if (state === "still")
  {
    $(this).attr('src', animate)
    $(this).attr('state', "animated")
  }
  else
  {
    $(this).attr('src', still)
    $(this).attr('state', "still")
  }
}