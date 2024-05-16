import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FlexBox from "./FlexBox";
import Icon from "./Icon";

const DropdownMenu = ({ options, userNick, isOpen, setIsOpen }) => {
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const [localData, setLocalData] = useState(localStorage.getItem("local"));
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [smButtonWidth, setSmButtonWidth] = useState(0);

    const toggleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    const optionClick = (index) => {
        if (index === 0) {
            navigate(`/myInfo/profile`);
        }
        if (index === 1) {
            navigate(`/chatting`);
        }
        if (index !== 2) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 786);
            if (buttonRef.current) {
                setButtonWidth(Math.floor(buttonRef.current.getBoundingClientRect().width) + 90);
                setSmButtonWidth(Math.floor(buttonRef.current.getBoundingClientRect().width) + 75);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        document.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleGetLocalData = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) =>
                    handleReverseGeocoding(position.coords.latitude, position.coords.longitude),

                (error) => {
                    console.error("Error getting current position:", error.message);
                }
            );
        }
    };

    const handleReverseGeocoding = (latitude, longitude) => {
        axios
            .get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            )
            .then((response) => {
                const cityIndex = response.data.address.city
                    ? response.data.address.city
                    : response.data.address.town;
                if (cityIndex) {
                    setLocalData(cityIndex);
                    localStorage.setItem("local", cityIndex);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const [localSwitch, setLocalSwitch] = useState(false);

    const localSwitchClick = (check) => {
        if (localData === null) {
            handleGetLocalData();
        }
        localStorage.setItem("localSwitchState", check);
        setLocalSwitch(check);
    };

    return (
        <div ref={dropdownRef} className={`dropdown-container ${isOpen ? "active" : ""}`}>
            <button
                className="user-button select-none flex items-center px-[7px] py-[6px] mr-[8px]"
                onClick={toggleMenuClick}
                ref={buttonRef}
            >
                <Icon icon={FaRegUser} size={12} />
                <div className="ml-2 md:font-14">{userNick}</div>
            </button>
            <ul
                className={`dropdown-menu border`}
                style={{ minWidth: isLargeScreen ? buttonWidth : smButtonWidth }}
            >
                <button
                    className="user-button select-none flex items-center px-[7px] py-[6px] mr-[8px] mb-[8px]"
                    onClick={toggleMenuClick}
                >
                    <Icon icon={FaRegUser} size={12} />
                    <div className="ml-2 md:font-14">{userNick}</div>
                </button>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`dropdown-item font-13 ${
                            index === options.length - 1 ? "" : "border-b pointer"
                        }`}
                        onClick={() => optionClick(index)}
                    >
                        <FlexBox justify="space-between" align="normal">
                            {option}
                            {index === options.length - 1 && (
                                <div className="toggle-container">
                                    <label
                                        htmlFor="toggle"
                                        className={`toggle-label ${
                                            localSwitch ? "toggle-checked" : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            id="toggle"
                                            checked={localSwitch}
                                            onChange={(e) => {
                                                localSwitchClick(e.target.checked);
                                            }}
                                        />
                                        <div
                                            className={`toggle-label-handle ${
                                                localSwitch ? "bg-[#74CC69]" : "bg-[#dfe4ea]"
                                            }`}
                                        ></div>
                                    </label>
                                </div>
                            )}
                        </FlexBox>
                        {index === options.length - 1 && (
                            <div className="flex flex-col md:flex-row font-12 mt-[4px] font-medium">
                                <div className="text-[#808080] mr-[4px]">현재위치 :</div>
                                <div className="color-green-5e">
                                    {localSwitch ? localData || "위치로딩중" : "인증필요"}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownMenu;
