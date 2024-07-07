import AuthForm from '../components/AuthForm';
import {json, redirect} from 'react-router-dom'
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


export async function action({request}){
const searchParams=new URL(request.url).searchParams;
const mode=searchParams.get('mode')|| 'login';

if(mode!== 'login' && mode!=='singup'){
throw json({message:'unsupported mode'}, {status:422})
}

const data=await request.formDara();
const authData={
  email:data.get('email'),
  password:data.get('password')
};
const response=fetch('http://localhost:8080/' + mode,{
  method:'POST',
  headers:{
    'Content-Type':'applicaion/json'
  },
  body:JSON.stringify(authData)
});
if(response.status===422 || response.status===401){
  return response;
}
if(!response.ok){
  throw json({message:'could not '}, {status:500})
}

const resData=await response.json();
const token=resData.token;
localStorage.setItem('token', token)

return redirect('/')
}