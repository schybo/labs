angular.module('highscoreService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Highscores', function($http) {
		return {
			get : function() {
				return $http.get('/api/highscores');
			},
			create : function(highscoreData) {
				return $http.post('/api/highscores', highscoreData);
			},
			delete : function(id) {
				return $http.delete('/api/highscores/' + id);
			}
		}
	});