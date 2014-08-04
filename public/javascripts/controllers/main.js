angular.module('highscoreController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', function($scope, $http, Highscores) {
		$scope.formData = {};
		$scope.loading = true;
		var title = $("#title").text();

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Highscores.get(title)
			.success(function(data) {
				$scope.highscores = data;
				$scope.score = '-score';
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createHighscore = function() {
			$scope.loading = true;
			var score = parseInt($('#score').html());
			//alert(score);
			$scope.formData.score = score;

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (($scope.formData.username != undefined) && ($scope.formData.score != undefined)) {

				// call the create function from our service (returns a promise object)
				Highscores.create(title, $scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						//disable the form
						$('#submitHS').prop('disabled',true);

						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.highscores = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteHighscore = function(id) {
			$scope.loading = true;

			Highscores.delete(title, id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.highscores = data; // assign our new list of todos
				});
		};
	});