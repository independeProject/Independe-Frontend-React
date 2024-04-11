import axios from "axios";
import { useState } from "react";

const GetLocalApi = () => {
    const [local, setLocal] = useState(localStorage.getItem("local"));
    const [error, setError] = useState("");
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGetLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) =>
                    handleReverseGeocoding(position.coords.latitude, position.coords.longitude),
                (error) => {
                    console.error("Error getting current position:", error.message);
                    setLoading(false);
                    if (error.code === error.PERMISSION_DENIED) {
                        setPermissionDenied(true);
                    }
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
                setLoading(false);
                const cityIndex = response.data.address.city
                    ? response.data.address.city
                    : response.data.address.town;
                if (cityIndex) {
                    setLocal(cityIndex);
                    localStorage.setItem("local", cityIndex);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
                setError("Error fetching data. Please try again.");
            });
    };

    const handlePermissionRequest = () => {
        setPermissionDenied(false);
        handleGetLocation();
    };

    return (
        <>
            {!local && !loading && (
                <button onClick={permissionDenied ? handlePermissionRequest : handleGetLocation}>
                    위치인증하기
                </button>
            )}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {permissionDenied && (
                <div>위치액세스를 차단하셨습니다. 위치 액세스를 허용 후 다시 시도 해주세요.</div>
            )}
            {local && <div>{local}</div>}
        </>
    );
};

export default GetLocalApi;
