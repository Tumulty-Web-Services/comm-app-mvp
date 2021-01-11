export function toggleDropContent(e) {

    //get parent of of element clicked
    const parentDiv = e.target.parentNode;
   
    //get a proper array of the parent div's children
    const children = Array.from(parentDiv.children);;

    //loop through children
    children.forEach((child) => {

        // let tagName = child.tagName;
        let classList = child.classList;

        //if we have a drop-content element
        if(classList.contains('drop-content')) {

            //if showing hide it
            if(child.style.display === 'block') {
                child.style.display = 'none';
            } else {
                
                //if hidden show the div
                child.style.display = 'block';
            }
            
        }
        
    })


        
}