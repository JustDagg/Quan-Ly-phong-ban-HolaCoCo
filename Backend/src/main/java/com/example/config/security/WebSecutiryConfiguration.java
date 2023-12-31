package com.example.config.security;

import com.example.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@EnableWebSecurity
public class WebSecutiryConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private IAccountService accountService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(accountService).passwordEncoder(new BCryptPasswordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.cors()
				.and()
				.authorizeRequests()
				.antMatchers(	"/auth/facebook",
						"/callback",
						"/favicon.ico",
						"/api/v1/signup").permitAll()
				.antMatchers("/api/v1/departments", "/api/v1/departments/*").hasAnyAuthority("Admin", "Manager")
				.antMatchers("/api/v1/accounts", "/api/v1/accounts/*").hasAnyAuthority("Manager")
				.antMatchers("/api/v1/files/*").hasAnyAuthority("Admin", "Manager")
				.anyRequest().authenticated()
				.and()
				.httpBasic()
				.and()
				.csrf().disable();
	}
}
