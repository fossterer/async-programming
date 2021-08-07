const axios = require('axios');
const fs = require('fs').promises;

async function saveMovies(){
	let movieList = '';
	
	try{
		let response = await axios.get('https://ghibliapi.herokuapp.com/films');

		response.data.forEach(movie => {
			movieList += `${movie['title']}, ${movie['release_date']}\n`;
		});

		await fs.writeFile('asyncAwaitMovies.csv', movieList);
	}
	catch(error){
		if(error instanceof TypeError){
			console.log('That is a TypeError');
		}
		else{
			console.log(`caught error in any of the many operations: ${error}. Error type is not easy to find out in NodeJS. You should have thrown custom exceptions yourself where they are expected`)
		}
	}

}

saveMovies();
