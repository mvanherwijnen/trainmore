import './App.css';
import React, { useState } from 'react';

function App() {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate()+1); 

  const members = [{name: 'Jasper', membershipId: '12345678'}, {name: 'Matthijs', membershipId: '87654321'}]
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

 const dateString = `${tomorrow.getDate()}-${tomorrow.getMonth() + 1}-${tomorrow.getFullYear()}`

 const submit = (e: any) => {
   e.preventDefault();

   const participants = e.target.participants as RadioNodeList;
   const ids = []
   participants.forEach((participant: HTMLInputElement) => {
     ids.push(participant.value);
   });

   const payload = {
    membershipNumbers: ids,
    traindate: e.target.date.value, // dd-mm-yyyy
    lesson: {
      instructor: e.target.instructor.value,
      title: e.target.title.value,
      timeframe: e.target.time.value,
    }
  }

   fetch('https://1e8fn7hqab.execute-api.eu-west-1.amazonaws.com/dev/bookLesson', {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'X-Api-Key': 'sAU62SHpsZ5INg8p0OT686S7tDL19yjI5AZrvlpu'
    }
   }).then(async (body) => {
    setSuccess(await body.text());
   }).catch((error) => {
    setError(error.message);
   });
 }

  return <div className='full'>
    <form onSubmit={submit}>
      <h1>Op vertoon van je lidmaatschapskaart</h1>
      <p>Druk +/- 15 seconden voordat de inschrijving opengaat op onderstaande knop.</p>
      <label htmlFor='instructor'>Instructeur</label>
      <select id='instructor' name='instructor'>
        <option value='manonkrol'>Manon Krol</option>
      </select>
      <label htmlFor='title'>Les</label>
      <select id='title' name='title'>
        <option value='MORE BOXING'>MORE BOXING</option>
      </select>
      <label htmlFor='time'>Tijd</label>
      <select id='time' name='time'>
        <option value='17:30 - 18:15'>17:30 - 18:15</option>
        <option value='18:45 - 19:30'>18:45 - 19:30</option>
      </select>
      <label htmlFor='date'>Datum</label>
      <select id='date' name='date'>
        <option value={dateString}>Morgen</option>
      </select>
      {
        members.map((member) => {
          return <div className='radio'><input key={member.membershipId} id={member.membershipId} name='participants' type='checkbox' value={member.membershipId}/><label htmlFor={member.membershipId}>{member.name}</label></div>
        })
      }
      <button type='submit'>Boek les</button>
      {error && <p>Something went wrong: {error}</p>}
      {success && <p>{success}</p>}
    </form>
    
  </div>;  
}

export default App;
