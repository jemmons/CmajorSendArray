

/*
    This simple web component just manually creates a set of plain sliders for the
    known parameters, and uses some listeners to connect them to the patch.
*/
class Forum_View extends HTMLElement
{
    constructor (patchConnection)
    {
        super();
        this.patchConnection = patchConnection;
        this.classList = "main-view-element";
        this.innerHTML = this.getHTML();
    }

    connectedCallback()
    {
        this.patchConnection.addStoredStateValueListener((data) => {
            this.display.innerText = `“${data.key}” has value “${data.value}”`;
        });
        this.querySelector("#send123").addEventListener("click", (e) => {
            this.patchConnection.sendStoredStateValue("myArray", [1,2,3,4,5]);
        });
        this.querySelector("#sendABC").addEventListener("click", (e) => {
            this.patchConnection.sendStoredStateValue("myArray", ["a","b","c","d","e"]);
        });
        this.querySelector("#request").addEventListener("click", (e) => {
            this.patchConnection.requestStoredStateValue("myArray");
        });
        this.display = this.querySelector("#display");
    }

    disconnectedCallback()
    {
        // When our element is removed, this is a good place to remove
        // any listeners that you may have added to the PatchConnection object.
        this.patchConnection.removeParameterListener ("frequency", this.freqListener);
    }



    getHTML()
    {
        return `
        <style>
            .main-view-element {
                background: #bcb;
                display: block;
                width: 100%;
                height: 100%;
                padding: 10px;
                overflow: auto;
            }

            a {
                color: blue;
            }
        </style>

        <div id="controls">
          <p><a href="#" id="send123">Send Numeric Array Value</a></p>
          <p><a href="#" id="sendABC">Send String Array Value</a></p>
          <p><a href="#" id="request">Request Array Value</a></p>
          <p id="display">none</p>
        </div>`;
    }
}

window.customElements.define ("forum-view", Forum_View);

/* This is the function that a host (the command line patch player, or a Cmajor plugin
   loader, or our VScode extension, etc) will call in order to create a view for your patch.

   Ultimately, a DOM element must be returned to the caller for it to append to its document.
   However, this function can be `async` if you need to perform asyncronous tasks, such as
   fetching remote resources for use in the view, before completing.
*/
export default function createPatchView (patchConnection)
{
    return new Forum_View (patchConnection);
}
