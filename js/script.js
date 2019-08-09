var image = document.createElement("img"),
    imageLink = document.getElementById("imageLink"),
    newsFeed = document.getElementById("newsFeed");

imageLink.addEventListener("input", showImage);
document.getElementById("post").addEventListener("click", postNew);

function showImage() {
    image.style.maxWidth = "250px";
    image.style.maxHeight = "165px";
    image.src = imageLink.value;
    document.getElementById("article").appendChild(image);
}
function postNew() {
    var div = document.createElement("div"),
        author = document.createElement("h2"),
        time = document.createElement("h4"),
        text = document.createElement("p"),
        img = document.createElement("img"),
        imgLink = document.getElementById("imageLink"),
        hr = document.createElement("hr"),
        likeAndComment = document.createElement("div"),
        writeComment = document.createElement("button");

    div.style.width = "95%";
    div.style.background = "#e5e7e8";
    div.style.padding = "15px";

    author.style.color = "#15aaea";
    author.innerText = document.getElementById("authorName").value;

    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    if (day.toString().length < 2) { day = "0" + day; }
    if (month.toString().length < 2) { month = "0" + month; }
    time.innerText = day + "." + month + "." + year + " " + hour + ":" + minutes + ":" + seconds;

    text.style.textAlign = "justify";
    text.innerText = document.getElementById("text").value;

    img.style.maxWidth = "100%";
    img.style.maxHeight = "300px";
    img.src = imgLink.value;

    likeAndComment.style.width = "100%";
    likeAndComment.style.display = "flex";
    likeAndComment.style.flexDirection = "row";
    likeAndComment.style.justifyContent = "space-around";
    likeAndComment.appendChild(writeComment);

    writeComment.innerText = "Write Comment";

    div.appendChild(author);
    div.appendChild(time);
    div.appendChild(document.createElement("br"));
    div.appendChild(text);
    div.appendChild(document.createElement("br"));
    div.appendChild(img);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(likeAndComment);
    // div.appendChild(document.createElement("br"));
    // div.appendChild(hr);

    newsFeed.appendChild(div);
    newsFeed.appendChild(document.createElement("br"));

    writeComment.onclick = function() {
        document.getElementById("comment").style.display = "block";
    }
}