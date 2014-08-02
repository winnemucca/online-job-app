$(function(){
	$('.deleteButton').on('click', function() {
		$(this).parent().remove();
		console.log('holler!!!');
	});

	
});