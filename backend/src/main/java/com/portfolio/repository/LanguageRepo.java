package com.portfolio.repository;
import com.portfolio.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface LanguageRepo extends JpaRepository<Language, Long> {
    List<Language> findAllByOrderByDisplayOrderAsc();
}
