import Herosection from "../../components/herosection/herosection.tsx";
import Aboutus from "../../components/AboutUsCard";
import Ourteamcomponent from "../../components/Our Team/ourteamcard.tsx";
import Areasofpracticecomponent from "../../components/practice/aop.tsx";


const Landingpage=() => {

    return(
         <>
        <Herosection/> 
        <br/>    
        
        <Aboutus/>
        <br />
        
        <Areasofpracticecomponent/>
        <br/>
        <Ourteamcomponent/>
        <br/>   
        
        </>
    )
}

export default Landingpage;
