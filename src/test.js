import React, { useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { stblock, edblock } from "./Components/Getblocks";
import Listitem from "./Components/Listitem";
import fetchAddress from "./getAddress";
const Trans = () => {
  useEffect(() => {}, []);
  const [stvalue, setstValue] = React.useState(dayjs("2023-01-01T00:00:00"));
  const [edvalue, setedValue] = React.useState(dayjs("2023-02-12T23:59:59"));
  

  const handleChangest = (newValue) => {
    console.log(newValue);
    setstValue(newValue);
  };
  const handleChangeed = (newValue) => {
    console.log(newValue);
    console.log(newValue.$d);
    setedValue(newValue);
  };
  const [bal, setbal] = useState([]);
  
  let intervalid;

  // get balance of all addresses passesed in chunks of 20 to api
  const balance = async (stringadr) => {
    let API2 = `https://api.bscscan.com/api?module=account&action=balancemulti&address=${stringadr}&tag=latest&apikey=${process.env.REACT_APP_API2}`;

    const res = await fetch(API2);
  
    const data = await res.json();
    console.log(data.result);
    const results = data.result;

    //get all addresses having balance more than or equal to 2BNB
    const filteredbalance = await results.filter((element) => {
      return element.balance >= 2000000000000000000;
    });
    console.log("filteredbalance", filteredbalance);

    filteredbalance.forEach((item) => {
      setbal((previtem) => {
        return [
          ...previtem,
          {
            account: item.account,
            balance: item.balance / 1000000000000000000,
          },
        ];
      });
    });
  };

  //Onclick handler to show balance
  const showData = async () => {
    if (typeof intervalid !== "undefined") {
      clearInterval(intervalid);
    }

    setbal([]);
    const startblock = await stblock(stvalue.$d);
    const endblock = await edblock(edvalue.$d);
    let API1 = `https://api.bscscan.com/api?module=account&action=txlistinternal&startblock=${startblock}&endblock=${endblock}&page=1&offset=10000&sort=asc&apikey=${process.env.REACT_APP_API1}`;
    let stringadrarr = await fetchAddress(API1);
    let i = 0;

    intervalid = setInterval(async () => {
      await getbalances(i++, intervalid);
    }, 1000);

    const getbalances = async (i, intervalid) => {
      if (i === stringadrarr.length - 1) clearInterval(intervalid);

      balance(stringadrarr[i]);
    };
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">BSC Scan</a>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              value={stvalue}
              onChange={handleChangest}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="DD/MM/YYYY"
              value={edvalue}
              onChange={handleChangeed}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <button type="button" className="btn btn-warning" onClick={showData}>
            Show
          </button>
        </div>
      </nav>

      <ul className="list-group">
        <Listitem key={bal.account} rows={bal} />
      </ul>
    </div>
  );
};
export default Trans;
