const axios = require('axios');
const MemberList = document.querySelector('#member-list');
const memberForm = document.querySelector('form');
const input = document.querySelector('input');
const state = {};

memberForm.addEventListener('submit', async(ev)=> {
  ev.preventDefault();
  const name = input.value;
  try {
    await axios.post('/api/members', {name});
    //TODO you can add to the state and render
    fetchMembers();
    input.value = '';
  }
  catch(ex){
    console.log(ex.response.data);
  }
});

MemberList.addEventListener('click', async(ev)=> {
  if(ev.target.tagName === 'BUTTON'){
    const id = ev.target.getAttribute('data-id');
    //TODO you can remove from the state and render
    await axios.delete(`/api/members/${id}`);
    fetchMembers();
  }
});

const renderMembers = ()=> {
  const html = state.members.map( member => {
    return `
      <li>
        ${ member.name }
        <button data-id='${member.id}'>x</button>
      </li>
    `;
  }).join('');
  MemberList.innerHTML = html;
};

const fetchMembers = async()=>{
  const response = await axios.get('/api/members');
  const data = response.data;
  state.members = data;
  renderMembers();
}

fetchMembers();