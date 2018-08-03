import {changeOfRole} from '../admin.service';
export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}
export function layout(){
    const table = createHTMLElement(`<table id="example" class="display" style="width:100%">
    <thead>
        <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Change Role</th>
        </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
</table>`);
document.getElementById("userList").appendChild(table);
}
export function userDiv(user) {

    const userTable = createHTMLElement(
        `<tr>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="${user.id}">
                </div>
            </td>
        </tr>
        `
    )
    document.getElementById("tableBody").appendChild(userTable);
    document.getElementById(`${user.id}`).onclick = () => {
        changeOfRole(`${user.id}`);
    }
}