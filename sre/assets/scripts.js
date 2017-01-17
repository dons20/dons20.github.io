var quill = new Quill('#editor', {
    theme: 'snow'
});

var text = quill.container.firstChild.innerHTML;

$(document).ready(function () {
    quill.focus();
});

quill.on('selection-change', function(range, oldRange, source) {
    text = quill.container.firstChild.innerHTML;
    convertHTML(text);
    if (range) {
        $("#editorWindow").addClass("active");
        console.log("In editor")
    } else {
        $("#editorWindow").removeClass("active");
        console.log("Not in editor");
    }
});

quill.on('text-change', function(delta, oldDelta, source) {
    text = quill.container.firstChild.innerHTML;
    convertHTML(text);
});

function convertHTML(convertText) {
    //TODO: Add Strikethrough, Spoiler, No Parse, Quote, Code, Table
    //Process the markup tags
    var markupText = convertText.replace(/<p>/g, '').replace(/<\/p>/g, '\n').replace(/<strong>/g, '[b]').replace(/<\/strong>/g, '[/b]').replace(/<h1>/g, '[h1]').replace(/<\/h1>/g, '[/h1]\n').replace(/<em>/g, '[i]').replace(/<\/em>/g, '[/i]').replace(/<u>/g, '[u]').replace(/<\/u>/g, '[/u]').replace(/<ol>/g, '[olist]\n').replace(/<\/ol>/g, '[/olist]\n').replace(/<ul>/g, '[list]\n').replace(/<\/ul>/g, '[/list]\n').replace(/<li>/g, '[*]').replace(/<\/li>/g, '\n').replace(/<br>/g, '\n').replace(/<a href="/g, '[url=').replace(/" target="_blank">/g ,']').replace(/<\/a>/g ,'[/url]');

    //Process the preview
    //var previewText = text;

    //Set the markup display
    $('#markup').html(markupText);
    
    //Set the preview display
    $('#preview').html(convertText);
}

//Show Preview
$('#previewCollapse').on('show.bs.collapse', function() {
    quill.blur();
    console.log(text);
    document.getElementById("showBtn").innerHTML = "Hide Preview";
});

//Hide Preview
$('#previewCollapse').on('hide.bs.collapse', function() {
    document.getElementById("showBtn").innerHTML = "Show Preview";
    quill.focus();
});