$("#easy").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "easy";
	init_quick();
})

$("#medium").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "medium";
	init_quick();
})

$("#hard").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "hard";
	init_quick();
})