const wrapper = document.getElementById('wrapper');

export default function questionFlaggedService() {
    const url = 'http://localhost:3000/questions?is_flagged=True';
    fetch(url, {
      method: 'GET'
    })
      .then(resp => resp.json())
      .then((data) => {
        return data.map((question) => { // Map through the results and for each run the code below
          console.log(question);
        });
      });
  }

  export function deleteFlaggedQuestion(id, question) {
    const fetchData = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrer: 'no-referrer',
    };
    const deleteUrl = `http://localhost:3000/questions/${id}`;
    fetch(deleteUrl, fetchData)
      .then((data) => {
        showFromCollection(question);
      });
  }