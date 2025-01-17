
import { getAuth } from "../Fetch/Fetch";

export default function AuthUser = async() =>{
   const res = await getAuth();
   if(res == 200) return true;
   return false;
}