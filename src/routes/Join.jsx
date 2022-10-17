import { useState } from "react";
import axios from "axios";
import Header from "../layouts/Header";
const Join = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [birthValue, setBirthValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const onIdChange = (e) => {
    setIdValue(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const onBirthChange = (e) => {
    setBirthValue(e.target.value);
  };
  const onAddressChange = (e) => {
    setAddressValue(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const onNicknameChange = (e) => {
    setNicknameValue(e.target.value);
  };
  const onPhoneChange = (e) => {
    setPhoneValue(e.target.value);
  };
  return (
    <div>
      <Header />
      <div
        style={{
          width: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            paddingTop: "5rem",
            margin: "0 auto",
            width: "100%",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "7%",
              left: "70%",
              border: "1px gray solid",
              padding: "5px 10px",
            }}
          >
            아이디 확인
          </button>
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
            }}
          >
            아이디
          </h5>
          <input
            type="text"
            placeholder="아이디를 입력해 주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            비밀번호
          </h5>
          <input
            type="password"
            placeholder="비밀번호는 8자 이상 20자 이하, 대문자+소문자+숫자"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            비밀번호 재확인
          </h5>
          <input
            type="password"
            placeholder="비밀번호는 8자 이상 20자 이하, 대문자+소문자+숫자"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />{" "}
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            이름
          </h5>
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            생년월일
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
              margin: "0 auto",
            }}
          >
            <select
              placeholder="생년"
              style={{
                outline: "1px gray solid",
                width: "125px",
                height: "50px",
              }}
            >
              <option selected value="연도" disabled>
                연도
              </option>
              <option value="1930">1930</option>
              <option value="1931">1931</option>
              <option value="1932">1932</option>
              <option value="1933">1933</option>
              <option value="1934">1934</option>
              <option value="1935">1935</option>
              <option value="1936">1936</option>
              <option value="1937">1937</option>
              <option value="1938">1938</option>
              <option value="1939">1939</option>
              <option value="1940">1940</option>
              <option value="1941">1941</option>
              <option value="1942">1942</option>
              <option value="1943">1943</option>
              <option value="1944">1944</option>
              <option value="1945">1945</option>
              <option value="1946">1946</option>
              <option value="1947">1947</option>
              <option value="1948">1948</option>
              <option value="1949">1949</option>
              <option value="1950">1950</option>
              <option value="1951">1951</option>
              <option value="1952">1952</option>
              <option value="1953">1953</option>
              <option value="1954">1954</option>
              <option value="1955">1955</option>
              <option value="1956">1956</option>
              <option value="1957">1957</option>
              <option value="1958">1958</option>
              <option value="1959">1959</option>
              <option value="1960">1960</option>
              <option value="1961">1961</option>
              <option value="1962">1962</option>
              <option value="1963">1963</option>
              <option value="1964">1964</option>
              <option value="1965">1965</option>
              <option value="1966">1966</option>
              <option value="1967">1967</option>
              <option value="1968">1968</option>
              <option value="1969">1969</option>
              <option value="1970">1970</option>
              <option value="1971">1971</option>
              <option value="1972">1972</option>
              <option value="1973">1973</option>
              <option value="1974">1974</option>
              <option value="1975">1975</option>
              <option value="1976">1976</option>
              <option value="1977">1977</option>
              <option value="1978">1978</option>
              <option value="1979">1979</option>
              <option value="1980">1980</option>
              <option value="1981">1981</option>
              <option value="1982">1982</option>
              <option value="1983">1983</option>
              <option value="1984">1984</option>
              <option value="1985">1985</option>
              <option value="1986">1986</option>
              <option value="1987">1987</option>
              <option value="1988">1988</option>
              <option value="1989">1989</option>
              <option value="1990">1990</option>
              <option value="1991">1991</option>
              <option value="1992">1992</option>
              <option value="1993">1993</option>
              <option value="1994">1994</option>
              <option value="1995">1995</option>
              <option value="1996">1996</option>
              <option value="1997">1997</option>
              <option value="1998">1998</option>
              <option value="1999">1999</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
            </select>
            <select
              placeholder="월"
              style={{
                outline: "1px gray solid",
                width: "125px",
                height: "50px",
              }}
            >
              <option selected value="월" disabled>
                월
              </option>
              <option value="01">1월</option>
              <option value="02">2월</option>
              <option value="03">3월</option>
              <option value="04">4월</option>
              <option value="05">5월</option>
              <option value="06">6월</option>
              <option value="07">7월</option>
              <option value="08">8월</option>
              <option value="09">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </select>
            <select
              placeholder="일"
              style={{
                outline: "1px gray solid",
                width: "125px",
                height: "50px",
              }}
            >
              <option selected value="일" disabled>
                일
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            주소
          </h5>
          <input
            type="text"
            placeholder="대전시 OO구 OO동까지 입력해주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            본인 확인 이메일(선택)
          </h5>
          <input
            type="text"
            placeholder="이메일을 입력해 주세요"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            닉네임 (선택)
          </h5>
          <input
            type="text"
            placeholder="당근마켓 내에서 사용할 닉네임 입력"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <h5
            style={{
              textAlign: "start",
              paddingLeft: "50px",
              paddingBottom: "5px",
              fontWeight: "bolder",
              paddingTop: "15px",
            }}
          >
            휴대전화
          </h5>
          <input
            type="text"
            placeholder="전화번호 입력"
            style={{
              outline: "1px gray solid",
              width: "400px",
              height: "50px",
            }}
          />
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: "#ffa445",
                padding: "15px 20px",
                borderRadius: "10px",
              }}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
