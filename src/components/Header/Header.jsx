import {
  MdLocationOn,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

import { useRef, useState } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      option: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
    setDestination("")
  };

  function handleOptions(name, operation) {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  }
  const dateRef = useRef();
  useOutSideClick(dateRef, "datePicker", () => setOpenDate(false));
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem  ">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="Where To Go?"
            className="headerSearchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem" ref={dateRef}>
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            id="datePicker"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "dd/MM/yyyy")} To ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </div>
          {openDate ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={false}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} Adult &bull; {options.children} Childrren &bull;{" "}
            {options.room} rooms
            {openOptions ? (
              <MdOutlineArrowDropUp />
            ) : (
              <MdOutlineArrowDropDown />
            )}
          </div>
          {openOptions && (
            <GuestOptionsList
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionsList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <GuestOption
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <GuestOption
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <GuestOption
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function GuestOption({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus
            className="icon"
            onClick={() => handleOptions(type, "dec")}
          />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button className="optionCounterBtn">
          <HiPlus className="icon" onClick={() => handleOptions(type, "inc")} />
        </button>
      </div>
    </div>
  );
}
function User() {
  const navigate=useNavigate()
  const { isAuthenticated,logOut } = useAuth();
  function handleLogout(){
    logOut()
    navigate("/")
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout} className="btn btn--primary">Logout</button>
        </div>
      ) : (
        <Link className="btn btn--primary" to="/login">
          Login
        </Link>
      )}
    </div>
  );
}
