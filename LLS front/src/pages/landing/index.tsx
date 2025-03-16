import Herosection from "../../components/herosection/herosection.tsx";
import Aboutus from "../../components/AboutUsCard";
import Ourteamcomponent from "../../components/Our Team/ourteamcard.tsx";
import Areasofpracticecomponent from "../../components/practice/aop.tsx";
import TeamCreatePage from "../Our Team/team-create.tsx";


const Landingpage=() => {

    return(
         <>
         <TeamCreatePage/>
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
