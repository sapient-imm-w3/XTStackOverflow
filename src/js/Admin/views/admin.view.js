export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}
export function createFlaggedDiv() {
    const flaggedDiv = createHTMLElement(
        `
        <div id = "flagged-wrap">
         <div id = "flagged-questions">
        <div>
            What is JavaScript??
        </div>
        <button type="button" class="btn btn-danger">Remove</button>
         </div>
        </div>        `
    )
    document.getElementById("flagged_questions").appendChild(flaggedDiv);
} 

