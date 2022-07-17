import  { useState,useEffect,useRef} from 'react';
import {
 
    List,

  } from "antd";
import Button from "@mui/material/Button";
import { useQuery } from 'urql';
interface datafragment {
    
    name: string;
    time: string;
    projection: Number;
    price: Number;
    gainlose: {
      M: Number;
      W: Number;
      D: Number;
    };
}

const cyptoData = `
query ($name: String!) {
    crypto(name: $name){
      name
      time
      projection
      gainlose{
        M
        W
        D
      }
      data{
        hcl{
          Close
        }
      }
    }
  }
`;
function Cryptoli(props :any) {
    const prevCountRef = useRef<datafragment>();
    const [item, setItem] = useState<datafragment>();
    const [loading, setLoding] = useState<boolean>(true);
 
    const [result,reexecuteQuery] = useQuery({
        query: cyptoData,
        variables:{name :props.name}
      });
    
    const { data, fetching } = result;
    useEffect(() => {
        if (fetching ) return;
        if(data !== null){
            var newvalue: datafragment = {
                name: data.crypto.name,
                time: data.crypto.time,
                projection: data.crypto.projection,
                price: data.crypto.data[result.data.crypto.data.length-1].hcl.Close,
                gainlose: {
                  M: data.crypto.gainlose.M,
                  W: data.crypto.gainlose.W,
                  D: data.crypto.gainlose.D,
                },}
            prevCountRef.current = newvalue      
            setItem(newvalue )
            setLoding(false)
        }
        
        

        // Set up to refetch in one second, if the query is idle
        const timerId = setTimeout(() => {
          reexecuteQuery({ requestPolicy: 'network-only' });
        }, 1000);
    
        return () => clearTimeout(timerId);
      }, [fetching, reexecuteQuery,props.name]);

   
    return ( item   ? 
        <List.Item key={item.name}>
        <List.Item.Meta
          className="itemname"
          //item.name.match("[A-Z]*(?=USDT)") 

          //avatar={<img src={`https://cryptoicons.org/api/icon/${item.name.toLowerCase().match("[a-z]*(?=usdt)") }/200`} width={30} ></img>}
          title={item.name}
          description={item.time}
        />
        <List.Item.Meta
          title={<a>Price</a>}
          description={<a>{item.price.toString()}</a>}
        />
        <List.Item.Meta
          title={<a>Projection</a>}
          description={<a>{item.projection.toString()}</a>}
        />
        <List.Item.Meta
          title={<a>M/W/D</a>}
          description={
            <a>
              {item.gainlose.M.toFixed(2).toString()}/
              {item.gainlose.W.toFixed(2).toString()}/
              {item.gainlose.D.toFixed(2).toString()}
            </a>
          }
        />
        <List.Item.Meta
          title={
            item.projection >= 0 ? (
              <Button
                size="small"
                variant="contained"
                color="success"
              >
                Trade
              </Button>
            ) : (
              <Button size="small" variant="contained" color="error">
                Trade
              </Button>
            )
          }
        />
      </List.Item> :<p></p>

    
       
    );
}

export default Cryptoli;