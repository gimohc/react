//import {react} from 'react';

//export function Profile(props) {
  //  let id = props.id;
export function Profile( {id = '0', children} ) {
    let done = false;
    if(done) 
        return null;

    return (
        <div key={id}>
            <textarea id ={id} />
            <button id ={id} onClick={() => {}}> Save </button> 

            { // after saving a checkbox appears  }
                }

            <button id ={id} onClick={() => {}}> Delete </button>

            {children 
            /* 
            const listItems = people.map(person => <li>{person}</li>); 
            return <ul>{listItems}</ul>;
            
            const chemists = people.filter(person =>
            person.profession === 'chemist'
            );
            
            */ }
            
        </div>
    );
}