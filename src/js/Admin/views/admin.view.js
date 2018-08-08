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
    let data =user;
    console.log(data.val());
    console.log(Object.keys(data.val()))
    data.forEach((data) => {
    const userTable = createHTMLElement(
        `<tr>
            <td>${data.child('name').val()}</td>
            <td>${data.child('role').val()}</td>
            <td>
                <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="${data.key}">
                </div>
            </td>
        </tr>
        `)
        document.getElementById("tableBody").appendChild(userTable);
        document.getElementById(`${data.key}`).onclick = () => {
        changeOfRole(`${data.key}`);   
    }
});
}