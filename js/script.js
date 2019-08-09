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
    image.style.maxWidth = "250px";
    image.style.maxHeight = "165px";
    image.style.animation = "showItem 1s";
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
        author = document.createElement("h2"),
        time = document.createElement("h4"),
        text = document.createElement("p"),
        img = document.createElement("img"),
        imgLink = document.getElementById("imageLink"),
        likeAndComment = document.createElement("div"),
        writeComment = document.createElement("button"),
        likes = document.createElement("a"),
        count = 0,
        allComments = document.createElement("div");

    div.style.width = "95%"; div.style.background = "#e5e7e8"; div.style.padding = "15px"; div.style.animation = "showItem 1s";

    author.style.color = "#15aaea";
    author.innerText = authorName.value;

    time.innerText = showDate();

    text.style.textAlign = "justify";
    text.innerText = message.value;

    img.style.maxWidth = "100%"; img.style.maxHeight = "300px";
    img.src = imgLink.value;

    likes.href = "#"; likes.style.color = "red"; likes.style.textDecoration = "none";
    likes.innerText = "Likes: 0";
    likes.onclick = function() {
        count += 1;
        likes.innerText = "Likes: " + count;
    }

    writeComment.innerText = "Write Comment";

    likeAndComment.style.width = "100%"; likeAndComment.style.display = "flex"; likeAndComment.style.flexDirection = "row"; likeAndComment.style.justifyContent = "space-around";
    likeAndComment.appendChild(likes);
    likeAndComment.appendChild(writeComment);

    var addToNewsFeed = [author, time, document.createElement("br"), text, document.createElement("br"), img, document.createElement("br"), document.createElement("br"), likeAndComment, document.createElement("br")];
    addToNewsFeed.forEach(item => div.appendChild(item));

    newsFeed.appendChild(div);
    newsFeed.appendChild(document.createElement("br"));

    authorName.value = ""; message.value = ""; image.src = ""; imgLink.value = "";

    writeComment.onclick = function() {
        comment.style.display = "block";

        document.getElementById("sendComment").onclick = function() {
            var oneComment = document.createElement("div"),
                commentAuthorAndTime = document.createElement("p"),
                commentAuthorName = document.createElement("span"),
                commentTextValue = document.createElement("p");
    
            oneComment.style.width = "95%"; oneComment.style.background = "#e5e7e8"; oneComment.style.padding = "15px"; oneComment.style.animation = "showItem 1s";

            commentAuthorName.style.color = "#15aaea";
            commentAuthorName.innerText = commentAuthor.value;

            commentAuthorAndTime.appendChild(commentAuthorName);
            commentAuthorAndTime.innerHTML = commentAuthorAndTime.innerHTML + " " + "(" + showDate() + ")";

            commentTextValue.innerText = commentText.value;

            oneComment.appendChild(commentAuthorAndTime);
            oneComment.appendChild(document.createElement("br"));
            oneComment.appendChild(commentTextValue);

            allComments.style.borderTop = "1px solid black";
    
            div.appendChild(allComments);
            allComments.appendChild(oneComment);
            commentAuthor.value = ""; commentText.value = "";
            comment.style.display = "none";
        }
    }
}