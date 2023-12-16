import React from "react";

function Footer({length,thingsToDo}){
    return(
        <footer>
            <p>{length} {length===1?"item":"items"} on list</p>
            <p>{thingsToDo} {thingsToDo===1?"item":"items"} to Do</p>
        </footer>
    );
}
export default Footer;