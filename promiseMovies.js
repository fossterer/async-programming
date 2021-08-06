const axios = require('axios');
const fs = require('fs').promises;

axios.get('https://ghibliapi.herokuapp.com/films')
	.then(response => {
		console.log('Successfully retrieved our list of movies');

		let movieList = '';
		response.data.forEach(movie => {
			movieList += `${movie['title']}, ${movie['release_date']}\n`;
		});

		return fs.writeFile('promiseMovies.csv', movieList);
	})
	.catch(error => {
		// This is the only 'catch' block that ever works. The one written at the end would never be invoked
		console.error(`Could not send HTTP request to 'Ghibli Movies API': ${error}`);
	})
	.then(() => {
		console.log('Saved our list of movies to promiseMovies.csv');
	})
	.catch(error => {
		// This would never be invoked. Only first 'catch' is effective for the entire promise chain
		console.error(`Request succeeded but write to file failed: ${error}`)
	});
