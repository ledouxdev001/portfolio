package com.portfolio.repository;
import com.portfolio.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ExperienceRepo extends JpaRepository<Experience, Long> {
    List<Experience> findAllByOrderByDisplayOrderAsc();
}
