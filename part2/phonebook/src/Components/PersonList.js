const PersonList =({foundUsers}) => {
    return (
        <ul style={{ listStyle: 'none'}}>
        <div>
            {foundUsers.map(person =>  
              <li key={person.name}>{person.name} {person.number}</li>
            )}
        </div>
        </ul>
    )
}
export default PersonList;