function placeOptions() {

	//Get the url of the photo to use next
	if (initial_img == false) {
		var img_info = getPhotoInfo();
	} else {
		answer = initial_img.name;
		option2 = initial_img.option1;
		option3 = initial_img.option2;
		option4 = initial_img.option3;
		initial_img = false;
		var img_info = getPhotoInfo();
	}

	var array_option = OPTIONS;

	var ans_arr_loc = Math.floor(Math.random() * array_option);
	ans_loc = places[ans_arr_loc];
	array_option--;
	places.splice(ans_arr_loc,1);

	var opt2_arr_loc = Math.floor(Math.random() * array_option);
	var opt2_loc = places[opt2_arr_loc];
	array_option--;
	places.splice(opt2_arr_loc,1);

	var opt3_arr_loc = Math.floor(Math.random() * array_option);
	var opt3_loc = places[opt3_arr_loc];
	array_option--;
	places.splice(opt3_arr_loc,1);

	var opt4_loc = places[0];
	places.splice(0,1);
	places = [1,2,3,4];

	createAnsImg(ans_loc, img_info.hash);

	if (ans_loc == 4) {
		$(".vertical-row1").html(answer);
		if (opt2_loc == 3) {
			$(".row4").html(option2);
			if (opt3_loc == 2) {
				$(".vertical-row2").html(option3);
				$(".row2").html(option4);
			} else {
				$(".vertical-row2").html(option4);
				$(".row2").html(option3);
			}
		} else if (opt2_loc == 2) {
			$(".vertical-row2").html(option2);
			if (opt3_loc == 3) {
				$(".row2").html(option4);
				$(".row4").html(option3);
			} else {
				$(".row2").html(option3);
				$(".row4").html(option4);
			}
		//Seems to get an error on this use case
		} else {
			$(".row2").html(option2);
			if (opt3_loc == 3) {
				$(".row4").html(option3);
				$(".vertical-row2").html(option4);
			} else {
				$(".row4").html(option4);
				$(".vertical-row2").html(option3);
			}
		}


	} else if (ans_loc == 3) {
		$(".row4").html(answer);
		if (opt2_loc == 4) {
			$(".vertical-row1").html(option2);
			if (opt3_loc == 2) {
				$(".vertical-row2").html(option3);
				$(".row2").html(option4);
			} else {
				$(".vertical-row2").html(option4);
				$(".row2").html(option3);
			}
		} else if (opt2_loc == 2) {
			$(".vertical-row2").html(option2);
			if (opt3_loc == 4) {
				$(".row2").html(option4);
				$(".vertical-row1").html(option3);
			} else {
				$(".row2").html(option3);
				$(".vertical-row1").html(option4);
			}
		} else {
			$(".row2").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row1").html(option3);
				$(".vertical-row2").html(option4);
			} else {
				$(".vertical-row1").html(option4);
				$(".vertical-row2").html(option3);
			}
		}


	} else if (ans_loc == 2) {
		$(".vertical-row2").html(answer);
		if (opt2_loc == 4) {
			$(".vertical-row1").html(option2);
			if (opt3_loc == 3) {
				$(".row2").html(option4);
				$(".row4").html(option3);
			} else {
				$(".row2").html(option3);
				$(".row4").html(option4);
			}
		} else if (opt2_loc == 3) {
			$(".row4").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row1").html(option3);
				$(".row2").html(option4);
			} else {
				$(".vertical-row1").html(option4);
				$(".row2").html(option3);
			}
		} else {
			$(".row2").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row1").html(option3);
				$(".row4").html(option4);
			} else {
				$(".vertical-row1").html(option4);
				$(".row4").html(option3);
			}
		}


	} else {
		$(".row2").html(answer);
		if (opt2_loc == 4) {
			$(".vertical-row1").html(option2);
			if (opt3_loc == 3) {
				$(".vertical-row2").html(option4);
				$(".row4").html(option3);
			} else {
				$(".vertical-row2").html(option3);
				$(".row4").html(option4);
			}
		} else if (opt2_loc == 3) {
			$(".row4").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row2").html(option4);
				$(".vertical-row1").html(option3);
			} else {
				$(".vertical-row2").html(option3);
				$(".vertical-row1").html(option4);
			}
		} else {
			$(".vertical-row2").html(option2);
			if (opt3_loc == 3) {
				$(".vertical-row1").html(option4);
				$(".row4").html(option3);
			} else {
				$(".vertical-row1").html(option3);
				$(".row4").html(option4);
			}
		}
	}

	answer = img_info.name;
	option2 = img_info.option1;
	option3 = img_info.option2;
	option4 = img_info.option3;
}