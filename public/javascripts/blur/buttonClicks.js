$("#easy").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "easy";
	$('#walkthrough').modal('show');
})

$("#medium").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "medium";
	$('#walkthrough').modal('show');
})

$("#hard").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "hard";
	$('#walkthrough').modal('show');
})