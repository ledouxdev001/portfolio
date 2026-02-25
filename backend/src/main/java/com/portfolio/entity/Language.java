package com.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "languages")
public class Language {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String level;

    @Column(name = "proficiency_pct")
    private Integer proficiencyPct = 50;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public Language() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public Integer getProficiencyPct() { return proficiencyPct; }
    public void setProficiencyPct(Integer v) { this.proficiencyPct = v; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer v) { this.displayOrder = v; }
}
