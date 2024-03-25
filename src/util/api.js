import axiosInstance from "./instance";

export async function videosGet() {
    try {
        const response = await axiosInstance.get("/api/videos");
        return response.data;
    } catch (error) {
        console.error("videosGet API error:", error);
        throw error;
    }
}

export async function joinPost(data) {
    try {
        const response = await axiosInstance.post("/api/members/new", data);
        return response.data;
    } catch (error) {
        console.error("joinPost API error:", error);
        throw error;
    }
}

export async function nickUniquePost(data) {
    try {
        const response = await axiosInstance.post("/api/members/nickname", data);
        return response.data;
    } catch (error) {
        console.error("nickUniquePost API error:", error);
        throw error;
    }
}

export async function idUniquePost(data) {
    try {
        const response = await axiosInstance.post("/api/members/username", data);
        return response.data;
    } catch (error) {
        console.error("idUniquePost API error:", error);
        throw error;
    }
}
