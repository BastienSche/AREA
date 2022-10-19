package eu.epitech.area.models;

public class Session {
    private String id;
    private String accessToken;
    private String refreshToken;

    public String getId() { return id; }
    public String getAccessToken() { return accessToken; }
    public String getRefreshToken() { return refreshToken; }

    public Session(String id, String accessToken, String refreshToken) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String toString() {
        return "Session {" +
                "id='" + id + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}