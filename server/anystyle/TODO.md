# TODO LIST FOR ANYSTYLE IMPLEMENTATION

## Docker

 - make image so that it provides both XML and JSON (use CSL JSON if we can)
 - publish image?
## Back end

 - rework so that it's mapping JSON data to the initial text
 - test to see if GraphQL actually works
 - failure? What do we do about that?
   - specific case: headers (crossover with Wax end of things)
  
## Wax

 - get pattern for queries into Wax (Editoria might work)
   - need to put in a placeholder while we wait for content to come back.
     - look at how image upload works – that has a placeholder.
       - https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-components/src/components/images/ImageUpload.js#L59
       - `fileUpload` is passed as a prop to Wax, that would pass back a string to a function
       - Make change here: https://gitlab.coko.foundation/kotahi/kotahi/-/blob/main/app/components/wax-collab/src/JatsTags/index.js#L53-78
 - figure out how to get all TextNodes out of selected text
 - figure out how to discern what's a header
   - header just gets wrapped in a <title> tag
 - where do we put this functionality? config/JatsTags/index.js seems wrong


## Moving forward

 - make Wax tags for all the new things we've made in this
 - contextual menus in Wax after we've done this
 - convert JATS-flavored HTML to actual JATS in output