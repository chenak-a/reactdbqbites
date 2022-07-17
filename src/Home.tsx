import  { useEffect ,useState} from 'react';
import "./Home.css";
import {
    List,
    Input,
  } from "antd";
import "antd/dist/antd.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useQuery } from 'urql';

import Cryptoli from './Cryptoli';
const QueryAllcrypto = `
query{
    Allcrypto
}
`;

 
function Home() {
    const [dataFragment, setDataFragment] = useState<string[]>([]);
    const [datavisible, setDatavisible] = useState<string[]>([]);
    const [filter,setFilter] =  useState<string>("");
    
    const [result, reexecuteQuery] = useQuery({
        query: QueryAllcrypto,
       
      });
    const { data, fetching } = result;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFilter(e.target.value)
        const regex = new RegExp("^"+e.target.value, 'gi');
        setDatavisible(dataFragment.filter(value => value.match(regex) ))

    }
    useEffect(() => {
        if (fetching) return;
        if( data){
            setDataFragment(data.Allcrypto)
          
        }
        if(filter.length ===0){
            setDatavisible(data.Allcrypto)
        }
       

        // Set up to refetch in one second, if the query is idle
        const timerId = setTimeout(() => {
          reexecuteQuery({ requestPolicy: 'network-only' });
        }, 1000);
    
        return () => clearTimeout(timerId);
      }, [fetching, reexecuteQuery]);
      





    

    return (
        <div className="Home" id="Home">
        
        <div className="profil1e" id="profil1e">  <div className="addresscontract" id="addresscontract"></div></div>

        <div className="contenant" id="contenant">
        <div>
          <Fab className="add" color="primary" aria-label="add">
            {" "}
            <AddIcon />
          </Fab>
          <div className="infinite-container">
            <div className="search">
              <Input
                className="SE"
                placeholder="Search"
                onChange={handleChange}
             
              />
            </div>
            <List
            
             
            >{ datavisible ? datavisible.map(cyptoname => (<Cryptoli key={cyptoname} name={cyptoname} />)):<p>b</p>}</List>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;