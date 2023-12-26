//config.js
const USER_ROLES = {
    GUEST: "guest",
    CUSTOMER: "customer",
    AFFILIATE: "affiliate",
    ADMIN: "admin"
}

const USER_LOGIN_PROVIDER = {
    COMPANY_NAME: "COMPANY_NAME",
    GOOGLE: "GOOGLE"
}

module.exports = {
    baseUrl: '',
    USER_ROLES,
    USER_LOGIN_PROVIDER
}