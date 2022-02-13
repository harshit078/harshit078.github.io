$(document).on('ready', function(){
    bindLinks()
})

$(window).on("popstate", function(e) {
    $('title').html(e.originalEvent.state.title)
    $('#content').html(e.originalEvent.state.content)
    updateExternals()
    bindLinks()
})

function bindLinks(){
    $("a[href^='/']").on('click', function(e){
        // Stop link from activating
        e.preventDefault()

        // Get the URL to load
        url = $(this).attr('href')

        // Send a Get request to the URL
        $.get(url, function(data){
            // Get the title of the new page
            regex = /<title>(.*)<\/title>/g
            newTitle = regex.exec(data)[1]

            // Set the title to the new title
            $('title').html(newTitle)

            // Replace the content
            $('#content').html($(data).find('#content').html())

            // Push a new state to the browser
            history.pushState({
                'title': $('title').html(),
                'content': $('#content').html()
            }, newTitle, url)

            updateExternals()

            // Re Bind to all the links on the page
            bindLinks()
        })
    })
}

function updateExternals(){
    // Update disqus
    // If there is a disqus_thread on the page?
    if($('#disqus_thread').length !== 0){
        // Has Disqus been loaded before
        if ('undefined' !== typeof DISQUS){
            // Reset Disqus
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = disqus_identifier
                    this.page.url = disqus_url
                }
            });
        }
    }
}