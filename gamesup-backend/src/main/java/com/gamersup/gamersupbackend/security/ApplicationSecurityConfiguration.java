package com.gamersup.gamersupbackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static com.gamersup.gamersupbackend.security.ApplicationUserRole.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // for pre Authorized
public class ApplicationSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;

    public ApplicationSecurityConfiguration(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/","index", "/css/*", "/js/*").permitAll()
                // use pre-authorization to replace those lines
//                .antMatchers(HttpMethod.DELETE, "/api/**").hasAuthority(ApplicationUserPermission.GAMER_DELETE.name())
//                .antMatchers(HttpMethod.PUT, "/api/**").hasAuthority(ApplicationUserPermission.GAMER_DELETE.name())
//                .antMatchers(HttpMethod.POST, "/api/**").hasAuthority(ApplicationUserPermission.GAMER_DELETE.name())
//                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    /**
     * Create different roles for authorized methods for API
     * @return
     * @throws Exception
     */
    @Override
    @Bean
    public UserDetailsService userDetailsServiceBean() throws Exception {
        UserDetails jamesUser = User.builder()
                .username("James")
                .password(passwordEncoder.encode("password"))
//                .roles(STUDENT.name())
                // get the permission
                .authorities(USER.getGrantedAuthorities())
                .build();

        UserDetails chenUser = User.builder()
                .username("Chen")
                .password(passwordEncoder.encode("password1234"))
//                .roles(ADMIN.name())
                .authorities(ADMIN.getGrantedAuthorities())
                .build();

        return new InMemoryUserDetailsManager(
                jamesUser,
                chenUser
        );
    }
}
