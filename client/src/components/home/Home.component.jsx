import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useAccountContext } from "./context/home.context";
import CreateAccount from "./components/createAccount/CreateAccount.component";
import Spinner from "../../components/spinner/Spinner.component";
import FollowMe from "./components/followMe/FollowMe.component";
import AccountsList from "./components/accountsList";
import useHomeServices from "../../services/home/home.services";
import "./home.styles.scss";
import "./home.styles.mobile.scss";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { filterAccounts, isCreatedAccountOpen } = useAccountContext();

  const { CreateAccountButton, toggleCreateAccount, handleAccountsFilterInput } =
    useHomeServices();

  return (
    <div className="Home">
      <div className="home-layout">
        <div className="left-toolbar">
          {!isLoading && CreateAccountButton}
          <div className="follow-me">
            <FollowMe />
          </div>
        </div>
        <div className="accounts-area">
          <div className="accounts-top-toolbar">
            <div className="search-account">
              <input
                className="search-account-input"
                type="text"
                placeholder="Search"
                onChange={handleAccountsFilterInput}
                value={filterAccounts}
              />
              <FcSearch className="search-account-react-icon" />
            </div>
          </div>
          <div className="accounts-gallery">
            <AccountsList setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>
      {isCreatedAccountOpen && (
        <CreateAccount
          toggleCreateAccount={toggleCreateAccount}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Home;
