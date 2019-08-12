var comment = document.getElementById("comment"),
    commentAuthor = document.getElementById("commentAuthor"),
    commentText = document.getElementById("commentText"),
    image = document.createElement("img"),
    imageLink = document.getElementById("imageLink"),
    newsFeed = document.getElementById("newsFeed"),
    authorName = document.getElementById("authorName"),
    message = document.getElementById("text");

imageLink.addEventListener("input", showImage);
document.getElementById("post").addEventListener("click", postNew);

function showImage() {
    image.classList.add("showImage");
    image.src = imageLink.value;
    document.getElementById("article").appendChild(image);
}

function showDate() {
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    if (day.toString().length < 2) { day = "0" + day; }
    if (month.toString().length < 2) { month = "0" + month; }
    if (hour.toString().length < 2) { hour = "0" + hour; }
    if (minutes.toString().length < 2) { minutes = "0" + minutes; }
    if (seconds.toString().length < 2) { seconds = "0" + seconds; }
    return day + "." + month + "." + year + " " + hour + ":" + minutes + ":" + seconds;
}

function postNew() {

    var div = document.createElement("div"),
        deleteButton = document.createElement("button"),
        author = document.createElement("h2"),
        time = document.createElement("h4"),
        text = document.createElement("p"),
        img = document.createElement("img"),
        imgLink = document.getElementById("imageLink"),
        likeAndComment = document.createElement("div"),
        writeComment = document.createElement("button"),
        likes = document.createElement("button"),
        count = 0,
        showComments = document.createElement("button"),
        allComments = document.createElement("div"),
        arrayComments = [];

    div.classList.add("newsBlock");

    deleteButton.innerHTML = "&#9746;";
    deleteButton.classList.add("deletePost");

    deleteButton.onclick = function() {
        deleteButton.parentElement.classList.add("hide");
    }

    author.classList.add("author");
    author.innerText = authorName.value;

    time.innerText = showDate();

    text.classList.add("textJustify");
    text.innerText = message.value;

    img.classList.add("imagePost");
    img.src = imgLink.value;

    likes.classList.add("likes");
    likes.innerText = "Likes: 0";
    likes.onclick = function() {
        count += 1;
        likes.innerText = "Likes: " + count;
    }

    showComments.classList.add("showComments");
    showComments.innerText = "Show Comments " + "(" + arrayComments.length + ")";

    writeComment.innerText = "Write Comment";

    likeAndComment.classList.add("likeAndComment");
    likeAndComment.appendChild(likes);
    likeAndComment.appendChild(showComments);
    likeAndComment.appendChild(writeComment);

    var addToNewsFeed = [deleteButton, author, time, document.createElement("br"), text, document.createElement("br"), img, document.createElement("br"), document.createElement("br"), likeAndComment, document.createElement("br")];
    addToNewsFeed.forEach(item => div.appendChild(item));

    newsFeed.insertBefore(div, newsFeed.children[1]);
    newsFeed.appendChild(document.createElement("br"));

    authorName.value = ""; message.value = ""; image.src = ""; imgLink.value = "";
    
    function addComment() {
        comment.style.display = "block";
        document.getElementById("sendComment").onclick = function() {
            var oneComment = document.createElement("div"),
                commentAuthorAndTime = document.createElement("p"),
                commentAuthorName = document.createElement("span"),
                commentTextValue = document.createElement("p");
                // answerButton = document.createElement("button");
    
            oneComment.classList.add("comment");

            commentAuthorName.classList.add("author");
            commentAuthorName.innerText = commentAuthor.value;

            commentAuthorAndTime.appendChild(commentAuthorName);
            commentAuthorAndTime.innerHTML = commentAuthorAndTime.innerHTML + " " + "(" + showDate() + ")";

            commentTextValue.innerText = commentText.value;

            // answerButton.style.marginBottom = "10px"; answerButton.innerText = "Answer";

            var addToComment = [document.createElement("br"), commentAuthorAndTime, document.createElement("br"), commentTextValue, document.createElement("br")];
            addToComment.forEach(item => oneComment.appendChild(item));
            // oneComment.appendChild(answerButton);
            // oneComment.appendChild(document.createElement("br"));

            arrayComments.push(oneComment);

            showComments.innerText = "Show Comments " + "(" + arrayComments.length + ")";

            allComments.classList.add("allComments");
    
            div.appendChild(allComments);
            allComments.innerHTML = oneComment.innerHTML;
            commentAuthor.value = ""; commentText.value = "";
            comment.style.display = "none";

            function showAllComments() {
                allComments.innerHTML = "";
                arrayComments.forEach(item => allComments.prepend(item));
                showComments.innerText = "Hide Comments " + "(" + arrayComments.length + ")";
                showComments.removeEventListener("click", showAllComments);
                showComments.addEventListener("click", hideAllComments);
            }
            function hideAllComments() {
                allComments.innerHTML = arrayComments[arrayComments.length - 1].innerHTML;
                showComments.innerText = "Show Comments " + "(" + arrayComments.length + ")";
                showComments.removeEventListener("click", hideAllComments);
                showComments.addEventListener("click", showAllComments);
            }
            showComments.addEventListener("click", showAllComments);

            arrayComments.length < 2 ? showComments.removeEventListener("click", showAllComments) : showComments.addEventListener("click", showAllComments);
        }
        // answerButton.addEventListener("click", addComment);
    }
    
    writeComment.addEventListener("click", addComment);
}