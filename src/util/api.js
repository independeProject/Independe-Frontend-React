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

export async function regionBoardGet(params) {
    const { regionType, regionPostType, condition, keyword, pageable } = params;

    try {
        const response = await axiosInstance.get(
            `/api/posts/region/${regionType}/${regionPostType}`,
            { params: pageable }
        );
        return response.data;
    } catch (error) {
        console.error("regionBoardGet API error:", error);
        throw error;
    }
}

export async function regionBoardPost(data) {
    try {
        const response = await axiosInstance.post("/api/posts/region/new", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("regionBoardPost API error:", error);
        throw error;
    }
}

export async function boardPostGet(postId) {
    try {
        const response = await axiosInstance.get(`/api/posts/${postId}`, { postId: postId });
        return response;
    } catch (error) {
        console.error("boardPostGet API error:", error);
        throw error;
    }
}

export async function parentCommentsPost(data) {
    try {
        const response = await axiosInstance.post("/api/comments/parent/new", data);
        return response;
    } catch (error) {
        console.error("parentCommentsPost API error:", error);
        throw error;
    }
}
