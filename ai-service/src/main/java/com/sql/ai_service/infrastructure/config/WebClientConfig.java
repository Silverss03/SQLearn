package com.sql.ai_service.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @org.springframework.beans.factory.annotation.Value("${openai.api.base-url}")
    private String baseUrl;

    @Bean
    public WebClient webClient() {
        // Configure HttpClient with timeouts
        reactor.netty.http.client.HttpClient httpClient = reactor.netty.http.client.HttpClient.create()
                .option(io.netty.channel.ChannelOption.CONNECT_TIMEOUT_MILLIS, 60000) // 60s
                .responseTimeout(java.time.Duration.ofSeconds(120)) // 120s
                .doOnConnected(conn -> 
                    conn.addHandlerLast(new io.netty.handler.timeout.ReadTimeoutHandler(120, java.util.concurrent.TimeUnit.SECONDS))
                        .addHandlerLast(new io.netty.handler.timeout.WriteTimeoutHandler(120, java.util.concurrent.TimeUnit.SECONDS)));

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new org.springframework.http.client.reactive.ReactorClientHttpConnector(httpClient))
                .build();
    }
}
