package com.gamersup.gamersupbackend.model;

import com.gamersup.gamersupbackend.security.ApplicationUserRole;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;


/**
 * All information of the gamers including the encrypted password
 */


@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gamers")
public class GamerInfo implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name="username")
    private String userName;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="dob")
    private Date dob;

    @Column(name="avatarurl")
    private String avatarUrl;

    @Column(name="bio")
    private String bio;

    @Column(name="level")
    private Integer level; //0-Newbie, 1-Pro Gamer, 2-Veteran

    @Column(name="likes")
    private Integer likes;

    @Enumerated(EnumType.STRING)
    @Column(name="User_Role")
    private ApplicationUserRole applicationUserRole;

    @Column(name="Locked")
    private Boolean locked = false;

    @Column(name="enable")
    private Boolean enable = false;


    public GamerInfo(String userName, String email, String password, ApplicationUserRole applicationUserRole) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.applicationUserRole = applicationUserRole;
    }

    public GamerInfo(String userName, String email, String password, ApplicationUserRole applicationUserRole, Boolean locked, Boolean enable) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.applicationUserRole = applicationUserRole;
        this.locked = locked;
        this.enable = enable;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(applicationUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
    }


}
