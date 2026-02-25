package com.portfolio.repository;
import com.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ProjectRepo extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAsc();
}
