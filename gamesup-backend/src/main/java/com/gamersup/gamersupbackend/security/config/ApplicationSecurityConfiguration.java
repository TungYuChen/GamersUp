package com.gamersup.gamersupbackend.security.config;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.gamersup.gamersupbackend.security.PasswordConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static com.gamersup.gamersupbackend.security.ApplicationUserRole.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // for pre Authorized
@AllArgsConstructor
public class ApplicationSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final GamerService gamerService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager()))
//                .authorizeRequests()
//                .antMatchers("/","index", "/css/*", "/js/*").permitAll()
//                // use pre-authorization to replace those lines
////                .antMatchers(HttpMethod.DELETE, "/api/**").hasAuthority(ApplicationUserPermission.GAMER_DELETE.name())
////                .antMatchers(HttpMethod.PUT, "/api/**").hasAuthority(ApplicationUserPermission.GAMER_DELETE.name())
////                .antMatchers(HttpMethod.POST, "/api/**").hasAuthority(ApplicationUserPermission.GAMER_DELETE.name())
////                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole(ADMIN.name())
//                .anyRequest()
//                .authenticated();

        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/registration/**")
                .permitAll()
                .antMatchers("api/gamers/**", "/**")
//                .hasAnyRole("USER", "ADMIN")
                .permitAll()
                .anyRequest()
                .authenticated().and()
                .formLogin();

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(gamerService);
        return provider;
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
