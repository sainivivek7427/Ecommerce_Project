package com.ecom.config;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsGlobalConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("http://localhost:3000","http://192.168.29.35:8081")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

//    @Bean
//    public CorsFilter corsFilter(){
//        CorsConfiguration cfg=new CorsConfiguration();
//        cfg.addAllowedOriginPattern("*");
//        cfg.setAllowCredentials(true);
//        cfg.addAllowedMethod("*");
//        cfg.addAllowedHeader("*");
//        cfg.addExposedHeader("Set-Cookie");
//
//        UrlBasedCorsConfigurationSource src=new UrlBasedCorsConfigurationSource();
//        src.registerCorsConfiguration("/**",cfg);
//
//        return new CorsFilter(src);
//    }
}
