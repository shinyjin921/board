import { createClient } from "@supabase/supabase-js";

const supabaseURL=process.env.REACT_APP_SUPABASE_URL;
const supabaseKEY=process.env.REACT_APP_SUPABASE_KEY;

//1.키 확인
if( !supabaseKEY || !supabaseURL ){
  console.error('환경변수에러! env 설정파일 확인 필요');
}

export const supabase = createClient(supabaseURL, supabaseKEY);
