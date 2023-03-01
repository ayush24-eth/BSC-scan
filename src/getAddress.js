
// get all addresses from starting to end block and return array of addresses each index having chunk of 20 address
const fetchAddress = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);

      const resultarr = data.result;
      const adress = await resultarr.map((item) => {
        return item.from;
      });
      console.log(adress);
      
      //get non duplicate addreses from the json
      const nonDupAddress = await adress.filter(
        (item, index) => adress.indexOf(item) === index
      );

      console.log("nonDupAddress", nonDupAddress);
        let stringadrarr=[];
      for (let i = 0; i < nonDupAddress.length; i += 20) {
        const chunk = nonDupAddress.slice(i, i + 20);
        let stringadr = "";
        chunk.forEach((element) => {
          stringadr = stringadr + element + ",";
        });
        stringadr = stringadr.substring(0, stringadr.length - 1);
        stringadrarr.push(stringadr);
      }

      console.log("stringadrarr", stringadrarr);
      return stringadrarr;
    } catch (error) {
      console.log(error);
    }
  };

  export default fetchAddress;