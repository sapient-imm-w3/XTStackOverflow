import { revokeFlaggedQuestion } from '../services/admin.service';
export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export function layout(){
    const table = createHTMLElement(`
    <table id="example" class="display" style="width:100%">
    <thead>
        <tr>
            <th>Question</th>
            <th>FlagCount</th>
            <th>Revoke</th>
        </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
</table>`);
document.getElementById("flagged_questions").appendChild(table);
}

export function createFlaggedDiv(question) {
    const flaggedDiv = createHTMLElement(
            `<tr>
                <td>${question.text}</td>
                <td>${question.flag_count}</td>
                <td>
                <button type="button" class="btn btn-warning" id ="${question.id}">Revoke Flag</button>
                </td>
            </tr>
            `)
    document.getElementById("tableBody").appendChild(flaggedDiv);
    document.getElementById(`${question.id}`).onclick = () => {
        revokeFlaggedQuestion(`${question.id}`);
    }

}

