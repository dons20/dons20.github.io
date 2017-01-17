var quill = new Quill('#editor', {
    theme: 'snow'
});

quill.on('selection-change', function(range, oldRange, source) {
    if (range) {
        $("#editorWindow").addClass("active");
        console.log("In editor")
    } else {
        $("#editorWindow").removeClass("active");
        console.log("Not in editor");
    }
});

function convertHTML(text) {
    //TODO: Add Strikethrough, Spoiler, No Parse, Quote, Code, Table
    
    //Process the markup tags
    var markupText = text.replace(/<p>/g, '').replace(/<\/p>/g, '\n').replace(/<strong>/g, '[b]').replace(/<\/strong>/g, '[/b]').replace(/<h1>/g, '[h1]').replace(/<\/h1>/g, '[/h1]\n').replace(/<em>/g, '[i]').replace(/<\/em>/g, '[/i]').replace(/<u>/g, '[u]').replace(/<\/u>/g, '[/u]').replace(/<ol>/g, '[olist]\n').replace(/<\/ol>/g, '[/olist]\n').replace(/<ul>/g, '[list]\n').replace(/<\/ul>/g, '[/list]\n').replace(/<li>/g, '[*]').replace(/<\/li>/g, '\n').replace(/<br>/g, '\n').replace(/<a href="/g, '[url=').replace(/" target="_blank">/g ,']').replace(/<\/a>/g ,'[/url]');

    //Process the preview
    //var previewText = text;

    //Set the markup display
    $('#markup').html("<h2 class=\"lead\">Review Markup (Copy and Paste this to your review)</h2><br>" + markupText);
    
    //Set the preview display
    $('#preview').html("<h2 class=\"lead\">Review Preview</h2><br>" + text);
}

//Show Preview
$('#previewCollapse').on('show.bs.collapse', function() {
    quill.blur();
    var text = quill.container.firstChild.innerHTML;
    console.log(text);
    convertHTML(text);
    document.getElementById("showBtn").innerHTML = "Hide Preview";
});

//Hide Preview
$('#previewCollapse').on('hide.bs.collapse', function() {
    document.getElementById("showBtn").innerHTML = "Show Preview";
    quill.focus();
});