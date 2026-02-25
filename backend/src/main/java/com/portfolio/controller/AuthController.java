package com.portfolio.controller;

import com.portfolio.dto.AuthDtos.LoginRequest;
import com.portfolio.dto.AuthDtos.LoginResponse;
import com.portfolio.dto.AuthDtos.RegisterRequest;
import com.portfolio.entity.User;
import com.portfolio.repository.UserRepo;
import com.portfolio.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private UserRepo userRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            String token = jwtUtils.generateToken(auth);
            User user = userRepo.findByUsername(req.getUsername()).orElseThrow();

            LoginResponse resp = LoginResponse.builder()
                .token(token).type("Bearer")
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();
            return ResponseEntity.ok(resp);

        } catch (BadCredentialsException e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Identifiants incorrects");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        Map<String, String> res = new HashMap<>();
        if (userRepo.existsByUsername(req.getUsername())) {
            res.put("error", "Nom d'utilisateur deja utilise");
            return ResponseEntity.badRequest().body(res);
        }
        if (req.getEmail() != null && userRepo.existsByEmail(req.getEmail())) {
            res.put("error", "Email deja utilise");
            return ResponseEntity.badRequest().body(res);
        }
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setRole("ADMIN");
        userRepo.save(user);
        res.put("message", "Compte cree avec succes");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return userRepo.findByUsername(auth.getName())
            .map(u -> {
                Map<String, String> body = new HashMap<>();
                body.put("username", u.getUsername());
                body.put("fullName", u.getFullName() != null ? u.getFullName() : "");
                body.put("email", u.getEmail() != null ? u.getEmail() : "");
                return ResponseEntity.ok(body);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
