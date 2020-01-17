package com.stackroute.favouriteservice.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.stackroute.favouriteservice.service.MatchService;
import com.stackroute.favouriteservice.service.MatchServiceImplementation;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class MatchConfiguration {
	
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.stackroute.favouriteservice")).paths(PathSelectors.regex("/api/v1/matchservice.*"))
				.build();
	}
	
	@Bean
	@Primary
	public MatchService getMatchService() {
		return new MatchServiceImplementation();
	}
}

