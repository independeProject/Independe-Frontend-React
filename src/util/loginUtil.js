export function formatPhoneNumber(input) {
    const cleaned = ("" + input).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    return match;
}

export function emailCheck(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(email);
    return result;
}
