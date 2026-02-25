package com.portfolio.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill_categories")
public class SkillCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("displayOrder ASC")
    private List<SkillItem> items = new ArrayList<>();

    public SkillCategory() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer v) { this.displayOrder = v; }
    public List<SkillItem> getItems() { return items; }
    public void setItems(List<SkillItem> items) { this.items = items; }
}
