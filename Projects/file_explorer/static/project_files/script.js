// Convert tbody children to an array
const children = $('tbody').children();
let children_array = [];
for(let i = 0; i < children.length; i++){
    children_array.push(children[i]);
}


// Construct an array object
const items = [];
children_array.forEach(element => {

    // Create object from element
    const rowDetails = {
        name: element.getAttribute('data-name'), 
        size: element.getAttribute('data-size'),
        time: element.getAttribute('data-time'),
        html: element.outerHTML
    }

    // Append to object
    items.push(rowDetails);
});


// Order stauts
const sortStatus ={name: 'none', size: 'none', time: 'none'};


// Sort the array up
const sortingData = ( items, option, type ) => {

    // Sort function
    items.sort( (item1, item2) => {

        // Handle different types
        let value1, value2;
        if(type == 'name'){

            const value1 = item1.name.toUpperCase();
            const value2 = item2.name.toUpperCase();
        }else if(type == 'size'){

            const value1 = item1.size;
            const value2 = item2.size;
        }else {

            const value1 = item1.time;
            const value2 = item2.time;
        }
        
        // Sorting logic
        if(value1 < value2){
            return -1;
        }
        if(value1 > value2){
            return 1;
        }
        return 0;
    });

    // Reverse sort if specified
    if(option == 'down'){
       items.reverse();
    }
};


// Fill table body
const fill_table_body = items => {

    // Content
    const content = items.map(element => element.html).join('');

    // Update
    $('tbody').html(content);
};


// Event listeners: delegation
document.getElementById('table_head_row').addEventListener('click', (event => {

    // Set event target
    if(event.target){

        // Clear icon elements
        $('ion-icon').remove();

        // Sort ascending and set status
        let status;
        if( ['none', 'down'].includes(sortStatus[event.target.id])){

            // Sort and set
            sortingData(items, 'up', event.target.id);
            sortStatus[event.target.id] = 'up';

            // Add icon
            event.target.innerHTML += ' <ion-icon name="arrow-up-circle-outline"></ion-icon>';
        }
    
        // Sort descending
        else if( sortStatus[event.target.id] == 'up'){

            // Sort and set
            sortingData(items, 'down', event.target.id);
            sortStatus[event.target.id] = 'down';

            // Add icon: ion-icons
            event.target.innerHTML += ' <ion-icon name="arrow-down-circle-outline"></ion-icon>';;
        }

        // Fill table body and update object
        fill_table_body(items);
    }
}));
