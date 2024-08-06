import React, { useEffect, useState, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import BodyContainer from "../../components/BodyContainer";
import Icon from "../../components/Icon";
import * as StompJs from "@stomp/stompjs";
import { chatRoomGet, chathistoryGet } from "../../util/api";

const SERVER_URL = "ws://211.52.197.81:2000/ws"; // WebSocket URL
const TOKEN =
    "eyJraWQiOiJtYWNLZXkiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiYXV0aG9yaXR5IjoiUk9MRV9VU0VSIiwiaXNzIjoiaHR0cDovL3NwcmluZzo4MDgwIiwibmlja25hbWUiOiJuaWNrMSIsImV4cCI6MTcyMTczMjQ2MSwidXNlcm5hbWUiOiJpZDEifQ.mmdUtPGD-rnvxNADmnyXK59p_2Q9ZA1QYt1Ii0HghiA"; // Bearer Token
const USER_ID = 1; // 실제 사용자 ID로 교체

const Chatting = () => {
    const [chatList, setChatList] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState(null);
    const client = useRef(null);

    useEffect(() => {
        // 채팅 방 목록을 가져오기
        chatRoomGet()
            .then((res) => {
                setChatList(res.data);
            })
            .catch((error) => {
                console.error("chatRoomGet error:", error);
            });

        // STOMP 클라이언트 설정
        client.current = new StompJs.Client({
            brokerURL: SERVER_URL,
            connectHeaders: {
                Authorization: `Bearer ${TOKEN}`,
            },
            onConnect: () => {
                console.log("STOMP 연결 성공");

                // 채팅 방 ID가 있을 경우 구독
                if (chatRoomId !== null) {
                    subscribeToChatRoom(chatRoomId);
                }

                // 채팅 방 ID가 있을 경우 채팅 기록을 가져오기
                if (chatRoomId !== null) {
                    chathistoryGet(chatRoomId)
                        .then((res) => {
                            setMessages(res.data);
                        })
                        .catch((error) => {
                            console.error("chathistoryGet error:", error);
                        });
                }
            },
            onDisconnect: () => {
                console.log("STOMP 연결 해제");
            },
            onStompError: (frame) => {
                console.error("STOMP 오류:", frame);
            },
        });
        client.current.activate();
    }, [chatRoomId]);

    // 채팅 방 구독
    const subscribeToChatRoom = (roomId) => {
        if (client.current && client.current.connected) {
            client.current.subscribe(`/sub/chat/${roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        } else {
            console.error("STOMP 클라이언트가 연결되지 않았습니다.");
        }
    };

    // 메시지 전송
    const sendMessage = () => {
        if (client.current && client.current.connected) {
            client.current.publish({
                destination: `/pub/chat/${chatRoomId}`,
                body: JSON.stringify({
                    senderId: USER_ID,
                    message: message,
                    createdDate: new Date().toISOString(),
                }),
            });
            setMessage(""); // 메시지 입력창 초기화
        } else {
            console.error("STOMP 클라이언트가 연결되지 않았습니다.");
        }
    };

    // 날짜 포맷
    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };

        let formattedDate = date.toLocaleString("ko-KR", options);

        return formattedDate;
    };

    return (
        <BodyContainer>
            <div className="flex pl-[12px] gap-4 border rounded-lg mt-[24px]">
                <div className="flex-none w-[25%] border-r pr-4 py-[12px]">
                    <div className="font-16 font-medium">채팅목록</div>
                    {chatList?.map((item, index) => (
                        <button
                            key={index}
                            className="flex gap-4 py-[12px] items-center w-[100%]"
                            onClick={() => {
                                setChatRoomId(item.chatRoomId);
                            }}
                        >
                            <div className="hidden md:contents">
                                <div style={{ border: "1px solid black", borderRadius: "50%" }}>
                                    <Icon icon={AiOutlineUser} size={20} />
                                </div>
                            </div>
                            <div className="flex flex-col items-start font-12">
                                <div>{item.opponentNickname}</div>
                                <div>{item.lastMessage}</div>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="w-full py-[12px]">
                    <div
                        className="flex-1 min-h-[400px] md:h-[600px] pr-[13px] font-12"
                        style={{ overflowY: "auto" }}
                    >
                        {messages?.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex justify-${
                                    msg.senderId === USER_ID ? "end" : "start"
                                } mb-[4px] ${
                                    msg.senderId === USER_ID ? "ml-[16px]" : "mr-[16px]"
                                } items-end`}
                            >
                                <div className="font-8 mr-[4px]">{formatDate(msg.createdDate)}</div>
                                <span className={`chat-box bg-[#ECF6ED]`}>{msg.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 p-[4px] border rounded-lg font-12">
                            <input
                                className="w-full"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                            />
                        </div>
                        <Icon icon={VscSend} size={15} onClick={sendMessage} marginRight={12} />
                    </div>
                </div>
            </div>
        </BodyContainer>
    );
};

export default Chatting;
