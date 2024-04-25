import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import FlexBox from "../../components/FlexBox";
import Modal from "../../components/Modal";
import { memberGet, memberPut } from "../../util/api";

const Profile = () => {
    const [userData, setUserData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalIndex, setModalIndex] = useState("");
    const [inputText, setInputText] = useState("");

    const userDataList = [
        { title: "아이디", type: "username" },
        { title: "비밀번호", type: "password" },
        { title: "닉네임", type: "nickname" },
        { title: "이메일", type: "email" },
        { title: "전화번호", type: "number" },
    ];
    let userInitialValue = null;

    const changeData = () => {
        console.log("^^userData", userData);
        const params = {
            nickname: userData.nickname,
            email: userData.email,
            number: userData.number,
        };
        memberPut(params)
            .then((res) => {
                console.log("^^res", res);
                localStorage.setItem("user", userData.nickname);
            })
            .catch((error) => {
                console.error("memberGet error:", error);
            })
            .finally(() => {
                window.location.reload();
            });
    };

    useEffect(() => {
        memberGet()
            .then((res) => {
                setUserData(res.data.data);
                userInitialValue = res.data.data;
                console.log("^^userInitialValue", userInitialValue);
            })
            .catch((error) => {
                console.error("memberGet error:", error);
            });
    }, []);

    useEffect(() => {
        if (modalIndex === 1) {
            setInputText("");
        } else {
            const modalData = userDataList[modalIndex]?.type;
            setInputText(userData?.[modalData]);
        }
    }, [modalIndex]);

    const openModal = (type, index) => {
        setIsModalOpen(true);
        setModalType(type);
        setModalIndex(index);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    const profileListItem = (text, btnName, index, type) => {
        return (
            <FlexBox
                justify="space-between"
                className={`font-13 py-[12px] ${index !== 5 && "border-b"}`}
            >
                {userDataList[index]?.title}
                {index !== 1 && " : " + (text || "-")}
                {btnName && (
                    <Button onClick={() => openModal(type, index)} text={btnName} info={true} />
                )}
            </FlexBox>
        );
    };

    return (
        <div>
            <div className="card">
                <FlexBox justify="space-between">
                    <div className="font-14 color-gray-96 font-medium">기본정보</div>
                    <Button onClick={() => changeData()} text={"변경사항 저장하기"} info={true} />
                </FlexBox>

                {userDataList?.map((item, index) => {
                    let type = item.type;
                    return (
                        <>
                            {profileListItem(
                                userData?.[type],
                                index === 0 ? null : "수정",
                                index,
                                type
                            )}
                        </>
                    );
                })}
            </div>
            {isModalOpen && modalType && (
                <Modal
                    title={userDataList.find((item) => item.type === modalType).title + " 수정하기"}
                    onClose={closeModal}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    inputFix={() => {
                        closeModal();
                        setUserData((prev) => ({
                            ...prev,
                            [userDataList[modalIndex]?.type]: inputText,
                        }));
                    }}
                />
            )}
        </div>
    );
};

export default Profile;
