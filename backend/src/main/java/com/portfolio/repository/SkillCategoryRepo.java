package com.portfolio.repository;
import com.portfolio.entity.SkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface SkillCategoryRepo extends JpaRepository<SkillCategory, Long> {
    List<SkillCategory> findAllByOrderByDisplayOrderAsc();
}
