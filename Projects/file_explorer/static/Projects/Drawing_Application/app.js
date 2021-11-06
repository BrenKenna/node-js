// Declare variables
var paint;
var paintMeth;
var canvas;
var ctx;
var CanvCont;
var mouse;
var img;

// Jquery slider and paint app
$(function(){

    // Initiate paint & mouse vars
    paint = false;
    paintMeth = "paint";
    canvas = document.getElementById("paint");
    ctx = canvas.getContext("2d");
    CanvCont = $("#ArtContainer");
    mouse = {x: 0, y: 0};


    // Load local storage if present
    if(localStorage.getItem("image_canvas") != null ) {
        console.log('Found previous image_canvas');

        // Image constructor
        img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("image_canvas");
    }


    // Intialize drawing params
    ctx.lineWidth = 3;
    ctx.linejoint = "round";
    ctx.lineCap = "round";


    // Handle mouse down for painting
    CanvCont.mousedown(function(e){

        // Update paint
        paint = true;
        console.log("Painting: " + paint);
        console.log("Painting: " + paintMeth);

        // Start drawing: subtract mouse->border from border->container
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
        console.log("Painting: " + mouse.x + " to " + mouse.y);
    });


    // Track mouse movement for painting
    CanvCont.mousemove(function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paintMeth == "paint"){
                // Update brush
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                // White color
                ctx.strokeStyle = "white";
            }

            // Draw and display mouse move
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            console.log("Painting: " + mouse.x + " to " + mouse.y + " With strokeStyle = " + ctx.strokeStyle);
        }
    });

    // Handle mouse up / leave to stop painting
    CanvCont.mouseup(function(e) {
        paint = false;
    });
    CanvCont.mouseleave(function(e) {
        paint = false;
    });


    // Reset the canvas
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paintMeth = "paint";
        $("#erase").removeClass("eraseMode");
    });


    // Save: sessionStorage for the session only
    $("#save").click(function() {
        if(typeof(localStorage) != null){
            localStorage.setItem("image_canvas", canvas.toDataURL());
        }else{
            window.alert('Warning: Unable to save your drawings as local storage is not supported by your browser');
        }
    });     

    // Toggle erase function
    $("#erase").click(function(){
        if(paintMeth == "paint"){
            paintMeth = "erase";
        }else{
            paintMeth = "paint";
        }
        $(this).toggleClass(".eraseMode");
    });

    // Set color: line color + brush color
    $("#paintColor").change(function(){
        $("#sizer").css("background-color", $(this).val());
    })

    // Set line width
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){

            // Update sizer to current value
            $("#sizer").height(ui.value);
            $("#sizer").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

  });