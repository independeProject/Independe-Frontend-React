import axiosInstance from "./instance";

export async function myPageVideosGet() {
    try {
        const response = await axiosInstance.get("/api/videos");
        return response.data;
    } catch (error) {
        console.error("myPageVideosGet API error:", error);
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
        const response = await axiosInstance.post("/api/member/login", data, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("loginPost API error:", error);
        throw error;
    }
}

export async function refreshTokenPost() {
    try {
        const response = await axiosInstance.post("/api/refreshToken");
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
    const requestData = {
        ...pageable,
        keyword: keyword,
        condition: condition,
    };

    try {
        const response = await axiosInstance.get(
            `/api/posts/region/${regionType}/${regionPostType}`,
            { params: requestData }
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

export async function childCommentsPost(data) {
    try {
        const response = await axiosInstance.post("/api/comments/child/new", data);
        return response;
    } catch (error) {
        console.error("childCommentsPost API error:", error);
        throw error;
    }
}

export async function postFixedPut(postId, data) {
    try {
        const response = await axiosInstance.put(`/api/posts/${postId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("postFixedPut API error:", error);
        throw error;
    }
}

export async function postDelete(postId) {
    try {
        const response = await axiosInstance.delete(`/api/posts/${postId}`, postId);
        return response;
    } catch (error) {
        console.error("postFixedPut API error:", error);
        throw error;
    }
}

export async function lifeBoardGet(params) {
    const { independentPostType, condition, keyword, pageable } = params;
    const requestData = {
        ...pageable,
        keyword: keyword,
        condition: condition,
    };

    try {
        const response = await axiosInstance.get(`/api/posts/independent/${independentPostType}`, {
            params: requestData,
        });
        return response.data;
    } catch (error) {
        console.error("lifeBoardGet API error:", error);
        throw error;
    }
}

export async function lifeBoardPost(data) {
    try {
        const response = await axiosInstance.post("/api/posts/independent/new", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("lifeBoardPost API error:", error);
        throw error;
    }
}

export async function allSearchGet(params) {
    const { keyword, pageable } = params;

    try {
        const response = await axiosInstance.get(`/api/posts/search`, {
            params: {
                keyword: keyword,
                ...pageable,
            },
        });
        return response.data;
    } catch (error) {
        console.error("allSearchGet API error:", error);
        throw error;
    }
}

export async function memberGet() {
    try {
        const response = await axiosInstance.get(`/api/member`);
        return response;
    } catch (error) {
        console.error("memberGet API error:", error);
        throw error;
    }
}

export async function memberPut(data) {
    try {
        const response = await axiosInstance.put(`/api/members`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error("memberPut API error:", error);
        throw error;
    }
}

export async function memberPasswordPut(password) {
    try {
        const response = await axiosInstance.put(`/api/members/password`, password);
        return response;
    } catch (error) {
        console.error("memberPasswordPut API error:", error);
        throw error;
    }
}

export async function favoritePost(postId) {
    try {
        const response = await axiosInstance.post(`/api/favoritePost/${postId}`);
        return response;
    } catch (error) {
        console.error("favoritePost API error:", error);
        throw error;
    }
}

export async function favoritePostGet() {
    try {
        const response = await axiosInstance.get("/api/favoritePost");
        return response.data;
    } catch (error) {
        console.error("favoritePostGet API error:", error);
        throw error;
    }
}

export async function reportPost(postId) {
    try {
        const response = await axiosInstance.post(`/api/reportPost/${postId}`);
        return response;
    } catch (error) {
        console.error("reportPost API error:", error);
        throw error;
    }
}

export async function recommendPost(postId) {
    try {
        const response = await axiosInstance.post(`/api/recommendPost/${postId}`);
        return response;
    } catch (error) {
        console.error("recommendPost API error:", error);
        throw error;
    }
}

export async function recommendCommentPost(commentId) {
    try {
        const response = await axiosInstance.post(`/api/recommendComment/${commentId}`);
        return response;
    } catch (error) {
        console.error("recommendCommentPost API error:", error);
        throw error;
    }
}

export async function recommendCommentGet() {
    try {
        const response = await axiosInstance.get("/api/recommendComment");
        return response.data;
    } catch (error) {
        console.error("recommendCommentGet API error:", error);
        throw error;
    }
}

export async function myPostGet() {
    try {
        const response = await axiosInstance.get("/api/member/post");
        return response.data;
    } catch (error) {
        console.error("myPostGet API error:", error);
        throw error;
    }
}

export async function myCommnetGet() {
    try {
        const response = await axiosInstance.get("/api/member/comment");
        return response.data;
    } catch (error) {
        console.error("myCommnetGet API error:", error);
        throw error;
    }
}

export async function recommendPostGet() {
    try {
        const response = await axiosInstance.get("/api/recommendPost");
        return response.data;
    } catch (error) {
        console.error("recommendPostGet API error:", error);
        throw error;
    }
}

export async function chatRoomGet() {
    try {
        const response = await axiosInstance.get("/api/chat/rooms");
        return response.data;
    } catch (error) {
        console.error("chatRoomGet API error:", error);
        throw error;
    }
}

export async function chathistoryGet(chatRoomId) {
    try {
        const response = await axiosInstance.get("/api/chat/history", { params: { chatRoomId } });
        return response.data;
    } catch (error) {
        console.error("chathistoryGet API error:", error);
        throw error;
    }
}
