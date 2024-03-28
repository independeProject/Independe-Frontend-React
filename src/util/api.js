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

export async function loginPost(data) {
    try {
        const response = await axiosInstance.post("/api/member/login", data);
        return response;
    } catch (error) {
        console.error("loginPost API error:", error);
        throw error;
    }
}

export async function refreshTokenPost(data) {
    try {
        const response = await axiosInstance.post("/api/refreshToken", data);
        return response.data;
    } catch (error) {
        console.error("refreshTokenPost API error:", error);
        throw error;
    }
}

export async function mainDataGet() {
    try {
        const response = await axiosInstance.get("/api/posts/main");
        return response.data;
    } catch (error) {
        console.error("mainDataGet API error:", error);
        throw error;
    }
}
