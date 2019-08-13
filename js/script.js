var comment = document.getElementById("comment"),
    commentAuthor = document.getElementById("commentAuthor"),
    commentText = document.getElementById("commentText"),
    image = document.createElement("img"),
    imageLink = document.getElementById("imageLink"),
    newsFeed = document.getElementById("newsFeed"),
    authorName = document.getElementById("authorName"),
    message = document.getElementById("text"),
    post = document.getElementById("post"),
    formConstructor = document.forms[0];

imageLink.addEventListener("input", showImage);
post.addEventListener("click", postNew);
formConstructor.addEventListener("input", validFormConstructor);

function validFormConstructor() {
    if (authorName.value.length < 1) { authorName.style.border = "1px solid red" };
    if (authorName.value.length > 0) { authorName.style.border = "1px solid #e5e7e8" };
    if (message.value.length < 1) { message.style.border = "1px solid red" };
    if (message.value.length > 0) { message.style.border = "1px solid #e5e7e8" };
    if (authorName.value.length > 0 && message.value.length > 0) { post.removeAttribute("disabled") };
    if (authorName.value.length < 1 || message.value.length < 1) { post.setAttribute("disabled", "true") }; 
}

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

        // function validFormComment() {
        //     console.log(1);
        // }
        // document.forms[1].addEventListener("change", validFormComment);

        document.getElementById("sendComment").onclick = function() {
            var oneComment = document.createElement("div"),
                commentAuthorAndTime = document.createElement("p"),
                commentAuthorName = document.createElement("span"),
                commentTextValue = document.createElement("p");
    
            oneComment.classList.add("comment");

            commentAuthorName.classList.add("author");
            commentAuthorName.innerText = commentAuthor.value;

            commentAuthorAndTime.appendChild(commentAuthorName);
            commentAuthorAndTime.innerHTML = commentAuthorAndTime.innerHTML + " " + "(" + showDate() + ")";

            commentTextValue.innerText = commentText.value;

            var addToComment = [document.createElement("br"), commentAuthorAndTime, document.createElement("br"), commentTextValue, document.createElement("br")];
            addToComment.forEach(item => oneComment.appendChild(item));

            arrayComments.push(oneComment);

            showComments.innerText = "Show Comments " + "(" + arrayComments.length + ")";

            allComments.classList.add("allComments");
    
            div.appendChild(allComments);

            allComments.children.length < 2 ? (allComments.innerHTML = oneComment.outerHTML, showComments.addEventListener("click", showAllComments)) : (allComments.prepend(oneComment), showComments.removeEventListener("click", showAllComments), showComments.addEventListener("click", hideAllComments), showComments.innerText = "Hide Comments " + "(" + arrayComments.length + ")");

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
                allComments.innerHTML = arrayComments[arrayComments.length - 1].outerHTML;
                showComments.innerText = "Show Comments " + "(" + arrayComments.length + ")";
                showComments.removeEventListener("click", hideAllComments);
                showComments.addEventListener("click", showAllComments);
            }
        }
    }
    writeComment.addEventListener("click", addComment);
}
