import Weather from './Weather'

const CountriesToShow = ({input, search, handleClick}) =>{
    if(input.length === 0 || search === '')
    {
        return(
            <div>Search for a country</div>
        )
    }
    if (input.length >10)
    { return (<div> Too many matches, specify another filter</div>)}
  
    else if (input.length >1)
    { 
        console.log(input);
        return(
        <div>{input.map((countries) => ( 
        <div key={countries.name.common}> {countries.name.common} 
        <button onClick={handleClick} value={countries.name.common}>  Show </button>  </div>
        ))}
        </div>)
    }
    else
    { return (
        <div>
           <h1>{input[0].name.common}</h1> 
            <div>Capital: {input[0].capital}</div>
            <div>Area: {input[0].area}</div>
            <h2>Languages:</h2>
            <ul>
            {Object.values(input[0].languages).map((lang) =>(
               <li key={lang}>{lang}</li>
            ))}
            </ul>
            <img src = {input[0].flags.png} alt={`${input[0].name} flag`}/>
            <Weather city = {input[0].capital}/>

        </div>  )
    }
    }
    export default CountriesToShow;