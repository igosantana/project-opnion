import { HeaderHomeContainer } from "./styled";
import { FiLogIn } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { RiHome4Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const HeaderHome = () => {
  const history = useHistory();
  return (
    <>
      <HeaderHomeContainer>
        <div className="header-div-parent">
          <FiMenu className="header-icons header-icons-dash" />
          <div className="header-div-logo">
            <h2>
              Opnion<span>!</span>
            </h2>
          </div>
          <div className="header-div-fake"></div>
          <ul>
            <li onClick={() => history.push("/")}>
              <RiHome4Line className="header-icons" /> Home
            </li>
            <li onClick={() => history.push("/register")}>Criar conta</li>
            <li onClick={() => history.push("/login")}>
              <FiLogIn className="header-icons" /> Entrar
            </li>
          </ul>
        </div>
      </HeaderHomeContainer>
    </>
  );
};

export default HeaderHome;