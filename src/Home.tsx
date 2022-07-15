import  { Component } from "react";
import { client } from "./urqlClient";
const QueryAllcrypto = `
query{
    Allcrypto
}
`;
const cyptoData = `
query ($name: String!) {
    crypto(name: $name){
      name
      time
      data{
        hcl{
          Close
        }
      }
    }
  }
`;
interface HomeProps {

}
interface HomeState {
    AllCrypto : String[],
    datafragment :{
        name : string,
        time:string,
        projection: Number,
        gainlose : {
            M:Number,
            W :Number,
            D:Number
        }
    }

}
class Home extends Component<HomeProps,HomeState> {
    constructor(props :any) {
        super(props);
        this.state = { 
        AllCrypto : [],
        datafragment :{
            name :"",
            time:"",
            projection: 0.0,
            gainlose : {
                M:0.0,
                W :0.0,
                D:0.0
            }
        }
      
        };

       
      
    }
    componentDidMount(){
        this.main()
        
     
    }
    
    
    async main(){

        client.query(QueryAllcrypto).toPromise().then(result => {this.setState({AllCrypto: result.data.Allcrypto})

   
    });
      
    }
    async Getdata(){
        this.state.AllCrypto.forEach(ctypto => client.query(cyptoData,{name : ctypto}).toPromise().then(result => {console.log(result.data.crypto.data[0].hcl.Close)})  )
        
}
    render() {
        this.Getdata();

        return (
            <div>
                "aa"
            </div>
        );
    }
}

export default Home;