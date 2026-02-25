package com.portfolio.controller;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin
public class PortfolioController {

    @Autowired private ProfileRepo profileRepo;
    @Autowired private SkillCategoryRepo skillCatRepo;
    @Autowired private ExperienceRepo expRepo;
    @Autowired private ProjectRepo projectRepo;
    @Autowired private EducationRepo eduRepo;
    @Autowired private LanguageRepo langRepo;
    @Autowired private QualityRepo qualityRepo;

    // ── FULL PORTFOLIO (public) ──────────────────────────────────────
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> portfolio = new LinkedHashMap<>();
        portfolio.put("profile",    profileRepo.findAll().stream().findFirst().orElse(null));
        portfolio.put("skills",     skillCatRepo.findAllByOrderByDisplayOrderAsc());
        portfolio.put("experiences",expRepo.findAllByOrderByDisplayOrderAsc());
        portfolio.put("projects",   projectRepo.findAllByOrderByDisplayOrderAsc());
        portfolio.put("education",  eduRepo.findAllByOrderByDisplayOrderAsc());
        portfolio.put("languages",  langRepo.findAllByOrderByDisplayOrderAsc());
        portfolio.put("qualities",  qualityRepo.findAllByOrderByDisplayOrderAsc());
        return ResponseEntity.ok(portfolio);
    }

    // ── PROFILE ──────────────────────────────────────────────────────
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile p) {
        profileRepo.findAll().stream().findFirst().ifPresent(existing -> p.setId(existing.getId()));
        return ResponseEntity.ok(profileRepo.save(p));
    }

    // ── SKILLS ───────────────────────────────────────────────────────
    @GetMapping("/skills")
    public List<SkillCategory> getSkills() {
        return skillCatRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping("/skills")
    @PreAuthorize("isAuthenticated()")
    public SkillCategory addSkillCategory(@RequestBody SkillCategory cat) {
        cat.setId(null);
        cat.getItems().forEach(item -> { item.setId(null); item.setCategory(cat); });
        return skillCatRepo.save(cat);
    }

    @PutMapping("/skills/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SkillCategory> updateSkillCategory(@PathVariable Long id, @RequestBody SkillCategory cat) {
        if (!skillCatRepo.existsById(id)) return ResponseEntity.notFound().build();
        cat.setId(id);
        cat.getItems().forEach(item -> item.setCategory(cat));
        return ResponseEntity.ok(skillCatRepo.save(cat));
    }

    @DeleteMapping("/skills/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteSkillCategory(@PathVariable Long id) {
        skillCatRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ── EXPERIENCES ───────────────────────────────────────────────────
    @GetMapping("/experiences")
    public List<Experience> getExperiences() {
        return expRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping("/experiences")
    @PreAuthorize("isAuthenticated()")
    public Experience addExperience(@RequestBody Experience exp) {
        exp.setId(null);
        exp.getTasks().forEach(t -> { t.setId(null); t.setExperience(exp); });
        return expRepo.save(exp);
    }

    @PutMapping("/experiences/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience exp) {
        if (!expRepo.existsById(id)) return ResponseEntity.notFound().build();
        exp.setId(id);
        exp.getTasks().forEach(t -> t.setExperience(exp));
        return ResponseEntity.ok(expRepo.save(exp));
    }

    @DeleteMapping("/experiences/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        expRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ── PROJECTS ──────────────────────────────────────────────────────
    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projectRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping("/projects")
    @PreAuthorize("isAuthenticated()")
    public Project addProject(@RequestBody Project p) {
        p.setId(null);
        return projectRepo.save(p);
    }

    @PutMapping("/projects/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project p) {
        if (!projectRepo.existsById(id)) return ResponseEntity.notFound().build();
        p.setId(id);
        return ResponseEntity.ok(projectRepo.save(p));
    }

    @DeleteMapping("/projects/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ── EDUCATION ─────────────────────────────────────────────────────
    @GetMapping("/education")
    public List<Education> getEducation() {
        return eduRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping("/education")
    @PreAuthorize("isAuthenticated()")
    public Education addEducation(@RequestBody Education e) {
        e.setId(null);
        return eduRepo.save(e);
    }

    @PutMapping("/education/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education e) {
        if (!eduRepo.existsById(id)) return ResponseEntity.notFound().build();
        e.setId(id);
        return ResponseEntity.ok(eduRepo.save(e));
    }

    @DeleteMapping("/education/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        eduRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ── LANGUAGES ─────────────────────────────────────────────────────
    @GetMapping("/languages")
    public List<Language> getLanguages() {
        return langRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping("/languages")
    @PreAuthorize("isAuthenticated()")
    public Language addLanguage(@RequestBody Language l) {
        l.setId(null);
        return langRepo.save(l);
    }

    @PutMapping("/languages/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Language> updateLanguage(@PathVariable Long id, @RequestBody Language l) {
        if (!langRepo.existsById(id)) return ResponseEntity.notFound().build();
        l.setId(id);
        return ResponseEntity.ok(langRepo.save(l));
    }

    @DeleteMapping("/languages/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        langRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ── QUALITIES ─────────────────────────────────────────────────────
    @GetMapping("/qualities")
    public List<Quality> getQualities() {
        return qualityRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping("/qualities")
    @PreAuthorize("isAuthenticated()")
    public Quality addQuality(@RequestBody Quality q) {
        q.setId(null);
        return qualityRepo.save(q);
    }

    @PutMapping("/qualities/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Quality> updateQuality(@PathVariable Long id, @RequestBody Quality q) {
        if (!qualityRepo.existsById(id)) return ResponseEntity.notFound().build();
        q.setId(id);
        return ResponseEntity.ok(qualityRepo.save(q));
    }

    @DeleteMapping("/qualities/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteQuality(@PathVariable Long id) {
        qualityRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
