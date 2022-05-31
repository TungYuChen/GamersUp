package com.gamersup.gamersupbackend.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.gamersup.gamersupbackend.security.ApplicationUserPermission.*;

/**
 * Enum for Roles with corresponding permission
 */
public enum ApplicationUserRole {
    USER(Sets.newHashSet(GAMER_READ)),
    ADMIN(Sets.newHashSet(GAMER_READ, GAMER_WRITE, GAMER_DELETE, GAMER_UPDATE));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }

    /**
     * Get the granted authorizations
     * @return the permissions
     */
    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
