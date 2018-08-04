import {createFlaggedDiv} from '../views/admin.view';
export function getFlaggedQuestionService() {
    const url = 'http://localhost:3000/questions?is_flagged=True';
    fetch(url, {
      method: 'GET'
    })
      .then(resp => resp.json())
      .then((data) => {
        return data.map((question) => {
          createFlaggedDiv(question);
        });
      });
  }

  export function revokeFlaggedQuestion(id) {   
    const revokeUrl = `http://localhost:3000/questions/${id}`;
    fetch(revokeUrl)
    .then((resp)=>resp.json())
    .then((obj) => {
      let obje  =Object.assign({},obj,{is_flagged:'false'});
      const fetchData = {
        method: 'PUT',
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body : JSON.stringify(obje)
      };
      fetch(revokeUrl, fetchData);
    })
  }

    