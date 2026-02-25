package com.portfolio.repository;
import com.portfolio.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProfileRepo extends JpaRepository<Profile, Long> {}
