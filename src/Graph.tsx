import React, { useState ,useEffect} from 'react';
import "./Graph.css"

interface cryptofilldata {
    date: Date,

}
function Graph(props :any) {
    const [data ,setData] = useState<any>(props.data)
    
    
    useEffect(() => {
        console.log(data)
       
    }, []);
    return (
        <div>
         <div className="raper">
            {
                data ?"a":"bb"
            }
         </div>
        </div>
    );
}

export default Graph;