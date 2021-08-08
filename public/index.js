comments = []

function readCommentsCSV(){
    $("div#commentList").html("");
	$.ajax({
	  type: "GET",  
	  url: "comments",
	  dataType: "text",       
	  success: function(response)  
	  {
		comments = $.csv.toArrays(response);
		console.log("Fetching Comments", comments);
        comments.forEach(comment => {
            $( "div#commentList" ).append(commentTemplate(comment[0], comment[1]))
        });
	  }   
	});
}

function commentTemplate(userName, comment){
    return `<div class="list-group col-md-12">
        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${userName}</h5>
            <small>3 days ago</small>
        </div>
        <p class="mb-1">${comment}</p>
        </a>
    </div>`;
}

function generateComment(userName, comment){
    $.post({
        traditional: true,
        url: '/addComment',
        contentType: 'application/json',
        data: JSON.stringify({"userName": userName, "comment": comment}),
        dataType: 'json',
        success:function(res){
            console.log('in success');
            readCommentsCSV();
        },
        error: function(xhr, status, error) {
            console.log(status, error, xhr);
        }
    });

}

function generateAlert(message){
    $("div#warningContent").html(`<div class="alert alert-danger" role="alert">${message}</div>`);
}

$(document).ready(function(){
    readCommentsCSV();
});

$( "button#submit" ).click(function() {
    $("div#warningContent").html("");
    var userName = $("input#username").val();
    var comment = $("textarea#comment").val();

    if(userName == "" || comment == "null"){
        generateAlert("No username or comment to submit.");
        return
    }
    generateComment(userName, comment);

    $("input#username").val("");
    $("textarea#comment").val("");
  });