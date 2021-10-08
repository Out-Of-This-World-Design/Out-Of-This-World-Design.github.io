$(document).ready(function(){


    // False
    $( "#splash-screen" ).click(function() {
        $("#splash-screen").hide()

        // Show The rest of the page
        $("#content").fadeIn("slow");
    
    });

    $("#splash-screen").bind( 'mousewheel', function(){
        $("#splash-screen").hide()

        // Show The rest of the page
        $("#content").fadeIn("slow");
    });

    

    //AJAX Call
    $.getJSON('inc/data.json', (data) => {

        //NAVBAR CONTENTS
        var navbar_contents = "";
        for (var i = 0; i < data['pages'].length; i++) {
            current_page = window.location.href.split('/')[3];
            if (data['pages'][i]['target_page'].split('/')[1] == current_page) {
                navbar_contents += `<li class="nav-item active">`
            } else {
                navbar_contents += `<li class="nav-item">`
            }

            navbar_contents += `
            <a class="nav-link" href="${data['pages'][i]['target_page']}">${data['pages'][i]['page_name']}</a>
            </li>
            `;
        }
        $("#navbar ul").html(navbar_contents);


        //INTRODUCTION - HOME PAGE
        var intro_p = "";
        for (let i = 0; i < data['pages'].length; i++) {
            intro_p += `
            <p class="fs-4">
                ${data['pages'][i]['target_page']}">${data['pages'][1]['content']['about_us']};
            </p>`;
        }
        $("#landing.text-content").html(intro_p);


        //EVENTS SECTION - EVENTS PAGE
        var events_list = "";
        let event_ctr = 0;
        for (let i = 0; i < data['pages'][2]['content']['services_events'].length; i++) {
            let item = data['pages'][2]['content']['services_events'][i];
            if (item['type'] == 'event') {
                event_ctr += 1;
                events_list += `
                    <div class="row row-cols-2 text-center m-5">    
                        <div class="image"> <img src="${item['image-link']}" alt="Event ${event_ctr} image"> </div>
                        <div class="text"> 
                            <h1>${item['name']}</h1> 
                            <p>${item['description']}</p> 
                        </div>
                    </div>
                `;
            }
            $("#event-content").html(events_list);

        }

        //SERVICES SECTION - EVENTS PAGE
        var services_list = "";
        let service_ctr = 0;
        for (let i = 0; i < data['pages'][2]['content']['services_events'].length; i++) {
            let item = data['pages'][2]['content']['services_events'][i];
            if (item['type'] == 'service') {
                service_ctr += 1;
                services_list += `
                    <div class="text"> 
                        <h2>${item['name']}</h2> 
                        <p>${item['description']}</p> 
                    </div>
                `;
            }
            console.log(services_list);
            $("#service-content").html(services_list);

        }


    });

});


