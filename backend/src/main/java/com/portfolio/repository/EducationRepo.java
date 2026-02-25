package com.portfolio.repository;
import com.portfolio.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EducationRepo extends JpaRepository<Education, Long> {
    List<Education> findAllByOrderByDisplayOrderAsc();
}
