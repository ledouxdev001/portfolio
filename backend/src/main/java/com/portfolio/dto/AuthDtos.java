package com.portfolio.dto;

public class AuthDtos {

    public static class LoginRequest {
        private String username;
        private String password;
        public LoginRequest() {}
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private String token;
        private String type;
        private String username;
        private String fullName;
        private String email;

        public LoginResponse() {}

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private final LoginResponse r = new LoginResponse();
            public Builder token(String v)    { r.token = v; return this; }
            public Builder type(String v)     { r.type = v; return this; }
            public Builder username(String v) { r.username = v; return this; }
            public Builder fullName(String v) { r.fullName = v; return this; }
            public Builder email(String v)    { r.email = v; return this; }
            public LoginResponse build()      { return r; }
        }

        public String getToken()    { return token; }
        public String getType()     { return type; }
        public String getUsername() { return username; }
        public String getFullName() { return fullName; }
        public String getEmail()    { return email; }
    }

    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String fullName;
        public RegisterRequest() {}
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
    }
}
