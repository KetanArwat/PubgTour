package com.stackroute.userservice.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.stackroute.userservice.service.SecurityTokenGenerator;
import com.stackroute.userservice.service.SecurityTokenGeneratorImplementation;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@ComponentScan
@EnableSwagger2
public class UserConfiguration {
	
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.ori.moviecruiserauthentication")).paths(PathSelectors.regex("/user.*"))
				.build();
	}
	
	@Bean
	public SecurityTokenGenerator getTokenGenerator() {
		return new SecurityTokenGeneratorImplementation();
		
	}

}
