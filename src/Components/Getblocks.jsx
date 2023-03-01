
export const stblock=async(stvalue)=>{
    console.log(stvalue);
    const timestamp=Date.parse(stvalue)/1000;
    console.log(timestamp);
    let API0 = `https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.REACT_APP_API0}`;
    
    const res =await fetch(API0);
    const data=await res.json();
    console.log("data", data);
    return data.result;
}

export const edblock=async(edvalue)=>{
    console.log(edvalue);
    const timestamp=Date.parse(edvalue)/1000;
    console.log(timestamp);
    let API0 = `https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.REACT_APP_API0}`;
    
    const res =await fetch(API0);
    const data=await res.json();
    // console.log(res.json().result);
    return data.result;
}