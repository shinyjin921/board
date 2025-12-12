import { supabase } from "./supabaseClient";
/***
 * 회원 가입 : email,password, nickname
 * 전제조건 : email이 같으면 가입이 안되도록
 */
export const registerUser = async ({email,password,nickname})=>{
    //이메일 중복 체크
    const {data:existUser} = await supabase
    .from('users')
    .select('*')
    .eq('email',email)
    .eq('is_active',true)
    .single();
    if( existUser ){
        throw new Error('이미 존재하는 이메일입니다');
    }
    //데이터 삽입
    const {data, error} = await supabase
    .from('users')
    .insert({email,password,nickname})
    .select();
    if(error){
        throw new Error('외원가입 실패');
    }
    return data[0];
}
/***
 * 로그인 : email, password 가 정상적으로 되어있는지 체크
 */
export const loginUser = async ({email,password})=>{
    //select * from users where email=email and password=password
    const {data,error} = await supabase
    .from('users')
    .select('*')
    .eq('email',email) //email컬럼값 = email
    .eq('password',password) //password컬럼값 = password
    .single(); //limit 1
    if ( error || !data ){
        throw new Error('이메일 또는 비밀번호가 잘못되었습니다;')
    }
    return data;
}

/**
 * 로그아웃 : is_active :false
 */
export const deleteUser = async (userID) =>{
  const {data,error} = await supabase
  .from('users')
  .update({is_active:false})
  .eq('id',userID)
  .selsect();
  if(error){
    throw new Error ('회원탈퇴시 오류 발생')
  }
  return data[0];
}