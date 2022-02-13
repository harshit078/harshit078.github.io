// Convert <img> into background-image for the image-wrap div
$(".image-wrap").each(function (index, el) {
    var img = $(el).children("img");
    $(el).css("background", "url(" + img.attr("src") + ") 50% 50% / cover fixed");
    $(el).css("height", "75vh");
    img.remove();
});

// Reduce Blur on scroll for image
$(".parallax").css("filter", `blur(3px)`);
$(window).scroll(() => {
    let scrolll_pos = window.scrollY;
    let opacity_val = scrolll_pos / 400 + 0.8;
    let blur_val = Math.log(500 / scrolll_pos);
    $(".parallax").css("filter", `blur(${blur_val}px)`);
});

// Parallax Effect
$(window).on("scroll", () => {
    window.requestAnimationFrame(() => {
        let scrolled = $(window).scrollTop();
        $(".parallax").css("transform", `translate3d(0, ${scrolled * -0.1}px, 0)`);
    });
});