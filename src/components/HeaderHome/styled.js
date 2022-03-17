import styled from "styled-components";

export const HeaderHomeContainer = styled.header`
  /* position: fixed; */
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 75px;
  box-sizing: border-box;
  background-color: #343a40;
  @media (min-width: 768px) {
    padding: 0;
  }
  .header-div-parent {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    align-items: center;
    @media (min-width: 768px) {
      width: 760px;
    }
    @media (min-width: 880px) {
      width: 880px;
    }
    @media (min-width: 1100px) {
      width: 1080px;
    }
    @media (min-width: 1500px) {
      width: 1180px;
    }
    @media (min-width: 1600px) {
      width: 1280px;
    }
    @media (min-width: 1700px) {
      width: 1380px;
    }
  }
  .header-div-logo {
    h2 {
      font-size: 22px;
      font-weight: 700;
      font-family: "Poppins";
      color: white;
      @media (max-width: 768px) {
        margin-left: -50px;
      }
      span {
        font-size: 25px;
        font-weight: 1000;
        font-family: "Sansita";
        margin-left: 2px;
      }
    }
  }

  ul {
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      display: none;
    }
  }
  li {
    display: flex;
    align-items: center;
    margin-left: 3px;
    cursor: pointer;
    list-style: none;
    color: white;

    font-size: 13px;
    font-weight: 500;
    :hover {
      filter: brightness(75%);
      transition: 0.3s;
    }
    :active {
      filter: brightness(1.6);
      transition: 0.3s;
    }
  }
  .Link {
    text-decoration: none;
  }
  .Link + .Link {
    margin-left: 40px;
    @media (max-width: 410px) {
      margin-left: 20px;
    }
    @media (max-width: 320px) {
      margin-left: 13px;
    }
  }
  .header-icons {
    cursor: pointer;
    margin-right: 3px;
    color: #ffffff;
  }
  .header-icons-dash {
    width: 26px;
    height: 26px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  .header-div-fake {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;
