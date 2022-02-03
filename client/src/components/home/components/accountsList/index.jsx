import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import myApi from "../../../../api/Apis";
import {
  ACCOUNTS_END_POINTS_CONSTANTS,
  HTTP_METHODS_CONSTANTS,
} from "../../../../constants/httpRequests.constants";
import { useAccountContext } from "../../context/home.context";
import Account from "../account/Account.component";

export default function AccountsList({ setIsLoading }) {
  const [accounts, setAccounts] = useState([]);

  const { filterAccounts } = useAccountContext();

  const { accountChangedRender, loggedInUser } = useSelector((state) => {
    return {
      accountChangedRender: state.accountChangedRender,
      loggedInUser: state.loggedInUser,
    };
  });

  const { GET_ALL_ACCOUNTS_END_POINT } = ACCOUNTS_END_POINTS_CONSTANTS;
  const { GET_METHOD } = HTTP_METHODS_CONSTANTS;

  const GET_ALL_ACCOUNTS_END_POINT_CONFIG = {
    method: GET_METHOD,
    headers: {
      Authorization: `Bearer ${loggedInUser.token}`,
    },
  };

  useEffect(() => {
    getAllAccounts();
  }, [accountChangedRender, loggedInUser.uid, loggedInUser.token]);

  const getAllAccounts = async () => {
    setIsLoading(true);
    try {
      const { data: accountsData } = await myApi(
        GET_ALL_ACCOUNTS_END_POINT,
        GET_ALL_ACCOUNTS_END_POINT_CONFIG
      );

      setAccounts(accountsData.map((account) => ({ ...account })));
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const filterAccountsCB = (account) =>
    account.accountName.toLowerCase().includes(filterAccounts.toLowerCase());

  const mapAccountsCB = (account) => (
    <Account key={account._id} account={account} setIsLoading={setIsLoading} />
  );

  return <>{accounts.filter(filterAccountsCB).map(mapAccountsCB)}</>;
}
