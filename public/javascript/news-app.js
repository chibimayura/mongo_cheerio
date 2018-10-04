let newTitle, newLink, newSummary, newImage, newDiv, newSave, articleContent;

let mainContainer = $('main');

const getResults = () => {
	mainContainer.empty();

	$.getJSON('/all', function(data){
		for(let i = 0; i < data.length; i++){
			newDiv = $('<div class="article border border-dark rounded p-3 my-4">').attr('data-id', data[i]._id);
			//combining title and link
			newTitle = $('<h4 class="title d-inline-flex">');
			newLink = $('<a class="link">').attr('href', data[i].link).text(data[i].title);
			newSave = $('<button class="save btn btn-primary ml-4">').text('Save');
			newTitle.append(newLink, newSave);

			articleContent = $('<div class="row">')
			newImage = $('<img class="thumbnail m-auto col-sm-4">').attr('src', data[i].image);
			newSummary = $('<p class="summary col-sm-8">').text(data[i].summary);

			articleContent.append(newImage, newSummary)
			newDiv.append(newTitle, newSave, '<hr>', articleContent);

			mainContainer.append(newDiv);
		}
	});
}

//Grabs results from database when user clicks on the get news button
$(document).on('click', '.get-news', getResults);

//Add to save
$(document).on('click', '.save', function(){
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/save-news',
		data: {
			title: $(this).siblings('h4').children('a').text(),
			link: $(this).siblings('h4').children('a').attr('href'),
			summary: $(this).siblings('div').children('p').text(),
			image: $(this).siblings('div').children('img').attr('src')
		}
	}).then(function(data){
		console.log(data);
	});
});