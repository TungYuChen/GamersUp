package com.gamersup.gamersupbackend.security;

/**
 * Enum for permissions
 */
public enum ApplicationUserPermission {
    GAMER_READ("gamer:read"),
    GAMER_WRITE("gamer:write"),
    GAMER_UPDATE("gamer:update"),
    GAMER_DELETE("gamer:delete");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
