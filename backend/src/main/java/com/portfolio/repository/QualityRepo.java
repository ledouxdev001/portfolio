package com.portfolio.repository;
import com.portfolio.entity.Quality;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface QualityRepo extends JpaRepository<Quality, Long> {
    List<Quality> findAllByOrderByDisplayOrderAsc();
}
